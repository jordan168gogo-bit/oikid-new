import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Volume2, Star, RefreshCw, PenTool, CheckCircle, Lightbulb, Target, Award } from 'lucide-react';
import { speak as speakUtil, fetchGeminiJSON } from '@/lib/game-utils';

interface VocabWord {
  id: string;
  english: string;
  chinese: string;
  emoji?: string;
}

interface SentenceBuilderProps {
  vocabList: VocabWord[];
  appMode: string;
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
}

interface FeedbackResult {
  score: number;
  correction: string;
  suggestion: string;
  encouragement: string;
}

const SentenceBuilder = ({ vocabList, appMode, onEarnStars, onCorrectAnswer }: SentenceBuilderProps) => {
  const [targetWord, setTargetWord] = useState<VocabWord | null>(null);
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [history, setHistory] = useState<{ word: string; sentence: string; score: number }[]>([]);

  const isAdvanced = appMode === 'classic';

  const pickWord = () => {
    const word = vocabList[Math.floor(Math.random() * vocabList.length)];
    setTargetWord(word);
    setSentence('');
    setFeedback(null);
  };

  useState(() => { if (vocabList.length > 0) pickWord(); });

  const showAlert = (msg: string) => { /* no-op for AI calls */ };

  const handleSubmit = async () => {
    if (!targetWord || !sentence.trim() || loading) return;
    setLoading(true);
    try {
      const result = await fetchGeminiJSON(
        `你是一位親切的兒童英語老師。一個 8-12 歲的學生用英文單字「${targetWord.english}」（意思：${targetWord.chinese}）造了一個句子：「${sentence}」

請評分（1-10分）並給予回饋：
1. 文法是否正確
2. 單字使用是否恰當
3. 如果有錯誤，給出修正後的句子
4. 給出一個更好的範例句子
5. 用繁體中文給一句鼓勵的話

如果學生寫的不是英文句子，或是完全沒有使用到指定單字，請給 1-2 分。`,
        {
          score: { type: "STRING", description: "1-10 的分數" },
          correction: { type: "STRING", description: "修正後的正確句子（英文）" },
          suggestion: { type: "STRING", description: "一個更好的範例句子（英文）" },
          encouragement: { type: "STRING", description: "繁體中文鼓勵語" },
        },
        showAlert
      );

      if (result) {
        const score = Math.min(10, Math.max(1, parseInt(result.score) || 5));
        const fb: FeedbackResult = {
          score,
          correction: result.correction || sentence,
          suggestion: result.suggestion || '',
          encouragement: result.encouragement || '繼續加油！',
        };
        setFeedback(fb);
        setHistory(prev => [...prev, { word: targetWord.english, sentence, score }]);

        if (score >= 7) {
          onCorrectAnswer();
          onEarnStars(score >= 9 ? 2 : 1);
        } else if (score >= 4) {
          // No reward for low scores
        }
      }
    } catch (e) {
      // handled by fetchGeminiJSON
    } finally {
      setLoading(false);
    }
  };

  if (vocabList.length < 1) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-muted-foreground">單字庫需要至少 1 個單字！</p>
      </div>
    );
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 9) return '🌟';
    if (score >= 7) return '😊';
    if (score >= 5) return '👍';
    if (score >= 3) return '💪';
    return '📝';
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-game-green';
    if (score >= 4) return 'text-game-amber';
    return 'text-game-orange';
  };

  // ===== Advanced (academic dark theme) =====
  if (isAdvanced) {
    const scoreTone = (s: number) =>
      s >= 8 ? 'text-emerald-400' : s >= 5 ? 'text-indigo-400' : 'text-amber-400';
    const scoreBarTone = (s: number) =>
      s >= 8 ? 'from-emerald-500 to-emerald-400' : s >= 5 ? 'from-indigo-500 to-purple-500' : 'from-amber-500 to-orange-500';

    return (
      <div className="w-full max-w-md mx-auto bg-slate-950 -mx-2 px-4 py-5 rounded-2xl shadow-2xl ring-1 ring-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <PenTool className="text-indigo-400" size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-tight">AI 造句練習</h2>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">Writing · AI Grader</p>
            </div>
          </div>
          {history.length > 0 && (
            <span className="text-xs font-mono font-bold text-slate-400 tabular-nums bg-slate-800/60 ring-1 ring-slate-700 px-2.5 py-1 rounded-full">
              <Award size={12} className="inline mr-1 text-amber-400 -mt-0.5" />
              {history.length} 題
            </span>
          )}
        </div>

        {targetWord && (
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs tracking-widest text-slate-500 uppercase text-center">Target Word</p>

            <div className="flex items-center justify-center gap-3">
              <div>
                <p className="text-3xl font-bold text-slate-100 text-center">{targetWord.english}</p>
                <p className="text-sm text-slate-400 text-center mt-1">{targetWord.chinese}</p>
              </div>
              <motion.button
                onClick={() => speakUtil(targetWord.english, appMode)}
                className="p-2 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 rounded-full ring-1 ring-indigo-500/30 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Volume2 size={18} />
              </motion.button>
            </div>

            <div className="space-y-3">
              <textarea
                value={sentence}
                onChange={e => setSentence(e.target.value)}
                placeholder="Type your English sentence..."
                className="w-full p-3.5 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 bg-slate-800/50 text-slate-100 placeholder:text-slate-500 outline-none resize-none h-24 transition-colors text-base"
                disabled={loading || !!feedback}
              />

              {!feedback && (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!sentence.trim() || loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> AI 批改中...</> : <><Send size={18} /> 送出批改</>}
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  className="space-y-4 text-left"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Score */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-end justify-between mb-2">
                      <p className="text-xs tracking-widest text-slate-500 uppercase">Score</p>
                      <p className={`text-3xl font-bold ${scoreTone(feedback.score)} tabular-nums`}>
                        {feedback.score}<span className="text-base text-slate-500">/10</span>
                      </p>
                    </div>
                    <div className="bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${scoreBarTone(feedback.score)} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${feedback.score * 10}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Correction */}
                  <div className="bg-slate-800/40 border-l-2 border-emerald-500 pl-4 pr-3 py-3 rounded-r-lg">
                    <p className="text-xs font-bold text-emerald-300 mb-1.5 flex items-center gap-1.5 tracking-wider uppercase">
                      <CheckCircle size={12} /> 修正後句子
                    </p>
                    <p className="text-sm text-slate-100 leading-relaxed">{feedback.correction}</p>
                    <motion.button
                      onClick={() => speakUtil(feedback.correction, appMode, undefined, 'sentence' as any)}
                      className="mt-2 text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Volume2 size={12} /> 聽發音
                    </motion.button>
                  </div>

                  {/* Suggestion */}
                  {feedback.suggestion && (
                    <div className="bg-slate-800/40 border-l-2 border-indigo-500 pl-4 pr-3 py-3 rounded-r-lg">
                      <p className="text-xs font-bold text-indigo-300 mb-1.5 flex items-center gap-1.5 tracking-wider uppercase">
                        <Lightbulb size={12} /> 更好的範例
                      </p>
                      <p className="text-sm text-slate-100 leading-relaxed">{feedback.suggestion}</p>
                      <motion.button
                        onClick={() => speakUtil(feedback.suggestion, appMode, undefined, 'sentence' as any)}
                        className="mt-2 text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        <Volume2 size={12} /> 聽發音
                      </motion.button>
                    </div>
                  )}

                  {/* Encouragement */}
                  <p className="text-center text-sm text-slate-400 italic">{feedback.encouragement}</p>

                  {/* Next */}
                  <motion.button
                    onClick={pickWord}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    <RefreshCw size={18} /> 換一個單字
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* History */}
        {history.length > 0 && (
          <motion.div className="bg-slate-900 border border-slate-800 rounded-xl p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-xs tracking-widest text-slate-500 uppercase mb-3 flex items-center gap-1.5">
              <Target size={12} className="text-indigo-400" /> 造句記錄
            </p>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {history.slice().reverse().map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-800">
                  <span className="font-mono font-bold text-slate-200">{h.word}</span>
                  <span className={`font-mono font-bold tabular-nums ${scoreTone(h.score)}`}>{h.score}/10</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // ===== Childish (toddler) — unchanged =====
  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <PenTool className="text-game-green" size={24} /> AI 造句練習
        </h2>
        <p className="text-sm text-muted-foreground mt-1">用指定單字造英文句子，AI 老師即時批改！</p>
      </div>

      {targetWord && (
        <motion.div
          className="game-card p-6 border-t-8 border-t-game-green text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-muted-foreground">請用這個單字造一個英文句子：</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{targetWord.emoji || '📝'}</span>
            <div>
              <p className="text-2xl font-bold text-foreground">{targetWord.english}</p>
              <p className="text-sm text-muted-foreground">{targetWord.chinese}</p>
            </div>
            <motion.button
              onClick={() => speakUtil(targetWord.english, appMode)}
              className="p-2 bg-game-green/10 text-game-green rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <Volume2 size={20} />
            </motion.button>
          </div>

          <div className="space-y-3">
            <textarea
              value={sentence}
              onChange={e => setSentence(e.target.value)}
              placeholder="Type your English sentence here..."
              className="w-full p-4 rounded-2xl border-2 border-border focus:border-game-green bg-background text-lg outline-none resize-none h-24 transition-colors"
              disabled={loading || !!feedback}
            />

            {!feedback && (
              <motion.button
                onClick={handleSubmit}
                disabled={!sentence.trim() || loading}
                className="w-full py-3 bg-gradient-to-r from-game-green to-game-blue text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                {loading ? <><Loader2 size={20} className="animate-spin" /> AI 批改中...</> : <><Send size={20} /> 送出批改</>}
              </motion.button>
            )}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className="space-y-4 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Score */}
                <div className="text-center">
                  <motion.div
                    className="text-5xl mb-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {getScoreEmoji(feedback.score)}
                  </motion.div>
                  <p className={`text-3xl font-bold ${getScoreColor(feedback.score)}`}>
                    {feedback.score}/10
                  </p>
                </div>

                {/* Correction */}
                <div className="bg-muted/50 p-4 rounded-xl space-y-2">
                  <p className="text-sm font-bold text-foreground">✏️ 修正後的句子：</p>
                  <p className="text-base text-foreground">{feedback.correction}</p>
                  <motion.button
                    onClick={() => speakUtil(feedback.correction, appMode, undefined, 'sentence' as any)}
                    className="text-sm text-game-green flex items-center gap-1"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Volume2 size={14} /> 聽發音
                  </motion.button>
                </div>

                {/* Suggestion */}
                {feedback.suggestion && (
                  <div className="bg-game-blue/5 p-4 rounded-xl space-y-2 border border-game-blue/20">
                    <p className="text-sm font-bold text-game-blue">💡 更好的範例：</p>
                    <p className="text-base text-foreground">{feedback.suggestion}</p>
                    <motion.button
                      onClick={() => speakUtil(feedback.suggestion, appMode, undefined, 'sentence' as any)}
                      className="text-sm text-game-blue flex items-center gap-1"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Volume2 size={14} /> 聽發音
                    </motion.button>
                  </div>
                )}

                {/* Encouragement */}
                <p className="text-center text-sm text-muted-foreground italic">{feedback.encouragement}</p>

                {/* Next */}
                <motion.button
                  onClick={pickWord}
                  className="w-full py-3 bg-gradient-to-r from-game-green to-game-blue text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={20} /> 換一個單字
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <motion.div className="game-card p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-bold text-foreground mb-2">📜 造句記錄</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {history.slice().reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded-xl">
                <span className="font-bold text-foreground">{h.word}</span>
                <span className={`font-bold ${getScoreColor(h.score)}`}>{h.score}/10 {getScoreEmoji(h.score)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stars earned */}
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Star size={14} className="text-game-star" fill="currentColor" /> 完成 {history.length} 題造句
      </div>
    </div>
  );
};

export default SentenceBuilder;
