import React from 'react';
import { profile } from '../../data/profile';
import { socialProfiles } from '../../data/social';
import { ArrowUpRight, FileText } from 'lucide-react';
import { SocialIcon } from '../ui/SocialIcon';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const validSocials = socialProfiles.filter(s => s.url !== 'TODO');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-background border-none relative overflow-hidden pt-32 pb-12">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Large Closing Statement */}
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-foreground/10 hover:text-foreground/30 transition-colors duration-500 tracking-tighter leading-none cursor-default">
            {profile.name.split(' ')[0].toUpperCase()}
          </h2>
        </div>

        {/* Footer Navigation */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 mb-20 border-b border-border/30 pb-12">
          
          {/* Resume */}
          <a 
            href={profile.resumeUrl}
            target="_blank"
            className="group flex items-center gap-3 px-6 py-3 bg-surface-elevated rounded-full text-sm font-medium uppercase tracking-widest text-text-muted hover:text-foreground hover:bg-border transition-colors"
          >
            <FileText size={16} />
            <span>View Resume</span>
          </a>

          {/* Back to top */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-text-muted hover:text-color-primary-500 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Links */}
          <div className="flex gap-6">
            {validSocials.map(social => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex items-center gap-2 text-text-muted hover:text-foreground transition-colors uppercase text-[10px] sm:text-xs tracking-widest font-medium"
              >
                <SocialIcon name={social.icon} className="w-4 h-4 group-hover:text-color-primary-500 transition-colors" />
                <span className="hidden sm:inline">{social.platform}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-medium tracking-widest uppercase text-text-muted/60">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-text-muted/60">
            <span className="w-2 h-2 rounded-full bg-color-primary-500 animate-pulse" />
            <span>System Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
