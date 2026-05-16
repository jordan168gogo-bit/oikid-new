import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, Volume2, RefreshCw, BookMarked, CheckCircle, XCircle, AlertCircle,
  ChevronRight, Flame, GraduationCap, BookOpen, Zap, Sparkles, Sprout,
} from 'lucide-react';
import { speak as speakUtil, fetchGeminiJSON } from '@/lib/game-utils';

interface ReadingComprehensionProps {
  appMode: string;
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer?: () => void;
}

interface Passage {
  title: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

const DIFFICULTY_LEVELS = [
  { label: '初級', desc: '簡單短句 (30-50 字)', level: 'beginner', icon: Sprout, accent: 'emerald' as const },
  { label: '中級', desc: '短文故事 (60-100 字)', level: 'intermediate', icon: BookOpen, accent: 'indigo' as const },
  { label: '高級', desc: '長篇理解 (100-150 字)', level: 'advanced', icon: GraduationCap, accent: 'fuchsia' as const },
];

const ReadingComprehension = ({ appMode, onEarnStars, onCorrectAnswer, onWrongAnswer }: ReadingComprehensionProps) => {
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const showAlert = () => {};

  const generatePassage = async (level: string) => {
    setLoading(true);
    setDifficulty(level);
    setPassage(null);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setError(null);

    const wordCount = level === 'beginner' ? '30-50' : level === 'intermediate' ? '60-100' : '100-150';
    const complexity = level === 'beginner' ? '非常簡單的句子，適合初學者' : level === 'intermediate' ? '稍微複雜的故事，有一些連接詞' : '較長的故事或說明文，有多個段落';
    const qCount = level === 'beginner' ? 2 : level === 'intermediate' ? 3 : 4;

    try {
      const result = await fetchGeminiJSON(
        `你是一位兒童英語老師。請生成一篇適合 8-12 歲兒童的英文短文閱讀測驗。

要求：
- 字數：${wordCount} 個英文單字
- 難度：${complexity}
- 主題：從以下隨機選一個：動物、學校生活、家庭、運動、節日、太空、海洋、科學、旅行、食物
- 產生 ${qCount} 個閱讀理解選擇題（每題 4 個選項）
- 題目要測試理解力，不只是找答案

請用 JSON 回傳。`,
        {
          title: { type: "STRING", description: "短文標題" },
          text: { type: "STRING", description: "英文短文內容" },
          questions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: { type: "STRING", description: "英文問題" },
                options: { type: "ARRAY", items: { type: "STRING" } },
                correctIndex: { type: "STRING", description: "正確答案的索引（0-3）" },
              }
            }
          }
        },
        showAlert
      );

      if (result?.text && result?.questions && Array.isArray(result.questions) && result.questions.length > 0) {
        setPassage({
          title: result.title || 'Reading Time!',
          text: result.text,
          questions: result.questions.map((q: any) => ({
            question: q.question,
            options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
            correctIndex: parseInt(q.correctIndex) || 0,
          })),
        });
      } else {
        setError('AI 老師暫時想不出題目，請稍後再試一次 🙏');
      }
    } catch (e) {
      setError('連線到 AI 老師時出了點問題，請檢查網路後重試。');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (optIdx: number) => {
    if (selected !== null || !passage) return;
    setSelected(optIdx);
    const isCorrect = optIdx === passage.questions[currentQ].correctIndex;
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

  const nextQuestion = () => {
    if (!passage) return;
    setSelected(null);
    if (currentQ + 1 < passage.questions.length) {
      setCurrentQ(prev => prev + 1);
    } else {
      setFinished(true);
      setTotalAttempts(prev => prev + 1);
      onEarnStars(1);
    }
  };

  // ===== Difficulty selection =====
  if (!difficulty) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-6 rounded-2xl shadow-2xl ring-1 ring-slate-800 space-y-5">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <BookMarked className="text-indigo-400" size={18} />
            </div>
            <div className="text-left">
              <h2 className="text-base font-bold text-slate-100 leading-tight">閱讀理解</h2>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">AI Generated · Advanced</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-3">AI 即時出題，挑戰你的英文理解力</p>
        </div>

        <div className="space-y-3">
          {DIFFICULTY_LEVELS.map(d => {
            const Icon = d.icon;
            const accentRing = d.accent === 'emerald' ? 'ring-emerald-500/30 hover:ring-emerald-400/60'
              : d.accent === 'indigo' ? 'ring-indigo-500/30 hover:ring-indigo-400/60'
              : 'ring-fuchsia-500/30 hover:ring-fuchsia-400/60';
            const accentText = d.accent === 'emerald' ? 'text-emerald-400'
              : d.accent === 'indigo' ? 'text-indigo-400'
              : 'text-fuchsia-400';
            return (
              <motion.button
                key={d.level}
                onClick={() => generatePassage(d.level)}
                className={`w-full bg-slate-900 ring-1 ${accentRing} rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-slate-800/60 text-left`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-2.5 rounded-lg bg-slate-800/80">
                  <Icon size={22} className={accentText} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-100">{d.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
                </div>
                <ChevronRight size={18} className="text-slate-500" />
              </motion.button>
            );
          })}
        </div>

        {totalAttempts > 0 && (
          <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-1">
            <Sparkles size={12} className="text-amber-400" />
            已完成 <span className="text-slate-200 font-mono font-bold">{totalAttempts}</span> 篇閱讀練習
          </p>
        )}
      </div>
    );
  }

  // ===== Loading =====
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-12 rounded-2xl shadow-2xl ring-1 ring-slate-800 text-center space-y-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Loader2 size={42} className="text-indigo-400 mx-auto" />
        </motion.div>
        <p className="text-base font-bold text-slate-100">AI 老師正在出題</p>
        <p className="text-xs tracking-widest text-slate-500 uppercase">Generating passage...</p>
      </div>
    );
  }

  // ===== Error =====
  if (error && difficulty) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-10 rounded-2xl shadow-2xl ring-1 ring-slate-800 text-center space-y-5">
        <AlertCircle size={42} className="text-amber-400 mx-auto" />
        <div>
          <p className="text-base font-bold text-slate-100 mb-2">出題失敗</p>
          <p className="text-sm text-slate-400 px-4">{error}</p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <motion.button
            onClick={() => generatePassage(difficulty)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg text-sm flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={14} /> 重試
          </motion.button>
          <motion.button
            onClick={() => { setDifficulty(null); setError(null); }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-sm transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            換難度
          </motion.button>
        </div>
      </div>
    );
  }

  // ===== Finished =====
  if (finished && passage) {
    const accuracy = Math.round((score / passage.questions.length) * 100);
    const ResultIcon = accuracy >= 80 ? GraduationCap : accuracy >= 50 ? BookOpen : Zap;
    const resultTone = accuracy >= 80 ? 'text-emerald-400' : accuracy >= 50 ? 'text-indigo-400' : 'text-amber-400';
    const resultLabel = accuracy >= 80 ? '優異' : accuracy >= 50 ? '及格' : '需加強';
    return (
      <motion.div className="w-full max-w-md mx-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
          <div className="mb-5 flex justify-center">
            <div className="p-4 rounded-full bg-slate-800/60 ring-1 ring-slate-700">
              <ResultIcon size={48} className={resultTone} />
            </div>
          </div>
          <p className="text-xs tracking-[0.3em] text-slate-500 mb-2">RESULT · {resultLabel.toUpperCase()}</p>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">閱讀測驗完成</h2>
          <p className="text-xs text-slate-400 mb-6">{passage.questions.length} 題理解測驗</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
              <p className="text-xs text-slate-500">正確率</p>
              <p className={`text-2xl font-bold ${resultTone}`}>{accuracy}%</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
              <p className="text-xs text-slate-500">答對</p>
              <p className="text-2xl font-bold text-slate-100">{score}<span className="text-sm text-slate-500">/{passage.questions.length}</span></p>
            </div>
            <div className="bg-slate-800/50 rounded-xl py-3 border border-slate-800">
              <p className="text-xs text-slate-500">最高連勝</p>
              <p className="text-2xl font-bold text-amber-400">{bestStreak}</p>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <motion.button
              onClick={() => generatePassage(difficulty!)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} /> 換一篇
            </motion.button>
            <motion.button
              onClick={() => setDifficulty(null)}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-sm transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              換難度
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!passage) return null;
  const q = passage.questions[currentQ];

  // ===== In-game (dark academic theme) =====
  return (
    <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-5 rounded-2xl shadow-2xl ring-1 ring-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
            <BookMarked className="text-indigo-400" size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 leading-tight">閱讀理解</h2>
            <p className="text-[10px] tracking-widest text-slate-500 uppercase">Reading · {difficulty}</p>
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

      {/* Passage card */}
      <motion.div className="bg-slate-900 border border-slate-800 rounded-xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs tracking-widest uppercase font-bold text-indigo-300">{passage.title}</p>
          <motion.button
            onClick={() => speakUtil(passage.text, appMode, undefined, 'sentence' as any)}
            className="p-1.5 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 rounded-full ring-1 ring-indigo-500/30 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Volume2 size={14} />
          </motion.button>
        </div>
        <p className="text-base text-slate-200 leading-relaxed whitespace-pre-wrap">{passage.text}</p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full"
            animate={{ width: `${(currentQ / passage.questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-slate-300 tabular-nums">Q{currentQ + 1}/{passage.questions.length}</span>
      </div>

      {/* Question card */}
      <motion.div
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4"
        key={currentQ}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-base font-semibold text-slate-100 leading-relaxed">{q.question}</p>

        <div className="grid grid-cols-1 gap-2.5">
          {q.options.map((opt, i) => {
            let style = 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-100';
            if (selected !== null) {
              if (i === q.correctIndex) style = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200';
              else if (i === selected) style = 'bg-rose-500/15 border-rose-500/60 text-rose-200';
              else style = 'bg-slate-800/30 border-slate-800 text-slate-500';
            }
            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full p-3 rounded-lg border font-medium text-left transition-colors flex items-center gap-3 ${style}`}
                whileTap={selected === null ? { scale: 0.985 } : undefined}
              >
                <span className="text-xs font-mono font-bold text-slate-500 w-5 flex-shrink-0">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1 text-sm">{opt}</span>
                {selected !== null && i === q.correctIndex && <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />}
                {selected === i && i !== q.correctIndex && <XCircle size={16} className="text-rose-400 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.button
            onClick={nextQuestion}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.97 }}
          >
            {currentQ + 1 < passage.questions.length ? <>下一題 <ChevronRight size={18} /></> : <>看結果 <ChevronRight size={18} /></>}
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
};

export default ReadingComprehension;
