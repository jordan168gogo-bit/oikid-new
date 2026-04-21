import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Star, RotateCcw, Sparkles } from 'lucide-react';
import { speak as speakUtil } from '@/lib/game-utils';

interface VocabWord {
  id: string;
  english: string;
  chinese: string;
  pos?: string;
  emoji?: string;
}

interface ToddlerSpellingProps {
  vocabList: VocabWord[];
  appMode: string;
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

// Only pick short words (2-6 letters) for toddlers
const filterShortWords = (list: VocabWord[]) =>
  list.filter(w => /^[a-zA-Z]+$/.test(w.english) && w.english.length >= 2 && w.english.length <= 6);

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const ToddlerSpelling = ({ vocabList, appMode, onEarnStars, onCorrectAnswer, onWrongAnswer }: ToddlerSpellingProps) => {
  const TOTAL = 12;
  const [pool, setPool] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterSlots, setLetterSlots] = useState<string[]>([]);
  const [scrambledLetters, setScrambledLetters] = useState<{ letter: string; used: boolean }[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  const startGame = () => {
    const short = filterShortWords(vocabList);
    if (short.length < 4) return;
    const picked = shuffleArray(short).slice(0, TOTAL);
    setPool(picked);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setupWord(picked[0]);
    setTimeout(() => speakUtil(picked[0].english, appMode), 400);
  };

  const setupWord = (word: VocabWord) => {
    const letters = word.english.toLowerCase().split('');
    setLetterSlots(new Array(letters.length).fill(''));
    // Add 2 extra random distractor letters
    const distractors = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => !letters.includes(l));
    const extras = shuffleArray(distractors).slice(0, Math.min(2, Math.max(0, 8 - letters.length)));
    const all = shuffleArray([...letters, ...extras]);
    setScrambledLetters(all.map(l => ({ letter: l, used: false })));
  };

  useEffect(() => { startGame(); }, []);

  const currentWord = pool[currentIndex];

  const handleLetterTap = (idx: number) => {
    if (feedback || scrambledLetters[idx].used) return;
    const firstEmpty = letterSlots.findIndex(s => s === '');
    if (firstEmpty === -1) return;

    const newSlots = [...letterSlots];
    newSlots[firstEmpty] = scrambledLetters[idx].letter;
    setLetterSlots(newSlots);

    const newScrambled = [...scrambledLetters];
    newScrambled[idx] = { ...newScrambled[idx], used: true };
    setScrambledLetters(newScrambled);

    // Check if all slots filled
    if (newSlots.every(s => s !== '')) {
      const answer = newSlots.join('');
      const correct = currentWord.english.toLowerCase();
      if (answer === correct) {
        setFeedback('correct');
        setScore(prev => prev + 1);
        onCorrectAnswer();
        // No per-correct star reward, only completion bonus
        speakUtil(currentWord.english, appMode);
        setTimeout(() => advanceNext(), 1800);
      } else {
        setFeedback('wrong');
        setShakeWrong(true);
        onWrongAnswer?.();
        setTimeout(() => {
          setShakeWrong(false);
          // Reset the current word
          setupWord(currentWord);
          setFeedback(null);
        }, 1200);
      }
    }
  };

  const handleSlotTap = (slotIdx: number) => {
    if (feedback || letterSlots[slotIdx] === '') return;
    const letter = letterSlots[slotIdx];
    const newSlots = [...letterSlots];
    newSlots[slotIdx] = '';
    setLetterSlots(newSlots);

    const newScrambled = [...scrambledLetters];
    const scrIdx = newScrambled.findIndex(s => s.letter === letter && s.used);
    if (scrIdx !== -1) newScrambled[scrIdx] = { ...newScrambled[scrIdx], used: false };
    setScrambledLetters(newScrambled);
  };

  const advanceNext = () => {
    setFeedback(null);
    if (currentIndex + 1 < pool.length) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setupWord(pool[next]);
      setTimeout(() => speakUtil(pool[next].english, appMode), 300);
    } else {
      setFinished(true);
      onEarnStars(1);
    }
  };

  const shortWords = filterShortWords(vocabList);
  if (shortWords.length < 4) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-muted-foreground">單字庫中的簡單單字不夠多，無法開始拼寫遊戲！</p>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / pool.length) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-orange">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🌟' : accuracy >= 50 ? '👏' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">拼字完成！</h2>
          <p className="text-lg text-muted-foreground mb-4">
            答對 <span className="text-game-green font-bold">{score}</span> / {pool.length} 題
          </p>
          <div className="text-3xl font-bold text-game-orange mb-6">{accuracy}%</div>
          <motion.button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-game-orange to-game-pink text-white font-bold rounded-2xl shadow-lg text-lg" whileTap={{ scale: 0.95 }}>
            <RotateCcw size={20} className="inline mr-2" /> 再玩一次！
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="text-game-orange" size={24} /> 拼字小高手
        </h2>
        <p className="text-sm text-muted-foreground mt-1">看圖聽音，把字母排成正確的單字！</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-game-orange to-game-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / pool.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{currentIndex + 1}/{pool.length}</span>
      </div>

      <motion.div
        className="game-card p-6 border-t-8 border-t-game-orange text-center space-y-5"
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Emoji + Chinese */}
        <div className="space-y-2">
          <motion.div className="text-6xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            {currentWord.emoji || '📝'}
          </motion.div>
          <p className="text-2xl font-bold text-foreground">{currentWord.chinese}</p>
        </div>

        {/* Play sound */}
        <motion.button
          onClick={() => speakUtil(currentWord.english, appMode)}
          className="mx-auto flex items-center gap-2 px-5 py-2.5 bg-game-orange/10 text-game-orange font-bold rounded-2xl border border-game-orange/20 hover:bg-game-orange/20 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 size={20} /> 聽發音
        </motion.button>

        {/* Letter slots */}
        <motion.div
          className="flex justify-center gap-2 flex-wrap"
          animate={shakeWrong ? { x: [-8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {letterSlots.map((letter, i) => (
            <motion.button
              key={i}
              onClick={() => handleSlotTap(i)}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold transition-colors ${
                feedback === 'correct' ? 'border-game-green bg-game-green/10 text-game-green' :
                feedback === 'wrong' ? 'border-destructive bg-destructive/10 text-destructive' :
                letter ? 'border-game-orange bg-game-orange/5 text-foreground' : 'border-border bg-muted/30'
              }`}
              whileTap={letter ? { scale: 0.9 } : {}}
              layout
            >
              {letter ? letter.toUpperCase() : ''}
            </motion.button>
          ))}
        </motion.div>

        {/* Scrambled letter buttons */}
        <div className="flex justify-center gap-2 flex-wrap pt-2">
          {scrambledLetters.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => handleLetterTap(i)}
              disabled={item.used || !!feedback}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-xl sm:text-2xl transition-all ${
                item.used
                  ? 'opacity-20 bg-muted border border-border text-muted-foreground'
                  : 'bg-game-orange/10 border-2 border-game-orange/30 text-foreground hover:bg-game-orange/20 shadow-sm'
              }`}
              whileTap={!item.used ? { scale: 0.85, rotate: -5 } : {}}
            >
              {item.letter.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-lg font-bold text-game-green"
            >
              <CheckCircle size={22} /> 太棒了！🎉
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

export default ToddlerSpelling;
