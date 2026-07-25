import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';
import { profile } from '../../data/profile';
import { motion, AnimatePresence } from 'framer-motion';
import { easings, durations } from '../../lib/motion';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHidden ? '-translate-y-[150%]' : 'translate-y-0'}`}
    >
      <div 
        className={`pointer-events-auto w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 py-3 rounded-full origin-top ${
          isScrolled 
            ? 'mt-4 bg-background/80 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-border/50 max-w-4xl scale-100 md:scale-95' 
            : 'mt-6 bg-transparent border border-transparent max-w-6xl scale-100'
        }`}
      >
        <div className="flex items-center gap-4 mr-12 flex-shrink-0">
          <a href="#" className="text-xl font-bold tracking-tighter text-foreground font-display" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            {profile.name.split(' ')[0]}<span className="text-color-primary-500">.</span>
          </a>
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="hidden lg:flex items-center gap-2 px-2 py-1 bg-surface-elevated rounded border border-border text-xs text-text-muted hover:text-foreground transition-colors"
          >
            <Search size={12} />
            <kbd className="font-mono text-[10px]">Ctrl+K</kbd>
          </button>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors uppercase tracking-widest relative group px-1 py-1 ${isActive ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span 
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-color-primary-500" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-color-primary-500/40 transition-all duration-300 w-0 group-hover:w-full ${isActive ? 'opacity-0' : 'opacity-100'}`} />
              </a>
            );
          })}
          <div className="w-[1px] h-4 bg-border mx-2" />
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-elevated text-text-muted hover:text-foreground transition-all focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-elevated text-text-muted transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: durations.fast, ease: easings.easeOut }}
            className="md:hidden absolute top-20 left-4 right-4 glass rounded-2xl shadow-2xl border border-border pointer-events-auto overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`py-4 px-6 text-sm font-medium rounded-xl transition-colors uppercase tracking-widest ${isActive ? 'bg-surface-elevated text-foreground' : 'text-text-muted hover:bg-surface-elevated hover:text-foreground'}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
