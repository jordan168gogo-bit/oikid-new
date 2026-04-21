import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Check, Lock } from 'lucide-react';
import { PET_POOL, getRarityLabel, getRarityColor, type PetRarity } from '@/lib/pet-system';

interface PetDexProps {
  ownedPetTypes: string[];
}

const PetDex = ({ ownedPetTypes }: PetDexProps) => {
  const [filterRarity, setFilterRarity] = useState<PetRarity | 'all'>('all');

  const allPets: { type: string; rarity: PetRarity }[] = [];
  (['common', 'rare', 'legendary'] as PetRarity[]).forEach(rarity => {
    PET_POOL[rarity].forEach(type => {
      allPets.push({ type, rarity });
    });
  });

  const filtered = filterRarity === 'all' ? allPets : allPets.filter(p => p.rarity === filterRarity);
  const ownedSet = new Set(ownedPetTypes);
  const totalOwned = allPets.filter(p => ownedSet.has(p.type)).length;

  return (
    <motion.div
      className="w-full max-w-3xl game-card border-game-purple/30 p-6 sm:p-10 border-t-8 border-t-game-purple"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="text-game-purple" size={36} /> 夥伴圖鑑
        </h2>
        <div className="bg-game-purple/10 text-game-purple px-5 py-2 rounded-full font-bold text-base border border-game-purple/20">
          收集進度: {totalOwned}/{allPets.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-game-purple to-game-pink rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(totalOwned / allPets.length) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {(['all', 'common', 'rare', 'legendary'] as const).map(r => (
          <motion.button
            key={r}
            onClick={() => setFilterRarity(r)}
            className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
              filterRarity === r
                ? 'bg-game-purple/15 text-game-purple border border-game-purple/30'
                : 'bg-muted text-muted-foreground border border-border hover:bg-muted/80'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {r === 'all' ? '🌟 全部' : `${r === 'common' ? '🟢' : r === 'rare' ? '🔵' : '🟡'} ${getRarityLabel(r)}`}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {filtered.map((pet, i) => {
          const owned = ownedSet.has(pet.type);
          const rarityColor = getRarityColor(pet.rarity);

          return (
            <motion.div
              key={pet.type}
              className={`relative flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                owned
                  ? `border-${rarityColor}/30 bg-${rarityColor}/5`
                  : 'border-border bg-muted/20 opacity-50'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              whileHover={owned ? { scale: 1.1, y: -2 } : undefined}
            >
              <span className={`text-3xl ${owned ? '' : 'grayscale blur-[2px]'}`}>
                {owned ? pet.type : '❓'}
              </span>
              <div className={`mt-1 w-full h-1 rounded-full ${
                pet.rarity === 'legendary' ? 'bg-game-amber' :
                pet.rarity === 'rare' ? 'bg-game-blue' : 'bg-game-green'
              } ${owned ? 'opacity-60' : 'opacity-20'}`} />
              {owned && (
                <Check size={10} className="absolute top-1 right-1 text-game-green" />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PetDex;
