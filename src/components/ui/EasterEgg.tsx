import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const EasterEgg: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let currentKeys: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      currentKeys = [...currentKeys, e.key];
      if (currentKeys.length > secretCode.length) {
        currentKeys.shift();
      }
      
      if (currentKeys.join(',') === secretCode.join(',')) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 5000);
        currentKeys = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-[999] bg-background border border-color-primary-500 rounded-lg p-4 shadow-2xl glass font-mono flex items-center gap-4"
        >
          <div className="p-2 bg-color-primary-500/20 text-color-primary-500 rounded">
            <Terminal size={20} />
          </div>
          <div>
            <p className="text-color-primary-500 font-bold text-sm">DEVELOPER MODE UNLOCKED</p>
            <p className="text-text-muted text-xs mt-1">Quality is not an act, it is a habit.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
