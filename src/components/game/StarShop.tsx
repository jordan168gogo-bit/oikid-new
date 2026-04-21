import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Check, Lock, Sparkles } from 'lucide-react';
import { SHOP_ITEMS, getCategoryLabel, getCategoryEmoji, type ShopItem, type ShopItemCategory } from '@/lib/shop-items';

interface StarShopProps {
  stars: number;
  purchasedItems: string[];
  equippedItems: Record<string, string>;
  onPurchase: (item: ShopItem) => void;
  onEquip: (itemId: string, category: string) => void;
}

const CATEGORIES: ShopItemCategory[] = ['theme', 'frame', 'title', 'rename'];

const StarShop = ({ stars, purchasedItems, equippedItems, onPurchase, onEquip }: StarShopProps) => {
  const [selectedCat, setSelectedCat] = useState<ShopItemCategory>('theme');
  const [justBought, setJustBought] = useState<string | null>(null);

  const filteredItems = SHOP_ITEMS.filter(item => item.category === selectedCat);

  const handleBuy = (item: ShopItem) => {
    if (purchasedItems.includes(item.id) && item.category !== 'rename') return;
    if (stars < item.cost) return;
    onPurchase(item);
    setJustBought(item.id);
    setTimeout(() => setJustBought(null), 1500);
  };

  return (
    <motion.div
      className="w-full max-w-3xl game-card border-game-amber/30 p-6 sm:p-10 border-t-8 border-t-game-amber"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <ShoppingBag className="text-game-amber" size={36} /> 星星商店
        </h2>
        <div className="bg-game-amber-light text-game-amber px-5 py-2 rounded-full font-bold text-lg border border-game-amber/20 shadow-inner flex items-center gap-2">
          <Star fill="currentColor" className="text-game-star" size={24} /> {stars}
        </div>
      </div>

      {/* Currently equipped */}
      {Object.keys(equippedItems).length > 0 && (
        <div className="bg-muted/40 rounded-xl p-3 mb-5 border border-border">
          <p className="text-xs font-bold text-muted-foreground mb-2">🎒 已裝備：</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(equippedItems).map(([cat, itemId]) => {
              const item = SHOP_ITEMS.find(i => i.id === itemId);
              if (!item) return null;
              return (
                <span key={cat} className="inline-flex items-center gap-1 px-2.5 py-1 bg-game-amber/10 text-game-amber rounded-full text-xs font-bold border border-game-amber/20">
                  {item.emoji} {item.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
              selectedCat === cat
                ? 'bg-game-amber/15 text-game-amber border border-game-amber/30'
                : 'bg-muted text-muted-foreground border border-border hover:bg-muted/80'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {getCategoryEmoji(cat)} {getCategoryLabel(cat)}
          </motion.button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => {
            const owned = purchasedItems.includes(item.id) && item.category !== 'rename';
            const equipped = equippedItems[item.category] === item.id;
            const canAfford = stars >= item.cost;
            const isBuying = justBought === item.id;

            return (
              <motion.div
                key={item.id}
                className={`relative bg-muted/30 rounded-2xl p-5 border-2 transition-all ${
                  equipped ? 'border-game-amber/50 bg-game-amber/5 ring-1 ring-game-amber/20' :
                  owned ? 'border-game-green/30 bg-game-green/5' :
                  canAfford ? 'border-game-amber/20 hover:border-game-amber/40 hover:shadow-md' :
                  'border-border opacity-60'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                {equipped && (
                  <div className="absolute top-2 right-2 bg-game-amber text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Sparkles size={10} /> 使用中
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-4xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1 text-game-amber font-bold">
                    <Star fill="currentColor" size={16} /> {item.cost}
                  </div>

                  {owned ? (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => onEquip(item.id, item.category)}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-sm transition-colors ${
                          equipped
                            ? 'bg-muted text-muted-foreground border border-border'
                            : 'bg-gradient-to-r from-game-purple to-game-pink text-white'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {equipped ? '卸下' : '裝備'}
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-sm transition-colors ${
                        canAfford
                          ? 'bg-gradient-to-r from-game-amber to-game-orange text-white hover:shadow-md'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      whileTap={canAfford ? { scale: 0.95 } : undefined}
                    >
                      {!canAfford && <Lock size={12} className="inline mr-1" />}
                      {isBuying ? '✅ 購買成功！' : '購買'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StarShop;
