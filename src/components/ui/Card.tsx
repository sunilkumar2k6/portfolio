import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { shouldReduceMotion } from '../../lib/motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => {
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
      setReduceMotion(shouldReduceMotion());
    }, []);
    
    const Component = interactive ? motion.div : 'div';
    const motionProps = interactive && !reduceMotion ? {
      whileHover: { y: -4, transition: { duration: 0.2 } }
    } : {};

    return (
      <Component
        ref={ref as any}
        className={cn(
          "rounded-xl border border-border bg-surface text-foreground shadow-sm",
          interactive && "cursor-pointer hover:shadow-md hover:border-color-primary-500/50 transition-colors",
          className
        )}
        {...motionProps}
        {...(props as any)}
      />
    );
  }
);
Card.displayName = "Card";
