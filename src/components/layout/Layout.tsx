import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { NoiseBackground } from '../ui/NoiseBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CustomCursor />
      <NoiseBackground />
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-color-primary-500/10 blur-[120px] animate-fluid" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-color-primary-600/5 blur-[150px] animate-fluid" style={{ animationDelay: '-5s' }} />
      </div>

      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
