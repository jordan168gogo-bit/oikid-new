import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Star, RotateCcw, FileText, ChevronRight } from 'lucide-react';
import { CLOZE_BANK, ClozePassage } from '@/data/cloze-passages';

interface ClozeTestProps {
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

const ClozeTest = ({ onEarnStars, onCorrectAnswer, onWrongAnswer }: ClozeTestProps) => {
  const [difficulty, setDifficulty] = useState<'beginner' | 'advanced' | null>(null);
  const [passage, setPassage] = useState<ClozePassage | null>(null);
  const [currentBlank, setCurrentBlank] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passageCount, setPassageCount] = useState(0);
  const TOTAL_PASSAGES = 3;

  const startWithDifficulty = (diff: 'beginner' | 'advanced') => {
    setDifficulty(diff);
    pickPassage(diff);
  };

  const pickPassage = (diff: 'beginner' | 'advanced') => {
    const pool = CLOZE_BANK.filter(p => p.difficulty === diff);
    const p = pool[Math.floor(Math.random() * pool.length)];
    setPassage(p);
    setCurrentBlank(0);
    setAnswers(new Array(p.blanks.length).fill(null));
    setSelected(null);
    setShowExplanation(false);
  };

  const handleSelect = (optIndex: number) => {
    if (selected !== null) return;
    setSelected(optIndex);
    setShowExplanation(true);
    const blank = passage!.blanks[currentBlank];
    const isCorrect = optIndex === blank.correctIndex;
    const newAnswers = [...answers];
    newAnswers[currentBlank] = optIndex;
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore(prev => prev + 1);
      onCorrectAnswer();
    } else {
      onWrongAnswer?.();
    }
  };

  const nextBlank = () => {
    setSelected(null);
    setShowExplanation(false);
    if (currentBlank + 1 < passage!.blanks.length) {
      setCurrentBlank(prev => prev + 1);
    } else {
      const newCount = passageCount + 1;
      setPassageCount(newCount);
      if (newCount >= TOTAL_PASSAGES) {
        setFinished(true);
        onEarnStars(1);
      } else {
        pickPassage(difficulty!);
      }
    }
  };

  const restart = () => {
    setDifficulty(null);
    setPassage(null);
    setScore(0);
    setFinished(false);
    setPassageCount(0);
  };

  // Render passage with highlighted blanks
  const renderPassage = () => {
    if (!passage) return null;
    const parts = passage.passage.split(/__((\d+))__/);
    return (
      <p className="text-base leading-relaxed text-foreground">
        {parts.map((part, i) => {
          if (i % 3 === 1) {
            const blankIdx = parseInt(part) - 1;
            const answer = answers[blankIdx];
            const blank = passage.blanks[blankIdx];
            const isCurrent = blankIdx === currentBlank;
            if (answer !== null) {
              const isCorrect = answer === blank.correctIndex;
              return (
                <span key={i} className={`font-bold px-1 rounded ${isCorrect ? 'text-game-green bg-game-green/10' : 'text-destructive bg-destructive/10 line-through'}`}>
                  {blank.options[answer]}
                </span>
              );
            }
            return (
              <span key={i} className={`inline-block px-3 border-b-2 font-bold ${isCurrent ? 'border-game-purple text-game-purple' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                ({blankIdx + 1})
              </span>
            );
          }
          if (i % 3 === 2) return null;
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  // Difficulty selection
  if (!difficulty) {
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-blue">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">克漏字測驗</h2>
          <p className="text-muted-foreground mb-6">閱讀短文，選出正確答案填入空格！</p>
          <div className="space-y-3">
            <motion.button
              onClick={() => startWithDifficulty('beginner')}
              className="w-full py-4 bg-gradient-to-r from-game-green to-emerald-400 text-white font-bold rounded-2xl text-lg shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              🌱 初級（基礎文法）
            </motion.button>
            <motion.button
              onClick={() => startWithDifficulty('advanced')}
              className="w-full py-4 bg-gradient-to-r from-game-purple to-game-blue text-white font-bold rounded-2xl text-lg shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              🔥 進階（會考題型）
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Finished
  if (finished) {
    const totalBlanks = TOTAL_PASSAGES * 4;
    const accuracy = Math.round((score / totalBlanks) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-blue">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: 2 }}>
            {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '📚' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">克漏字測驗完成！</h2>
          <p className="text-lg text-muted-foreground mb-4">
            答對 <span className="text-game-green font-bold">{score}</span> / {totalBlanks} 題
          </p>
          <div className="text-3xl font-bold text-game-blue mb-6">{accuracy}%</div>
          <motion.button onClick={restart} className="px-8 py-3 bg-gradient-to-r from-game-blue to-game-purple text-white font-bold rounded-2xl shadow-lg text-lg" whileTap={{ scale: 0.95 }}>
            <RotateCcw size={20} className="inline mr-2" /> 再挑戰一次
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!passage) return null;
  const blank = passage.blanks[currentBlank];

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="text-game-blue" size={24} /> 克漏字測驗
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {difficulty === 'beginner' ? '🌱 初級' : '🔥 進階'} — 第 {passageCount + 1}/{TOTAL_PASSAGES} 篇
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-game-blue to-game-purple rounded-full"
            animate={{ width: `${((passageCount * 4 + currentBlank) / (TOTAL_PASSAGES * 4)) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{passageCount * 4 + currentBlank + 1}/{TOTAL_PASSAGES * 4}</span>
      </div>

      <motion.div
        className="game-card p-6 border-t-8 border-t-game-blue space-y-5"
        key={`${passage.id}-${currentBlank}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Title */}
        <div className="text-center">
          <span className="text-xs bg-game-blue/10 text-game-blue px-3 py-1 rounded-full font-bold border border-game-blue/20">
            {passage.title}
          </span>
        </div>

        {/* Passage */}
        <div className="bg-muted/30 p-4 rounded-xl border border-border">
          {renderPassage()}
        </div>

        {/* Current blank question */}
        <p className="text-center text-lg font-bold text-foreground">
          第 ({currentBlank + 1}) 格應填入？
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {blank.options.map((opt, i) => {
            let style = 'bg-muted/50 border-border hover:bg-muted text-foreground';
            if (selected !== null) {
              if (i === blank.correctIndex) style = 'bg-game-green/10 border-game-green text-game-green';
              else if (i === selected && i !== blank.correctIndex) style = 'bg-destructive/10 border-destructive text-destructive';
              else style = 'bg-muted/30 border-border/50 text-muted-foreground';
            }
            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`p-3 rounded-xl border-2 font-bold text-center transition-colors ${style}`}
                whileTap={selected === null ? { scale: 0.97 } : undefined}
              >
                <span className="mr-1 text-muted-foreground text-sm">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {selected !== null && i === blank.correctIndex && <CheckCircle size={16} className="inline ml-1" />}
                {selected === i && i !== blank.correctIndex && <XCircle size={16} className="inline ml-1" />}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className="bg-game-blue/5 border border-game-blue/20 p-4 rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p className="text-sm font-bold text-game-blue mb-1">📖 解析：</p>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{blank.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next */}
        {selected !== null && (
          <motion.button
            onClick={nextBlank}
            className="w-full py-3 bg-gradient-to-r from-game-blue to-game-purple text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentBlank + 1 < passage.blanks.length ? <><ChevronRight size={20} /> 下一格</> :
              passageCount + 1 < TOTAL_PASSAGES ? '📄 下一篇' : '🎉 看結果'}
          </motion.button>
        )}
      </motion.div>

      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Star size={14} className="text-game-star" fill="currentColor" /> 目前答對：{score} 題
      </div>
    </div>
  );
};

export default ClozeTest;
