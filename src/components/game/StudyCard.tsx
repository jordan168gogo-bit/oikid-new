import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Volume2, ChevronRight, ChevronLeft, RotateCcw, Search, ThumbsUp, ThumbsDown } from "lucide-react";
import { speak as speakFn, ALPHABET } from "@/lib/game-utils";

interface StudyCardProps {
  appMode: string;
  studyDeck: any[];
  currentIndex: number;
  isFlipped: boolean;
  setIsFlipped: (v: boolean) => void;
  currentLetterFilter: string;
  handleFilterChange: (letter: string) => void;
  shuffleStudyDeck: () => void;
  nextCard: () => void;
  prevCard: () => void;
  aiSentence?: any;
  aiLoadingSentence?: boolean;
  generateAISentence?: (word: string, e?: any) => void;
}

const SWIPE_THRESHOLD = 100;

const StudyCard = ({
  appMode,
  studyDeck,
  currentIndex,
  isFlipped,
  setIsFlipped,
  currentLetterFilter,
  handleFilterChange,
  shuffleStudyDeck,
  nextCard,
  prevCard,
}: StudyCardProps) => {
  const isToddler = appMode === "toddler";
  const speak = (text: string, e?: any) => speakFn(text, appMode, e);
  const currentWord = studyDeck[currentIndex];

  // Swipe state
  const [swipeResult, setSwipeResult] = useState<'learned' | 'notyet' | null>(null);
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [notyetIds, setNotyetIds] = useState<Set<string>>(new Set());
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const leftOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0]);
  const rightOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      // Right swipe = learned
      if (currentWord) {
        setLearnedIds(prev => new Set(prev).add(String(currentWord.id)));
        setNotyetIds(prev => { const s = new Set(prev); s.delete(String(currentWord.id)); return s; });
      }
      setSwipeResult('learned');
      setTimeout(() => { setSwipeResult(null); nextCard(); }, 400);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      // Left swipe = not yet
      if (currentWord) {
        setNotyetIds(prev => new Set(prev).add(String(currentWord.id)));
        setLearnedIds(prev => { const s = new Set(prev); s.delete(String(currentWord.id)); return s; });
      }
      setSwipeResult('notyet');
      setTimeout(() => { setSwipeResult(null); nextCard(); }, 400);
    }
    x.set(0);
  };

  const learnedCount = learnedIds.size;
  const notyetCount = notyetIds.size;

  const filterBtnToddler = "bg-orange-500 text-white shadow-md scale-105";
  const filterBtnClassic = "bg-blue-500 text-white shadow-md scale-105";
  const filterBtnDefault = "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200";

  return (
    <div className="w-full flex flex-col items-center mt-2">
      {/* Swipe stats */}
      {(learnedCount > 0 || notyetCount > 0) && (
        <div className="flex gap-4 mb-3 w-full max-w-2xl justify-center">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
            <ThumbsUp size={14} /> 已會 {learnedCount}
          </div>
          <div className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-bold border border-red-200">
            <ThumbsDown size={14} /> 不熟 {notyetCount}
          </div>
        </div>
      )}

      {/* A-Z filter */}
      <div className="flex w-full max-w-2xl gap-2 overflow-x-auto pb-4 mb-2 hide-scrollbar justify-start items-center px-2">
        <motion.button
          onClick={shuffleStudyDeck}
          className="px-4 py-2 rounded-xl font-bold text-sm shrink-0 transition-colors shadow-sm bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center gap-1 mr-2"
          whileTap={{ scale: 0.95, rotate: -180 }}
          transition={{ duration: 0.4 }}
        >
          <RotateCcw size={16} /> 隨機
        </motion.button>
        <div className="w-px h-6 bg-slate-200 shrink-0 mr-2" />
        {ALPHABET.map((letter) => {
          const isActive = currentLetterFilter === letter;
          const btnClass = isActive ? (isToddler ? filterBtnToddler : filterBtnClassic) : filterBtnDefault;
          return (
            <button
              key={letter}
              onClick={() => handleFilterChange(letter)}
              className={"px-4 py-1.5 rounded-xl font-bold text-sm shrink-0 transition-all " + btnClass}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {studyDeck.length === 0 ? (
        <div className="text-center text-slate-400 bg-white/60 backdrop-blur-sm p-10 w-full max-w-2xl mt-4 rounded-[2rem] border border-slate-200 shadow-sm">
          <Search size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-xl font-bold">沒有以「{currentLetterFilter}」開頭的單字喔！</p>
        </div>
      ) : (
        <>
          {/* Swipe hint */}
          <div className="flex justify-between w-full max-w-2xl px-6 mb-1 text-xs font-bold">
            <span className="text-red-400 flex items-center gap-1"><ThumbsDown size={12} /> ← 不熟</span>
            <span className="text-green-500 flex items-center gap-1">已會 → <ThumbsUp size={12} /></span>
          </div>

          <div className="relative w-full max-w-2xl mt-1">
            {/* Swipe overlays */}
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] bg-green-500/20 border-4 border-green-400 z-30 pointer-events-none flex items-center justify-center"
              style={{ opacity: rightOpacity }}
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-2xl rotate-12 shadow-lg">
                ✅ 已會！
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] bg-red-500/20 border-4 border-red-400 z-30 pointer-events-none flex items-center justify-center"
              style={{ opacity: leftOpacity }}
            >
              <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-2xl -rotate-12 shadow-lg">
                ❌ 不熟
              </div>
            </motion.div>

            <motion.div
              className="w-full h-[360px] sm:h-[480px] shrink-0 cursor-grab active:cursor-grabbing relative"
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onClick={() => setIsFlipped(!isFlipped)}
              layout={true}
            >
              <div className="relative w-full h-full">
                {/* Front */}
                <AnimatePresence mode="wait">
                  {!isFlipped && (
                    <motion.div
                      key={"front-" + currentIndex}
                      className={
                        "absolute inset-0 rounded-[2.5rem] bg-white border-4 flex flex-col items-center justify-center p-4 sm:p-8 shadow-xl overflow-hidden " +
                        (currentWord && learnedIds.has(String(currentWord.id)) ? "border-green-200 " :
                         currentWord && notyetIds.has(String(currentWord.id)) ? "border-red-200 " :
                         isToddler ? "border-orange-100" : "border-blue-100")
                      }
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" } as any}
                    >
                      {/* Status badge */}
                      {currentWord && learnedIds.has(String(currentWord.id)) && (
                        <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <ThumbsUp size={12} /> 已會
                        </div>
                      )}
                      {currentWord && notyetIds.has(String(currentWord.id)) && (
                        <div className="absolute top-4 right-4 bg-red-100 text-red-500 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <ThumbsDown size={12} /> 不熟
                        </div>
                      )}

                      {isToddler && currentWord && (
                        <motion.div
                          className="text-[6rem] sm:text-[7rem] mb-2 sm:mb-4 drop-shadow-md select-none leading-none"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {currentWord.emoji}
                        </motion.div>
                      )}

                      <h2
                        className={
                          "text-4xl sm:text-6xl font-black text-slate-800 mb-4 text-center leading-snug z-10 " +
                          (!isToddler ? "mt-8" : "")
                        }
                      >
                        {currentWord?.english}
                      </h2>

                      <motion.button
                        onClick={(e) => { e.stopPropagation(); speak(currentWord?.english, e); }}
                        className={
                          "p-4 text-white rounded-full hover:scale-110 transition-transform shadow-lg mb-4 z-10 " +
                          (isToddler ? "bg-orange-500 shadow-orange-500/30" : "bg-blue-500 shadow-blue-500/30")
                        }
                        whileTap={{ scale: 0.9 }}
                      >
                        <Volume2 size={28} strokeWidth={3} />
                      </motion.button>

                      <div className="w-full flex flex-col items-center z-20 mt-2" onClick={(e) => e.stopPropagation()}>
                        {currentWord?.sentenceEn ? (
                          <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-center w-full max-w-sm shadow-inner text-slate-700 relative">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <p className="font-bold text-base sm:text-lg leading-tight">{currentWord.sentenceEn}</p>
                              <button
                                onClick={(e) => speak(currentWord.sentenceEn, e)}
                                className={
                                  "hover:scale-110 transition-transform shrink-0 p-1 bg-white rounded-full shadow-sm " +
                                  (isToddler ? "text-orange-500" : "text-blue-500")
                                }
                              >
                                <Volume2 size={18} />
                              </button>
                            </div>
                            <p className="text-slate-500 font-bold text-sm">{currentWord.sentenceZh}</p>
                          </div>
                        ) : (
                          <div className="text-slate-300 font-bold text-sm mt-4 px-4 py-1.5 bg-slate-50 rounded-full">
                            (例句擴充中...)
                          </div>
                        )}
                      </div>

                      <p className="absolute bottom-6 text-slate-300 font-black tracking-widest uppercase text-xs">
                        點擊翻面 · 左右滑動分類
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back */}
                <AnimatePresence mode="wait">
                  {isFlipped && (
                    <motion.div
                      key={"back-" + currentIndex}
                      className={
                        "absolute inset-0 border-4 rounded-[2.5rem] flex flex-col items-center justify-center p-6 sm:p-8 shadow-xl text-white " +
                        (isToddler
                          ? "bg-gradient-to-br from-orange-400 to-pink-500 border-orange-300"
                          : "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-300")
                      }
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" } as any}
                    >
                      {currentWord?.pos && (
                        <span
                          className={
                            "text-xl sm:text-2xl font-black mb-6 bg-white px-6 py-2 rounded-full shadow-sm " +
                            (isToddler ? "text-orange-500" : "text-blue-600")
                          }
                        >
                          {currentWord.pos}
                        </span>
                      )}
                      <motion.h2
                        className="text-5xl sm:text-7xl font-black text-center leading-tight drop-shadow-md"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        {currentWord?.chinese}
                      </motion.h2>
                      <p className="absolute bottom-6 text-white/50 font-black tracking-widest uppercase text-xs">
                        點擊翻回 · 左右滑動分類
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Bottom controls */}
          <div className="flex gap-4 sm:gap-6 mt-8 w-full max-w-md px-2">
            <motion.button
              onClick={prevCard}
              className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-[2rem] hover:bg-slate-50 transition-colors font-black text-lg flex items-center justify-center gap-2 shadow-sm"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} strokeWidth={3} /> 上一個
            </motion.button>
            <motion.button
              onClick={nextCard}
              className={
                "flex-1 py-4 text-white rounded-[2rem] font-black text-lg shadow-lg flex items-center justify-center gap-2 " +
                (isToddler
                  ? "bg-gradient-to-r from-orange-400 to-pink-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500")
              }
              whileTap={{ scale: 0.95 }}
            >
              下一個 <ChevronRight size={24} strokeWidth={3} />
            </motion.button>
          </div>

          <div className="mt-6 text-slate-400 font-bold text-sm bg-white/50 px-4 py-1.5 rounded-full border border-slate-200">
            {currentIndex + 1} / {studyDeck.length}
          </div>
        </>
      )}
    </div>
  );
};

export default StudyCard;
