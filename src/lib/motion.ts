import type { Easing } from 'framer-motion';

export const easings: Record<string, Easing> = {
  // Smooth, elegant entrance
  easeOut: [0.21, 0.47, 0.32, 0.98] as const,
  // Snappy, spring-like interactions
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  // Smooth transitions
  easeInOut: [0.65, 0, 0.35, 1] as const,
};

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.5,
};

export const staggers = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
};

// Check if user prefers reduced motion (must be called inside a component/hook)
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
