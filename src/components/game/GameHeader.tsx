import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, Star, Heart, PawPrint, ChevronLeft, ChevronRight } from 'lucide-react';
import XpBar from './XpBar';

interface GameHeaderProps {
  appMode: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setAppMode: (mode: string) => void;
  stars: number;
  pets: any[];
  startAudioQuiz: () => void;
  startMemoryGame: () => void;
  setQuizModeSelector: (v: boolean) => void;
}

const GameHeader = ({ appMode, activeTab, setActiveTab, setAppMode, stars, pets, startAudioQuiz, startMemoryGame, setQuizModeSelector }: GameHeaderProps) => {
  const isToddler = appMode === 'toddler';
  const themeColor = isToddler ? 'game-orange' : 'game-blue';
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const scrollTabs = (dir: 'left' | 'right') => {
    tabScrollRef.current?.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' });
  };

  const tabs = isToddler ? [
    { id: 'study', label: '📖 魔法字卡', onClick: () => setActiveTab('study') },
    { id: 'audio_quiz', label: '👂 聽音辨圖', onClick: () => startAudioQuiz() },
    { id: 'memory', label: '🃏 記憶翻翻', onClick: () => startMemoryGame() },
    { id: 'toddler_spelling', label: '✏️ 拼字小高手', onClick: () => setActiveTab('toddler_spelling') },
    { id: 'drag_match', label: '🎯 圖文配對', onClick: () => setActiveTab('drag_match') },
    { id: 'timed', label: '⏱️ 限時挑戰', onClick: () => setActiveTab('timed') },
    { id: 'boss', label: '⚔️ Boss關卡', onClick: () => setActiveTab('boss') },
    { id: 'daily', label: '📋 每日任務', onClick: () => setActiveTab('daily') },
    { id: 'dashboard', label: '📊 儀表板', onClick: () => setActiveTab('dashboard') },
    { id: 'achievements', label: '🏆 成就', onClick: () => setActiveTab('achievements') },
    { id: 'gacha', label: '🎰 扭蛋', onClick: () => setActiveTab('gacha') },
    { id: 'pets', label: '🐾 夥伴', onClick: () => setActiveTab('pets') },
    { id: 'petdex', label: '📖 圖鑑', onClick: () => setActiveTab('petdex') },
    { id: 'farm', label: '🌾 農牧場', onClick: () => setActiveTab('farm') },
    { id: 'shop', label: '🛒 商店', onClick: () => setActiveTab('shop') },
    { id: 'admin', label: '⚙️ 家長後台', onClick: () => setActiveTab('admin') },
  ] : [
    { id: 'study', label: '📖 魔法字卡', onClick: () => setActiveTab('study') },
    { id: 'quiz', label: '⚔️ 實戰測驗', onClick: () => setQuizModeSelector(true) },
    { id: 'cloze', label: '📝 克漏字', onClick: () => setActiveTab('cloze') },
    { id: 'sentence', label: '📝 造句練習', onClick: () => setActiveTab('sentence') },
    { id: 'grammar', label: '📖 文法闖關', onClick: () => setActiveTab('grammar') },
    { id: 'reading', label: '📚 閱讀理解', onClick: () => setActiveTab('reading') },
    { id: 'daily', label: '📋 每日任務', onClick: () => setActiveTab('daily') },
    { id: 'dashboard', label: '📊 儀表板', onClick: () => setActiveTab('dashboard') },
    { id: 'achievements', label: '🏆 成就', onClick: () => setActiveTab('achievements') },
    { id: 'admin', label: '⚙️ 家長後台', onClick: () => setActiveTab('admin') },
  ];

  return (
    <header className="bg-card/95 backdrop-blur-md shadow-sm px-3 sm:px-4 py-3 flex flex-col gap-2.5 sticky top-0 z-40 border-b border-border">
      {/* Top row */}
      <div className="flex justify-between items-center w-full gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <motion.button
            onClick={() => setAppMode('home')}
            className={`p-1.5 sm:p-2 bg-${themeColor}/10 text-${themeColor} hover:bg-${themeColor}/20 rounded-full transition-colors shrink-0 border border-${themeColor}/20`}
            whileTap={{ scale: 0.9 }}
            title="回首頁"
          >
            <Home size={20} />
          </motion.button>
          <h1 className="text-sm sm:text-lg font-semibold text-foreground flex items-center gap-1.5 sm:gap-2 truncate leading-tight">
            <span className="text-base sm:text-lg">🦊</span>
            <span className="truncate">OiKID {isToddler ? '幼兒啟蒙版' : '進階實戰版'}</span>
          </h1>
        </div>

        {/* XP bar + Pets */}
        {isToddler ? (
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="w-[240px] md:w-[300px] lg:w-[360px]">
              <XpBar stars={stars} showLevel={true} />
            </div>
            <button
              onClick={() => setActiveTab('pets')}
              className="flex items-center gap-0.5 text-xl sm:text-2xl hover:scale-105 transition-transform shrink-0"
              title="打開夥伴背包"
            >
              {pets.length === 0 
                ? <span className="text-xs sm:text-sm text-game-orange font-semibold bg-card px-2 py-0.5 rounded-md shadow-sm">背包空空的</span>
                : pets.slice(-3).map((p: any, i: number) => <span key={i} className="drop-shadow-md">{p.type}</span>)
              }
              {pets.length > 3 && <span className="text-xs sm:text-sm text-game-orange font-semibold ml-1 bg-card px-1.5 rounded-md shadow-sm">+{pets.length - 3}</span>}
            </button>
          </div>
        ) : null}
      </div>

      {/* XP bar mobile (toddler only) */}
      {isToddler && (
        <div className="sm:hidden flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <XpBar stars={stars} showLevel={true} />
          </div>
          <button
            onClick={() => setActiveTab('pets')}
            className="flex items-center gap-0.5 text-xl hover:scale-105 transition-transform shrink-0"
            title="打開夥伴背包"
          >
            {pets.length === 0 
              ? <span className="text-xs text-game-orange font-semibold bg-card px-2 py-0.5 rounded-md shadow-sm">背包空空的</span>
              : pets.slice(-2).map((p: any, i: number) => <span key={i} className="drop-shadow-md">{p.type}</span>)
            }
            {pets.length > 2 && <span className="text-xs text-game-orange font-semibold ml-1 bg-card px-1.5 rounded-md shadow-sm">+{pets.length - 2}</span>}
          </button>
        </div>
      )}

      {/* Tab bar with scroll arrows */}
      <div className="flex items-center gap-1 w-full">
        <motion.button
          onClick={() => scrollTabs('left')}
          className={`shrink-0 p-1.5 rounded-full bg-${themeColor}/10 text-${themeColor} border border-${themeColor}/20 hover:bg-${themeColor}/20 transition-colors`}
          whileTap={{ scale: 0.9 }}
          aria-label="向左滑動"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <div ref={tabScrollRef} className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar flex-1 min-w-0">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={tab.onClick}
                className={`tab-pill ${
                  isActive 
                    ? `tab-pill-active bg-${themeColor}/10 text-${themeColor} border border-${themeColor}/25` 
                    : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>
        <motion.button
          onClick={() => scrollTabs('right')}
          className={`shrink-0 p-1.5 rounded-full bg-${themeColor}/10 text-${themeColor} border border-${themeColor}/20 hover:bg-${themeColor}/20 transition-colors`}
          whileTap={{ scale: 0.9 }}
          aria-label="向右滑動"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </header>
  );
};

export default GameHeader;
