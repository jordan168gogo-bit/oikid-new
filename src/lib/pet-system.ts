// Pet evolution & nurturing system

export type PetStage = 'egg' | 'baby' | 'adult';
export type PetRarity = 'common' | 'rare' | 'legendary';

export interface Pet {
  id: number;
  type: string;
  hearts: number;
  stage: PetStage;
  rarity: PetRarity;
  name?: string;
}

// Evolution thresholds
const EVOLUTION_THRESHOLDS = {
  baby: 5,   // 5 hearts → baby
  adult: 15, // 15 hearts → adult
};

// Pet types by rarity
export const PET_POOL = {
  common: ['🐶', '🐱', '🐰', '🐻', '🐸', '🐨', '🐭', '🐹', '🐔', '🐷', '🐮', '🐴', '🐿️', '🦔', '🐝', '🐞', '🐌', '🦆', '🐠', '🐡'],
  rare: ['🦊', '🐼', '🦁', '🐧', '🐬', '🐳', '🦋', '🐢', '🦓', '🦒', '🦈', '🐙', '🦜', '🦥', '🦦', '🦫'],
  legendary: ['🦄', '🐉', '🦅', '🐺', '🦩', '🦚', '🦇', '🐋', '🦑', '🦖', '🦕', '🐊'],
};

// Gacha rates
export const GACHA_RATES = {
  common: 0.60,
  rare: 0.30,
  legendary: 0.10,
};

// Pity system: guaranteed rare+ every N pulls
export const PITY_THRESHOLD = 10;
export const DUPE_STAR_REWARD: Record<PetRarity, number> = {
  common: 3,
  rare: 6,
  legendary: 12,
};

export const GACHA_COST = 8; // stars per pull

// Feed cost by stage
export const getFeedCost = (stage: PetStage): number => {
  switch (stage) {
    case 'egg': return 2;
    case 'baby': return 4;
    case 'adult': return 6;
  }
};

// Keep backward compat
export const FEED_COST = 2;

export const getStage = (hearts: number): PetStage => {
  if (hearts >= EVOLUTION_THRESHOLDS.adult) return 'adult';
  if (hearts >= EVOLUTION_THRESHOLDS.baby) return 'baby';
  return 'egg';
};

export const getStageEmoji = (stage: PetStage): string => {
  switch (stage) {
    case 'egg': return '🥚';
    case 'baby': return '🐣';
    case 'adult': return '⭐';
  }
};

export const getNextEvolutionHearts = (hearts: number): number | null => {
  if (hearts < EVOLUTION_THRESHOLDS.baby) return EVOLUTION_THRESHOLDS.baby;
  if (hearts < EVOLUTION_THRESHOLDS.adult) return EVOLUTION_THRESHOLDS.adult;
  return null;
};

export const getPetEncouragement = (stage: PetStage): string => {
  const messages: Record<PetStage, string[]> = {
    egg: ['快幫我孵化吧！🥚', '我好想出來玩～', '再多餵我一點！'],
    baby: ['你好棒喔！⭐', '繼續加油！💪', '我最喜歡你了！❤️', '一起學英文吧！📖'],
    adult: ['你是最棒的小英雄！🦸', '我們是最強搭檔！🤜🤛', '今天也要加油喔！🌟', '你已經很厲害了！👑'],
  };
  const pool = messages[stage];
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getRarityLabel = (rarity: PetRarity): string => {
  switch (rarity) {
    case 'common': return '普通';
    case 'rare': return '稀有';
    case 'legendary': return '傳說';
  }
};

export const getRarityColor = (rarity: PetRarity): string => {
  switch (rarity) {
    case 'common': return 'game-green';
    case 'rare': return 'game-blue';
    case 'legendary': return 'game-amber';
  }
};

// Gacha pull
export const gachaPull = (): { type: string; rarity: PetRarity } => {
  const roll = Math.random();
  let rarity: PetRarity;
  if (roll < GACHA_RATES.legendary) {
    rarity = 'legendary';
  } else if (roll < GACHA_RATES.legendary + GACHA_RATES.rare) {
    rarity = 'rare';
  } else {
    rarity = 'common';
  }
  const pool = PET_POOL[rarity];
  const type = pool[Math.floor(Math.random() * pool.length)];
  return { type, rarity };
};

// Gacha pull without duplicates
export const gachaPullNoDupe = (ownedTypes: string[]): { type: string; rarity: PetRarity } | null => {
  const roll = Math.random();
  let rarity: PetRarity;
  if (roll < GACHA_RATES.legendary) rarity = 'legendary';
  else if (roll < GACHA_RATES.legendary + GACHA_RATES.rare) rarity = 'rare';
  else rarity = 'common';

  let pool = PET_POOL[rarity].filter(t => !ownedTypes.includes(t));
  if (pool.length === 0) {
    const rarities: PetRarity[] = ['common', 'rare', 'legendary'];
    for (const r of rarities) {
      pool = PET_POOL[r].filter(t => !ownedTypes.includes(t));
      if (pool.length > 0) { rarity = r; break; }
    }
  }
  if (pool.length === 0) return null;
  const type = pool[Math.floor(Math.random() * pool.length)];
  return { type, rarity };
};

// Migrate old pets to new format
export const migratePet = (pet: any): Pet => {
  return {
    id: pet.id,
    type: pet.type,
    hearts: pet.hearts || 0,
    stage: getStage(pet.hearts || 0),
    rarity: pet.rarity || 'common',
    name: pet.name,
  };
};
