import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Lock, Sparkles } from "lucide-react";
import { ACHIEVEMENT_DEFINITIONS } from "@/lib/achievements";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const AchievementBadges = () => {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from("achievements")
      .select("achievement_id, unlocked_at")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach((a) => {
          map[a.achievement_id] = a.unlocked_at;
        });
        setUnlocked(map);
      });
  }, [user]);

  const achievements = ACHIEVEMENT_DEFINITIONS.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    emoji: def.emoji,
    unlocked: !!unlocked[def.id],
    unlockedAt: unlocked[def.id] || undefined,
  }));

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // --- 防斷行：安全樣式變數區 ---
  const containerClass = "w-full space-y-6 animate-in fade-in ";
  const headerClass =
    "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center gap-2 drop-shadow-sm ";

  const progressBgClass =
    "bg-slate-200 rounded-full h-5 overflow-hidden shadow-inner border border-slate-300 relative ";
  const progressBarClass = "h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full relative ";

  const gridClass = "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 ";

  const badgeBase =
    "relative p-5 sm:p-6 text-center flex flex-col items-center gap-2 rounded-[2rem] border-4 transition-all duration-300 overflow-hidden ";

  // 金屬反光與浮雕質感 (已解鎖)
  const badgeUnlocked =
    "bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-300 shadow-[0_10px_20px_rgba(251,191,36,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(251,191,36,0.4)] hover:border-amber-400 z-10 group ";

  // 霧面凹陷質感 (未解鎖)
  const badgeLocked = "bg-slate-100 border-slate-200 opacity-80 shadow-inner hover:bg-slate-200 z-0 ";

  return (
    <div className={containerClass}>
      <div className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-[2rem] shadow-sm border border-white">
        <h2 className={headerClass}>
          <Trophy size={32} className="text-amber-500" fill="currentColor" /> 榮譽成就牆
        </h2>
        <p className="text-base font-bold text-slate-500 mt-2">
          已收集 <span className="font-black text-orange-500 text-xl mx-1">{unlockedCount}</span> /{" "}
          {achievements.length} 面金牌
        </p>

        <div className="mt-4 px-4 sm:px-12">
          <div className={progressBgClass}>
            <motion.div
              className={progressBarClass}
              initial={{ width: 0 }}
              animate={{ width: (unlockedCount / achievements.length) * 100 + "%" }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            >
              <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={gridClass}>
        {achievements.map((a, i) => {
          const cardClass = badgeBase + (a.unlocked ? badgeUnlocked : badgeLocked);

          return (
            <motion.div
              key={a.id}
              className={cardClass}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: "spring", bounce: 0.5 }}
            >
              {/* 金屬光澤掃過特效 (僅限解鎖，Hover時觸發) */}
              {a.unlocked && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12 z-0 pointer-events-none"></div>
              )}

              {!a.unlocked && (
                <div className="absolute top-4 right-4 bg-slate-200 p-1.5 rounded-full shadow-inner">
                  <Lock size={14} className="text-slate-400" />
                </div>
              )}

              {a.unlocked && (
                <motion.div
                  className="absolute top-4 right-4 text-amber-400"
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                >
                  <Sparkles size={18} fill="currentColor" />
                </motion.div>
              )}

              <motion.div
                className={
                  "text-5xl sm:text-6xl my-2 relative z-10 " +
                  (a.unlocked ? "drop-shadow-[0_10px_10px_rgba(251,191,36,0.5)]" : "grayscale opacity-30 blur-[1.5px]")
                }
                animate={a.unlocked ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              >
                {a.emoji}
              </motion.div>

              <div className="relative z-10 mt-1">
                <p
                  className={
                    "text-base sm:text-lg font-black leading-tight mb-1 " +
                    (a.unlocked ? "text-slate-800" : "text-slate-400")
                  }
                >
                  {a.title}
                </p>
                <p
                  className={
                    "text-xs sm:text-sm font-bold leading-snug " + (a.unlocked ? "text-slate-500" : "text-slate-400/70")
                  }
                >
                  {a.description}
                </p>
              </div>

              {a.unlocked && a.unlockedAt && (
                <motion.div
                  className="mt-3 bg-amber-100/80 border border-amber-200 px-3 py-1.5 rounded-full relative z-10 shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <p className="text-[10px] sm:text-xs text-amber-700 font-black">
                    🏆 {new Date(a.unlockedAt).toLocaleDateString("zh-TW")} 解鎖
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadges;
