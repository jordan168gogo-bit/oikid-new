import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Star, RotateCcw, BookOpen, ChevronRight } from 'lucide-react';
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
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const startGame = (diff: 'beginner' | 'advanced') => {
    setDifficulty(diff);
    const filtered = GRAMMAR_BANK.filter(q => q.difficulty === diff);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_ROUND);
    setPool(shuffled);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
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
      onCorrectAnswer();
    } else {
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

  // Difficulty selection screen
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
              className="w-full py-4 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-2xl text-lg shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              🔥 進階
              <span className="block text-sm font-normal opacity-80 mt-1">完成式、被動語態、關係代名詞、條件句…</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / pool.length) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-amber">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🎓' : accuracy >= 50 ? '📚' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">文法闖關完成！</h2>
          <p className="text-sm text-muted-foreground mb-1">{difficulty === 'beginner' ? '🌱 初級' : '🔥 進階'}</p>
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

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <BookOpen className="text-game-amber" size={24} /> 文法闖關
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{difficulty === 'beginner' ? '🌱 初級' : '🔥 進階'} — 選出正確的文法答案！</p>
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
              <p className="text-sm text-foreground">{currentQ.explanation}</p>
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
