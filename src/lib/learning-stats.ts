// Learning statistics tracking (localStorage-based)

const STATS_KEY = 'oikid_learning_stats';
const LOGIN_KEY = 'oikid_login_dates';

export interface DailyStats {
  date: string; // YYYY-MM-DD
  wordsStudied: number;
  quizCorrect: number;
  quizTotal: number;
}

export interface LearningStats {
  daily: DailyStats[];
}

const today = () => new Date().toISOString().split('T')[0];

export const getStats = (): LearningStats => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return { daily: [] };
  }
  return { daily: [] };
};

const saveStats = (stats: LearningStats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

const ensureToday = (stats: LearningStats): DailyStats => {
  const d = today();
  let entry = stats.daily.find(e => e.date === d);
  if (!entry) {
    entry = { date: d, wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
    stats.daily.push(entry);
    // Keep last 30 days
    if (stats.daily.length > 30) stats.daily = stats.daily.slice(-30);
  }
  return entry;
};

export const recordWordStudied = () => {
  const stats = getStats();
  const entry = ensureToday(stats);
  entry.wordsStudied += 1;
  saveStats(stats);
};

export const recordQuizAnswer = (correct: boolean) => {
  const stats = getStats();
  const entry = ensureToday(stats);
  entry.quizTotal += 1;
  if (correct) entry.quizCorrect += 1;
  saveStats(stats);
};

// Login streak
export const recordLogin = () => {
  const dates: string[] = JSON.parse(localStorage.getItem(LOGIN_KEY) || '[]');
  const d = today();
  if (!dates.includes(d)) {
    dates.push(d);
    // Keep last 365 days
    if (dates.length > 365) dates.splice(0, dates.length - 365);
    localStorage.setItem(LOGIN_KEY, JSON.stringify(dates));
  }
};

export const getLoginStreak = (): number => {
  const dates: string[] = JSON.parse(localStorage.getItem(LOGIN_KEY) || '[]');
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort().reverse();
  const d = new Date();
  const todayStr = today();
  // If today not logged, check if yesterday was
  if (sorted[0] !== todayStr) {
    d.setDate(d.getDate() - 1);
    if (sorted[0] !== d.toISOString().split('T')[0]) return 0;
  }
  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const curr = new Date(sorted[i]);
    const prev = new Date(sorted[i + 1]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diff) === 1) streak++;
    else break;
  }
  return streak;
};

export const getTodayStats = (): DailyStats => {
  const stats = getStats();
  return stats.daily.find(e => e.date === today()) || { date: today(), wordsStudied: 0, quizCorrect: 0, quizTotal: 0 };
};

export const getWeeklyStats = (): DailyStats[] => {
  const stats = getStats();
  const result: DailyStats[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const entry = stats.daily.find(e => e.date === dateStr);
    result.push(entry || { date: dateStr, wordsStudied: 0, quizCorrect: 0, quizTotal: 0 });
  }
  return result;
};
