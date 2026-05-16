import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RotateCcw, Sparkles, CheckCircle, GripVertical } from 'lucide-react';
import { speak as speakUtil, trackWrongWord } from '@/lib/game-utils';

interface VocabWord {
  id: string;
  english: string;
  chinese: string;
  emoji?: string;
}

interface DragMatchGameProps {
  vocabList: VocabWord[];
  appMode: string;
  userId?: string;
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const DragMatchGame = ({ vocabList, appMode, userId, onEarnStars, onCorrectAnswer, onWrongAnswer }: DragMatchGameProps) => {
  const ROUND_SIZE = 5;
  const TOTAL_ROUNDS = 4;

  const [allRounds, setAllRounds] = useState<VocabWord[][]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [emojiOrder, setEmojiOrder] = useState<VocabWord[]>([]);
  const [wordOrder, setWordOrder] = useState<VocabWord[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{ emoji: string; word: string } | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);

  const startGame = useCallback(() => {
    const filtered = vocabList.filter(w => w.emoji && w.emoji !== '✨');
    if (filtered.length < ROUND_SIZE) return;
    const picked = shuffleArray(filtered).slice(0, ROUND_SIZE * TOTAL_ROUNDS);
    const rounds: VocabWord[][] = [];
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const start = i * ROUND_SIZE;
      const end = start + ROUND_SIZE;
      if (end <= picked.length) rounds.push(picked.slice(start, end));
    }
    if (rounds.length === 0) rounds.push(picked.slice(0, ROUND_SIZE));
    setAllRounds(rounds);
    setRoundIndex(0);
    setScore(0);
    setFinished(false);
    setupRound(rounds[0]);
  }, [vocabList]);

  const setupRound = (words: VocabWord[]) => {
    setEmojiOrder(shuffleArray(words));
    setWordOrder(shuffleArray(words));
    setMatched(new Set());
    setSelectedEmoji(null);
    setWrongPair(null);
    setRoundComplete(false);
  };

  useEffect(() => { startGame(); }, []);

  const handleEmojiTap = (wordId: string) => {
    if (matched.has(wordId) || wrongPair) return;
    setSelectedEmoji(wordId === selectedEmoji ? null : wordId);
  };

  const handleWordTap = (wordId: string) => {
    if (!selectedEmoji || matched.has(wordId) || wrongPair) return;

    if (selectedEmoji === wordId) {
      // Correct match!
      const newMatched = new Set(matched);
      newMatched.add(wordId);
      setMatched(newMatched);
      setSelectedEmoji(null);
      setScore(prev => prev + 1);
      onCorrectAnswer();
      // No per-correct star reward
      
      const word = vocabList.find(w => w.id === wordId);
      if (word) speakUtil(word.english, appMode);

      if (newMatched.size === emojiOrder.length) {
        setRoundComplete(true);
        // Round bonus removed
        setTimeout(() => {
          if (roundIndex + 1 < allRounds.length) {
            const next = roundIndex + 1;
            setRoundIndex(next);
            setupRound(allRounds[next]);
          } else {
            setFinished(true);
            onEarnStars(1);
          }
        }, 1500);
      }
    } else {
      // Wrong match — 把使用者「沒認出」的那個字（emoji 對應的字）記到錯題本
      setWrongPair({ emoji: selectedEmoji, word: wordId });
      onWrongAnswer?.();
      if (userId) {
        const target = vocabList.find(w => w.id === selectedEmoji);
        if (target) {
          trackWrongWord({
            userId,
            word: target.english,
            chinese: target.chinese,
            appMode: appMode === 'toddler' ? 'toddler' : 'advanced',
            source: 'drag_match',
          });
        }
      }
      setTimeout(() => {
        setWrongPair(null);
        setSelectedEmoji(null);
      }, 800);
    }
  };

  const emojiWords = vocabList.filter(w => w.emoji && w.emoji !== '✨');
  if (emojiWords.length < ROUND_SIZE) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-muted-foreground">單字庫需要更多有圖示的單字才能玩配對遊戲！</p>
      </div>
    );
  }

  if (finished) {
    const total = allRounds.reduce((sum, r) => sum + r.length, 0);
    const accuracy = Math.round((score / total) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-green">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🏆' : '🌟'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">配對完成！</h2>
          <p className="text-lg text-muted-foreground mb-4">
            配對成功 <span className="text-game-green font-bold">{score}</span> 組
          </p>
          <motion.button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-game-green to-game-blue text-white font-bold rounded-2xl shadow-lg text-lg" whileTap={{ scale: 0.95 }}>
            <RotateCcw size={20} className="inline mr-2" /> 再玩一次！
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (emojiOrder.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="text-game-green" size={24} /> 圖文配對
        </h2>
        <p className="text-sm text-muted-foreground mt-1">點圖片，再點對應的英文單字！</p>
      </div>

      {/* Round progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground">第 {roundIndex + 1} / {allRounds.length} 關</span>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star size={14} className="text-game-star" fill="currentColor" /> {score} 組
        </div>
      </div>

      <div className="game-card p-4 sm:p-6 border-t-8 border-t-game-green space-y-6">
        {/* Round complete animation */}
        <AnimatePresence>
          {roundComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-lg font-bold text-game-green">全部配對成功！</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!roundComplete && (
          <>
            {/* Emoji row */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-semibold">👆 先點圖片</p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {emojiOrder.map(word => {
                  const isMatched = matched.has(word.id);
                  const isSelected = selectedEmoji === word.id;
                  const isWrongEmoji = wrongPair?.emoji === word.id;
                  return (
                    <motion.button
                      key={`e-${word.id}`}
                      onClick={() => handleEmojiTap(word.id)}
                      disabled={isMatched}
                      className={`aspect-square rounded-2xl text-4xl sm:text-5xl flex items-center justify-center border-2 transition-all ${
                        isMatched ? 'bg-game-green/10 border-game-green/30 opacity-50' :
                        isWrongEmoji ? 'bg-destructive/10 border-destructive animate-pulse' :
                        isSelected ? 'bg-game-orange/15 border-game-orange shadow-md scale-105' :
                        'bg-muted/30 border-border hover:border-game-orange/40 hover:bg-muted/50'
                      }`}
                      whileTap={!isMatched ? { scale: 0.9 } : {}}
                    >
                      {isMatched ? <CheckCircle className="text-game-green" size={28} /> : word.emoji}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Word row */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-semibold">👇 再點單字</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {wordOrder.map(word => {
                  const isMatched = matched.has(word.id);
                  const isWrongWord = wrongPair?.word === word.id;
                  return (
                    <motion.button
                      key={`w-${word.id}`}
                      onClick={() => handleWordTap(word.id)}
                      disabled={isMatched || !selectedEmoji}
                      className={`py-3 px-4 rounded-2xl font-bold text-base sm:text-lg border-2 transition-all ${
                        isMatched ? 'bg-game-green/10 border-game-green/30 text-game-green line-through opacity-50' :
                        isWrongWord ? 'bg-destructive/10 border-destructive text-destructive animate-pulse' :
                        !selectedEmoji ? 'bg-muted/20 border-border text-muted-foreground/50' :
                        'bg-card border-border text-foreground hover:border-game-green/40 hover:bg-game-green/5'
                      }`}
                      whileTap={!isMatched && selectedEmoji ? { scale: 0.95 } : {}}
                    >
                      {word.english}
                      <span className="block text-xs font-normal text-muted-foreground">{word.chinese}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DragMatchGame;
