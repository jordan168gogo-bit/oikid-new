// Star Shop items and configuration

export type ShopItemCategory = 'rename' | 'theme' | 'frame' | 'title';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  cost: number;
  category: ShopItemCategory;
  value: string; // what gets applied
}

export const SHOP_ITEMS: ShopItem[] = [
  // Rename cards
  { id: 'rename_card', name: '改名卡', description: '幫你的夥伴取一個酷炫的名字', emoji: '📝', cost: 15, category: 'rename', value: 'rename' },

  // Theme backgrounds
  { id: 'theme_ocean', name: '海洋主題', description: '清涼海洋背景', emoji: '🌊', cost: 30, category: 'theme', value: 'ocean' },
  { id: 'theme_forest', name: '森林主題', description: '神秘森林背景', emoji: '🌲', cost: 30, category: 'theme', value: 'forest' },
  { id: 'theme_space', name: '太空主題', description: '浩瀚宇宙背景', emoji: '🚀', cost: 50, category: 'theme', value: 'space' },
  { id: 'theme_candy', name: '糖果主題', description: '甜蜜糖果世界', emoji: '🍬', cost: 30, category: 'theme', value: 'candy' },
  { id: 'theme_sakura', name: '櫻花主題', description: '浪漫櫻花飄落', emoji: '🌸', cost: 40, category: 'theme', value: 'sakura' },

  // Avatar frames
  { id: 'frame_gold', name: '金色邊框', description: '閃耀金色夥伴邊框', emoji: '🏅', cost: 25, category: 'frame', value: 'gold' },
  { id: 'frame_rainbow', name: '彩虹邊框', description: '七彩繽紛邊框', emoji: '🌈', cost: 35, category: 'frame', value: 'rainbow' },
  { id: 'frame_fire', name: '火焰邊框', description: '帥氣火焰特效邊框', emoji: '🔥', cost: 40, category: 'frame', value: 'fire' },
  { id: 'frame_ice', name: '冰晶邊框', description: '冰雪奇緣邊框', emoji: '❄️', cost: 40, category: 'frame', value: 'ice' },

  // Custom titles
  { id: 'title_hero', name: '小英雄稱號', description: '顯示「小英雄」頭銜', emoji: '🦸', cost: 20, category: 'title', value: '小英雄' },
  { id: 'title_wizard', name: '魔法師稱號', description: '顯示「魔法師」頭銜', emoji: '🧙', cost: 20, category: 'title', value: '魔法師' },
  { id: 'title_champion', name: '冠軍稱號', description: '顯示「冠軍」頭銜', emoji: '🏆', cost: 50, category: 'title', value: '冠軍' },
  { id: 'title_dragon', name: '馴龍高手稱號', description: '顯示「馴龍高手」頭銜', emoji: '🐉', cost: 60, category: 'title', value: '馴龍高手' },
];

export const getCategoryLabel = (cat: ShopItemCategory): string => {
  switch (cat) {
    case 'rename': return '改名卡';
    case 'theme': return '主題背景';
    case 'frame': return '夥伴邊框';
    case 'title': return '稱號';
  }
};

export const getCategoryEmoji = (cat: ShopItemCategory): string => {
  switch (cat) {
    case 'rename': return '📝';
    case 'theme': return '🎨';
    case 'frame': return '🖼️';
    case 'title': return '🏷️';
  }
};
