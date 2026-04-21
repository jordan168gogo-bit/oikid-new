// Achievement & Badge system

const ACHIEVEMENTS_KEY = 'oikid_achievements';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  condition: (ctx: AchievementContext) => boolean;
  unlockedAt?: string; // ISO date
}

export interface AchievementContext {
  totalWordsStudied: number;
  totalQuizCorrect: number;
  totalQuizTotal: number;
  loginStreak: number;
  stars: number;
  petsCount: number;
  vocabCount: number;
}

// All possible achievements
export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt'>[] = [
  // 學習量
  { id: 'words_10', title: '初學萌芽', description: '累計學習 10 個單字', emoji: '🌱', condition: ctx => ctx.totalWordsStudied >= 10 },
  { id: 'words_50', title: '學海拾貝', description: '累計學習 50 個單字', emoji: '🐚', condition: ctx => ctx.totalWordsStudied >= 50 },
  { id: 'words_100', title: '百字達人', description: '累計學習 100 個單字', emoji: '💯', condition: ctx => ctx.totalWordsStudied >= 100 },
  { id: 'words_300', title: '單字大師', description: '累計學習 300 個單字', emoji: '🏅', condition: ctx => ctx.totalWordsStudied >= 300 },
  { id: 'words_500', title: '字海遊俠', description: '累計學習 500 個單字', emoji: '🦸', condition: ctx => ctx.totalWordsStudied >= 500 },

  // 測驗
  { id: 'quiz_10', title: '初試身手', description: '累計答對 10 題', emoji: '✊', condition: ctx => ctx.totalQuizCorrect >= 10 },
  { id: 'quiz_50', title: '答題小將', description: '累計答對 50 題', emoji: '⚡', condition: ctx => ctx.totalQuizCorrect >= 50 },
  { id: 'quiz_100', title: '百戰百勝', description: '累計答對 100 題', emoji: '🎯', condition: ctx => ctx.totalQuizCorrect >= 100 },
  { id: 'quiz_300', title: '答題王者', description: '累計答對 300 題', emoji: '👑', condition: ctx => ctx.totalQuizCorrect >= 300 },

  // 連續登入
  { id: 'streak_3', title: '三日勤學', description: '連續登入 3 天', emoji: '🔥', condition: ctx => ctx.loginStreak >= 3 },
  { id: 'streak_7', title: '一週不懈', description: '連續登入 7 天', emoji: '🌟', condition: ctx => ctx.loginStreak >= 7 },
  { id: 'streak_14', title: '兩週堅持', description: '連續登入 14 天', emoji: '💪', condition: ctx => ctx.loginStreak >= 14 },
  { id: 'streak_30', title: '月度學霸', description: '連續登入 30 天', emoji: '🏆', condition: ctx => ctx.loginStreak >= 30 },

  // 星星 & 寵物
  { id: 'stars_20', title: '星光閃爍', description: '累計獲得 20 顆星星', emoji: '⭐', condition: ctx => ctx.stars >= 20 },
  { id: 'stars_100', title: '星空燦爛', description: '累計獲得 100 顆星星', emoji: '🌠', condition: ctx => ctx.stars >= 100 },
  { id: 'pets_3', title: '小小馴獸師', description: '收集 3 隻夥伴', emoji: '🐾', condition: ctx => ctx.petsCount >= 3 },
  { id: 'pets_10', title: '動物園長', description: '收集 10 隻夥伴', emoji: '🦁', condition: ctx => ctx.petsCount >= 10 },

  // 字庫
  { id: 'vocab_expand', title: '探索家', description: '字庫達到 50 個以上單字', emoji: '🗺️', condition: ctx => ctx.vocabCount >= 50 },
];

// Get unlocked achievement IDs from localStorage
export const getUnlockedIds = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '{}');
  } catch {
    return {};
  }
};

// Check achievements and return newly unlocked ones
export const checkAchievements = (ctx: AchievementContext): Achievement[] => {
  const unlocked = getUnlockedIds();
  const newlyUnlocked: Achievement[] = [];

  for (const def of ACHIEVEMENT_DEFINITIONS) {
    if (unlocked[def.id]) continue; // already unlocked
    if (def.condition(ctx)) {
      const now = new Date().toISOString();
      unlocked[def.id] = now;
      newlyUnlocked.push({ ...def, unlockedAt: now });
    }
  }

  if (newlyUnlocked.length > 0) {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
  }

  return newlyUnlocked;
};

// Get all achievements with unlock status
export const getAllAchievements = (): (Omit<Achievement, 'condition'> & { unlocked: boolean })[] => {
  const unlocked = getUnlockedIds();
  return ACHIEVEMENT_DEFINITIONS.map(def => ({
    id: def.id,
    title: def.title,
    description: def.description,
    emoji: def.emoji,
    unlocked: !!unlocked[def.id],
    unlockedAt: unlocked[def.id] || undefined,
  }));
};

// Get total words studied (sum of all daily stats)
export const getTotalWordsStudied = (): number => {
  try {
    const stats = JSON.parse(localStorage.getItem('oikid_learning_stats') || '{"daily":[]}');
    return stats.daily.reduce((sum: number, d: any) => sum + (d.wordsStudied || 0), 0);
  } catch { return 0; }
};

export const getTotalQuizStats = (): { correct: number; total: number } => {
  try {
    const stats = JSON.parse(localStorage.getItem('oikid_learning_stats') || '{"daily":[]}');
    return stats.daily.reduce((acc: any, d: any) => ({
      correct: acc.correct + (d.quizCorrect || 0),
      total: acc.total + (d.quizTotal || 0),
    }), { correct: 0, total: 0 });
  } catch { return { correct: 0, total: 0 }; }
};
