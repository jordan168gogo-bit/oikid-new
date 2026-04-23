import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Volume2, CheckCircle, XCircle, Trophy, Sparkles, RotateCcw, Home } from 'lucide-react';
import { speak, trackReviewCorrect, trackWrongWord, getWrongWords } from '@/lib/game-utils';

interface WrongWord {
  id: string;
  word: string;
  chinese: string | null;
  wrong_count: number;
  correct_count: number;
}

interface WrongWordsReviewProps {
  userId: string;
  appMode: 'toddler' | 'advanced';
  onEarnStars: (n: number) => void;
  onBack: () => void;
}

type ReviewMode = 'loading' | 'empty' | 'playing' | 'finished';

const WrongWordsReview = ({ userId, appMode, onEarnStars, onBack }: WrongWordsReviewProps) => {
  const [mode, setMode] = useState<ReviewMode>('loading');
  const [words, setWords] = useState<WrongWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WrongWord[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [masteredWords, setMasteredWords] = useState<string[]>([]);

  // 載入錯題
  const loadWords = useCallback(async () => {
    setMode('loading');
    const list = await getWrongWords(userId, appMode, 10);
    if (!list || list.length === 0) {
      setMode('empty');
      return;
    }
    setWords(list);
    setCurrentIdx(0);
    setScore(0);
    setStarsEarned(0);
    setMasteredWords([]);
    generateOptions(list, 0);
    setMode('playing');
    // 自動唸第一個字
    setTimeout(() => speak(list[0].word, appMode), 400);
  }, [userId, appMode]);

  useEffect(() => { loadWords(); }, [loadWords]);

  // 產生 4 選 1（正確答案 + 3 個干擾）
  const generateOptions = (pool: WrongWord[], idx: number) => {
    const correct = pool[idx];
    if (!correct) return;
    const distractors = pool
      .filter(w => w.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    // 如果錯題庫不到 4 個，用重複的湊
    while (distractors.length < 3) {
      distractors.push({ ...correct, id: `fake-${distractors.length}`, word: correct.word + '_' });
    }
    const mixed = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(mixed);
  };

  const handleAnswer = async (selected: WrongWord) => {
    if (feedback) return;
    const correct = words[currentIdx];
    const isCorrect = selected.id === correct.id;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    // 唸出正確答案
    speak(correct.word, appMode);

    if (isCorrect) {
      setScore(s => s + 1);
      // 錯題答對：星星 3 倍獎勵（一般答對 1 顆，這裡給 3 顆）
      const stars = 3;
      setStarsEarned(s => s + stars);
      onEarnStars(stars);

      // 更新資料庫（連對 3 次 → mastered）
      const result = await trackReviewCorrect({ userId, word: correct.word, appMode });
      if (result?.mastered) {
        setMasteredWords(m => [...m, correct.word]);
      }
    } else {
      // 答錯：再記一次 wrong_count（其實是同個字，會更新既有紀錄）
      await trackWrongWord({
        userId,
        word: correct.word,
        chinese: correct.chinese || undefined,
        appMode,
        source: 'review',
      });
    }

    // 1.2 秒後下一題
    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 < words.length) {
        const nextIdx = currentIdx + 1;
        setCurrentIdx(nextIdx);
        generateOptions(words, nextIdx);
        setTimeout(() => speak(words[nextIdx].word, appMode), 400);
      } else {
        setMode('finished');
      }
    }, 1200);
  };

  // Loading 畫面
  if (mode === 'loading') {
    return (
      <div className="game-card p-10 flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <BookOpen size={60} className="text-game-pink" />
        </motion.div>
      </div>
    );
  }

  // 沒有錯題（勵志訊息）
  if (mode === 'empty') {
    return (
      <motion.div
        className="game-card border-game-green/30 border-t-8 border-t-game-green p-6 sm:p-10 w-full max-w-xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy size={80} className="mx-auto text-game-star mb-4 drop-shadow-md" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-3">太厲害了！🎉</h2>
        <p className="text-lg text-muted-foreground mb-6">
          你目前沒有錯過的字喔～<br />
          繼續挑戰其他遊戲，答錯的字會自動收進來！
        </p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gradient-to-r from-game-orange to-game-pink text-white rounded-2xl font-bold shadow-lg flex items-center gap-2 mx-auto"
        >
          <Home size={20} /> 回首頁
        </button>
      </motion.div>
    );
  }

  // 完成結算
  if (mode === 'finished') {
    return (
      <motion.div
        className="game-card border-game-pink/30 border-t-8 border-t-game-pink p-6 sm:p-10 w-full max-w-xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 1 }}
        >
          <Sparkles size={80} className="mx-auto text-game-star mb-4 drop-shadow-md" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-3">複習完成！💪</h2>
        <div className="space-y-3 mb-6 text-lg">
          <p className="text-muted-foreground">答對 <span className="text-game-green font-bold text-2xl">{score}</span> / {words.length} 題</p>
          <p className="text-muted-foreground">獲得星星 <span className="text-game-star font-bold text-2xl">+{starsEarned}</span> ⭐</p>
          {masteredWords.length > 0 && (
            <div className="bg-game-green/10 border-2 border-game-green/30 rounded-2xl p-4 text-left">
              <p className="font-bold text-game-green mb-2">🏆 精通的字：</p>
              <div className="flex flex-wrap gap-2">
                {masteredWords.map(w => (
                  <span key={w} className="bg-white px-3 py-1 rounded-full text-sm font-semibold">{w}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">連對 3 次就會從錯題本畢業！</p>
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={loadWords}
            className="px-6 py-3 bg-game-blue text-white rounded-2xl font-bold shadow-lg flex items-center gap-2"
          >
            <RotateCcw size={20} /> 再來一次
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-muted text-foreground rounded-2xl font-bold shadow-lg flex items-center gap-2"
          >
            <Home size={20} /> 回首頁
          </button>
        </div>
      </motion.div>
    );
  }

  // 遊玩中
  const currentWord = words[currentIdx];
  if (!currentWord) return null;

  return (
    <motion.div
      className="game-card border-game-pink/30 border-t-8 border-t-game-pink p-6 sm:p-10 relative overflow-hidden w-full max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 答對全屏特效 */}
      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div
            className="absolute inset-0 bg-game-green/10 z-10 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CheckCircle size={140} className="text-game-green animate-bounce drop-shadow-lg" />
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div
            className="absolute inset-0 bg-destructive/10 z-10 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <XCircle size={140} className="text-destructive animate-ping drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6">
        <span className="text-muted-foreground font-semibold flex items-center gap-2">
          <BookOpen size={18} className="text-game-pink" /> 弱點複習 {currentIdx + 1} / {words.length}
        </span>
        <span className="bg-game-amber-light text-game-amber px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
          ⭐ +{starsEarned} (3 倍)
        </span>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-3">聽聽看是哪個字？</p>
        <motion.button
          onClick={() => speak(currentWord.word, appMode)}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-game-orange to-game-pink text-white shadow-xl flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <Volume2 size={40} />
        </motion.button>
        {currentWord.chinese && (
          <p className="text-sm text-muted-foreground mt-4">提示：{currentWord.chinese}</p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          這個字之前錯過 {currentWord.wrong_count} 次，加油！
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id + '-' + i}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
            className={`p-4 rounded-2xl font-bold text-lg border-2 transition-all ${
              feedback === 'correct' && opt.id === currentWord.id
                ? 'bg-game-green text-white border-game-green'
                : feedback === 'wrong' && opt.id === currentWord.id
                ? 'bg-game-green/20 border-game-green text-game-green'
                : 'bg-white border-border hover:border-game-pink'
            }`}
            whileTap={{ scale: feedback ? 1 : 0.95 }}
          >
            {opt.word}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default WrongWordsReview;
