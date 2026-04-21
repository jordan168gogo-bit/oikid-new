import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, PartyPopper, RefreshCw } from "lucide-react";
import { gachaPullNoDupe, gachaPull, GACHA_COST, PITY_THRESHOLD, DUPE_STAR_REWARD, getRarityLabel, getRarityColor, type PetRarity } from "@/lib/pet-system";

interface GachaSystemProps {
  stars: number;
  ownedPetTypes: string[];
  onPull: (pet: { type: string; rarity: PetRarity }, isDupe: boolean) => void;
  pullCount?: number;
}

const GachaSystem = ({ stars, ownedPetTypes, onPull, pullCount = 0 }: GachaSystemProps) => {
  const [phase, setPhase] = useState<"idle" | "rolling" | "reveal" | "allOwned" | "dupe">("idle");
  const [result, setResult] = useState<{ type: string; rarity: PetRarity } | null>(null);
  const [dupeReward, setDupeReward] = useState<number>(0);
  const canPull = stars >= GACHA_COST;
  const pullsUntilPity = PITY_THRESHOLD - (pullCount % PITY_THRESHOLD);

  const handlePull = () => {
    if (!canPull || phase !== "idle") return;

    // Check if pity triggers (force rare+)
    const isPity = (pullCount + 1) % PITY_THRESHOLD === 0;

    let pulled: { type: string; rarity: PetRarity } | null;

    if (isPity) {
      // Force rare or legendary
      const roll = Math.random();
      const rarity: PetRarity = roll < 0.3 ? 'legendary' : 'rare';
      const pool = rarity === 'legendary'
        ? ['🦄', '🐉', '🦅', '🐺', '🦩', '🦚', '🦇', '🐋', '🦑', '🦖', '🦕', '🐊']
        : ['🦊', '🐼', '🦁', '🐧', '🐬', '🐳', '🦋', '🐢', '🦓', '🦒', '🦈', '🐙', '🦜', '🦥', '🦦', '🦫'];
      const type = pool[Math.floor(Math.random() * pool.length)];
      pulled = { type, rarity };
    } else {
      pulled = gachaPull();
    }

    if (!pulled) {
      setPhase("allOwned");
      return;
    }

    // Check if dupe
    const isDupe = ownedPetTypes.includes(pulled.type);

    setPhase("rolling");
    setTimeout(() => {
      setResult(pulled);
      if (isDupe) {
        setDupeReward(DUPE_STAR_REWARD[pulled!.rarity]);
        setPhase("dupe");
      } else {
        setPhase("reveal");
      }
    }, 2500);
  };

  const handleClaim = () => {
    if (result) {
      onPull(result, false);
      setResult(null);
      setPhase("idle");
    }
  };

  const handleClaimDupe = () => {
    if (result) {
      onPull(result, true);
      setResult(null);
      setDupeReward(0);
      setPhase("idle");
    }
  };

  const isLegendary = result?.rarity === "legendary";
  const isRare = result?.rarity === "rare";

  const cardBaseClass = "game-card p-8 text-center border-t-8 relative overflow-hidden transition-all duration-500 ";
  const cardBorderClass = isLegendary
    ? "border-t-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)] "
    : isRare
      ? "border-t-blue-400 "
      : "border-t-game-amber ";
  const cardBgClass = isLegendary ? "bg-gradient-to-b from-yellow-50 to-amber-100 " : "";

  const claimBtnClass = isLegendary
    ? "w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-pulse "
    : "w-full py-4 bg-gradient-to-r from-game-green to-game-blue text-white rounded-2xl font-bold text-lg shadow-lg ";

  const glassTagClass =
    "inline-block px-6 py-2 bg-white/80 backdrop-blur-sm border-2 rounded-full font-black text-lg shadow-sm ";
  const tagColorClass = isLegendary
    ? "text-yellow-600 border-yellow-400 "
    : isRare
      ? "text-blue-600 border-blue-400 "
      : "text-green-600 border-green-400 ";

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="text-game-amber" size={24} /> 夥伴扭蛋
        </h2>
        <p className="text-sm text-muted-foreground mt-1">用星星抽取稀有夥伴！</p>
      </div>

      {/* Pity counter */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold border border-purple-200">
          <RefreshCw size={14} /> 保底倒數：{pullsUntilPity} 抽必出稀有↑
        </div>
      </div>

      {/* Legendary backdrop */}
      <AnimatePresence>
        {phase === "reveal" && isLegendary && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={cardBaseClass + cardBorderClass + cardBgClass + (isLegendary ? "z-50 scale-105" : "")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {phase === "reveal" && isLegendary && (
          <motion.div
            className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(250,204,21,0.3)_360deg)] rounded-full z-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative w-40 h-40 mx-auto mb-6 z-10">
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div key="idle" className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="text-8xl drop-shadow-md" animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎰</motion.div>
              </motion.div>
            )}

            {phase === "rolling" && (
              <motion.div key="rolling" className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }}>
                <motion.div className="text-8xl drop-shadow-xl" animate={{ rotate: [0, -10, 10, -10, 10, -5, 5, 0], scale: [1, 1.1, 0.9, 1.2, 1], x: [0, -5, 5, -5, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}>🥚</motion.div>
              </motion.div>
            )}

            {(phase === "reveal" || phase === "dupe") && result && (
              <motion.div key="reveal" className="absolute inset-0 flex flex-col items-center justify-center" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                <motion.span className="text-9xl drop-shadow-2xl" animate={isLegendary ? { y: [0, -10, 0], scale: [1, 1.05, 1] } : { scale: [1, 1.1, 1] }} transition={isLegendary ? { duration: 1.5, repeat: Infinity } : { duration: 0.8, repeat: Infinity }}>
                  🥚
                </motion.span>
                {isLegendary && (
                  <>
                    <motion.div className="absolute top-0 right-0 text-yellow-400 text-2xl" animate={{ y: [-10, -30], opacity: [1, 0] }} transition={{ duration: 1, repeat: Infinity }}><Sparkles /></motion.div>
                    <motion.div className="absolute bottom-0 left-0 text-yellow-400 text-xl" animate={{ y: [0, -20], opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}><Sparkles /></motion.div>
                  </>
                )}
              </motion.div>
            )}

            {phase === "allOwned" && (
              <motion.div key="allOwned" className="absolute inset-0 flex flex-col items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }}>
                <motion.div className="text-8xl drop-shadow-lg" animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>🏆</motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10">
          {phase === "reveal" && result && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
              <span className={glassTagClass + tagColorClass}>
                {isLegendary && "🌟 "}{getRarityLabel(result.rarity)}蛋{isLegendary && " 🌟"}
              </span>
              <p className="text-sm font-bold text-slate-500 mt-4 opacity-70">餵食孵化後才會知道是誰喔！</p>
            </motion.div>
          )}

          {phase === "dupe" && result && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4">
                <p className="text-lg font-black text-amber-700 mb-1">🔄 重複夥伴！</p>
                <p className="text-sm text-amber-600">這隻夥伴你已經有了，自動轉換為星星獎勵</p>
                <motion.p
                  className="text-3xl font-black text-game-star mt-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                >
                  +{dupeReward} ⭐
                </motion.p>
              </div>
            </motion.div>
          )}

          {phase === "allOwned" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <p className="text-xl font-black text-game-green mb-2 flex items-center justify-center gap-2">
                <PartyPopper size={24} /> 夥伴全圖鑑達成！
              </p>
              <p className="text-sm font-bold text-slate-500">你已經擁有所有夥伴了，太厲害了！</p>
            </motion.div>
          )}

          {phase === "idle" && (
            <motion.button onClick={handlePull} disabled={!canPull} className={`w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all ${canPull ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-xl hover:scale-[1.02]" : "bg-slate-200 text-slate-400"}`} whileTap={canPull ? { scale: 0.95 } : undefined}>
              <Star size={24} className="inline mr-2" fill="currentColor" />
              抽一次（{GACHA_COST} ⭐）
            </motion.button>
          )}

          {phase === "rolling" && (
            <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse">
              神明保佑... 抽取中...
            </p>
          )}

          {phase === "reveal" && (
            <motion.button onClick={handleClaim} className={claimBtnClass} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              {isLegendary ? "✨ 迎接傳說夥伴 ✨" : "🎉 收下夥伴！"}
            </motion.button>
          )}

          {phase === "dupe" && (
            <motion.button onClick={handleClaimDupe} className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-2xl font-bold text-lg shadow-lg" whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              💰 收下 {dupeReward} 星星！
            </motion.button>
          )}

          {phase === "allOwned" && (
            <motion.button onClick={() => setPhase("idle")} className="w-full py-4 bg-slate-200 text-slate-500 rounded-2xl font-bold text-lg hover:bg-slate-300 transition-colors" whileTap={{ scale: 0.95 }}>
              返回
            </motion.button>
          )}

          <p className="text-sm font-bold text-slate-400 mt-5 flex items-center justify-center gap-1">
            目前星星：<Star size={16} className="text-yellow-400" fill="currentColor" /> {stars}
          </p>
        </div>
      </motion.div>

      {/* Rate table */}
      <div className="bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-5 shadow-sm">
        <p className="text-sm font-black text-slate-600 mb-3 text-center tracking-widest">抽卡機率表</p>
        <div className="flex justify-around text-center">
          <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <p className="text-green-600 font-black mb-1">普通</p>
            <p className="text-slate-500 font-bold text-sm">60%</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <p className="text-blue-600 font-black mb-1">稀有</p>
            <p className="text-slate-500 font-bold text-sm">30%</p>
          </div>
          <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            <p className="text-yellow-600 font-black mb-1">傳說</p>
            <p className="text-yellow-700 font-black text-sm">10%</p>
          </div>
        </div>
        <p className="text-xs text-center text-purple-500 font-bold mt-3">🎯 每 {PITY_THRESHOLD} 抽保底稀有以上！重複自動轉星星</p>
      </div>
    </div>
  );
};

export default GachaSystem;
