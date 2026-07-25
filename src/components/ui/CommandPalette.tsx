import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Briefcase, Code, Award, FileText, Moon, Sun, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { easings } from '../../lib/motion';
import { profile } from '../../data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const commands = [
    { name: 'Go to Home', icon: <Home size={16} />, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), category: 'Navigation' },
    { name: 'Go to About', icon: <User size={16} />, action: () => scrollTo('about'), category: 'Navigation' },
    { name: 'Go to Projects', icon: <Code size={16} />, action: () => scrollTo('projects'), category: 'Navigation' },
    { name: 'Go to Experience', icon: <Briefcase size={16} />, action: () => scrollTo('experience'), category: 'Navigation' },
    { name: 'Go to Skills', icon: <Code size={16} />, action: () => scrollTo('skills'), category: 'Navigation' },
    { name: 'Go to Achievements', icon: <Award size={16} />, action: () => scrollTo('achievements'), category: 'Navigation' },
    { name: 'Go to Contact', icon: <User size={16} />, action: () => scrollTo('contact'), category: 'Navigation' },
    { name: 'Open Resume', icon: <FileText size={16} />, action: () => window.open(profile.resumeUrl, '_blank'), category: 'Actions' },
    { name: 'Toggle Theme', icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, action: () => setTheme(theme === 'dark' ? 'light' : 'dark'), category: 'Actions' },
  ];

  const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: easings.easeOut }}
              className="w-full max-w-xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center px-4 border-b border-border">
                <Search size={20} className="text-text-muted" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-4 bg-transparent text-foreground placeholder-text-muted focus:outline-none"
                  autoFocus
                />
                <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:bg-surface-elevated hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-14 text-center text-text-muted">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  Object.entries(
                    filteredCommands.reduce((acc, cmd) => {
                      if (!acc[cmd.category]) acc[cmd.category] = [];
                      acc[cmd.category].push(cmd);
                      return acc;
                    }, {} as Record<string, typeof commands>)
                  ).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1 text-xs font-semibold text-text-muted uppercase tracking-wider">
                        {category}
                      </div>
                      {cmds.map((cmd, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(cmd.action)}
                          className="w-full flex items-center justify-between px-3 py-3 text-sm text-foreground hover:bg-surface-elevated rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-text-muted group-hover:text-color-primary-500 transition-colors">
                              {cmd.icon}
                            </span>
                            {cmd.name}
                          </div>
                          <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-surface-elevated text-xs text-text-muted border-t border-border">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface rounded border border-border font-mono text-[10px]">↑↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-surface rounded border border-border font-mono text-[10px]">esc</kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
