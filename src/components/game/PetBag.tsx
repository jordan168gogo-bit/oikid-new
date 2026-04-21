import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Star, Heart, Sparkles } from 'lucide-react';
import { getStage, getStageEmoji, getNextEvolutionHearts, getPetEncouragement, getRarityLabel, getRarityColor, getFeedCost, type Pet } from '@/lib/pet-system';

const FrameEffect = ({ frame }: { frame?: string }) => {
  if (!frame) return null;
  switch (frame) {
    case 'frame_gold':
      return (
        <>
          <motion.div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/40" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.span className="absolute -top-1.5 -right-1.5 text-sm" animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.span>
          <motion.span className="absolute -bottom-1.5 -left-1.5 text-sm" animate={{ rotate: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>✨</motion.span>
        </>
      );
    case 'frame_rainbow':
      return (
        <motion.div
          className="absolute inset-[-3px] rounded-3xl"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)',
            backgroundSize: '400% 400%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-[3px] rounded-[calc(1.5rem-3px)] bg-muted/30" />
        </motion.div>
      );
    case 'frame_fire':
      return (
        <>
          <motion.div className="absolute inset-0 rounded-3xl shadow-[0_0_15px_rgba(249,115,22,0.4)]" animate={{ boxShadow: ['0 0 8px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.6)', '0 0 8px rgba(249,115,22,0.3)'] }} transition={{ duration: 1.5, repeat: Infinity }} />
          {[...Array(3)].map((_, i) => (
            <motion.span key={i} className="absolute text-sm" style={{ bottom: -4, left: `${20 + i * 25}%` }} animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}>🔥</motion.span>
          ))}
        </>
      );
    case 'frame_ice':
      return (
        <>
          <motion.div className="absolute inset-0 rounded-3xl" animate={{ boxShadow: ['0 0 8px rgba(34,211,238,0.2)', '0 0 20px rgba(34,211,238,0.5)', '0 0 8px rgba(34,211,238,0.2)'] }} transition={{ duration: 3, repeat: Infinity }} />
          {[...Array(4)].map((_, i) => (
            <motion.span key={i} className="absolute text-[10px]" style={{ top: `${10 + i * 22}%`, [i % 2 === 0 ? 'left' : 'right']: -6 }} animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>❄️</motion.span>
          ))}
        </>
      );
    default:
      return null;
  }
};

interface PetBagProps {
  stars: number;
  pets: Pet[];
  startFeedingPet: (pet: any) => void;
  onOpenGacha: () => void;
  favoritePetId?: string | null;
  onSetFavorite?: (petId: string) => void;
  equippedFrame?: string;
}

const FRAME_STYLES: Record<string, string> = {};

const PetBag = ({ stars, pets, startFeedingPet, onOpenGacha, favoritePetId, onSetFavorite, equippedFrame }: PetBagProps) => {
  return (
    <motion.div
      className="w-full max-w-3xl game-card border-game-pink/30 p-6 sm:p-10 border-t-8 border-t-game-pink"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <PawPrint className="text-game-pink" size={36} /> 我的夥伴背包
        </h2>
        <div className="flex gap-3 items-center">
          <div className="bg-game-amber-light text-game-amber px-5 py-2 rounded-full font-bold text-lg border border-game-amber/20 shadow-inner flex items-center gap-2">
            <Star fill="currentColor" className="text-game-star" size={24} /> {stars}
          </div>
          <motion.button
            onClick={onOpenGacha}
            className="px-5 py-2 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-full text-sm shadow-md flex items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} /> 扭蛋
          </motion.button>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-16 bg-muted/50 rounded-3xl border-2 border-dashed border-border">
          <Star className="mx-auto text-muted-foreground/30 mb-4" size={64} />
          <p className="text-xl font-semibold text-muted-foreground">還沒有夥伴喔！</p>
          <p className="text-muted-foreground/60 mt-2">去「扭蛋」用星星抽取新夥伴吧！</p>
          <motion.button
            onClick={onOpenGacha}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} className="inline mr-1" /> 前往扭蛋
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {pets.map((pet, i) => {
            const stage = getStage(pet.hearts || 0);
            const stageEmoji = getStageEmoji(stage);
            const nextEvol = getNextEvolutionHearts(pet.hearts || 0);
            const rarity = pet.rarity || 'common';
            const rarityColor = getRarityColor(rarity);
            const encouragement = getPetEncouragement(stage);

            return (
              <motion.div
                key={pet.id}
                className={`bg-muted/30 border-4 ${String(pet.id) === favoritePetId ? 'border-game-pink/50 ring-2 ring-game-pink/20' : `border-${rarityColor}/20`} rounded-3xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-all group relative overflow-visible`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                {/* Animated frame effect */}
                <FrameEffect frame={equippedFrame} />
                {/* Rarity badge */}
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-${rarityColor}/10 text-${rarityColor} border border-${rarityColor}/20`}>
                  {getRarityLabel(rarity)}
                </div>

                {/* Hearts */}
                <div className="absolute top-2 right-2 bg-card px-2 py-0.5 rounded-full shadow-sm text-xs font-bold text-game-pink flex items-center gap-1 border border-game-pink/20">
                  <Heart fill="currentColor" size={12} /> {pet.hearts || 0}
                </div>

                {/* Stage indicator */}
                <div className="text-xs text-muted-foreground mt-1 mb-1 flex items-center gap-1">
                  {stageEmoji} {stage === 'egg' ? '蛋' : stage === 'baby' ? '幼體' : '成體'}
                </div>

                {/* Pet display with stage-specific visuals */}
                <div className="relative mb-1">
                  {stage === 'baby' && (
                    <span className="absolute -top-2 -right-1 text-lg z-10 animate-bounce">🍼</span>
                  )}
                  {stage === 'adult' && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg z-10">👑</span>
                  )}
                  <motion.span
                    className={`drop-shadow-md block text-center ${
                      stage === 'egg' ? 'text-7xl' :
                      stage === 'baby' ? 'text-5xl opacity-90 saturate-[0.8]' :
                      'text-7xl saturate-125'
                    }`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    style={stage === 'baby' ? { filter: 'drop-shadow(0 0 6px rgba(255,182,193,0.6))' } : stage === 'adult' ? { filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' } : undefined}
                  >
                    {stage === 'egg' ? '🥚' : pet.type}
                  </motion.span>
                  {stage === 'adult' && (
                    <span className="absolute -bottom-1 -left-1 text-xs">✨</span>
                  )}
                </div>

                {/* Encouragement speech bubble */}
                <div className="bg-card/80 rounded-xl px-2 py-1 text-[10px] text-center text-foreground mb-1 border border-border">
                  {encouragement}
                </div>

                {/* Evolution progress */}
                {nextEvol && (
                  <div className="w-full">
                    <div className="bg-muted rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className={`h-full bg-${rarityColor} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${((pet.hearts || 0) / nextEvol) * 100}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-muted-foreground text-center mt-0.5">
                      進化: {pet.hearts || 0}/{nextEvol}
                    </p>
                  </div>
                )}

                {(() => {
                  const feedCost = getFeedCost(stage);
                  const isFav = String(pet.id) === favoritePetId;
                  return (
                    <>
                      <motion.button
                        onClick={() => startFeedingPet(pet)}
                        className="w-full mt-2 py-2.5 bg-game-pink-light text-game-pink hover:bg-game-pink hover:text-white font-semibold rounded-xl transition-colors shadow-sm text-sm"
                        whileTap={{ scale: 0.95 }}
                      >
                        ⭐ 餵食（{feedCost}星）
                      </motion.button>
                      {onSetFavorite && (
                        <motion.button
                          onClick={() => onSetFavorite(String(pet.id))}
                          className={`w-full mt-1.5 py-1.5 font-semibold rounded-xl transition-colors text-xs ${
                            isFav
                              ? 'bg-game-amber/15 text-game-amber border border-game-amber/30'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isFav ? '⭐ 最愛夥伴' : '💛 設為最愛'}
                        </motion.button>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default PetBag;
