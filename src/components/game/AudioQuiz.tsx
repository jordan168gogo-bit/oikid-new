import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { speak as speakFn } from '@/lib/game-utils';

interface AudioQuizProps {
  appMode: string;
  audioQuizPool: any[];
  audioQuizCurrentQ: number;
  audioQuizScore: number;
  audioQuizOptions: any[];
  audioQuizFinished: boolean;
  audioQuizFeedback: string | null;
  handleAudioQuizAnswer: (opt: any) => void;
  startAudioQuiz: () => void;
}

const AudioQuiz = ({
  appMode, audioQuizPool, audioQuizCurrentQ, audioQuizScore,
  audioQuizOptions, audioQuizFinished, audioQuizFeedback,
  handleAudioQuizAnswer, startAudioQuiz
}: AudioQuizProps) => {
  const speak = (text: string) => speakFn(text, appMode);

  if (audioQuizFinished) {
    return (
      <motion.div
        className="game-card border-game-blue/30 p-10 text-center border-t-8 border-t-game-blue w-full max-w-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">聽力大師！🎉</h2>
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Trophy size={80} className="mx-auto text-game-star mb-6 drop-shadow-md" />
        </motion.div>
        <p className="text-2xl text-muted-foreground font-semibold mb-8">
          獲得星星: <motion.span className="text-game-star font-bold text-5xl mx-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.5 }}>+{audioQuizScore * 2}</motion.span> ⭐
        </p>
        <motion.button
          onClick={startAudioQuiz}
          className="px-10 py-5 bg-game-blue text-white rounded-3xl font-bold text-xl hover:shadow-lg transition-all shadow-game-blue/30 w-full game-btn"
          whileTap={{ scale: 0.95 }}
        >
          再來一次！
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="game-card border-game-blue/30 p-6 sm:p-10 relative overflow-hidden border-t-8 border-t-game-blue w-full max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {audioQuizFeedback === 'correct' && (
        <motion.div className="absolute inset-0 bg-game-green/10 z-10 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <CheckCircle size={140} className="text-game-green animate-bounce drop-shadow-lg" />
        </motion.div>
      )}
      {audioQuizFeedback === 'wrong' && (
        <motion.div className="absolute inset-0 bg-destructive/10 z-10 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <XCircle size={140} className="text-destructive animate-ping drop-shadow-lg" />
        </motion.div>
      )}

      <div className="flex justify-between items-center mb-8">
        <span className="text-muted-foreground font-semibold text-lg">聽力題 {audioQuizCurrentQ + 1} / {audioQuizPool.length}</span>
        <span className="bg-game-amber-light text-game-amber px-4 py-2 rounded-full font-bold flex items-center gap-1">⭐ {audioQuizScore * 2}</span>
      </div>

      {/* Giant speaker button */}
      <div className="flex justify-center mb-10">
        <motion.button
          onClick={() => speak(audioQuizPool[audioQuizCurrentQ]?.english)}
          className="p-8 bg-game-blue-light border-4 border-game-blue/20 text-game-blue rounded-full hover:bg-game-blue/20 transition-all shadow-inner"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ boxShadow: ['0 0 0 0 hsla(220,80%,56%,0.3)', '0 0 0 15px hsla(220,80%,56%,0)', '0 0 0 0 hsla(220,80%,56%,0)'] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <Volume2 size={64} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* 4 Options */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {audioQuizOptions.map((opt, i) => (
          <motion.button
            key={i}
            disabled={audioQuizFeedback !== null}
            onClick={() => handleAudioQuizAnswer(opt)}
            className="aspect-square bg-muted/50 border-4 border-border rounded-3xl flex flex-col items-center justify-center hover:bg-game-blue-light hover:border-game-blue/30 transition-all p-2 shadow-sm"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-6xl sm:text-7xl mb-2 drop-shadow-sm">{opt.emoji}</span>
            <span className="text-xl sm:text-2xl font-bold text-foreground">{opt.chinese}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default AudioQuiz;
