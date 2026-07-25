import React from 'react';
import { Button } from './Button';
import { useSEO } from '../../hooks/useSEO';

export const NotFound: React.FC = () => {
  useSEO({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-primary-600 dark:text-primary-500">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Page not found</h2>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <a href="/">
        <Button variant="primary">Return Home</Button>
      </a>
    </div>
  );
};
