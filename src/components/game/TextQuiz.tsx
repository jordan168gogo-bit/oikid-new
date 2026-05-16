import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, Volume2, Gamepad2, Target, Flame, Crown } from 'lucide-react';
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

  if (quizFinished) {
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
