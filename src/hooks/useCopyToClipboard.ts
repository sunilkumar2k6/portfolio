import { useState, useCallback } from 'react';

export const useCopyToClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), resetInterval);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setIsCopied(false);
      return false;
    }
  }, [resetInterval]);

  return { isCopied, copy };
};
