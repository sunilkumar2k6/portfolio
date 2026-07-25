import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  containerClass?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, className, containerClass, children, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn("py-16 md:py-24", className)}
        {...props}
      >
        <div className={cn("container mx-auto px-4 md:px-6 max-w-6xl", containerClass)}>
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";
