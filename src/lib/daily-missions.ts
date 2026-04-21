// Daily missions & check-in system

const MISSIONS_KEY = 'oikid_daily_missions';
const CHECKIN_KEY = 'oikid_checkin_calendar';

export interface DailyMission {
  id: string;
  title: string;
  emoji: string;
  target: number;
  current: number;
  reward: number; // stars
  completed: boolean;
}

export interface CheckInDay {
  date: string; // YYYY-MM-DD
  claimed: boolean;
}

const today = () => new Date().toISOString().split('T')[0];

const MISSION_TEMPLATES = [
  { id: 'study_words', title: '學習 10 個單字', emoji: '📖', target: 10, reward: 3 },
  { id: 'quiz_correct', title: '答對 5 題測驗', emoji: '✅', target: 5, reward: 3 },
  { id: 'listen_quiz', title: '完成 1 輪聽力測驗', emoji: '👂', target: 1, reward: 2 },
  { id: 'memory_game', title: '完成 1 次記憶翻翻', emoji: '🃏', target: 1, reward: 2 },
  { id: 'feed_pet', title: '餵食夥伴 2 次', emoji: '🍖', target: 2, reward: 2 },
];

export const getTodayMissions = (): DailyMission[] => {
  try {
    const raw = localStorage.getItem(MISSIONS_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === today()) return data.missions;
    }
  } catch {}
  // Generate new daily missions (pick 3 random)
  const shuffled = [...MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
  const missions: DailyMission[] = shuffled.slice(0, 3).map(t => ({
    ...t,
    current: 0,
    completed: false,
  }));
  localStorage.setItem(MISSIONS_KEY, JSON.stringify({ date: today(), missions }));
  return missions;
};

export const updateMissionProgress = (missionId: string, increment: number = 1): DailyMission | null => {
  const raw = localStorage.getItem(MISSIONS_KEY);
  if (!raw) return null;
  const data = JSON.parse(raw);
  if (data.date !== today()) return null;
  
  const mission = data.missions.find((m: DailyMission) => m.id === missionId);
  if (!mission || mission.completed) return null;
  
  mission.current = Math.min(mission.current + increment, mission.target);
  if (mission.current >= mission.target) {
    mission.completed = true;
  }
  localStorage.setItem(MISSIONS_KEY, JSON.stringify(data));
  return mission.completed ? mission : null;
};

// Check-in calendar (7 day cycle)
export const getCheckInCalendar = (): CheckInDay[] => {
  try {
    const raw = localStorage.getItem(CHECKIN_KEY);
    if (raw) {
      const days: CheckInDay[] = JSON.parse(raw);
      // Check if we need to reset (older than 7 days from first entry)
      if (days.length > 0) {
        const firstDate = new Date(days[0].date);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 7) {
          // Reset cycle
          const newDays = generateWeekDays();
          localStorage.setItem(CHECKIN_KEY, JSON.stringify(newDays));
          return newDays;
        }
      }
      return days;
    }
  } catch {}
  const days = generateWeekDays();
  localStorage.setItem(CHECKIN_KEY, JSON.stringify(days));
  return days;
};

const generateWeekDays = (): CheckInDay[] => {
  const days: CheckInDay[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    days.push({ date: d.toISOString().split('T')[0], claimed: false });
  }
  return days;
};

export const claimCheckIn = (): { reward: number; streak: number } | null => {
  const days = getCheckInCalendar();
  const todayStr = today();
  const dayIndex = days.findIndex(d => d.date === todayStr);
  if (dayIndex === -1 || days[dayIndex].claimed) return null;
  
  days[dayIndex].claimed = true;
  localStorage.setItem(CHECKIN_KEY, JSON.stringify(days));
  
  // Calculate consecutive claimed days
  let streak = 0;
  for (let i = 0; i <= dayIndex; i++) {
    if (days[i].claimed) streak++;
    else streak = 0;
  }
  
  // Day 7 = big reward
  const reward = streak === 7 ? 20 : streak >= 5 ? 5 : 3;
  return { reward, streak };
};

export const getCheckInStreak = (): number => {
  const days = getCheckInCalendar();
  let streak = 0;
  for (const d of days) {
    if (d.claimed) streak++;
    else break;
  }
  return streak;
};
