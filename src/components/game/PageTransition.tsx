import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

const PageTransition = ({ children, transitionKey }: PageTransitionProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={transitionKey}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
