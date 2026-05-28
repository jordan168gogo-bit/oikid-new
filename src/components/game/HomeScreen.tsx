import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Puzzle, GraduationCap, User, LogOut } from 'lucide-react';
import Mascot from './Mascot';
import FloatingDecorations from './FloatingDecorations';
import ConsultantButton from './ConsultantButton';
import FavoritePet from './FavoritePet';
import type { Pet } from '@/lib/pet-system';

interface HomeScreenProps {
  onSelectMode: (mode: 'toddler' | 'classic') => void;
  childName?: string;
  onChildNameChange?: (name: string) => void;
  onSignOut?: () => void;
  favoritePet?: Pet | null;
}

const HomeScreen = ({ onSelectMode, childName = '', onChildNameChange, onSignOut, favoritePet }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-amber-light via-game-pink-light to-game-blue-light flex items-start justify-center px-4 pt-4 pb-40 sm:items-center sm:p-6 sm:pb-8 relative overflow-hidden">
      <FloatingDecorations />
      <ConsultantButton />

      {/* Sign out button */}
      {onSignOut && (
        <motion.button
          onClick={onSignOut}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-full shadow-md border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={14} /> 登出
        </motion.button>
      )}

      <div className="max-w-5xl w-full relative z-10 pb-12 sm:pb-0">
        <motion.div 
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-orange via-game-pink to-game-purple mb-3 sm:mb-5 flex items-center justify-center gap-2 sm:gap-3 mt-4 leading-tight">
            <span><Wand2 className="text-game-orange shrink-0" size={28} /></span> 魔法單字庫
          </h1>

          {/* Child name input */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-full shadow-md border-2 border-game-orange/20 px-4 py-2 gap-2 max-w-xs w-full">
              <User size={18} className="text-game-orange shrink-0" />
              <input
                type="text"
                value={childName}
                onChange={e => onChildNameChange?.(e.target.value)}
                placeholder="輸入孩子的名字..."
                maxLength={20}
                className="bg-transparent border-none outline-none text-sm sm:text-base font-semibold text-foreground placeholder:text-muted-foreground/60 w-full"
              />
            </div>
          </motion.div>

          <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground font-semibold bg-card/70 inline-block px-3 sm:px-8 py-2 sm:py-3 rounded-2xl sm:rounded-full shadow-md border-2 border-card backdrop-blur-sm max-w-full text-center leading-relaxed">
            請選擇孩子的年齡，開啟專屬學習旅程！🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 px-2 sm:px-4">
          {/* 3-7 歲卡片 */}
          <motion.button
            onClick={() => onSelectMode('toddler')}
            className="group game-card border-game-orange/30 bg-gradient-to-br from-card to-game-orange-light p-6 sm:p-10 text-left flex flex-col h-full relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -right-6 -top-6 text-[6rem] opacity-10 select-none group-hover:opacity-20 transition-opacity">🧸</div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="text-game-orange group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 bg-game-orange-light p-3 rounded-2xl"><Puzzle size={40} strokeWidth={2} /></div>
              <div className="text-4xl group-hover:animate-bounce">🌟</div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-game-orange mb-2 leading-tight">幼兒啟蒙版</h2>
            <h3 className="text-base sm:text-xl font-semibold text-game-orange/80 mb-4 sm:mb-6 bg-game-orange-light inline-block px-4 py-1.5 rounded-full w-fit border border-game-orange/20">🎈 適合 3 ~ 7 歲</h3>
            <ul className="text-muted-foreground font-semibold space-y-3 sm:space-y-4 text-sm sm:text-lg flex-grow leading-relaxed">
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">🎯</span> 嚴選 300+ 高頻生活單字</li>
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">👂</span> 聽音辨圖 (免閱讀無壓力)</li>
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">🐾</span> 餵食夥伴賺取滿滿愛心</li>
            </ul>
            <div className="mt-5 sm:mt-8 w-full py-3 sm:py-4 bg-gradient-to-r from-game-orange to-game-pink text-white font-bold rounded-2xl text-center shadow-lg group-hover:shadow-xl transition-all text-sm sm:text-base">
              ✨ 開始冒險 ➔
            </div>
          </motion.button>

          {/* 8-12 歲卡片 */}
          <motion.button
            onClick={() => onSelectMode('classic')}
            className="group game-card border-game-blue/30 bg-gradient-to-br from-card to-game-blue-light p-6 sm:p-10 text-left flex flex-col h-full relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -right-6 -top-6 text-[6rem] opacity-10 select-none group-hover:opacity-20 transition-opacity">🎓</div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="text-game-blue group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 bg-game-blue-light p-3 rounded-2xl"><GraduationCap size={40} strokeWidth={2} /></div>
              <div className="text-4xl group-hover:animate-bounce">🏆</div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-game-blue mb-2 leading-tight">進階實戰版</h2>
            <h3 className="text-base sm:text-xl font-semibold text-game-blue/80 mb-4 sm:mb-6 bg-game-blue-light inline-block px-4 py-1.5 rounded-full w-fit border border-game-blue/20">🚀 適合 8 ~ 12 歲</h3>
            <ul className="text-muted-foreground font-semibold space-y-3 sm:space-y-4 text-sm sm:text-lg flex-grow leading-relaxed">
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">📚</span> 完整 1800+ 會考核心字庫</li>
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">🔤</span> A~Z 字母智慧篩選</li>
              <li className="flex items-center gap-2 sm:gap-3"><span className="text-xl">⚔️</span> 50題混合實戰測驗</li>
            </ul>
            <div className="mt-5 sm:mt-8 w-full py-3 sm:py-4 bg-gradient-to-r from-game-blue to-game-indigo text-white font-bold rounded-2xl text-center shadow-lg group-hover:shadow-xl transition-all text-sm sm:text-base">
              🎮 開始挑戰 ➔
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
