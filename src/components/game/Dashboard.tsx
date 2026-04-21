import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Target, TrendingUp, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { useCloudData } from '@/hooks/useCloudData';

interface DashboardProps {
  stars: number;
  vocabCount: number;
}

const StatCard = ({ icon: Icon, label, value, color, emoji }: { icon: any; label: string; value: string | number; color: string; emoji?: string }) => (
  <motion.div
    className={`bg-card game-card border-${color}/20 p-4 flex items-center gap-3 border-l-4 border-l-${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', bounce: 0.3 }}
  >
    <div className={`p-2.5 rounded-xl bg-${color}/10`}>
      {emoji ? <span className="text-2xl">{emoji}</span> : <Icon size={24} className={`text-${color}`} />}
    </div>
    <div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
);

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const Dashboard = ({ stars, vocabCount }: DashboardProps) => {
  const { user } = useAuth();
  const cloud = useCloudData(user ?? null);
  const levelInfo = getLevel(stars);

  const [todayStats, setTodayStats] = useState({ wordsStudied: 0, quizCorrect: 0, quizTotal: 0 });
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user) return;
    cloud.getTodayStats().then(setTodayStats);
    cloud.getWeeklyStats().then(setWeeklyStats);
    cloud.getLoginStreak().then(setStreak);
  }, [user]);

  const weeklyChartData = weeklyStats.map(d => {
    const date = new Date(d.date);
    return {
      day: `週${WEEKDAYS[date.getDay()]}`,
      學習單字: d.wordsStudied,
      答題數: d.quizTotal,
    };
  });

  const totalCorrect = weeklyStats.reduce((s: number, d: any) => s + d.quizCorrect, 0);
  const totalQuiz = weeklyStats.reduce((s: number, d: any) => s + d.quizTotal, 0);
  const weeklyAccuracy = totalQuiz > 0 ? Math.round((totalCorrect / totalQuiz) * 100) : 0;

  const pieData = totalQuiz > 0
    ? [
        { name: '答對', value: totalCorrect },
        { name: '答錯', value: totalQuiz - totalCorrect },
      ]
    : [{ name: '尚無數據', value: 1 }];

  const PIE_COLORS = ['hsl(142, 71%, 45%)', 'hsl(0, 84%, 60%)'];

  return (
    <div className="w-full space-y-5 animate-in fade-in">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          📊 學習儀表板
        </h2>
        <p className="text-sm text-muted-foreground mt-1">追蹤你的學習進度</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={BookOpen} label="今日學習" value={`${todayStats.wordsStudied} 字`} color="game-orange" />
        <StatCard icon={Flame} label="連續登入" value={`${streak} 天`} color="game-pink" emoji="🔥" />
        <StatCard icon={Target} label="今日答題" value={`${todayStats.quizCorrect}/${todayStats.quizTotal}`} color="game-blue" />
        <StatCard icon={Trophy} label="等級" value={`Lv.${levelInfo.level} ${levelInfo.emoji}`} color="game-purple" />
      </div>

      <motion.div className="bg-card game-card p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-game-blue" /> 本週學習趨勢
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyChartData} barGap={2}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="學習單字" fill="hsl(var(--game-orange))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="答題數" fill="hsl(var(--game-blue))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div className="bg-card game-card p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Target size={16} className="text-game-green" /> 本週正確率
        </h3>
        <div className="flex items-center gap-4">
          <div className="h-32 w-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={totalQuiz > 0 ? PIE_COLORS[i] : 'hsl(var(--muted))'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-3xl font-bold text-foreground">{totalQuiz > 0 ? `${weeklyAccuracy}%` : '—'}</p>
            <p className="text-xs text-muted-foreground">
              {totalQuiz > 0 ? `本週共答 ${totalQuiz} 題，答對 ${totalCorrect} 題` : '本週尚未答題，快來挑戰吧！'}
            </p>
            {totalQuiz > 0 && (
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[0] }} /> 答對</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[1] }} /> 答錯</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div className="bg-card game-card p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <p className="text-sm text-muted-foreground">
          📚 單字庫共有 <span className="font-bold text-foreground">{vocabCount}</span> 個單字 ·
          累積 <span className="font-bold text-game-orange">⭐ {stars}</span> 顆星星
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
