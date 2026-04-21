import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { getLevel, getLevelProgress } from '@/lib/game-utils';

interface XpBarProps {
  stars: number;
  showLevel?: boolean;
}

const XpBar = ({ stars, showLevel = true }: XpBarProps) => {
  const levelInfo = getLevel(stars);
  const progress = getLevelProgress(stars);

  return (
    <div className="flex items-center gap-2 w-full">
      {showLevel && (
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">{levelInfo.emoji}</span>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-game-amber">Lv.{levelInfo.level}</span>
            <span className="text-sm font-bold text-foreground">{levelInfo.title}</span>
          </div>
        </div>
      )}
      <div className="flex-1 xp-bar">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center gap-1 shrink-0 bg-game-amber-light px-2 py-1 rounded-full">
        <Star size={14} className="text-game-star fill-game-star" />
        <span className="text-xs font-semibold text-game-amber">{stars}</span>
      </div>
    </div>
  );
};

export default XpBar;
