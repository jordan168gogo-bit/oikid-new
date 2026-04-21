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

export const speak = (text: string, appMode: string, e?: any, mode: SpeakMode = 'auto' as any) => {
  if (e) e.stopPropagation();
  window.speechSynthesis.cancel();

  // Auto-detect: if text has spaces and >2 words, treat as sentence
  const autoMode: SpeakMode = text.trim().split(/\s+/).length > 2 ? 'sentence' : 'word';
  const effectiveMode = mode === ('auto' as any) ? autoMode : mode;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  const voice = getBestVoice();
  if (voice) utterance.voice = voice;

  if (appMode === 'toddler') {
    // Toddler: slower for words, slightly faster for sentences
    utterance.rate = effectiveMode === 'word' ? 0.7 : 0.8;
    utterance.pitch = 1.1;
  } else {
    // Advanced: natural pace
    utterance.rate = effectiveMode === 'word' ? 0.8 : 0.9;
    utterance.pitch = 1.0;
  }

  utterance.volume = 1.0;
  window.speechSynthesis.speak(utterance);
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
