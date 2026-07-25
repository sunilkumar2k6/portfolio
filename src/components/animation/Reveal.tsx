import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { easings, durations, shouldReduceMotion } from '../../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content',
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduceMotion ? 0 : 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: durations.normal, delay: reduceMotion ? 0 : delay, ease: easings.easeOut }}
      >
        {children}
      </motion.div>
    </div>
  );
};
