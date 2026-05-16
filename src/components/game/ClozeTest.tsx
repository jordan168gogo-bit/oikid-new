import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, Star, RotateCcw, FileText, ChevronRight,
  Flame, GraduationCap, BookOpen, Zap, Lightbulb, Target,
} from 'lucide-react';
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passageCount, setPassageCount] = useState(0);
  const TOTAL_PASSAGES = 3;

  const isAdvanced = difficulty === 'advanced';

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
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setPassageCount(0);
  };

  // Render passage with highlighted blanks
  const renderPassage = (academic = false) => {
    if (!passage) return null;
    const parts = passage.passage.split(/__((\d+))__/);
    const baseText = academic ? 'text-slate-200' : 'text-foreground';
    const correctStyle = academic
      ? 'text-emerald-300 bg-emerald-500/15'
      : 'text-game-green bg-game-green/10';
    const wrongStyle = academic
      ? 'text-rose-300 bg-rose-500/15 line-through'
      : 'text-destructive bg-destructive/10 line-through';
    const currentBlankStyle = academic
      ? 'border-indigo-400 text-indigo-300'
      : 'border-game-purple text-game-purple';
    const idleBlankStyle = academic
      ? 'border-slate-600 text-slate-500'
      : 'border-muted-foreground/30 text-muted-foreground';
    return (
      <p className={`text-base leading-relaxed ${baseText}`}>
        {parts.map((part, i) => {
          if (i % 3 === 1) {
            const blankIdx = parseInt(part) - 1;
            const answer = answers[blankIdx];
            const blank = passage.blanks[blankIdx];
            const isCurrent = blankIdx === currentBlank;
            if (answer !== null) {
              const isCorrect = answer === blank.correctIndex;
              return (
                <span key={i} className={`font-bold px-1 rounded ${isCorrect ? correctStyle : wrongStyle}`}>
                  {blank.options[answer]}
                </span>
              );
            }
            return (
              <span key={i} className={`inline-block px-3 border-b-2 font-bold ${isCurrent ? currentBlankStyle : idleBlankStyle}`}>
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

  // ===== Difficulty selection (playful entry point — both modes visible) =====
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
              className="w-full py-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold rounded-2xl text-lg shadow-lg ring-1 ring-indigo-400/40"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Flame size={20} className="text-amber-300" /> 進階模式
              </span>
              <span className="block text-[10px] font-bold tracking-wider text-indigo-200 mt-2">會考題型 · 16 篇 · 深度解析</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ===== Finished =====
  if (finished) {
    const totalBlanks = TOTAL_PASSAGES * 4;
    const accuracy = Math.round((score / totalBlanks) * 100);

    if (isAdvanced) {
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
            <h2 className="text-2xl font-bold text-slate-100 mb-1">克漏字測驗完成</h2>
            <p className="text-xs text-slate-400 mb-5">進階模式 · {TOTAL_PASSAGES} 篇 · {totalBlanks} 題</p>

            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">正確率</p>
                <p className={`text-2xl font-bold ${resultTone}`}>{accuracy}%</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">答對</p>
                <p className="text-2xl font-bold text-slate-100">{score}<span className="text-sm text-slate-500">/{totalBlanks}</span></p>
              </div>
              <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
                <p className="text-xs text-slate-500">最高連勝</p>
                <p className="text-2xl font-bold text-amber-400">{bestStreak}</p>
              </div>
            </div>

            <motion.button onClick={restart} className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg text-base flex items-center justify-center gap-2" whileTap={{ scale: 0.95 }}>
              <RotateCcw size={18} /> 再挑戰一次
            </motion.button>
          </div>
        </motion.div>
      );
    }

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

  // ===== Advanced in-game (academic dark theme) =====
  if (isAdvanced) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-950 -mx-2 px-4 py-5 rounded-2xl shadow-2xl ring-1 ring-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <FileText className="text-indigo-400" size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-tight">克漏字測驗</h2>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">Cloze · Advanced</p>
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

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full"
              animate={{ width: `${((passageCount * 4 + currentBlank) / (TOTAL_PASSAGES * 4)) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 tabular-nums">
            {passageCount * 4 + currentBlank + 1}/{TOTAL_PASSAGES * 4}
          </span>
        </div>

        {/* Card */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5"
          key={`${passage.id}-${currentBlank}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Target size={12} className="text-indigo-400" />
              <span className="text-[11px] tracking-widest uppercase font-bold text-indigo-300">
                {passage.title}
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-slate-500">
              {passageCount + 1}/{TOTAL_PASSAGES} 篇
            </span>
          </div>

          {/* Passage */}
          <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
            {renderPassage(true)}
          </div>

          {/* Current blank prompt */}
          <p className="text-center text-sm text-slate-400">
            第 <span className="text-indigo-300 font-bold">({currentBlank + 1})</span> 格應填入
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2.5">
            {blank.options.map((opt, i) => {
              let style = 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-100';
              if (selected !== null) {
                if (i === blank.correctIndex) style = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200';
                else if (i === selected && i !== blank.correctIndex) style = 'bg-rose-500/15 border-rose-500/60 text-rose-200';
                else style = 'bg-slate-800/30 border-slate-800 text-slate-500';
              }
              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`p-3 rounded-lg border font-semibold text-center transition-colors flex items-center justify-center gap-1.5 ${style}`}
                  whileTap={selected === null ? { scale: 0.97 } : undefined}
                >
                  <span className="text-xs font-mono font-bold text-slate-500">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                  {selected !== null && i === blank.correctIndex && <CheckCircle size={14} className="text-emerald-400 ml-0.5" />}
                  {selected === i && i !== blank.correctIndex && <XCircle size={14} className="text-rose-400 ml-0.5" />}
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
                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{blank.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next */}
          {selected !== null && (
            <motion.button
              onClick={nextBlank}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              {currentBlank + 1 < passage.blanks.length
                ? <>下一格 <ChevronRight size={18} /></>
                : passageCount + 1 < TOTAL_PASSAGES
                  ? <>下一篇 <ChevronRight size={18} /></>
                  : <>看結果 <ChevronRight size={18} /></>}
            </motion.button>
          )}
        </motion.div>

        {/* Bottom stats */}
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

  // ===== Beginner in-game (childish — unchanged) =====
  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="text-game-blue" size={24} /> 克漏字測驗
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          🌱 初級 — 第 {passageCount + 1}/{TOTAL_PASSAGES} 篇
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
          {renderPassage(false)}
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
