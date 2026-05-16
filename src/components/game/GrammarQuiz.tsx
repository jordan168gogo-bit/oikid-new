import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, Star, RotateCcw, BookOpen, ChevronRight,
  Flame, GraduationCap, Lightbulb, Zap, Target,
} from 'lucide-react';
import { GRAMMAR_BANK, GrammarQuestion } from '@/data/grammar-questions';

interface GrammarQuizProps {
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

const QUESTIONS_PER_ROUND = 10;

const GrammarQuiz = ({ onEarnStars, onCorrectAnswer, onWrongAnswer }: GrammarQuizProps) => {
  const [difficulty, setDifficulty] = useState<'beginner' | 'advanced' | null>(null);
  const [pool, setPool] = useState<GrammarQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isAdvanced = difficulty === 'advanced';

  const startGame = (diff: 'beginner' | 'advanced') => {
    setDifficulty(diff);
    const filtered = GRAMMAR_BANK.filter(q => q.difficulty === diff);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_ROUND);
    setPool(shuffled);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setShowExplanation(false);
  };

  const currentQ = pool[currentIndex];

  const handleSelect = (optIndex: number) => {
    if (selected !== null) return;
    setSelected(optIndex);
    setShowExplanation(true);
    const isCorrect = optIndex === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
      onCorrectAnswer();
    } else {
      setStreak(0);
      onWrongAnswer?.();
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    if (currentIndex + 1 < pool.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
      onEarnStars(1);
    }
  };

  const restart = () => {
    setDifficulty(null);
    setPool([]);
    setFinished(false);
  };

  // ===== Difficulty selection (kept playful — entry point shows both modes) =====
  if (!difficulty) {
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-amber">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">文法闖關</h2>
          <p className="text-muted-foreground mb-6">選擇難度，開始挑戰文法題目！</p>
          <div className="space-y-3">
            <motion.button
              onClick={() => startGame('beginner')}
              className="w-full py-4 bg-gradient-to-r from-game-green to-emerald-400 text-white font-bold rounded-2xl text-lg shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              🌱 初級
              <span className="block text-sm font-normal opacity-80 mt-1">Be動詞、冠詞、代名詞、簡單時態、介系詞…</span>
            </motion.button>
            <motion.button
              onClick={() => startGame('advanced')}
              className="w-full py-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl text-lg shadow-lg ring-1 ring-indigo-400/40 relative overflow-hidden"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Flame size={20} className="text-amber-300" /> 進階模式
              </span>
              <span className="block text-sm font-normal opacity-80 mt-1">完成式、被動、關代、條件句、使役動詞…</span>
              <span className="block text-[10px] font-bold tracking-wider text-indigo-200 mt-2">會考題型 · 240 題 · 深度解析</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ===== Finished screen =====
  if (finished) {
    const accuracy = Math.round((score / pool.length) * 100);

    if (isAdvanced) {
      // Academic finish card
      const ResultIcon = accuracy >= 80 ? GraduationCap : accuracy >= 50 ? BookOpen : Zap;
      const resultTone = accuracy >= 80 ? 'text-emerald-400' : accuracy >= 50 ? 'text-indigo-400' : 'text-amber-400';
      const resultLabel = accuracy >= 80 ? '優異' : accuracy >= 50 ? '及格' : '需加強';
      return (
        <motion.div className="w-full max-w-md mx-auto text-center space-y-5" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-5 flex justify-center">
              <div className="p-4 rounded-full bg-slate-800/60 ring-1 ring-slate-700">
                <ResultIcon size={48} className={resultTone} />
              </div>
            </div>
            <p className="text-xs tracking-[0.3em] text-slate-500 mb-2">RESULT · {resultLabel.toUpperCase()}</p>
            <h2 className="text-2xl font-bold text-slate-100 mb-1">文法闖關完成</h2>
            <p className="text-xs text-slate-400 mb-5">進階模式 · {pool.length} 題</p>

            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">正確率</p>
                <p className={`text-2xl font-bold ${resultTone}`}>{accuracy}%</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">答對</p>
                <p className="text-2xl font-bold text-slate-100">{score}<span className="text-sm text-slate-500">/{pool.length}</span></p>
              </div>
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">最高連勝</p>
                <p className="text-2xl font-bold text-amber-400">{bestStreak}</p>
              </div>
            </div>

            <div className="space-y-2">
              <motion.button onClick={() => startGame(difficulty)} className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg text-base flex items-center justify-center gap-2" whileTap={{ scale: 0.95 }}>
                <RotateCcw size={18} /> 再挑戰一次
              </motion.button>
              <motion.button onClick={restart} className="w-full px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-sm transition-colors" whileTap={{ scale: 0.95 }}>
                換難度
              </motion.button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Childish finish card (beginner — unchanged)
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-amber">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🎓' : accuracy >= 50 ? '📚' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">文法闖關完成！</h2>
          <p className="text-sm text-muted-foreground mb-1">🌱 初級</p>
          <p className="text-lg text-muted-foreground mb-4">
            答對 <span className="text-game-green font-bold">{score}</span> / {pool.length} 題
          </p>
          <div className="text-3xl font-bold text-game-amber mb-6">{accuracy}%</div>
          <div className="space-y-2">
            <motion.button onClick={() => startGame(difficulty)} className="w-full px-8 py-3 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-2xl shadow-lg text-lg" whileTap={{ scale: 0.95 }}>
              <RotateCcw size={20} className="inline mr-2" /> 再闖一次
            </motion.button>
            <motion.button onClick={restart} className="w-full px-8 py-3 bg-muted text-foreground font-bold rounded-2xl text-sm" whileTap={{ scale: 0.95 }}>
              換難度
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQ) return null;

  // ===== In-game screen — fully forked between two designs =====
  if (isAdvanced) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-5 rounded-2xl shadow-2xl ring-1 ring-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <BookOpen className="text-indigo-400" size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-tight">文法闖關</h2>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">Advanced</p>
            </div>
          </div>
          {streak >= 2 && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 bg-amber-500/15 ring-1 ring-amber-500/40 px-2.5 py-1 rounded-full"
            >
              <Flame size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{streak} 連勝</span>
            </motion.div>
          )}
        </div>

        {/* Progress + score row */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full"
              animate={{ width: `${(currentIndex / pool.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 tabular-nums">{currentIndex + 1}/{pool.length}</span>
        </div>

        {/* Card */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5"
          key={currentIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Category badge */}
          <div className="flex items-center justify-center gap-1.5">
            <Target size={12} className="text-indigo-400" />
            <span className="text-[11px] tracking-widest uppercase font-bold text-indigo-300">
              {currentQ.category}
            </span>
          </div>

          {/* Question */}
          <p className="text-lg font-semibold text-slate-100 text-center leading-relaxed">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt, i) => {
              let style = 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-100';
              if (selected !== null) {
                if (i === currentQ.correctIndex) style = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200';
                else if (i === selected && i !== currentQ.correctIndex) style = 'bg-rose-500/15 border-rose-500/60 text-rose-200';
                else style = 'bg-slate-800/30 border-slate-800 text-slate-500';
              }
              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full p-3.5 rounded-lg border font-semibold text-base text-left flex items-center gap-3 transition-colors ${style}`}
                  whileTap={selected === null ? { scale: 0.985 } : undefined}
                >
                  <span className="text-xs font-mono font-bold text-slate-500 w-5 flex-shrink-0">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {selected !== null && i === currentQ.correctIndex && <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />}
                  {selected === i && i !== currentQ.correctIndex && <XCircle size={18} className="text-rose-400 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="bg-slate-800/40 border-l-2 border-indigo-500 pl-4 pr-3 py-3 rounded-r-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-xs font-bold text-indigo-300 mb-1.5 flex items-center gap-1.5 tracking-wider uppercase">
                  <Lightbulb size={12} /> 解析
                </p>
                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          {selected !== null && (
            <motion.button
              onClick={nextQuestion}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              {currentIndex + 1 < pool.length ? <>下一題 <ChevronRight size={18} /></> : <>看結果 <ChevronRight size={18} /></>}
            </motion.button>
          )}
        </motion.div>

        {/* Bottom stats row */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-emerald-400" />
            答對 <span className="font-mono font-bold text-slate-200 tabular-nums">{score}</span>
          </span>
          {bestStreak > 0 && (
            <span className="flex items-center gap-1.5">
              <Flame size={12} className="text-amber-400" />
              最高連勝 <span className="font-mono font-bold text-slate-200 tabular-nums">{bestStreak}</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  // ===== Beginner in-game (unchanged childish design) =====
  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <BookOpen className="text-game-amber" size={24} /> 文法闖關
        </h2>
        <p className="text-sm text-muted-foreground mt-1">🌱 初級 — 選出正確的文法答案！</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-game-amber to-game-orange rounded-full"
            animate={{ width: `${((currentIndex) / pool.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{currentIndex + 1}/{pool.length}</span>
      </div>

      <motion.div
        className="game-card p-6 border-t-8 border-t-game-amber space-y-5"
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Category badge */}
        <div className="text-center">
          <span className="text-xs bg-game-amber/10 text-game-amber px-3 py-1 rounded-full font-bold border border-game-amber/20">
            {currentQ.category}
          </span>
        </div>

        {/* Question */}
        <p className="text-xl font-bold text-foreground text-center leading-relaxed">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt, i) => {
            let style = 'bg-muted/50 border-border hover:bg-muted text-foreground';
            if (selected !== null) {
              if (i === currentQ.correctIndex) style = 'bg-game-green/10 border-game-green text-game-green';
              else if (i === selected && i !== currentQ.correctIndex) style = 'bg-destructive/10 border-destructive text-destructive';
              else style = 'bg-muted/30 border-border/50 text-muted-foreground';
            }
            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 font-bold text-lg text-center transition-colors ${style}`}
                whileTap={selected === null ? { scale: 0.97 } : undefined}
              >
                <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {selected !== null && i === currentQ.correctIndex && <CheckCircle size={18} className="inline ml-2" />}
                {selected === i && i !== currentQ.correctIndex && <XCircle size={18} className="inline ml-2" />}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className="bg-game-amber/5 border border-game-amber/20 p-4 rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p className="text-sm font-bold text-game-amber mb-1">📖 解析：</p>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{currentQ.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next button */}
        {selected !== null && (
          <motion.button
            onClick={nextQuestion}
            className="w-full py-3 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentIndex + 1 < pool.length ? <><ChevronRight size={20} /> 下一題</> : '🎉 看結果'}
          </motion.button>
        )}
      </motion.div>

      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Star size={14} className="text-game-star" fill="currentColor" /> 目前答對：{score} 題
      </div>
    </div>
  );
};

export default GrammarQuiz;
