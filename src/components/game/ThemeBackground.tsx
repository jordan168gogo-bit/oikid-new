import React, { useMemo } from 'react';

interface ThemeBackgroundProps {
  theme: string;
}

// Use CSS keyframes for particles instead of framer-motion
const ThemeBackground = ({ theme }: ThemeBackgroundProps) => {
  // Memoize random positions so they don't recalculate on re-render
  const particles = useMemo(() => {
    switch (theme) {
      case 'theme_ocean':
        return {
          bubbles: Array.from({ length: 6 }, (_, i) => ({
            size: 6 + (i * 3) % 12,
            left: 5 + (i * 17) % 90,
            delay: i * 1.2,
            duration: 7 + (i * 2) % 6,
          })),
        };
      case 'theme_forest':
        return {
          leaves: Array.from({ length: 6 }, (_, i) => ({
            left: (i * 18) % 100,
            delay: i * 1.5,
            duration: 9 + (i * 2) % 5,
            emoji: ['🍃', '🌿', '🍂', '🍀'][i % 4],
          })),
        };
      case 'theme_space':
        return {
          stars: Array.from({ length: 20 }, (_, i) => ({
            size: 1 + (i % 3),
            left: (i * 5.1) % 100,
            top: (i * 7.3) % 100,
            delay: (i * 0.4) % 3,
          })),
        };
      case 'theme_candy':
        return {
          candies: Array.from({ length: 6 }, (_, i) => ({
            left: (i * 18) % 100,
            top: 10 + (i * 15) % 70,
            delay: i * 0.8,
            emoji: ['🍬', '🍭', '🧁', '🍩', '🍪', '🎂'][i],
          })),
        };
      case 'theme_sakura':
        return {
          petals: Array.from({ length: 8 }, (_, i) => ({
            left: (i * 13) % 100,
            delay: i * 1.1,
            duration: 8 + (i * 1.5) % 4,
          })),
        };
      default:
        return {};
    }
  }, [theme]);

  switch (theme) {
    case 'theme_ocean':
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-100 via-blue-200 to-indigo-300 opacity-60" />
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ height: '100px' }}>
            <path d="M0,100 C320,180 440,20 720,100 C1000,180 1120,20 1440,100 L1440,200 L0,200 Z" fill="rgba(59,130,246,0.1)">
              <animate attributeName="d" dur="6s" repeatCount="indefinite" values="
                M0,100 C320,180 440,20 720,100 C1000,180 1120,20 1440,100 L1440,200 L0,200 Z;
                M0,120 C320,40 440,180 720,80 C1000,20 1120,160 1440,120 L1440,200 L0,200 Z;
                M0,100 C320,180 440,20 720,100 C1000,180 1120,20 1440,100 L1440,200 L0,200 Z" />
            </path>
          </svg>
          {particles.bubbles?.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 border border-white/20 animate-bubble"
              style={{
                width: b.size,
                height: b.size,
                left: `${b.left}%`,
                bottom: '-10px',
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
              }}
            />
          ))}
        </div>
      );

    case 'theme_forest':
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-green-100 to-emerald-200 opacity-60" />
          <div className="absolute top-0 left-1/4 w-32 h-[60vh] bg-gradient-to-b from-yellow-200/15 to-transparent rotate-12 blur-2xl" />
          {particles.leaves?.map((l, i) => (
            <span
              key={i}
              className="absolute text-lg opacity-25 animate-fall"
              style={{
                left: `${l.left}%`,
                top: '-20px',
                animationDelay: `${l.delay}s`,
                animationDuration: `${l.duration}s`,
              }}
            >
              {l.emoji}
            </span>
          ))}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-green-300/20 to-transparent" />
        </div>
      );

    case 'theme_space':
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-indigo-900 to-purple-950 opacity-70" />
          {particles.stars?.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: s.size,
                height: s.size,
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
          <span className="absolute text-3xl opacity-20 animate-float" style={{ top: '15%', right: '10%' }}>🪐</span>
          <span className="absolute text-2xl opacity-15 animate-float" style={{ top: '60%', left: '8%', animationDelay: '2s' }}>🌙</span>
        </div>
      );

    case 'theme_candy':
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 opacity-60" />
          {particles.candies?.map((c, i) => (
            <span
              key={i}
              className="absolute text-xl opacity-20 animate-float"
              style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                animationDelay: `${c.delay}s`,
              }}
            >
              {c.emoji}
            </span>
          ))}
        </div>
      );

    case 'theme_sakura':
      return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-100 to-pink-200 opacity-60" />
          {particles.petals?.map((p, i) => (
            <span
              key={i}
              className="absolute text-base opacity-30 animate-fall"
              style={{
                left: `${p.left}%`,
                top: '-20px',
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              🌸
            </span>
          ))}
          <span className="absolute text-5xl opacity-10" style={{ bottom: '5%', right: '5%' }}>🌳</span>
        </div>
      );

    default:
      return null;
  }
};

export default ThemeBackground;
