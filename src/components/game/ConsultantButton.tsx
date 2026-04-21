import React from 'react';
import { Headphones } from 'lucide-react';

const ConsultantButton = () => (
  <a
    href="https://abc-buddy-builder.lovable.app/jordan"
    target="_blank"
    rel="noreferrer"
    className="fixed left-3 right-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-[60] inline-flex items-center justify-center gap-2 rounded-full bg-card/95 px-4 py-3 text-sm font-semibold text-foreground shadow-lg ring-1 ring-game-orange/30 backdrop-blur-md sm:left-6 sm:right-auto sm:bottom-6 sm:px-5 sm:py-3 sm:text-base"
  >
    <Headphones size={16} className="shrink-0 text-game-orange" />
    <span className="truncate">聯繫專屬顧問</span>
  </a>
);

export default ConsultantButton;
