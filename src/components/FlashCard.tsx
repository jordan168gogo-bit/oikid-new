import { motion } from "framer-motion";
import { VocabWord } from "@/data/vocabulary";
import { Check } from "lucide-react";

interface FlashCardProps {
  word: VocabWord;
  isFlipped: boolean;
  onFlip: () => void;
  isLearned: boolean;
}

const FlashCard = ({ word, isFlipped, onFlip, isLearned }: FlashCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto cursor-pointer" style={{ perspective: '1200px' }} onClick={onFlip}>
      <motion.div
        className="relative w-full aspect-[3/4]"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' } as React.CSSProperties}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border border-border shadow-lg flex flex-col items-center justify-center p-8 gap-4"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as React.CSSProperties}
        >
          {isLearned && (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="w-5 h-5 text-success-foreground" />
            </div>
          )}
          <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {word.partOfSpeech}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
            {word.english}
          </h2>
          <p className="text-muted-foreground text-sm mt-4 text-center">點擊翻轉查看中文</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary text-primary-foreground shadow-lg flex flex-col items-center justify-center p-8 gap-6"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', WebkitTransform: 'rotateY(180deg)' } as React.CSSProperties}
        >
          <span className="text-sm font-medium opacity-80 tracking-wide uppercase">
            {word.partOfSpeech}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {word.chinese}
          </h2>
          <div className="mt-4 bg-primary-foreground/10 rounded-xl p-4 w-full">
            <p className="text-sm opacity-90 italic text-center">"{word.example}"</p>
          </div>
          <p className="text-sm opacity-60 mt-2">點擊翻回正面</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlashCard;
