import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Star, RotateCcw, Keyboard } from 'lucide-react';
import { speak as speakUtil } from '@/lib/game-utils';

interface VocabWord {
  id: string;
  english: string;
  chinese: string;
  pos?: string;
  emoji?: string;
}

interface SpellingChallengeProps {
  vocabList: VocabWord[];
  appMode: string;
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

const SpellingChallenge = ({ vocabList, appMode, onEarnStars, onCorrectAnswer, onWrongAnswer }: SpellingChallengeProps) => {
  const [pool, setPool] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const TOTAL = 10;

  const startGame = () => {
    if (vocabList.length < 4) return;
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random()).slice(0, TOTAL);
    setPool(shuffled);
    setCurrentIndex(0);
    setInput('');
    setFeedback(null);
    setScore(0);
    setFinished(false);
    setShowHint(false);
    setAttempts(0);
    setTimeout(() => {
      speakUtil(shuffled[0].english, appMode);
      inputRef.current?.focus();
    }, 500);
  };

  useEffect(() => { startGame(); }, []);

  const currentWord = pool[currentIndex];

  const playSound = () => {
    if (currentWord) speakUtil(currentWord.english, appMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || feedback) return;

    const isCorrect = input.trim().toLowerCase() === currentWord.english.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      onCorrectAnswer();
      // No per-correct star reward
    } else {
      onWrongAnswer?.();
    }

    setTimeout(() => {
      setFeedback(null);
      setInput('');
      setShowHint(false);
      if (currentIndex + 1 < pool.length) {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setTimeout(() => {
          speakUtil(pool[nextIdx].english, appMode);
          inputRef.current?.focus();
        }, 300);
      } else {
        setFinished(true);
        onEarnStars(1);
      }
    }, 1800);
  };

  const revealHint = () => {
    setShowHint(true);
  };

  if (vocabList.length < 4) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-muted-foreground">單字庫至少需要 4 個單字才能開始拼字挑戰！</p>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / pool.length) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-purple">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '👍' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">拼字挑戰完成！</h2>
          <p className="text-lg text-muted-foreground mb-4">
            答對 <span className="text-game-green font-bold">{score}</span> / {pool.length} 題
          </p>
          <div className="text-3xl font-bold text-game-purple mb-6">{accuracy}%</div>
          <motion.button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-game-purple to-game-blue text-white font-bold rounded-2xl shadow-lg text-lg" whileTap={{ scale: 0.95 }}>
            <RotateCcw size={20} className="inline mr-2" /> 再挑戰一次
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!currentWord) return null;

  // Generate hint: show first letter and blanks
  const hintText = currentWord.english[0] + currentWord.english.slice(1).replace(/[a-zA-Z]/g, ' _');

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Keyboard className="text-game-purple" size={24} /> 拼字挑戰
        </h2>
        <p className="text-sm text-muted-foreground mt-1">聽發音，拼出正確的英文單字！</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-game-purple to-game-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / pool.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{currentIndex + 1}/{pool.length}</span>
      </div>

      <motion.div
        className="game-card p-6 border-t-8 border-t-game-purple text-center space-y-5"
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Chinese hint */}
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">這個單字的意思是：</p>
          <p className="text-3xl font-bold text-foreground">{currentWord.emoji || '📝'} {currentWord.chinese}</p>
          {currentWord.pos && <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">{currentWord.pos}</span>}
        </div>

        {/* Play sound button */}
        <motion.button
          onClick={playSound}
          className="mx-auto flex items-center gap-2 px-6 py-3 bg-game-purple/10 text-game-purple font-bold rounded-2xl border border-game-purple/20 hover:bg-game-purple/20 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 size={22} /> 再聽一次
        </motion.button>

        {/* Hint */}
        {showHint && (
          <motion.p className="text-xl font-mono tracking-widest text-game-amber" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            提示：{hintText}
          </motion.p>
        )}
        {!showHint && (
          <button onClick={revealHint} className="text-sm text-muted-foreground underline hover:text-foreground">
            看提示（減少獎勵）
          </button>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入英文單字..."
            className={`w-full text-center text-2xl font-bold p-4 rounded-2xl border-2 bg-background outline-none transition-colors ${
              feedback === 'correct' ? 'border-game-green bg-game-green/5' :
              feedback === 'wrong' ? 'border-destructive bg-destructive/5' :
              'border-border focus:border-game-purple'
            }`}
            disabled={!!feedback}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || !!feedback}
            className="w-full py-3 bg-gradient-to-r from-game-purple to-game-blue text-white font-bold rounded-2xl shadow-lg disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            確認答案
          </motion.button>
        </form>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center justify-center gap-2 text-lg font-bold ${feedback === 'correct' ? 'text-game-green' : 'text-destructive'}`}
            >
              {feedback === 'correct' ? (
                <><CheckCircle size={22} /> 正確！太棒了！</>
              ) : (
                <><XCircle size={22} /> 答案是：<span className="text-foreground">{currentWord.english}</span></>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Score */}
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Star size={14} className="text-game-star" fill="currentColor" /> 目前答對：{score} 題
      </div>
    </div>
  );
};

export default SpellingChallenge;
