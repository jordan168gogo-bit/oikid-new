import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  emoji?: string;
  delay: number;
}

// Correct answer burst effect
export const CorrectBurst = ({ show, onDone }: { show: boolean; onDone: () => void }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) return;
    const colors = ['#FF6B35', '#FF1493', '#FFD700', '#00CED1', '#9B59B6', '#2ECC71'];
    const emojis = ['⭐', '✨', '🌟', '💫', '🎉'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: 30 + Math.random() * 40, // 30%-70% of width
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 16,
        emoji: i < 5 ? emojis[i] : undefined,
        delay: Math.random() * 0.3,
      });
    }
    setParticles(newParticles);
    const timer = setTimeout(() => {
      setParticles([]);
      onDone();
    }, 1500);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[90]"
          style={{ left: `${p.x}%`, top: '40%' }}
          initial={{ opacity: 1, y: 0, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, -(100 + Math.random() * 200)],
            x: [(Math.random() - 0.5) * 200],
            scale: [0, 1.5, 0.5],
            rotate: [0, Math.random() * 360],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        >
          {p.emoji ? (
            <span style={{ fontSize: p.size + 8 }}>{p.emoji}</span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

// Combo display
export const ComboDisplay = ({ combo }: { combo: number }) => {
  if (combo < 2) return null;
  
  const getComboStyle = () => {
    if (combo >= 10) return { text: '🔥🔥🔥 PERFECT!', color: 'text-game-pink' };
    if (combo >= 7) return { text: '🔥🔥 AMAZING!', color: 'text-game-orange' };
    if (combo >= 5) return { text: '🔥 GREAT!', color: 'text-game-amber' };
    if (combo >= 3) return { text: '⚡ NICE!', color: 'text-game-blue' };
    return { text: `${combo} Combo`, color: 'text-game-green' };
  };

  const style = getComboStyle();

  return (
    <motion.div
      key={combo}
      className={`fixed top-20 right-4 z-[80] ${style.color} font-bold text-xl sm:text-2xl pointer-events-none`}
      initial={{ scale: 0.3, opacity: 0, x: 50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0.3, opacity: 0 }}
      transition={{ type: 'spring', bounce: 0.6 }}
    >
      <span className="drop-shadow-lg">{style.text}</span>
      <motion.span
        className="block text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        x{combo}
      </motion.span>
    </motion.div>
  );
};

// Level up celebration
export const LevelUpCelebration = ({ show, level, title, emoji, onDone }: {
  show: boolean;
  level: number;
  title: string;
  emoji: string;
  onDone: () => void;
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDone}
        >
          <motion.div
            className="bg-gradient-to-br from-game-amber-light to-game-orange-light p-10 rounded-[2rem] text-center shadow-2xl border-4 border-game-amber/40 max-w-sm mx-4"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <motion.div
              className="text-7xl mb-3"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, -15, 15, 0],
              }}
              transition={{ duration: 1, repeat: 2 }}
            >
              {emoji}
            </motion.div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-amber to-game-orange mb-1">
              升級了！
            </h2>
            <p className="text-xl font-bold text-foreground">Lv.{level}</p>
            <p className="text-lg text-game-orange font-bold mt-1">{title}</p>
            <motion.div
              className="mt-4 text-4xl"
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              🎆🎇🎆
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const HatchCelebration = ({
  show,
  stage,
  petType,
  rarity,
  onDone,
}: {
  show: boolean;
  stage: 'baby' | 'adult';
  petType: string;
  rarity: 'common' | 'rare' | 'legendary';
  onDone: () => void;
}) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [show, onDone]);

  const rarityStyles = {
    common: 'from-game-green/15 via-card to-game-green/5 border-game-green/30',
    rare: 'from-game-blue/15 via-card to-game-blue/5 border-game-blue/30',
    legendary: 'from-game-amber/20 via-card to-game-orange-light border-game-amber/40',
  };

  const rarityLabels = {
    common: '普通夥伴',
    rare: '稀有夥伴',
    legendary: '傳說夥伴',
  };

  const revealEmoji = stage === 'baby' ? '🐣' : petType;
  const title = stage === 'baby' ? '孵化成功！' : '進化完成！';
  const subtitle = stage === 'baby' ? '你的神秘蛋裂開了，夥伴出生囉！' : '愛心集滿，夥伴正式長大登場！';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDone}
        >
          <motion.div
            className={`relative w-full max-w-md overflow-hidden rounded-[2rem] border-4 bg-gradient-to-br p-8 text-center shadow-2xl ${rarityStyles[rarity]}`}
            initial={{ scale: 0.75, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/60 to-transparent"
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />

            <motion.div
              className="mb-3 text-5xl"
              animate={{ rotate: [0, -8, 8, -6, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 0.9, repeat: 2 }}
            >
              🥚
            </motion.div>

            <motion.div
              className="mb-2 text-sm font-bold text-muted-foreground"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {rarityLabels[rarity]}
            </motion.div>

            <motion.h2
              className="text-3xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mt-2 text-base font-semibold text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {subtitle}
            </motion.p>

            <div className="relative my-8 flex items-center justify-center">
              <motion.div
                className="absolute h-36 w-36 rounded-full bg-game-amber/15 blur-2xl"
                animate={{ scale: [0.85, 1.15, 0.95], opacity: [0.4, 0.8, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <motion.div
                className="absolute text-3xl"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 1.6], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="relative text-8xl drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
                animate={{ opacity: 1, scale: [0.4, 1.18, 1], rotate: [12, -8, 0], y: [18, -10, 0] }}
                transition={{ duration: 1, delay: 0.55, times: [0, 0.7, 1] }}
              >
                {revealEmoji}
              </motion.div>
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 text-2xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span>🌟</span>
              <span>💖</span>
              <span>🎉</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
