import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  subtitle?: string;
}

export const SectionHeading = React.forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ className, children, subtitle, ...props }, ref) => {
    return (
      <div className="mb-12 md:mb-20 flex flex-col items-start">
        {subtitle && (
          <span className="mb-2 text-xs md:text-sm font-medium tracking-widest uppercase text-color-primary-500">
            {subtitle}
          </span>
        )}
        <h2
          ref={ref}
          className={cn("text-4xl md:text-6xl font-bold tracking-tighter text-foreground font-display", className)}
          {...props}
        >
          {children}
        </h2>
        <div className="h-1 w-20 mt-6 bg-gradient-to-r from-color-primary-500 to-transparent rounded-full" />
      </div>
    );
  }
);
SectionHeading.displayName = "SectionHeading";
