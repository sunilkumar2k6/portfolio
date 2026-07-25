import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

export const useSEO = ({ title, description, url }: SEOProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    }
    
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    }

    if (url) {
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    }
  }, [title, description, url]);
};
