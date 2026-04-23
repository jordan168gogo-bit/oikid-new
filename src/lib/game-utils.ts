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

// ===== Google TTS cache & player =====
// 同一個 session 內相同的字只打一次 API (再次播放會用 memory cache)
const urlCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

// Fallback: 用瀏覽器內建語音（Google TTS 失敗時）
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

const playUrl = (url: string, appMode: string, effectiveMode: SpeakMode) => {
  // 停掉上一個還在播的
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  const audio = new Audio(url);

  // 幼兒版速度稍慢
  if (appMode === 'toddler') {
    audio.playbackRate = effectiveMode === 'word' ? 0.85 : 0.95;
  } else {
    audio.playbackRate = effectiveMode === 'word' ? 0.95 : 1.0;
  }
  audio.volume = 1.0;
  currentAudio = audio;
  audio.play().catch(err => console.error('Audio play failed:', err));
};

export const speak = async (text: string, appMode: string, e?: any, mode: SpeakMode = 'auto' as any) => {
  if (e) e.stopPropagation();
  if (!text || !text.trim()) return;

  // Auto-detect: if text has spaces and >2 words, treat as sentence
  const autoMode: SpeakMode = text.trim().split(/\s+/).length > 2 ? 'sentence' : 'word';
  const effectiveMode = mode === ('auto' as any) ? autoMode : mode;

  // 停掉所有現有語音
  window.speechSynthesis.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // 幼兒版用女聲（聲音比較親切），進階版用較自然的男聲
  const voiceName = appMode === 'toddler' ? 'en-US-Neural2-F' : 'en-US-Neural2-D';
  const cacheKey = `${voiceName}::${text.trim().toLowerCase()}`;

  // 1. 查 memory cache
  const cachedUrl = urlCache.get(cacheKey);
  if (cachedUrl) {
    playUrl(cachedUrl, appMode, effectiveMode);
    return;
  }

  // 2. 打 ai-tts function (會先查 Storage 再決定要不要生成)
  try {
    const { data, error } = await supabase.functions.invoke('ai-tts', {
      body: { text, voice: voiceName },
    });

    if (error || !data) throw error || new Error('No data');

    if (data.url) {
      urlCache.set(cacheKey, data.url);
      playUrl(data.url, appMode, effectiveMode);
      return;
    }

    if (data.audioBase64) {
      // 上傳 Storage 失敗的 fallback
      const blobUrl = `data:audio/mpeg;base64,${data.audioBase64}`;
      playUrl(blobUrl, appMode, effectiveMode);
      return;
    }

    throw new Error(data.error || 'TTS 回傳空內容');
  } catch (err) {
    console.warn('Google TTS 失敗，改用瀏覽器內建語音:', err);
    speakWithBrowser(text, appMode, effectiveMode);
  }
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
