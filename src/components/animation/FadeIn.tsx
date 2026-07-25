import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';
import { easings, durations, shouldReduceMotion } from '../../lib/motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = durations.normal,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
  }, []);

  const getInitialOffset = () => {
    if (reduceMotion || direction === 'none') return {};
    switch (direction) {
      case 'up': return { y: 20 };
      case 'down': return { y: -20 };
      case 'left': return { x: 20 };
      case 'right': return { x: -20 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialOffset() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: reduceMotion ? durations.fast : duration, delay: reduceMotion ? 0 : delay, ease: easings.easeOut }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
