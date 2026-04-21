import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sprout, Beef, Scissors, Droplets, ShoppingBag } from 'lucide-react';
import { FARM_ITEMS, getFarmItem, getGrowthEmoji, isFullyGrown, getGrowthPercent, type FarmItem, type FarmPlot } from '@/lib/farm-system';
import { supabase } from '@/integrations/supabase/client';

interface FarmProps {
  userId: string;
  stars: number;
  waterTokens: number;
  onUseWaterToken: () => boolean;
  onSpendStars: (n: number) => void;
  onEarnStars: (n: number) => void;
  onGoToShop: () => void;
}

const Farm = ({ userId, stars, waterTokens, onUseWaterToken, onSpendStars, onEarnStars, onGoToShop }: FarmProps) => {
  const [plots, setPlots] = useState<(FarmPlot | null)[]>(Array(9).fill(null));
  const [selectedItem, setSelectedItem] = useState<FarmItem | null>(null);
  const [shopOpen, setShopOpen] = useState(false);
  const [harvestAnim, setHarvestAnim] = useState<number | null>(null);
  const [waterAnim, setWaterAnim] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load plots from DB
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('farm_plots')
        .select('*')
        .eq('user_id', userId);
      const arr: (FarmPlot | null)[] = Array(9).fill(null);
      data?.forEach((p: any) => {
        arr[p.plot_index] = {
          id: p.id,
          plotIndex: p.plot_index,
          itemId: p.item_id,
          itemType: p.item_type,
          growth: p.growth,
          maxGrowth: p.max_growth,
        };
      });
      setPlots(arr);
      setLoaded(true);
    };
    load();
  }, [userId]);

  // Plant on empty plot
  const plantOnPlot = useCallback(async (plotIndex: number) => {
    if (!selectedItem || plots[plotIndex]) return;
    if (stars < selectedItem.cost) return;

    onSpendStars(selectedItem.cost);

    const { data } = await supabase.from('farm_plots').insert({
      user_id: userId,
      plot_index: plotIndex,
      item_id: selectedItem.id,
      item_type: selectedItem.type,
      growth: 0,
      max_growth: selectedItem.maxGrowth,
    }).select().single();

    if (data) {
      const newPlots = [...plots];
      newPlots[plotIndex] = {
        id: data.id,
        plotIndex,
        itemId: selectedItem.id,
        itemType: selectedItem.type,
        growth: 0,
        maxGrowth: selectedItem.maxGrowth,
      };
      setPlots(newPlots);
    }
    setSelectedItem(null);
  }, [selectedItem, plots, stars, userId, onSpendStars]);

  // Water/feed a plot (+1 growth)
  const waterPlot = useCallback(async (plotIndex: number) => {
    const plot = plots[plotIndex];
    if (!plot || isFullyGrown(plot.growth, plot.maxGrowth)) return;

    // Must have water tokens (earned from games)
    const ok = onUseWaterToken();
    if (!ok) return;

    const newGrowth = plot.growth + 1;
    setWaterAnim(plotIndex);
    setTimeout(() => setWaterAnim(null), 800);

    await supabase.from('farm_plots').update({ growth: newGrowth }).eq('id', plot.id);
    const newPlots = [...plots];
    newPlots[plotIndex] = { ...plot, growth: newGrowth };
    setPlots(newPlots);
  }, [plots, onUseWaterToken]);

  // Harvest a fully grown plot
  const harvestPlot = useCallback(async (plotIndex: number) => {
    const plot = plots[plotIndex];
    if (!plot || !isFullyGrown(plot.growth, plot.maxGrowth)) return;

    const item = getFarmItem(plot.itemId);
    if (!item) return;

    setHarvestAnim(plotIndex);
    setTimeout(() => setHarvestAnim(null), 1200);

    onEarnStars(item.harvestReward);
    await supabase.from('farm_plots').delete().eq('id', plot.id);

    const newPlots = [...plots];
    newPlots[plotIndex] = null;
    setPlots(newPlots);
  }, [plots, onEarnStars]);

  const handlePlotClick = (plotIndex: number) => {
    const plot = plots[plotIndex];
    if (!plot && selectedItem) {
      plantOnPlot(plotIndex);
    } else if (plot && isFullyGrown(plot.growth, plot.maxGrowth)) {
      harvestPlot(plotIndex);
    } else if (plot) {
      waterPlot(plotIndex);
    }
  };

  const seeds = FARM_ITEMS.filter(i => i.type === 'seed');
  const animals = FARM_ITEMS.filter(i => i.type === 'animal');

  if (!loaded) {
    return (
      <div className="w-full max-w-3xl text-center py-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl inline-block">🌻</motion.div>
        <p className="text-muted-foreground mt-4 font-semibold">載入農場中...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="game-card border-game-green/30 p-6 sm:p-8 border-t-8 border-t-game-green mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
            🌾 我的農牧場
          </h2>
          <div className="flex items-center gap-3">
            <div className="bg-game-blue-light text-game-blue px-4 py-2 rounded-full font-bold text-lg border border-game-blue/20 flex items-center gap-2">
              <Droplets size={20} /> {waterTokens}
            </div>
            <div className="bg-game-amber-light text-game-amber px-4 py-2 rounded-full font-bold text-lg border border-game-amber/20 flex items-center gap-2">
              <Star fill="currentColor" className="text-game-star" size={20} /> {stars}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted/40 rounded-xl p-3 mb-5 border border-border text-sm text-muted-foreground">
          <p className="font-semibold mb-1">🌱 玩法說明：</p>
          <p>1. 購買種子或動物 → 2. 點空格種下 → 3. <strong className="text-game-blue">去玩遊戲答對題目</strong>賺取💧 → 4. 回來澆水/餵食 → 5. 成熟後收成得⭐</p>
          <p className="mt-1 text-xs text-game-blue font-semibold">💡 每答對一題 = 獲得 1💧 澆水/餵食次數</p>
        </div>

        {/* Farm Grid 3x3 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {plots.map((plot, i) => {
            const item = plot ? getFarmItem(plot.itemId) : null;
            const grown = plot ? isFullyGrown(plot.growth, plot.maxGrowth) : false;
            const percent = plot ? getGrowthPercent(plot.growth, plot.maxGrowth) : 0;
            const currentEmoji = item && plot ? getGrowthEmoji(item, plot.growth) : null;

            return (
              <motion.button
                key={i}
                onClick={() => handlePlotClick(i)}
                className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  plot
                    ? grown
                      ? 'border-game-amber/50 bg-gradient-to-br from-game-amber/10 to-game-orange/10 hover:shadow-lg hover:shadow-game-amber/20'
                      : 'border-game-green/30 bg-gradient-to-br from-game-green/5 to-game-green/10 hover:border-game-green/50'
                    : selectedItem
                      ? 'border-dashed border-game-green/40 bg-game-green/5 hover:bg-game-green/10 hover:border-game-green/60 cursor-pointer'
                      : 'border-dashed border-border bg-muted/20 hover:bg-muted/30'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {/* Water animation */}
                <AnimatePresence>
                  {waterAnim === i && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-4xl z-10"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      💧
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Harvest animation */}
                <AnimatePresence>
                  {harvestAnim === i && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-10"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 0, y: -40 }}
                    >
                      <span className="text-3xl">⭐</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {plot && item ? (
                  <>
                    <motion.span
                      className="text-4xl sm:text-5xl drop-shadow-md"
                      animate={grown ? { scale: [1, 1.1, 1] } : {}}
                      transition={grown ? { repeat: Infinity, duration: 2 } : {}}
                    >
                      {currentEmoji}
                    </motion.span>
                    {/* Progress bar */}
                    <div className="w-4/5 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${grown ? 'bg-game-amber' : 'bg-game-green'}`}
                        initial={false}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {grown && (
                      <span className="text-[10px] font-bold text-game-amber mt-1 flex items-center gap-0.5">
                        <Scissors size={10} /> 收成 +{item.harvestReward}⭐
                      </span>
                    )}
                    {!grown && (
                      <span className={`text-[10px] font-bold mt-1 flex items-center gap-0.5 ${waterTokens > 0 ? 'text-game-green' : 'text-muted-foreground'}`}>
                        {plot.itemType === 'seed' ? <Droplets size={10} /> : <Beef size={10} />}
                        {plot.growth}/{plot.maxGrowth}
                        {waterTokens <= 0 && <span className="ml-1 text-destructive">需💧</span>}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {selectedItem ? (
                      <div className="flex flex-col items-center gap-1">
                        <Sprout className="text-game-green/40" size={28} />
                        <span className="text-[10px] text-game-green font-semibold">點擊種下</span>
                      </div>
                    ) : (
                      <span className="text-2xl opacity-20">🟫</span>
                    )}
                  </>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected item indicator */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="bg-game-green/10 border border-game-green/30 rounded-xl p-3 mb-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedItem.emoji}</span>
                <div>
                  <p className="font-bold text-sm text-foreground">{selectedItem.name}</p>
                  <p className="text-xs text-muted-foreground">點擊空格種下 · 花費 {selectedItem.cost}⭐</p>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold"
                whileTap={{ scale: 0.95 }}
              >
                取消
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Farm Shop */}
        <div className="border-t border-border pt-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <ShoppingBag size={20} className="text-game-green" /> 農場商店
            </h3>
            <motion.button
              onClick={() => setShopOpen(!shopOpen)}
              className="px-3 py-1.5 bg-game-green/10 text-game-green rounded-full text-sm font-bold border border-game-green/20"
              whileTap={{ scale: 0.95 }}
            >
              {shopOpen ? '收起' : '展開商品'}
            </motion.button>
          </div>

          <AnimatePresence>
            {shopOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {/* Seeds */}
                <p className="text-sm font-bold text-game-green mb-2 flex items-center gap-1"><Sprout size={14} /> 種子</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {seeds.map(item => {
                    const canAfford = stars >= item.cost;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => canAfford && setSelectedItem(item)}
                        disabled={!canAfford}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selectedItem?.id === item.id
                            ? 'border-game-green bg-game-green/10 ring-1 ring-game-green/30'
                            : canAfford
                              ? 'border-game-green/20 bg-muted/30 hover:border-game-green/40'
                              : 'border-border bg-muted/10 opacity-50 cursor-not-allowed'
                        }`}
                        whileTap={canAfford ? { scale: 0.97 } : undefined}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="font-bold text-sm text-foreground">{item.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">成長{item.maxGrowth}次</span>
                          <span className="text-xs font-bold text-game-amber flex items-center gap-0.5">
                            <Star fill="currentColor" size={10} /> {item.cost}
                          </span>
                        </div>
                        <div className="text-[10px] text-game-green font-semibold mt-1">收成 +{item.harvestReward}⭐</div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Animals */}
                <p className="text-sm font-bold text-game-orange mb-2 flex items-center gap-1"><Beef size={14} /> 動物</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {animals.map(item => {
                    const canAfford = stars >= item.cost;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => canAfford && setSelectedItem(item)}
                        disabled={!canAfford}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selectedItem?.id === item.id
                            ? 'border-game-orange bg-game-orange/10 ring-1 ring-game-orange/30'
                            : canAfford
                              ? 'border-game-orange/20 bg-muted/30 hover:border-game-orange/40'
                              : 'border-border bg-muted/10 opacity-50 cursor-not-allowed'
                        }`}
                        whileTap={canAfford ? { scale: 0.97 } : undefined}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="font-bold text-sm text-foreground">{item.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">餵食{item.maxGrowth}次</span>
                          <span className="text-xs font-bold text-game-amber flex items-center gap-0.5">
                            <Star fill="currentColor" size={10} /> {item.cost}
                          </span>
                        </div>
                        <div className="text-[10px] text-game-orange font-semibold mt-1">收成 +{item.harvestReward}⭐</div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Farm;
