import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Volume2, Star, RefreshCw, BookMarked, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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
  { label: '初級', emoji: '🌱', desc: '簡單短句', level: 'beginner' },
  { label: '中級', emoji: '📗', desc: '短文故事', level: 'intermediate' },
  { label: '高級', emoji: '🔥', desc: '長篇理解', level: 'advanced' },
];

const ReadingComprehension = ({ appMode, onEarnStars, onCorrectAnswer, onWrongAnswer }: ReadingComprehensionProps) => {
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
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
      onCorrectAnswer();
      // No per-correct star reward
    } else {
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

  // Difficulty selection
  if (!difficulty) {
    return (
      <div className="w-full max-w-md mx-auto space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <BookMarked className="text-game-pink" size={24} /> 閱讀理解
          </h2>
          <p className="text-sm text-muted-foreground mt-1">AI 出題，挑戰你的英文理解力！</p>
        </div>

        <div className="space-y-3">
          {DIFFICULTY_LEVELS.map(d => (
            <motion.button
              key={d.level}
              onClick={() => generatePassage(d.level)}
              className="w-full game-card p-5 flex items-center gap-4 border-l-4 border-l-game-pink hover:bg-game-pink/5 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-4xl">{d.emoji}</span>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">{d.label}</p>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {totalAttempts > 0 && (
          <p className="text-center text-sm text-muted-foreground">
            已完成 {totalAttempts} 篇閱讀練習 📚
          </p>
        )}
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 space-y-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Loader2 size={48} className="text-game-pink mx-auto" />
        </motion.div>
        <p className="text-lg font-bold text-foreground">AI 老師正在出題中...</p>
        <p className="text-sm text-muted-foreground">正在為你生成閱讀短文 📖</p>
      </div>
    );
  }

  // Error (AI fail / network fail / malformed response)
  if (error && difficulty) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12 space-y-5">
        <AlertCircle size={48} className="text-game-amber mx-auto" />
        <div>
          <p className="text-lg font-bold text-foreground mb-2">出題失敗了 😅</p>
          <p className="text-sm text-muted-foreground px-4">{error}</p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <motion.button
            onClick={() => generatePassage(difficulty)}
            className="px-6 py-3 bg-gradient-to-r from-game-pink to-game-purple text-white font-bold rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} className="inline mr-2" /> 重試
          </motion.button>
          <motion.button
            onClick={() => { setDifficulty(null); setError(null); }}
            className="px-6 py-3 bg-muted text-foreground font-bold rounded-2xl"
            whileTap={{ scale: 0.95 }}
          >
            換難度
          </motion.button>
        </div>
      </div>
    );
  }

  // Finished
  if (finished && passage) {
    const accuracy = Math.round((score / passage.questions.length) * 100);
    return (
      <motion.div className="w-full max-w-md mx-auto text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="game-card p-8 border-t-8 border-t-game-pink">
          <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: 2 }}>
            {accuracy >= 80 ? '🌟' : accuracy >= 50 ? '📖' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">閱讀測驗完成！</h2>
          <p className="text-lg text-muted-foreground mb-4">
            答對 <span className="text-game-green font-bold">{score}</span> / {passage.questions.length} 題
          </p>
          <div className="text-3xl font-bold text-game-pink mb-6">{accuracy}%</div>
          <div className="flex gap-3 justify-center">
            <motion.button onClick={() => generatePassage(difficulty)} className="px-6 py-3 bg-gradient-to-r from-game-pink to-game-purple text-white font-bold rounded-2xl shadow-lg" whileTap={{ scale: 0.95 }}>
              <RefreshCw size={18} className="inline mr-2" /> 換一篇
            </motion.button>
            <motion.button onClick={() => setDifficulty(null)} className="px-6 py-3 bg-muted text-foreground font-bold rounded-2xl" whileTap={{ scale: 0.95 }}>
              換難度
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!passage) return null;

  const q = passage.questions[currentQ];

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <BookMarked className="text-game-pink" size={24} /> 閱讀理解
        </h2>
      </div>

      {/* Passage */}
      <motion.div className="game-card p-5 border-t-8 border-t-game-pink" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">📖 {passage.title}</h3>
          <motion.button
            onClick={() => speakUtil(passage.text, appMode, undefined, 'sentence' as any)}
            className="p-2 bg-game-pink/10 text-game-pink rounded-full"
            whileTap={{ scale: 0.9 }}
          >
            <Volume2 size={18} />
          </motion.button>
        </div>
        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{passage.text}</p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-game-pink to-game-purple rounded-full"
            animate={{ width: `${((currentQ) / passage.questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">Q{currentQ + 1}/{passage.questions.length}</span>
      </div>

      {/* Question */}
      <motion.div
        className="game-card p-5 space-y-4"
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="text-base font-bold text-foreground">{q.question}</p>

        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt, i) => {
            let style = 'bg-muted/50 border-border hover:bg-muted text-foreground';
            if (selected !== null) {
              if (i === q.correctIndex) style = 'bg-game-green/10 border-game-green text-game-green';
              else if (i === selected) style = 'bg-destructive/10 border-destructive text-destructive';
              else style = 'bg-muted/30 border-border/50 text-muted-foreground';
            }
            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full p-3 rounded-xl border-2 font-medium text-left transition-colors ${style}`}
                whileTap={selected === null ? { scale: 0.97 } : undefined}
              >
                <span className="mr-2 font-bold text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {selected !== null && i === q.correctIndex && <CheckCircle size={16} className="inline ml-2" />}
                {selected === i && i !== q.correctIndex && <XCircle size={16} className="inline ml-2" />}
              </motion.button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.button
            onClick={nextQuestion}
            className="w-full py-3 bg-gradient-to-r from-game-pink to-game-purple text-white font-bold rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQ + 1 < passage.questions.length ? '下一題 ➡️' : '🎉 看結果'}
          </motion.button>
        )}
      </motion.div>

      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Star size={14} className="text-game-star" fill="currentColor" /> 目前答對：{score} 題
      </div>
    </div>
  );
};

export default ReadingComprehension;
