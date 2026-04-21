import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, Shield, Heart, RotateCcw, MessageCircle, Zap } from "lucide-react";
import { speak as speakFn } from "@/lib/game-utils";

interface BossBattleProps {
  appMode: string;
  vocabList: any[];
  onEarnStars: (n: number) => void;
  onCorrectAnswer: () => void;
}

const BOSS_KEY = "oikid_boss_progress";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface BossState {
  letter: string;
  bossHp: number;
  maxHp: number;
  playerHp: number;
  phase: "map" | "battle" | "victory" | "defeat";
  currentWord: any;
  options: any[];
  feedback: string | null;
  combo: number;
  hasShield: boolean;
  taunt: string;
  damageText: string | null;
  questionType: "en2zh" | "zh2en";
}

const BOSS_EMOJIS: Record<string, string> = {
  A: "🐲",
  B: "👹",
  C: "🦑",
  D: "🧟",
  E: "👻",
  F: "🦇",
  G: "🐍",
  H: "🕷️",
  I: "🦂",
  J: "🎃",
  K: "💀",
  L: "🧛",
  M: "🐺",
  N: "🦖",
  O: "🐙",
  P: "🦁",
  Q: "🦅",
  R: "🐉",
  S: "🦈",
  T: "🐊",
  U: "🐻",
  V: "🦏",
  W: "🐘",
  X: "🦍",
  Y: "🐯",
  Z: "🦄",
};

const BOSS_NAMES: Record<string, string> = {
  A: "暗影蜥龍",
  B: "邪惡鬼面",
  C: "深海巨章",
  D: "殭屍王",
  E: "幽靈騎士",
  F: "暗夜蝙蝠",
  G: "毒蛇魔王",
  H: "蜘蛛女王",
  I: "毒蠍將軍",
  J: "南瓜惡魔",
  K: "骷髏法師",
  L: "吸血伯爵",
  M: "狼人獵手",
  N: "遠古恐龍",
  O: "章魚怪",
  P: "獅王戰士",
  Q: "風暴神鷹",
  R: "烈焰飛龍",
  S: "深海鯊皇",
  T: "鱷魚王",
  U: "暴怒熊王",
  V: "犀牛勇士",
  W: "大象守衛",
  X: "猩猩之王",
  Y: "白虎將軍",
  Z: "獨角仙帝",
};

const BOSS_TAUNTS = {
  start: ["哈哈！你敢來挑戰我？😈", "小鬼，準備好被打敗了嗎？💀", "又一個不自量力的！🔥"],
  hit: ["可惡！有點痛！😤", "你運氣真好！😠", "哼！不過如此！💢"],
  enraged: ["你完蛋了！！！🔥🔥", "我要發飆了！！💥", "不可能！我不會輸！😡"],
  playerHit: ["哈哈哈！答錯了！😈", "太弱了！再來啊！💀", "就這樣？太簡單了！🤣"],
  shieldBlock: ["什麼！？被擋住了！😱", "這個護盾...！💫", "可惡的防護罩！😤"],
};

const randomPick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const getDefeatedBosses = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(BOSS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveBossDefeated = (letter: string) => {
  const defeated = getDefeatedBosses();
  if (!defeated.includes(letter)) {
    defeated.push(letter);
    localStorage.setItem(BOSS_KEY, JSON.stringify(defeated));
  }
};

const BossBattle = ({ appMode, vocabList, onEarnStars, onCorrectAnswer }: BossBattleProps) => {
  const [state, setState] = useState<BossState>({
    letter: "A",
    bossHp: 5,
    maxHp: 5,
    playerHp: 3,
    phase: "map",
    currentWord: null,
    options: [],
    feedback: null,
    combo: 0,
    hasShield: false,
    taunt: "",
    damageText: null,
    questionType: "en2zh",
  });
  const questionCounterRef = useRef(0);
  const defeated = getDefeatedBosses();
  const speak = (text: string) => speakFn(text, appMode);
  const isEnraged = state.bossHp <= Math.ceil(state.maxHp * 0.3) && state.bossHp > 0;

  const getWordsForLetter = (letter: string) => vocabList.filter((w) => w.english.toUpperCase().startsWith(letter));

  const startBattle = (letter: string) => {
    const words = getWordsForLetter(letter);
    if (words.length < 2) return;
    const hp = Math.min(4 + defeated.length, 10);
    setState({
      letter: letter,
      bossHp: hp,
      maxHp: hp,
      playerHp: 3,
      phase: "battle",
      currentWord: null,
      options: [],
      feedback: null,
      combo: 0,
      hasShield: false,
      taunt: randomPick(BOSS_TAUNTS.start),
      damageText: null,
      questionType: "en2zh",
    });
    setTimeout(() => generateBattleQuestion(letter), 500);
  };

  const generateBattleQuestion = (letter: string) => {
    const words = getWordsForLetter(letter);
    if (words.length < 2) return;
    questionCounterRef.current++;
    const word = words[Math.floor(Math.random() * words.length)];
    const qType = Math.random() > 0.7 ? "zh2en" : "en2zh";
    let opts = [word];
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    for (const w of shuffled) {
      if (opts.length >= 4) break;
      if (w.id !== word.id) opts.push(w);
    }
    setState((prev) => ({
      ...prev,
      currentWord: word,
      options: opts.sort(() => 0.5 - Math.random()),
      feedback: null,
      damageText: null,
      questionType: qType,
    }));
    if (qType === "en2zh") setTimeout(() => speak(word.english), 300);
  };

  const handleBattleAnswer = (opt: any) => {
    if (state.feedback) return;
    const correct = opt.id === state.currentWord.id;

    if (correct) {
      onCorrectAnswer();
      const comboDmg = state.combo >= 3 ? 1 : 0;
      const totalDmg = 1 + comboDmg;
      const newBossHp = Math.max(0, state.bossHp - totalDmg);
      const newCombo = state.combo + 1;
      const newShield = newCombo >= 3;
      speak(state.currentWord.english);

      const taunt =
        newBossHp <= Math.ceil(state.maxHp * 0.3) && newBossHp > 0
          ? randomPick(BOSS_TAUNTS.enraged)
          : randomPick(BOSS_TAUNTS.hit);

      if (newBossHp <= 0) {
        saveBossDefeated(state.letter);
        onEarnStars(2);
        setState((prev) => ({
          ...prev,
          bossHp: 0,
          phase: "victory",
          feedback: "correct",
          combo: newCombo,
          damageText: "-" + totalDmg,
          taunt: "不...不可能...",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          bossHp: newBossHp,
          feedback: "correct",
          combo: newCombo,
          hasShield: newShield,
          damageText: "-" + totalDmg,
          taunt: taunt,
        }));
        setTimeout(() => generateBattleQuestion(state.letter), 900);
      }
    } else {
      if (state.hasShield) {
        setState((prev) => ({
          ...prev,
          feedback: "shielded",
          hasShield: false,
          combo: 0,
          taunt: randomPick(BOSS_TAUNTS.shieldBlock),
          damageText: "🛡️ 擋住！",
        }));
        setTimeout(() => generateBattleQuestion(state.letter), 900);
      } else {
        const newPlayerHp = state.playerHp - 1;
        if (newPlayerHp <= 0) {
          setState((prev) => ({
            ...prev,
            playerHp: 0,
            phase: "defeat",
            feedback: "wrong",
            combo: 0,
            taunt: randomPick(BOSS_TAUNTS.playerHit),
            damageText: null,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            playerHp: newPlayerHp,
            feedback: "wrong",
            combo: 0,
            hasShield: false,
            taunt: randomPick(BOSS_TAUNTS.playerHit),
            damageText: null,
          }));
          setTimeout(() => generateBattleQuestion(state.letter), 900);
        }
      }
    }
  };

  // --- 防斷行：安全樣式變數區 ---
  const mapBtnBase =
    "aspect-square rounded-2xl flex flex-col items-center justify-center border-2 text-center transition-all ";
  const mapBtnDefeated = "bg-game-green-light border-game-green/30 shadow-inner ";
  const mapBtnHasWords =
    "bg-game-purple-light border-game-purple/30 hover:bg-game-purple/10 hover:border-game-purple/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:-translate-y-1 ";
  const mapBtnLocked = "bg-muted/30 border-border opacity-40 grayscale ";

  const optBtnBase = "p-4 rounded-xl border-2 font-bold text-base transition-all duration-300 ";
  const optBtnCorrect =
    "bg-game-green-light border-game-green text-game-green shadow-[0_0_20px_rgba(74,222,128,0.6)] scale-105 ";
  const optBtnWrongOther = "bg-muted/50 border-border opacity-40 scale-95 ";
  const optBtnDefault =
    "bg-white border-border hover:bg-game-purple-light hover:border-game-purple/40 hover:shadow-md ";

  const bossCardNormal = "game-card p-4 border-t-4 border-t-game-purple transition-all duration-300 ";
  const bossCardEnraged =
    "game-card p-4 border-t-4 border-t-destructive bg-destructive/5 shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 ";

  // === MAP PHASE ===
  if (state.phase === "map") {
    return (
      <div className="w-full space-y-5 animate-in fade-in">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-black text-foreground flex items-center justify-center gap-2 drop-shadow-sm">
            <Sword size={28} className="text-game-purple" fill="currentColor" /> BOSS 字母討伐戰
          </h2>
          <p className="text-sm font-bold text-muted-foreground mt-2">
            打敗 BOSS 拯救字母精靈！已解救{" "}
            <span className="text-game-purple font-black text-lg">{defeated.length}</span> / 26
          </p>
        </div>

        <div className="bg-muted rounded-full h-4 overflow-hidden shadow-inner border border-border/50">
          <motion.div
            className="h-full bg-gradient-to-r from-game-purple to-game-pink rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: (defeated.length / 26) * 100 + "%" }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
          {ALPHABET.map((letter, i) => {
            const isDefeated = defeated.includes(letter);
            const words = getWordsForLetter(letter);
            const hasWords = words.length >= 2;

            let btnClass = mapBtnBase;
            if (isDefeated) btnClass += mapBtnDefeated;
            else if (hasWords) btnClass += mapBtnHasWords;
            else btnClass += mapBtnLocked;

            return (
              <motion.button
                key={letter}
                onClick={() => hasWords && startBattle(letter)}
                disabled={!hasWords}
                className={btnClass}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileTap={hasWords ? { scale: 0.9 } : undefined}
              >
                <span className={"text-3xl drop-shadow-md " + (isDefeated ? "grayscale opacity-50" : "")}>
                  {isDefeated ? "✅" : BOSS_EMOJIS[letter]}
                </span>
                <span className={"text-sm font-black mt-1 " + (isDefeated ? "text-game-green" : "text-foreground")}>
                  {letter}
                </span>
                {!isDefeated && hasWords && (
                  <span className="text-[10px] font-bold text-game-purple/70 bg-game-purple/10 px-2 py-0.5 rounded-full mt-1">
                    {words.length}字
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // === VICTORY PHASE ===
  if (state.phase === "victory") {
    return (
      <motion.div
        className="w-full max-w-md mx-auto bg-gradient-to-b from-white to-green-50 rounded-[2rem] p-8 text-center border-4 border-game-green shadow-[0_0_50px_rgba(74,222,128,0.3)] relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        {/* 勝利光芒旋轉特效 */}
        <motion.div
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(74,222,128,0.2)_360deg)] rounded-full z-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          <motion.div
            className="text-7xl mb-4 drop-shadow-lg"
            animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🏆
          </motion.div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-game-green to-emerald-600 mb-2">
            討伐成功！
          </h2>
          <p className="text-lg font-bold text-slate-600 mb-6">打敗了 {BOSS_NAMES[state.letter]}！</p>

          {/* 魔王爆炸動畫 */}
          <motion.div
            className="text-6xl my-6"
            initial={{ scale: 1, filter: "brightness(1)" }}
            animate={{
              scale: [1, 1.5, 0],
              rotate: 180,
              filter: ["brightness(1)", "brightness(2)", "brightness(0)"],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.5, ease: "easeIn" }}
          >
            {BOSS_EMOJIS[state.letter]}
          </motion.div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-sm border border-green-100">
            <p className="text-lg text-game-green font-bold mb-2">
              字母 <span className="font-black text-3xl">{state.letter}</span> 的精靈已被拯救！
            </p>
            <div className="flex justify-center gap-4 text-base">
              <span className="text-yellow-500 font-black flex items-center gap-1">⭐ +8 星星</span>
              <span className="text-game-pink font-black">🔥 最大連擊: {state.combo}</span>
            </div>
          </div>

          <motion.button
            onClick={() => setState((prev) => ({ ...prev, phase: "map" }))}
            className="px-8 py-4 w-full bg-gradient-to-r from-game-green to-emerald-500 text-white font-black text-xl rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            whileTap={{ scale: 0.95 }}
          >
            滿載而歸！
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // === DEFEAT PHASE ===
  if (state.phase === "defeat") {
    return (
      <motion.div
        className="w-full max-w-md mx-auto bg-gradient-to-b from-white to-red-50 rounded-[2rem] p-8 text-center border-4 border-destructive shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <motion.div
          className="text-7xl mb-4 drop-shadow-md"
          animate={{ scale: [1, 0.9, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💔
        </motion.div>
        <h2 className="text-3xl font-black text-destructive mb-2">挑戰失敗...</h2>
        <motion.div
          className="text-6xl my-6 drop-shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {BOSS_EMOJIS[state.letter]}
        </motion.div>
        <div className="bg-white/60 rounded-xl p-4 mb-6 border border-red-100">
          <p className="text-destructive font-bold italic mb-2">「{state.taunt}」</p>
          <p className="text-sm font-bold text-slate-500">多練習字母 {state.letter} 的單字再來挑戰吧！💪</p>
        </div>
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={() => startBattle(state.letter)}
            className="px-6 py-4 bg-gradient-to-r from-game-orange to-game-pink text-white font-black text-lg rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} className="inline mr-2" /> 重新挑戰
          </motion.button>
          <motion.button
            onClick={() => setState((prev) => ({ ...prev, phase: "map" }))}
            className="px-6 py-4 bg-slate-100 text-slate-500 font-bold text-lg rounded-2xl hover:bg-slate-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            撤退回地圖
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // === BATTLE PHASE ===
  return (
    <motion.div className="w-full max-w-lg mx-auto space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* 頂部魔王狀態區塊 */}
      <motion.div
        className={isEnraged ? bossCardEnraged : bossCardNormal}
        animate={isEnraged ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={isEnraged ? { duration: 0.4, repeat: Infinity } : {}}
      >
        <div className="flex items-center gap-4 mb-3 relative">
          {/* 魔王受擊震動與閃白光特效 */}
          <motion.div
            className="relative"
            animate={
              state.feedback === "correct"
                ? {
                    x: [0, -15, 15, -10, 10, 0],
                    filter: ["brightness(1)", "brightness(2) contrast(2)", "brightness(1)"],
                  }
                : isEnraged
                  ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                  : { y: [0, -5, 0] }
            }
            transition={{
              duration: state.feedback === "correct" ? 0.4 : isEnraged ? 0.8 : 2,
              repeat: state.feedback === "correct" ? 0 : Infinity,
            }}
          >
            <span className="text-6xl drop-shadow-xl">{BOSS_EMOJIS[state.letter]}</span>

            {/* 爆擊特效圖標 */}
            <AnimatePresence>
              {state.feedback === "correct" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-yellow-400 text-5xl z-10"
                  initial={{ scale: 0, opacity: 1, rotate: -45 }}
                  animate={{ scale: 2, opacity: 0, rotate: 45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  💥
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-black text-lg text-foreground">{BOSS_NAMES[state.letter]}</p>
              {isEnraged && (
                <motion.span
                  className="text-xs font-black text-white px-3 py-1 bg-destructive rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  animate={{ opacity: [1, 0.7, 1], scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🔥 暴怒狀態
                </motion.span>
              )}
            </div>

            {/* RPG 漸變血條 */}
            <div className="bg-slate-200 rounded-full h-4 overflow-hidden relative shadow-inner border border-slate-300">
              {/* 扣血殘影 */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-red-300 rounded-full"
                animate={{ width: (state.bossHp / state.maxHp) * 100 + "%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {/* 真實血條 */}
              <motion.div
                className={
                  "absolute top-0 left-0 h-full rounded-full " +
                  (isEnraged
                    ? "bg-gradient-to-r from-red-500 to-rose-600"
                    : "bg-gradient-to-r from-game-purple to-purple-400")
                }
                animate={{ width: (state.bossHp / state.maxHp) * 100 + "%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs font-bold text-slate-500 mt-1 text-right">
              HP: {state.bossHp} / {state.maxHp}
            </p>
          </div>

          {/* 傷害跳字特效 */}
          <AnimatePresence>
            {state.damageText && (
              <motion.span
                className={
                  "absolute right-0 top-1/2 text-3xl font-black drop-shadow-md z-20 " +
                  (state.damageText.includes("🛡️") ? "text-game-blue" : "text-destructive")
                }
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -40, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {state.damageText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* 魔王嗆聲 */}
        <AnimatePresence mode="wait">
          {state.taunt && (
            <motion.div
              key={state.taunt}
              className="flex items-start gap-2 mt-3 bg-white/50 p-2 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <MessageCircle size={16} className={isEnraged ? "text-destructive" : "text-muted-foreground"} />
              <p className={"text-sm font-bold " + (isEnraged ? "text-destructive" : "text-slate-600")}>
                「{state.taunt}」
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 玩家狀態區塊 */}
      <div className="flex items-center justify-between px-4 bg-white/60 backdrop-blur-sm py-3 rounded-2xl border border-white shadow-sm">
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={
                state.feedback === "wrong" && i === state.playerHp
                  ? {
                      scale: [1, 1.5, 0],
                      opacity: [1, 1, 0],
                      filter: "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)",
                    }
                  : {}
              }
            >
              <Heart
                size={28}
                className={
                  i < state.playerHp ? "text-game-pink fill-game-pink drop-shadow-sm" : "text-slate-300 fill-slate-200"
                }
              />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {state.hasShield && (
              <motion.div
                className="flex items-center gap-1 text-white font-black text-sm bg-gradient-to-r from-blue-400 to-game-blue px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <Shield size={16} fill="currentColor" /> 魔法護盾
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {state.combo >= 2 && (
              <motion.span
                className="text-game-orange font-black text-base flex items-center gap-1"
                key={state.combo}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0 }}
              >
                <Zap size={18} className="fill-game-orange" /> {state.combo} 連擊！
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 戰鬥問答區塊 (發射魔法) */}
      {state.currentWord && (
        <motion.div
          className={
            "bg-white rounded-[2rem] p-6 text-center shadow-lg border-b-8 border-slate-200 relative overflow-hidden " +
            (state.feedback === "shielded" ? "ring-4 ring-game-blue shadow-[0_0_30px_rgba(59,130,246,0.4)]" : "") +
            (state.feedback === "wrong" && !state.hasShield
              ? "ring-4 ring-destructive shadow-[0_0_30px_rgba(239,68,68,0.4)] bg-red-50"
              : "")
          }
          key={"bq-" + questionCounterRef.current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          {/* 護盾擋下特效 */}
          <AnimatePresence>
            {state.feedback === "shielded" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 bg-blue-50/90 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1.2] }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Shield size={100} className="text-game-blue drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                  <p className="text-2xl font-black text-game-blue mt-2">護盾防禦！</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 玩家受傷特效 (畫面閃紅) */}
          <AnimatePresence>
            {state.feedback === "wrong" && !state.hasShield && (
              <motion.div
                className="absolute inset-0 bg-red-500/20 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.3, repeat: 2 }}
              />
            )}
          </AnimatePresence>

          <p className="text-sm font-bold text-slate-500 mb-2 relative z-10">
            {state.questionType === "en2zh" ? "🗡️ 選出正確的中文意思發動攻擊！" : "🗡️ 選出正確的英文單字發動攻擊！"}
          </p>
          {state.questionType === "en2zh" && state.currentWord.emoji && (
            <span className="text-5xl block mb-2 drop-shadow-sm relative z-10">{state.currentWord.emoji}</span>
          )}
          <p className="text-3xl font-black text-slate-800 mb-6 relative z-10">
            {state.questionType === "en2zh" ? state.currentWord.english : state.currentWord.chinese}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
            {state.options.map((opt, i) => {
              let btnClass = optBtnBase;
              if (state.feedback && opt.id === state.currentWord.id) {
                btnClass += optBtnCorrect; // 正確答案高亮
              } else if (state.feedback === "wrong" && opt.id !== state.currentWord.id) {
                btnClass += optBtnWrongOther; // 答錯時其他選項變暗
              } else {
                btnClass += optBtnDefault; // 預設狀態
              }

              return (
                <motion.button
                  key={opt.id + "_" + i}
                  onClick={() => handleBattleAnswer(opt)}
                  disabled={!!state.feedback}
                  className={btnClass}
                  whileTap={!state.feedback ? { scale: 0.95 } : undefined}
                >
                  {state.questionType === "en2zh" ? opt.chinese : opt.english}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      <div className="text-center pb-4">
        <p className="text-xs font-bold text-slate-400 bg-white/50 inline-block px-4 py-1.5 rounded-full">
          💡 提示：連續答對 3 題可獲得魔法護盾，抵擋一次傷害！
        </p>
      </div>
    </motion.div>
  );
};

export default BossBattle;
