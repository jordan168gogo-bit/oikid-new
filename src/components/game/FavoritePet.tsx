import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { getStage, getStageEmoji, getPetEncouragement, getRarityLabel, getRarityColor, type Pet } from '@/lib/pet-system';

interface FavoritePetProps {
  pet: Pet;
  childName?: string;
}

const getTimeGreeting = (): { emoji: string; text: string } => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return { emoji: '🌅', text: '早安！今天也一起加油吧～' };
  if (h >= 12 && h < 14) return { emoji: '☀️', text: '午安！吃飽了嗎？' };
  if (h >= 14 && h < 18) return { emoji: '🌤️', text: '下午好！繼續努力學英文～' };
  if (h >= 18 && h < 21) return { emoji: '🌙', text: '晚上好！今天學了好多呢！' };
  return { emoji: '🌟', text: '好晚了喔～早點睡覺明天繼續！' };
};

const PET_REACTIONS = [
  { emoji: '💕', text: '好開心！' },
  { emoji: '🎶', text: '啦啦啦～' },
  { emoji: '😆', text: '嘻嘻！' },
  { emoji: '🌟', text: '你好棒！' },
  { emoji: '🤗', text: '抱抱～' },
  { emoji: '💪', text: '加油！' },
  { emoji: '🎉', text: '耶！' },
  { emoji: '😊', text: '最喜歡你了' },
];

const FavoritePet = ({ pet, childName }: FavoritePetProps) => {
  const [reaction, setReaction] = useState<{ emoji: string; text: string } | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [showedGreeting, setShowedGreeting] = useState(false);

  const stage = getStage(pet.hearts || 0);
  const rarityColor = getRarityColor(pet.rarity || 'common');
  const timeGreeting = useMemo(() => getTimeGreeting(), []);

  // Show time greeting on first render
  React.useEffect(() => {
    if (!showedGreeting) {
      setReaction(timeGreeting);
      setShowedGreeting(true);
      const timer = setTimeout(() => setReaction(null), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTap = () => {
    const r = PET_REACTIONS[Math.floor(Math.random() * PET_REACTIONS.length)];
    setReaction(r);
    setTapCount(prev => prev + 1);

    const id = Date.now();
    const x = Math.random() * 80 - 40;
    setFloatingEmojis(prev => [...prev, { id, emoji: r.emoji, x }]);
    setTimeout(() => setFloatingEmojis(prev => prev.filter(e => e.id !== id)), 1200);
    setTimeout(() => setReaction(null), 2000);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer select-none"
      onClick={handleTap}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating emojis */}
      <AnimatePresence>
        {floatingEmojis.map(fe => (
          <motion.span
            key={fe.id}
            className="absolute text-2xl pointer-events-none z-20"
            initial={{ opacity: 1, y: 0, x: fe.x }}
            animate={{ opacity: 0, y: -60, x: fe.x + (Math.random() * 20 - 10) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ top: 0 }}
          >
            {fe.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            className="absolute -top-12 bg-card border border-border rounded-xl px-3 py-1.5 text-sm font-bold text-foreground shadow-md z-10 whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
          >
            {reaction.emoji} {reaction.text}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet */}
      <div className="relative">
        {stage === 'baby' && (
          <span className="absolute -top-2 -right-1 text-lg z-10 animate-bounce">🍼</span>
        )}
        {stage === 'adult' && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg z-10">👑</span>
        )}
        <motion.span
          className={`drop-shadow-md block text-center ${
            stage === 'egg' ? 'text-6xl' :
            stage === 'baby' ? 'text-5xl' :
            'text-6xl'
          }`}
          animate={tapCount > 0 ? {
            rotate: [0, -15, 15, -10, 10, 0],
            scale: [1, 1.15, 1],
          } : { y: [0, -4, 0] }}
          transition={tapCount > 0 ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={stage === 'baby' ? { filter: 'drop-shadow(0 0 6px rgba(255,182,193,0.6))' } : stage === 'adult' ? { filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' } : undefined}
        >
          {stage === 'egg' ? '🥚' : pet.type}
        </motion.span>
        {stage === 'adult' && (
          <span className="absolute -bottom-1 -left-1 text-xs">✨</span>
        )}
      </div>

      {/* Name & info */}
      <div className="mt-1 text-center">
        <p className="text-xs font-bold text-foreground">
          {pet.name || pet.type} {getStageEmoji(stage)}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {childName ? `${childName}的夥伴` : '點我互動！'}
        </p>
      </div>
    </motion.div>
  );
};

export default FavoritePet;
