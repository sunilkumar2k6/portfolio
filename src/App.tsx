import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { DesignSystem } from './pages/DesignSystem';
import { ThemeProvider } from './components/ThemeProvider';
import { NotFound } from './components/ui/NotFound';
import { Button } from './components/ui/Button';
import { CommandPalette } from './components/ui/CommandPalette';
import { EasterEgg } from './components/ui/EasterEgg';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-color-primary-500 origin-left z-[100] pointer-events-none" 
      style={{ scaleX }} 
    />
  );
};

const ErrorFallback = () => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center text-center px-4 bg-background">
    <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">Something went wrong</h2>
    <p className="text-text-muted mb-8 max-w-md">An unexpected error occurred while rendering this page.</p>
    <Button onClick={() => window.location.reload()} variant="primary">
      Refresh Page
    </Button>
  </div>
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <ErrorFallback />;
    return this.props.children;
  }
}

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpen);
    return () => document.removeEventListener('open-command-palette', handleOpen);
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <ErrorBoundary>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollProgress />
          <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/design-system" element={<DesignSystem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <EasterEgg />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
