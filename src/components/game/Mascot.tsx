import React from 'react';

interface MascotProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Mascot = ({ message, size = 'md' }: MascotProps) => {
  const sizeClasses = { sm: 'text-4xl', md: 'text-6xl', lg: 'text-8xl' };
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className={`${sizeClasses[size]} animate-bounce-slow hover-wiggle cursor-default drop-shadow-lg`}>🦊</div>
      {message && (
        <div className="relative bg-card px-4 py-2 rounded-2xl shadow-md border-2 border-game-orange-light max-w-[200px]">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l-2 border-t-2 border-game-orange-light rotate-45" />
          <p className="text-sm font-semibold text-muted-foreground text-center relative z-10">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Mascot;
