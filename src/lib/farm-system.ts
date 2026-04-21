// Farm/Ranch system configuration

export interface FarmItem {
  id: string;
  name: string;
  emoji: string;
  type: 'seed' | 'animal';
  cost: number;
  maxGrowth: number;
  harvestReward: number;
  growthStages: string[]; // emoji per stage
  description: string;
}

export const FARM_ITEMS: FarmItem[] = [
  // Seeds
  { id: 'seed_sunflower', name: '向日葵種子', emoji: '🌻', type: 'seed', cost: 3, maxGrowth: 5, harvestReward: 5, growthStages: ['🌱', '🌿', '🪴', '🌾', '🌻'], description: '陽光下綻放的向日葵' },
  { id: 'seed_tomato', name: '番茄種子', emoji: '🍅', type: 'seed', cost: 5, maxGrowth: 8, harvestReward: 8, growthStages: ['🌱', '🌿', '🪴', '🌿', '🍃', '🌸', '🟢', '🍅'], description: '紅通通的美味番茄' },
  { id: 'seed_corn', name: '玉米種子', emoji: '🌽', type: 'seed', cost: 8, maxGrowth: 10, harvestReward: 12, growthStages: ['🌱', '🌿', '🪴', '🌿', '🌾', '🌾', '🌿', '🌾', '🌽', '🌽'], description: '金黃色的甜玉米' },
  { id: 'seed_strawberry', name: '草莓種子', emoji: '🍓', type: 'seed', cost: 6, maxGrowth: 7, harvestReward: 9, growthStages: ['🌱', '🌿', '🪴', '🌸', '🌸', '🟢', '🍓'], description: '香甜多汁的草莓' },
  { id: 'seed_tulip', name: '鬱金香種子', emoji: '🌷', type: 'seed', cost: 4, maxGrowth: 6, harvestReward: 6, growthStages: ['🌱', '🌿', '🪴', '🌿', '🌸', '🌷'], description: '優雅美麗的鬱金香' },
  { id: 'seed_watermelon', name: '西瓜種子', emoji: '🍉', type: 'seed', cost: 10, maxGrowth: 12, harvestReward: 15, growthStages: ['🌱', '🌿', '🪴', '🌿', '🌿', '🌸', '🌸', '🟢', '🟢', '🟢', '🍈', '🍉'], description: '巨大清涼的西瓜' },

  // Animals
  { id: 'animal_chicken', name: '小雞', emoji: '🐔', type: 'animal', cost: 10, maxGrowth: 8, harvestReward: 14, growthStages: ['🥚', '🥚', '🐣', '🐣', '🐥', '🐥', '🐤', '🐔'], description: '咕咕叫的小母雞' },
  { id: 'animal_cow', name: '小牛', emoji: '🐄', type: 'animal', cost: 20, maxGrowth: 15, harvestReward: 28, growthStages: ['🍼', '🍼', '🐮', '🐮', '🐮', '🐮', '🐄', '🐄', '🐄', '🐄', '🐄', '🐄', '🐄', '🐄', '🐄'], description: '產奶的乳牛' },
  { id: 'animal_sheep', name: '小羊', emoji: '🐑', type: 'animal', cost: 15, maxGrowth: 10, harvestReward: 20, growthStages: ['🍼', '🍼', '🐏', '🐏', '🐏', '🐑', '🐑', '🐑', '🐑', '🐑'], description: '毛茸茸的綿羊' },
  { id: 'animal_pig', name: '小豬', emoji: '🐷', type: 'animal', cost: 12, maxGrowth: 9, harvestReward: 16, growthStages: ['🍼', '🐽', '🐽', '🐖', '🐖', '🐖', '🐷', '🐷', '🐷'], description: '圓滾滾的小豬' },
];

export interface FarmPlot {
  id: string;
  plotIndex: number;
  itemId: string;
  itemType: 'seed' | 'animal';
  growth: number;
  maxGrowth: number;
}

export const getFarmItem = (itemId: string): FarmItem | undefined =>
  FARM_ITEMS.find(i => i.id === itemId);

export const getGrowthEmoji = (item: FarmItem, growth: number): string => {
  if (growth >= item.maxGrowth) return item.emoji;
  const idx = Math.min(growth, item.growthStages.length - 1);
  return item.growthStages[idx];
};

export const isFullyGrown = (growth: number, maxGrowth: number): boolean =>
  growth >= maxGrowth;

export const getGrowthPercent = (growth: number, maxGrowth: number): number =>
  Math.min(100, Math.round((growth / maxGrowth) * 100));
