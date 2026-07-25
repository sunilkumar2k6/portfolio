import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden active:scale-95 transition-transform";
    
    const variants = {
      primary: "bg-color-primary-600 text-white hover:bg-color-primary-500 shadow-sm shadow-color-primary-500/20",
      secondary: "bg-surface-elevated text-foreground hover:bg-border",
      ghost: "hover:bg-surface-elevated hover:text-foreground",
      outline: "border border-border bg-transparent hover:bg-surface-elevated",
      link: "underline-offset-4 hover:underline text-color-primary-600 dark:text-color-primary-500",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 py-2 px-4",
      lg: "h-11 px-8 text-lg",
      icon: "h-10 w-10",
    };

    const isLink = variant === 'link';
    const motionProps = isLink ? {} : {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...motionProps}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
