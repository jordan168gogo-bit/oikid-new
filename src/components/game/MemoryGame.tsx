import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, GraduationCap, Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react';
import { speak as speakFn } from '@/lib/game-utils';

interface MemoryGameProps {
  appMode: string;
  memoryCards: any[];
  memoryAttempts: number;
  matchedPairs: number;
  memoryFinished: boolean;
  handleCardClick: (idx: number) => void;
  startMemoryGame: (pairCount?: number) => void;
}

const DIFFICULTY_OPTIONS = [
  { pairs: 4, label: '簡單', icon: Grid2X2, cols: 'grid-cols-2 sm:grid-cols-4', color: 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100' },
  { pairs: 6, label: '中等', icon: Grid3X3, cols: 'grid-cols-3 sm:grid-cols-4', color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { pairs: 8, label: '困難', icon: LayoutGrid, cols: 'grid-cols-4', color: 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100' },
];

const MemoryGame = ({
  appMode, memoryCards, memoryAttempts, matchedPairs,
  memoryFinished, handleCardClick, startMemoryGame
}: MemoryGameProps) => {
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(!memoryCards.length);
  const totalPairs = memoryCards.length / 2;

  const handleSelectDifficulty = (pairs: number) => {
    setShowDifficultyPicker(false);
    startMemoryGame(pairs);
  };

  // Determine grid cols based on card count
  const getGridCols = () => {
    if (memoryCards.length <= 8) return 'grid-cols-2 sm:grid-cols-4';
    if (memoryCards.length <= 12) return 'grid-cols-3 sm:grid-cols-4';
    return 'grid-cols-4';
  };

  if (showDifficultyPicker || (!memoryCards.length && !memoryFinished)) {
    return (
      <motion.div
        className="game-card border-game-amber/30 p-8 text-center border-t-8 border-t-game-amber w-full max-w-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className="text-7xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🃏
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-2">記憶翻翻樂</h2>
        <p className="text-muted-foreground font-semibold mb-8">選擇挑戰難度吧！</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {DIFFICULTY_OPTIONS.map(opt => {
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.pairs}
                onClick={() => handleSelectDifficulty(opt.pairs)}
                className={`flex-1 py-5 px-6 rounded-2xl font-bold text-lg border-2 transition-colors flex flex-col items-center gap-2 ${opt.color}`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
              >
                <Icon size={32} />
                <span className="text-xl font-black">{opt.label}</span>
                <span className="text-sm opacity-70">{opt.pairs} 對 ({opt.pairs * 2} 張)</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  if (memoryFinished) {
    const bonusStars = totalPairs <= 4 ? 2 : totalPairs <= 6 ? 3 : 5;
    return (
      <motion.div
        className="game-card border-game-amber/30 p-10 text-center border-t-8 border-t-game-amber w-full max-w-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <GraduationCap size={100} className="mx-auto text-game-amber mb-6 drop-shadow-lg" />
        </motion.div>
        <h2 className="text-4xl font-bold text-foreground mb-4">記憶力超人！</h2>
        <p className="text-2xl text-muted-foreground font-semibold mb-4">
          共翻了 <span className="text-game-amber font-bold">{memoryAttempts}</span> 次完成 <span className="text-game-green font-bold">{totalPairs}</span> 對配對！
        </p>
        <p className="text-xl mb-8">
          獲得 <motion.span className="text-game-star font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>+{bonusStars}</motion.span> ⭐
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={() => setShowDifficultyPicker(true)}
            className="px-8 py-4 bg-game-amber text-white rounded-3xl font-bold text-xl transition-all shadow-game-amber/30 game-btn"
            whileTap={{ scale: 0.95 }}
          >
            🔄 換難度
          </motion.button>
          <motion.button
            onClick={() => startMemoryGame(totalPairs)}
            className="px-8 py-4 bg-gradient-to-r from-game-green to-game-blue text-white rounded-3xl font-bold text-xl transition-all shadow-lg game-btn"
            whileTap={{ scale: 0.95 }}
          >
            🔁 再來一次！
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="game-card border-game-amber/30 p-6 border-t-8 border-t-game-amber w-full max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-semibold">翻牌次數: {memoryAttempts}</span>
          <button
            onClick={() => setShowDifficultyPicker(true)}
            className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg hover:bg-muted/80 font-bold border border-border"
          >
            換難度
          </button>
        </div>
        <span className="bg-game-amber-light text-game-amber px-4 py-2 rounded-full font-bold">配對: {matchedPairs} / {totalPairs}</span>
      </div>

      <div className={`grid ${getGridCols()} gap-3 sm:gap-4`}>
        {memoryCards.map((card: any, idx: number) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className="aspect-[4/5] perspective-1000 cursor-pointer"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: idx * 0.03 }}
          >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d relative rounded-2xl shadow-sm ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-game-amber/60 to-game-orange/70 rounded-2xl flex items-center justify-center border-2 border-game-amber/20">
                <Wand2 className="text-white/50" size={32} />
              </div>
              <div className={`absolute w-full h-full backface-hidden bg-card border-4 rounded-2xl flex flex-col items-center justify-center p-2 rotate-y-180 ${card.isMatched ? 'border-game-green/40 bg-game-green-light opacity-50' : 'border-game-amber/30'}`}>
                {card.type === 'en' ? (
                  <span className="text-lg sm:text-2xl font-bold text-foreground break-words text-center">{card.content}</span>
                ) : (
                  <>
                    <span className="text-3xl sm:text-5xl mb-1">{card.emoji}</span>
                    <span className="text-sm sm:text-lg font-semibold text-muted-foreground text-center">{card.content}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MemoryGame;
