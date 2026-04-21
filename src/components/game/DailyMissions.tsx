import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Gift, CheckCircle, Star, Flame } from 'lucide-react';
import { getTodayMissions, getCheckInCalendar, claimCheckIn, type DailyMission, type CheckInDay } from '@/lib/daily-missions';

interface DailyMissionsProps {
  onClaimReward: (stars: number) => void;
  refreshKey?: number;
}

const DailyMissions = ({ onClaimReward, refreshKey = 0 }: DailyMissionsProps) => {
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [calendar, setCalendar] = useState<CheckInDay[]>([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [showClaim, setShowClaim] = useState(false);

  useEffect(() => {
    setMissions(getTodayMissions());
    const cal = getCheckInCalendar();
    setCalendar(cal);
    const today = new Date().toISOString().split('T')[0];
    setClaimedToday(cal.some(d => d.date === today && d.claimed));
  }, [refreshKey]);

  const handleCheckIn = () => {
    const result = claimCheckIn();
    if (result) {
      setClaimedToday(true);
      setCalendar(getCheckInCalendar());
      setShowClaim(true);
      onClaimReward(result.reward);
      setTimeout(() => setShowClaim(false), 2500);
    }
  };

  const completedCount = missions.filter(m => m.completed).length;
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full space-y-5 animate-in fade-in">
      {/* Check-in calendar */}
      <motion.div
        className="game-card p-5 border-t-4 border-t-game-orange"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <CalendarCheck className="text-game-orange" size={22} /> 每日打卡
          </h3>
          {!claimedToday && (
            <motion.button
              onClick={handleCheckIn}
              className="px-4 py-2 bg-gradient-to-r from-game-orange to-game-pink text-white font-bold rounded-xl text-sm shadow-md"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Gift size={16} className="inline mr-1" /> 簽到領獎！
            </motion.button>
          )}
          {claimedToday && (
            <span className="text-game-green font-bold text-sm flex items-center gap-1">
              <CheckCircle size={16} /> 已簽到
            </span>
          )}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendar.map((day, i) => {
            const d = new Date(day.date);
            const isToday = day.date === new Date().toISOString().split('T')[0];
            return (
              <motion.div
                key={day.date}
                className={`flex flex-col items-center p-2 rounded-xl text-center ${
                  day.claimed
                    ? 'bg-game-orange-light border-2 border-game-orange/30'
                    : isToday
                    ? 'bg-game-blue-light border-2 border-game-blue/30'
                    : 'bg-muted/50 border-2 border-transparent'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-[10px] text-muted-foreground">{weekDays[d.getDay()]}</span>
                <span className="text-xs font-bold">{d.getDate()}</span>
                {day.claimed ? (
                  <span className="text-lg">⭐</span>
                ) : i === 6 ? (
                  <span className="text-lg">🎁</span>
                ) : (
                  <span className="text-lg opacity-30">○</span>
                )}
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          連續 7 天全勤可獲得 <span className="text-game-orange font-bold">20 顆星星</span> 大獎！🎉
        </p>
      </motion.div>

      {/* Claim animation */}
      <AnimatePresence>
        {showClaim && (
          <motion.div
            className="fixed top-1/2 left-1/2 z-[120] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-game-amber-light to-game-orange-light p-8 rounded-[2rem] text-center shadow-2xl border-4 border-game-amber/40"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-2"
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >🎉</motion.div>
            <p className="text-xl font-bold text-game-orange">簽到成功！</p>
            <p className="text-lg text-foreground mt-1">獲得星星獎勵！</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily missions */}
      <motion.div
        className="game-card p-5 border-t-4 border-t-game-blue"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Flame className="text-game-blue" size={22} /> 每日任務
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{missions.length} 完成
          </span>
        </div>

        <div className="space-y-3">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.id}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                mission.completed
                  ? 'bg-game-green-light border-game-green/30'
                  : 'bg-muted/30 border-border'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-2xl">{mission.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${mission.completed ? 'text-game-green line-through' : 'text-foreground'}`}>
                  {mission.title}
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <motion.div
                    className={`h-full rounded-full ${mission.completed ? 'bg-game-green' : 'bg-game-blue'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(mission.current / mission.target) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {mission.current}/{mission.target}
                </p>
              </div>
              <div className="flex items-center gap-1 text-game-amber text-sm font-bold shrink-0">
                <Star size={14} fill="currentColor" /> +{mission.reward}
              </div>
              {mission.completed && <CheckCircle size={18} className="text-game-green shrink-0" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DailyMissions;
