import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { getStage, type Pet } from '@/lib/pet-system';

// Cloud-synced game data hook
export const useCloudData = (user: User | null) => {
  const [stars, setStars] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]);
  const [childName, setChildName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Load profile
  useEffect(() => {
    if (!user) { setDataLoaded(false); return; }
    const load = async () => {
      // Profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profile) {
        setStars(profile.stars || 0);
        setChildName(profile.child_name || '');
      }

      // Pets
      const { data: petsData } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', user.id);
      if (petsData) {
        setPets(petsData.map(p => ({
          id: p.id as any,
          type: p.pet_type,
          hearts: p.hearts,
          stage: getStage(p.hearts),
          rarity: p.rarity as any,
          name: p.pet_name || undefined,
        })));
      }

      // Record login
      await supabase.from('login_dates').upsert(
        { user_id: user.id, login_date: new Date().toISOString().split('T')[0] },
        { onConflict: 'user_id,login_date' }
      );

      setDataLoaded(true);
    };
    load();
  }, [user]);

  // Save stars (debounced)
  const saveStars = useCallback((newStars: number) => {
    if (!user) return;
    setStars(newStars);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      supabase.from('profiles').update({ stars: newStars, updated_at: new Date().toISOString() }).eq('id', user.id).then();
    }, 1000);
  }, [user]);

  // Save child name
  const saveChildName = useCallback((name: string) => {
    if (!user) return;
    setChildName(name);
    supabase.from('profiles').update({ child_name: name, updated_at: new Date().toISOString() }).eq('id', user.id).then();
  }, [user]);

  // Add pet
  const addPet = useCallback(async (pet: { type: string; rarity: string }) => {
    if (!user) return null;
    const { data } = await supabase.from('pets').insert({
      user_id: user.id,
      pet_type: pet.type,
      rarity: pet.rarity,
      hearts: 0,
      stage: 'egg',
    }).select().single();
    if (data) {
      const newPet: Pet = {
        id: data.id as any,
        type: data.pet_type,
        hearts: 0,
        stage: 'egg',
        rarity: data.rarity as any,
      };
      setPets(prev => [...prev, newPet]);
      return newPet;
    }
    return null;
  }, [user]);

  // Update pet hearts
  const feedPet = useCallback(async (petId: any, newHearts: number) => {
    if (!user) return;
    const newStage = getStage(newHearts);
    await supabase.from('pets').update({ hearts: newHearts, stage: newStage }).eq('id', petId);
    setPets(prev => prev.map(p => p.id === petId ? { ...p, hearts: newHearts, stage: newStage } : p));
  }, [user]);

  // Record word studied
  const recordWordStudied = useCallback(async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data: existing } = await supabase
      .from('learning_stats')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    if (existing) {
      await supabase.from('learning_stats').update({
        words_studied: (existing.words_studied || 0) + 1,
      }).eq('user_id', user.id).eq('date', today);
    } else {
      await supabase.from('learning_stats').insert({
        user_id: user.id,
        date: today,
        words_studied: 1,
        quiz_total: 0,
        quiz_correct: 0,
      });
    }
  }, [user]);

  // Record quiz answer
  const recordQuizAnswer = useCallback(async (correct: boolean) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    // Simple upsert - increment on conflict
    const { data: existing } = await supabase
      .from('learning_stats')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    
    if (existing) {
      await supabase.from('learning_stats').update({
        quiz_total: (existing.quiz_total || 0) + 1,
        quiz_correct: (existing.quiz_correct || 0) + (correct ? 1 : 0),
      }).eq('user_id', user.id).eq('date', today);
    } else {
      await supabase.from('learning_stats').insert({
        user_id: user.id,
        date: today,
        quiz_total: 1,
        quiz_correct: correct ? 1 : 0,
        words_studied: 0,
      });
    }
  }, [user]);

  // Get login streak
  const getLoginStreak = useCallback(async (): Promise<number> => {
    if (!user) return 0;
    const { data } = await supabase
      .from('login_dates')
      .select('login_date')
      .eq('user_id', user.id)
      .order('login_date', { ascending: false })
      .limit(60);
    if (!data || data.length === 0) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    const dates = data.map(d => d.login_date);
    if (dates[0] !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (dates[0] !== yesterday.toISOString().split('T')[0]) return 0;
    }
    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const curr = new Date(dates[i]);
      const prev = new Date(dates[i + 1]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) === 1) streak++;
      else break;
    }
    return streak;
  }, [user]);

  // Get total stats
  const getTotalStats = useCallback(async () => {
    if (!user) return { wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
    const { data } = await supabase
      .from('learning_stats')
      .select('words_studied, quiz_correct, quiz_total')
      .eq('user_id', user.id);
    if (!data) return { wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
    return data.reduce((acc, d) => ({
      wordsStudied: acc.wordsStudied + (d.words_studied || 0),
      quizCorrect: acc.quizCorrect + (d.quiz_correct || 0),
      quizTotal: acc.quizTotal + (d.quiz_total || 0),
    }), { wordsStudied: 0, quizCorrect: 0, quizTotal: 0 });
  }, [user]);

  // Get today stats
  const getTodayStats = useCallback(async () => {
    if (!user) return { wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('learning_stats')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    return data ? { wordsStudied: data.words_studied, quizCorrect: data.quiz_correct, quizTotal: data.quiz_total } : { wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
  }, [user]);

  // Get weekly stats
  const getWeeklyStats = useCallback(async () => {
    if (!user) return [];
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    const { data } = await supabase
      .from('learning_stats')
      .select('*')
      .eq('user_id', user.id)
      .in('date', dates);
    return dates.map(date => {
      const entry = data?.find(d => d.date === date);
      return { date, wordsStudied: entry?.words_studied || 0, quizCorrect: entry?.quiz_correct || 0, quizTotal: entry?.quiz_total || 0 };
    });
  }, [user]);

  // Achievements
  const getUnlockedAchievements = useCallback(async (): Promise<Record<string, string>> => {
    if (!user) return {};
    const { data } = await supabase
      .from('achievements')
      .select('achievement_id, unlocked_at')
      .eq('user_id', user.id);
    const map: Record<string, string> = {};
    data?.forEach(a => { map[a.achievement_id] = a.unlocked_at; });
    return map;
  }, [user]);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    if (!user) return;
    await supabase.from('achievements').upsert(
      { user_id: user.id, achievement_id: achievementId },
      { onConflict: 'user_id,achievement_id' }
    );
  }, [user]);

  // Daily missions
  const getDailyMissions = useCallback(async () => {
    if (!user) return null;
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('daily_missions')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    return data;
  }, [user]);

  const saveDailyMissions = useCallback(async (missions: any[]) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    await supabase.from('daily_missions').upsert(
      { user_id: user.id, date: today, missions },
      { onConflict: 'user_id,date' }
    );
  }, [user]);

  // Check-ins
  const getCheckIns = useCallback(async () => {
    if (!user) return null;
    const { data } = await supabase
      .from('check_ins')
      .select('*')
      .eq('user_id', user.id)
      .order('cycle_start', { ascending: false })
      .limit(1)
      .single();
    return data;
  }, [user]);

  const saveCheckIns = useCallback(async (calendar: any[], cycleStart: string) => {
    if (!user) return;
    await supabase.from('check_ins').upsert(
      { user_id: user.id, calendar, cycle_start: cycleStart },
      { onConflict: 'user_id,cycle_start' }
    );
  }, [user]);

  return {
    stars, setStars: saveStars,
    pets, setPets,
    childName, setChildName: saveChildName,
    dataLoaded,
    addPet, feedPet,
    recordWordStudied, recordQuizAnswer,
    getLoginStreak, getTotalStats, getTodayStats, getWeeklyStats,
    getUnlockedAchievements, unlockAchievement,
    getDailyMissions, saveDailyMissions,
    getCheckIns, saveCheckIns,
  };
};
