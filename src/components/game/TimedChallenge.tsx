import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap, Trophy, RotateCcw } from 'lucide-react';
import { speak as speakFn } from '@/lib/game-utils';

interface TimedChallengeProps {
  appMode: string;
  vocabList: any[];
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
}

const DURATION = 30;
const HIGH_SCORE_KEY = 'oikid_timed_highscore';

const TimedChallenge = ({ appMode, vocabList, onEarnStars, onCorrectAnswer }: TimedChallengeProps) => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0'));
  const timerRef = useRef<any>(null);
  const questionCounterRef = useRef(0);

  const speak = (text: string) => speakFn(text, appMode);

  const generateQuestion = useCallback(() => {
    questionCounterRef.current++;
    const word = vocabList[Math.floor(Math.random() * vocabList.length)];
    setCurrentWord(word);
    let opts = [word];
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    for (const w of shuffled) {
      if (opts.length >= 4) break;
      if (w.id !== word.id) opts.push(w);
    }
    setOptions(opts.sort(() => 0.5 - Math.random()));
    setFeedback(null);
  }, [vocabList]);

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(DURATION);
    generateQuestion();
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPhase('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'finished') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_KEY, score.toString());
      }
      const starReward = Math.max(1, Math.floor(score / 2));
      onEarnStars(starReward);
    }
  }, [phase]);

  const handleAnswer = (opt: any) => {
    if (feedback) return;
    const correct = opt.id === currentWord.id;
    if (correct) {
      onCorrectAnswer();
      setScore(prev => prev + 1 + Math.floor(combo / 3));
      setCombo(prev => {
        const newCombo = prev + 1;
        setMaxCombo(mc => Math.max(mc, newCombo));
        return newCombo;
      });
      setFeedback('correct');
      speak(currentWord.english);
    } else {
      setCombo(0);
      setFeedback('wrong');
    }
    setTimeout(() => {
      generateQuestion();
    }, 600);
  };

  const timerPercent = (timeLeft / DURATION) * 100;
  const timerColor = timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-game-orange' : 'bg-game-green';

  if (phase === 'ready') {
    return (
      <motion.div
        className="w-full max-w-md mx-auto game-card p-8 text-center border-t-8 border-t-game-purple"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⏱️</motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">限時挑戰</h2>
        <p className="text-muted-foreground mb-2">在 {DURATION} 秒內答對越多題，獎勵越多！</p>
        <p className="text-sm text-muted-foreground mb-6">連續答對有 Combo 加成！🔥</p>
        {highScore > 0 && (
          <p className="text-game-amber font-bold mb-4 flex items-center justify-center gap-1">
            <Trophy size={18} /> 最高紀錄：{highScore} 分
          </p>
        )}
        <motion.button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-game-purple to-game-pink text-white font-bold rounded-2xl text-lg shadow-lg"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <Zap size={20} className="inline mr-2" /> 開始挑戰！
        </motion.button>
      </motion.div>
    );
  }

  if (phase === 'finished') {
    const isNewRecord = score >= highScore && score > 0;
    return (
      <motion.div
        className="w-full max-w-md mx-auto game-card p-8 text-center border-t-8 border-t-game-amber"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {isNewRecord && (
          <motion.div
            className="text-4xl mb-2"
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: 2 }}
          >🏆</motion.div>
        )}
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {isNewRecord ? '🎉 新紀錄！' : '⏰ 時間到！'}
        </h2>
        <div className="my-6 space-y-3">
          <p className="text-4xl font-bold text-game-orange">{score} <span className="text-lg">分</span></p>
          <p className="text-sm text-muted-foreground">最大連擊：<span className="text-game-pink font-bold">{maxCombo} Combo</span></p>
          <p className="text-sm text-game-amber font-bold">+{Math.max(1, Math.floor(score / 2))} ⭐</p>
        </div>
        <motion.button
          onClick={startGame}
          className="px-8 py-3 bg-gradient-to-r from-game-purple to-game-pink text-white font-bold rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={18} className="inline mr-2" /> 再挑戰一次！
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div className="w-full max-w-lg mx-auto space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Timer bar */}
      <div className="relative">
        <div className="bg-muted rounded-full h-4 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${timerColor} transition-colors`}
            animate={{ width: `${timerPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground flex items-center gap-1">
            <Timer size={12} /> {timeLeft}s
          </span>
        </div>
      </div>

      {/* Score + Combo */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-foreground">得分：{score}</span>
        <AnimatePresence mode="wait">
          {combo >= 2 && (
            <motion.span
              key={combo}
              className="text-game-pink font-bold text-lg"
              initial={{ scale: 0.5, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              🔥 {combo} Combo!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Question */}
      {currentWord && (
        <motion.div
          className="game-card p-6 text-center border-t-4 border-t-game-purple"
          key={`q-${questionCounterRef.current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {currentWord.emoji && <span className="text-4xl mb-2 block">{currentWord.emoji}</span>}
          <p className="text-2xl font-bold text-foreground mb-4">{currentWord.english}</p>
          
          <div className="grid grid-cols-2 gap-3">
            {options.map((opt, i) => (
              <motion.button
                key={opt.id + '_' + i}
                onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-colors ${
                  feedback && opt.id === currentWord.id
                    ? 'bg-game-green-light border-game-green/40 text-game-green'
                    : feedback === 'wrong' && opt.id !== currentWord.id
                    ? 'bg-muted/50 border-border opacity-50'
                    : 'bg-muted/30 border-border hover:bg-game-purple-light hover:border-game-purple/30'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {opt.chinese}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TimedChallenge;
