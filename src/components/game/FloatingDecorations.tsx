import React from 'react';

const FloatingDecorations = () => {
  const decorations = ['⭐', '☁️', '✨', '💫'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-lg select-none opacity-15"
          style={{
            left: `${(i * 25) + 5}%`,
            animation: `float-up ${18 + i * 3}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingDecorations;
