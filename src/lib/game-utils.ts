// Shared game utilities and hooks
import { supabase } from '@/integrations/supabase/client';

// ===== Speech =====
let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

// Preload voices — call early so first speak() isn't silent
export const preloadVoices = () => {
  if (voicesLoaded) return;
  const tryLoad = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoice = pickBestVoice(voices);
      voicesLoaded = true;
    }
  };
  tryLoad();
  if (!voicesLoaded) {
    window.speechSynthesis.onvoiceschanged = tryLoad;
  }
};

const pickBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  const enVoices = voices.filter(v => v.lang.startsWith('en'));
  // Tier 1: Premium system voices (most natural sounding)
  const tier1 = [
    'Samantha', 'Karen', 'Daniel', 'Moira', 'Tessa', 'Fiona',
    'Alex', 'Victoria', 'Zoe', 'Nicky',
  ];
  for (const name of tier1) {
    const found = enVoices.find(v => v.name.includes(name) && v.localService);
    if (found) return found;
  }
  // Tier 2: Good cloud/remote voices
  const tier2 = [
    'Google US English', 'Google UK English Female', 'Google UK English Male',
    'Microsoft Zira', 'Microsoft Jenny', 'Microsoft Aria',
    'Microsoft David', 'Microsoft Mark',
    'English United States', 'English United Kingdom',
  ];
  for (const name of tier2) {
    const found = enVoices.find(v => v.name.includes(name));
    if (found) return found;
  }
  // Tier 3: Any remote voice (usually higher quality)
  const remoteVoice = enVoices.find(v => !v.localService);
  if (remoteVoice) return remoteVoice;
  return enVoices[0] || null;
};

export const getBestVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  cachedVoice = pickBestVoice(voices);
  return cachedVoice;
};

type SpeakMode = 'word' | 'sentence';

// 只使用瀏覽器內建語音，不呼叫 Google Cloud TTS。
const speakWithBrowser = (text: string, appMode: string, effectiveMode: SpeakMode) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  const voice = getBestVoice();
  if (voice) utterance.voice = voice;

  if (appMode === 'toddler') {
    utterance.rate = effectiveMode === 'word' ? 0.7 : 0.8;
    utterance.pitch = 1.1;
  } else {
    utterance.rate = effectiveMode === 'word' ? 0.8 : 0.9;
    utterance.pitch = 1.0;
  }
  utterance.volume = 1.0;
  window.speechSynthesis.speak(utterance);
};

export const speak = async (text: string, appMode: string, e?: any, mode: SpeakMode = 'auto' as any) => {
  if (e) e.stopPropagation();
  if (!text || !text.trim()) return;

  const autoMode: SpeakMode = text.trim().split(/\s+/).length > 2 ? 'sentence' : 'word';
  const effectiveMode = mode === ('auto' as any) ? autoMode : mode;
  speakWithBrowser(text, appMode, effectiveMode);
};

// ===== 錯題本（Wrong Words）=====
// 當小朋友答錯時呼叫，自動記到 wrong_words 表
// 同一個字答錯多次會累積 wrong_count
export const trackWrongWord = async (params: {
  userId: string;
  word: string;
  chinese?: string;
  appMode: 'toddler' | 'advanced';
  source?: string;
}) => {
  const { userId, word, chinese, appMode, source } = params;
  if (!userId || !word) return;

  const cleanWord = word.trim();
  if (!cleanWord) return;

  try {
    // 先查有沒有現成紀錄
    const { data: existing } = await supabase
      .from('wrong_words')
      .select('id, wrong_count, mastered')
      .eq('user_id', userId)
      .eq('word', cleanWord)
      .eq('app_mode', appMode)
      .maybeSingle();

    if (existing) {
      // 已存在 → wrong_count + 1、重置 correct_count、取消 mastered
      await supabase
        .from('wrong_words')
        .update({
          wrong_count: existing.wrong_count + 1,
          correct_count: 0,
          mastered: false,
          last_wrong_at: new Date().toISOString(),
          ...(chinese && { chinese }),
        })
        .eq('id', existing.id);
    } else {
      // 新紀錄
      await supabase
        .from('wrong_words')
        .insert({
          user_id: userId,
          word: cleanWord,
          chinese: chinese || null,
          app_mode: appMode,
          source: source || null,
        });
    }
  } catch (err) {
    console.warn('trackWrongWord failed (non-critical):', err);
  }
};

// 在錯題本模式答對時呼叫，連對 3 次自動 mastered（從清單消失）
export const trackReviewCorrect = async (params: {
  userId: string;
  word: string;
  appMode: 'toddler' | 'advanced';
}) => {
  const { userId, word, appMode } = params;
  if (!userId || !word) return;

  try {
    const { data: existing } = await supabase
      .from('wrong_words')
      .select('id, correct_count')
      .eq('user_id', userId)
      .eq('word', word.trim())
      .eq('app_mode', appMode)
      .maybeSingle();

    if (!existing) return;

    const newCount = existing.correct_count + 1;
    const mastered = newCount >= 3;

    await supabase
      .from('wrong_words')
      .update({
        correct_count: newCount,
        mastered,
      })
      .eq('id', existing.id);

    return { mastered, correct_count: newCount };
  } catch (err) {
    console.warn('trackReviewCorrect failed:', err);
  }
};

// 讀取使用者的錯題清單（未精通的）
export const getWrongWords = async (userId: string, appMode: 'toddler' | 'advanced', limit = 20) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('wrong_words')
    .select('*')
    .eq('user_id', userId)
    .eq('app_mode', appMode)
    .eq('mastered', false)
    .order('wrong_count', { ascending: false })
    .order('last_wrong_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.warn('getWrongWords failed:', error);
    return [];
  }
  return data || [];
};

// 取得錯題數量（給首頁卡片顯示 badge）
export const getWrongWordCount = async (userId: string, appMode: 'toddler' | 'advanced') => {
  if (!userId) return 0;
  const { count } = await supabase
    .from('wrong_words')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('app_mode', appMode)
    .eq('mastered', false);
  return count || 0;
};

// ===== AI =====
export const fetchGeminiJSON = async (prompt: string, schemaProperties: Record<string, any>, showAlert: (msg: string) => void) => {
  const convertSchema = (props: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(props)) {
      if (val.type === "STRING") {
        result[key] = { type: "string", ...(val.description ? { description: val.description } : {}) };
      } else if (val.type === "ARRAY" && val.items) {
        result[key] = {
          type: "array",
          items: val.items.type === "OBJECT" && val.items.properties
            ? { type: "object", properties: convertSchema(val.items.properties), required: Object.keys(val.items.properties) }
            : { type: "string" }
        };
      } else {
        result[key] = { type: "string" };
      }
    }
    return result;
  };
  const converted = convertSchema(schemaProperties);
  const { data, error } = await supabase.functions.invoke('ai-vocab', {
    body: { prompt, schemaProperties: converted },
  });
  if (error) { showAlert("⚠️ AI 連線失敗\n\n" + (error.message || "請稍後再試")); throw error; }
  if (data?.error) { showAlert("⚠️ " + data.error); throw new Error(data.error); }
  return data?.result;
};

// ===== Constants =====
export const ALPHABET = ['All','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
export const PET_TYPES = ['🐶','🐱','🐰','🐻','🦊','🐼','🐨','🦁','🐸','🦄','🐙','🐢','🦋','🐝','🐧','🐬','🐳','🐮','🐷','🐔','🐴','🐭','🐹','🦓','🦒'];

// ===== XP / Level System =====
export const getLevel = (stars: number) => {
  if (stars >= 2500) return { level: 10, title: '傳說大師', emoji: '👑', nextTarget: Infinity };
  if (stars >= 1800) return { level: 9, title: '鑽石學者', emoji: '💎', nextTarget: 2500 };
  if (stars >= 1200) return { level: 8, title: '白金勇者', emoji: '⚡', nextTarget: 1800 };
  if (stars >= 800) return { level: 7, title: '黃金冒險家', emoji: '🏆', nextTarget: 1200 };
  if (stars >= 500) return { level: 6, title: '銀色探險家', emoji: '🗡️', nextTarget: 800 };
  if (stars >= 300) return { level: 5, title: '青銅學徒', emoji: '🛡️', nextTarget: 500 };
  if (stars >= 160) return { level: 4, title: '見習魔法師', emoji: '🧙', nextTarget: 300 };
  if (stars >= 80) return { level: 3, title: '勇敢小戰士', emoji: '⚔️', nextTarget: 160 };
  if (stars >= 30) return { level: 2, title: '好奇小學生', emoji: '📖', nextTarget: 80 };
  return { level: 1, title: '新手冒險者', emoji: '🌱', nextTarget: 30 };
};

export const getLevelProgress = (stars: number) => {
  const info = getLevel(stars);
  if (info.nextTarget === Infinity) return 100;
  const prevTargets = [0, 30, 80, 160, 300, 500, 800, 1200, 1800, 2500];
  const prevTarget = prevTargets[info.level - 1] || 0;
  return Math.min(100, ((stars - prevTarget) / (info.nextTarget - prevTarget)) * 100);
};
