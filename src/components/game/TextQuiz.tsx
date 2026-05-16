import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, Volume2, GraduationCap, BookOpen, Zap, Target, Flame } from 'lucide-react';
import { speak as speakFn } from '@/lib/game-utils';

interface TextQuizProps {
  appMode: string;
  quizPool: any[];
  quizCurrentQ: number;
  quizScore: number;
  quizOptions: any[];
  quizType: string;
  quizFinished: boolean;
  feedback: string | null;
  handleAnswer: (opt: any) => void;
  setQuizModeSelector: (v: boolean) => void;
}

const TextQuiz = ({
  appMode, quizPool, quizCurrentQ, quizScore, quizOptions,
  quizType, quizFinished, feedback, handleAnswer, setQuizModeSelector
}: TextQuizProps) => {
  const speak = (text: string) => speakFn(text, appMode);
  const isAdvanced = appMode === 'classic';

  // ===== Finished screen =====
  if (quizFinished) {
    if (isAdvanced) {
      const accuracy = Math.round((quizScore / quizPool.length) * 100);
      const ResultIcon = accuracy >= 80 ? GraduationCap : accuracy >= 50 ? BookOpen : Zap;
      const resultTone = accuracy >= 80 ? 'text-emerald-400' : accuracy >= 50 ? 'text-indigo-400' : 'text-amber-400';
      const resultLabel = accuracy >= 80 ? '優異' : accuracy >= 50 ? '及格' : '需加強';
      return (
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl w-full max-w-md"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="mb-5 flex justify-center">
            <div className="p-4 rounded-full bg-slate-800/60 ring-1 ring-slate-700">
              <ResultIcon size={48} className={resultTone} />
            </div>
          </div>
          <p className="text-xs tracking-[0.3em] text-slate-500 mb-2">RESULT · {resultLabel.toUpperCase()}</p>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">單字測驗完成</h2>
          <p className="text-xs text-slate-400 mb-6">進階模式 · {quizPool.length} 題</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
              <p className="text-xs text-slate-500">正確率</p>
              <p className={`text-2xl font-bold ${resultTone}`}>{accuracy}%</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
              <p className="text-xs text-slate-500">答對</p>
              <p className="text-2xl font-bold text-slate-100">{quizScore}<span className="text-sm text-slate-500">/{quizPool.length}</span></p>
            </div>
          </div>
          <motion.button
            onClick={() => setQuizModeSelector(true)}
            className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={18} /> 再挑戰一次
          </motion.button>
        </motion.div>
      );
    }

    // Childish (toddler) finish — unchanged
    return (
      <motion.div
        className="game-card border-game-green/30 p-10 text-center border-t-8 border-t-game-green w-full max-w-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">挑戰完成！🎉</h2>
        <p className="text-2xl text-muted-foreground mb-8 font-medium">
          得分: <motion.span className="text-game-green font-bold text-6xl mx-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }}>{quizScore}</motion.span> / {quizPool.length}
        </p>
        <motion.button
          onClick={() => setQuizModeSelector(true)}
          className="px-8 py-4 bg-gradient-to-r from-game-green to-success text-white rounded-xl font-bold text-xl transition-all shadow-game-green/30 game-btn"
          whileTap={{ scale: 0.95 }}
        >
          再玩一次
        </motion.button>
      </motion.div>
    );
  }

  // ===== Advanced in-game (academic dark theme) =====
  if (isAdvanced) {
    return (
      <motion.div
        className="bg-slate-950 -mx-2 px-4 py-5 rounded-2xl shadow-2xl ring-1 ring-slate-800 w-full max-w-md relative overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Feedback overlays */}
        {feedback === 'correct' && (
          <motion.div className="absolute inset-0 bg-emerald-500/15 flex items-center justify-center z-10 pointer-events-none rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="bg-emerald-500 text-white p-5 rounded-full shadow-2xl ring-4 ring-emerald-400/30"><Check size={48} /></div>
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div className="absolute inset-0 bg-rose-500/15 flex items-center justify-center z-10 pointer-events-none rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="bg-rose-500 text-white p-5 rounded-full shadow-2xl ring-4 ring-rose-400/30"><X size={48} /></div>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <Target className="text-indigo-400" size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-tight">單字測驗</h2>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">Vocab · Advanced</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 tabular-nums bg-slate-800/60 ring-1 ring-slate-700 px-2.5 py-1 rounded-full">
              <span className="text-indigo-300">{quizScore}</span> / {quizPool.length}
            </span>
            <motion.button
              onClick={() => setQuizModeSelector(true)}
              className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-700 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
              title="重新出題"
            >
              <RotateCcw size={16} />
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-800 rounded-full h-2 overflow-hidden mb-5">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full"
            animate={{ width: `${((quizCurrentQ + 1) / quizPool.length) * 100}%` }}
          />
        </div>

        {/* Prompt */}
        <p className="text-center text-xs tracking-widest text-slate-500 uppercase mb-3">
          {quizType === 'en2zh' ? 'English → Chinese' : 'Chinese → English'}
        </p>

        <div className="flex justify-center items-center gap-3 mb-7">
          <h3 className="text-4xl sm:text-5xl font-bold text-slate-100 text-center break-words">
            {quizType === 'en2zh' ? quizPool[quizCurrentQ]?.english : quizPool[quizCurrentQ]?.chinese}
          </h3>
          {quizType === 'en2zh' && (
            <motion.button
              onClick={() => speak(quizPool[quizCurrentQ]?.english)}
              className="p-2.5 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 rounded-full transition-colors ring-1 ring-indigo-500/30 shrink-0"
              whileTap={{ scale: 0.9 }}
            >
              <Volume2 size={22} />
            </motion.button>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quizOptions.map((opt, i) => (
            <motion.button
              key={i}
              disabled={feedback !== null}
              onClick={() => handleAnswer(opt)}
              className="p-4 bg-slate-800/60 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 rounded-lg text-base font-semibold text-slate-100 transition-colors text-center flex justify-center items-center gap-2"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-xs font-mono font-bold text-slate-500">{String.fromCharCode(65 + i)}</span>
              <span>{quizType === 'en2zh' ? opt.chinese : opt.english}</span>
              {quizType === 'zh2en' && <Volume2 size={14} className="text-slate-500" />}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  // ===== Childish (toddler) in-game — unchanged =====
  return (
    <motion.div
      className="game-card border-game-green/30 p-8 border-t-8 border-t-game-green relative overflow-hidden w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {feedback === 'correct' && (
        <motion.div className="absolute inset-0 bg-game-green/10 flex items-center justify-center z-10 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <div className="bg-game-green text-white p-6 rounded-full animate-bounce shadow-2xl"><Check size={64} /></div>
        </motion.div>
      )}
      {feedback === 'wrong' && (
        <motion.div className="absolute inset-0 bg-destructive/10 flex items-center justify-center z-10 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <div className="bg-destructive text-white p-6 rounded-full animate-pulse shadow-2xl"><X size={64} /></div>
        </motion.div>
      )}

      <div className="flex justify-between items-center mb-8">
        <motion.button
          onClick={() => setQuizModeSelector(true)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-semibold bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl transition-colors shadow-sm"
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} /> 重新出題
        </motion.button>
        <span className="bg-gradient-to-r from-game-blue-light to-game-purple-light text-game-blue px-5 py-2 rounded-full font-bold shadow-sm">
          得分: {quizScore}
        </span>
      </div>

      <h2 className="text-2xl text-center text-muted-foreground font-semibold mb-4">
        {quizType === 'en2zh' ? '請問這個單字的中文是？' : '請問這個單字的英文是？'}
      </h2>
      <div className="flex justify-center items-center gap-4 mb-10">
        <h3 className="text-5xl sm:text-6xl font-bold text-foreground text-center break-words drop-shadow-sm">
          {quizType === 'en2zh' ? quizPool[quizCurrentQ]?.english : quizPool[quizCurrentQ]?.chinese}
        </h3>
        {quizType === 'en2zh' && (
          <motion.button
            onClick={() => speak(quizPool[quizCurrentQ]?.english)}
            className="p-3 bg-game-blue-light text-game-blue rounded-full hover:bg-game-blue/20 transition-all shrink-0 shadow-sm"
            whileTap={{ scale: 0.9 }}
          >
            <Volume2 size={28} />
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quizOptions.map((opt, i) => (
          <motion.button
            key={i}
            disabled={feedback !== null}
            onClick={() => handleAnswer(opt)}
            className="p-6 bg-card border-2 border-border rounded-2xl text-2xl font-semibold text-foreground hover:bg-game-green-light hover:border-game-green/30 hover:text-game-green transition-all text-center flex justify-center items-center gap-3 shadow-sm"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {quizType === 'en2zh' ? opt.chinese : opt.english}
            {quizType === 'zh2en' && <Volume2 size={20} className="text-muted-foreground/50" />}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TextQuiz;
