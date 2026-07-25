import React, { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { socialProfiles } from '../../data/social';
import type { SocialProfile } from '../../data/social';
import { FadeIn } from '../animation/FadeIn';
import { Reveal } from '../animation/Reveal';
import { Mail, ArrowDownRight, Code } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { shouldReduceMotion } from '../../lib/motion';

import { SocialIcon } from '../ui/SocialIcon';

export const Hero: React.FC = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 300]);
  const yImage = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
    
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion()) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // increased movement
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validSocials = socialProfiles.filter((p: SocialProfile) => p.url !== 'TODO' && ['github', 'linkedin'].includes(p.platform.toLowerCase()));

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      
      {/* Background Organic Shapes */}
      <motion.div 
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-color-primary-500/20 dark:bg-color-primary-500/10 blur-[100px] rounded-full pointer-events-none"
        animate={reduceMotion ? {} : {
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Typographic Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start z-20"
          style={{ y: reduceMotion ? 0 : yText, opacity }}
        >
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface-elevated border border-border">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-color-primary-500"></span>
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
                  {profile.availability}
                </span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-muted">
                <Code size={14} className="text-color-primary-500" />
                <span>Currently Building: AI Integrations</span>
              </div>
            </div>
          </FadeIn>

          <Reveal delay={0.2}>
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-extrabold tracking-tighter leading-[0.85] text-foreground font-display mb-6"
              animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <span className="block">{profile.name.split(' ')[0]}</span>
              <span className="block text-gradient">{profile.name.split(' ')[1] || ''}</span>
            </motion.h1>
          </Reveal>
          
          <Reveal delay={0.3}>
            <motion.h2 
              className="text-2xl md:text-4xl font-light text-text-muted mb-8 tracking-tight max-w-2xl"
              animate={{ x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              {profile.professionalTitle} <span className="italic font-serif text-color-primary-500">specialist</span>.
            </motion.h2>
          </Reveal>

          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-xl mb-12">
              {profile.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-foreground text-background dark:bg-foreground dark:text-background rounded-full font-medium tracking-wide overflow-hidden flex items-center gap-2"
            >
              <span className="relative z-10">Explore Work</span>
              <ArrowDownRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-color-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </button>
            
            <div className="flex items-center gap-5 ml-4">
              {validSocials.map((social: SocialProfile) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-foreground hover:-translate-y-1 transition-all"
                  aria-label={social.label}
                >
                  {social.icon === 'mail' ? <Mail size={24} /> : <SocialIcon name={social.icon} className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </FadeIn>
        </motion.div>

        {/* Organic Image Display */}
        {profile.profileImage && (
          <motion.div 
            className="lg:col-span-5 relative z-10 flex justify-center lg:justify-end mt-12 lg:mt-0"
            style={{ y: reduceMotion ? 0 : yImage, opacity }}
          >
            <motion.div 
              className="relative w-72 h-72 md:w-[400px] md:h-[500px]"
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              {/* Complex SVG Mask for organic shape */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="organic-blob" clipPathUnits="objectBoundingBox">
                    <path d="M0.85,0.15 C0.95,0.3 1,0.5 0.95,0.7 C0.9,0.9 0.7,0.95 0.5,0.98 C0.3,1 0.1,0.9 0.05,0.7 C0,0.5 0.05,0.3 0.15,0.15 C0.3,0 0.7,0 0.85,0.15 Z">
                      <animate attributeName="d" dur="8s" repeatCount="indefinite"
                        values="
                          M0.85,0.15 C0.95,0.3 1,0.5 0.95,0.7 C0.9,0.9 0.7,0.95 0.5,0.98 C0.3,1 0.1,0.9 0.05,0.7 C0,0.5 0.05,0.3 0.15,0.15 C0.3,0 0.7,0 0.85,0.15 Z;
                          M0.75,0.2 C0.9,0.25 0.95,0.5 0.9,0.75 C0.85,0.95 0.65,1 0.5,0.95 C0.35,0.9 0.15,0.8 0.1,0.6 C0.05,0.4 0.1,0.2 0.25,0.1 C0.4,0 0.6,0.15 0.75,0.2 Z;
                          M0.85,0.15 C0.95,0.3 1,0.5 0.95,0.7 C0.9,0.9 0.7,0.95 0.5,0.98 C0.3,1 0.1,0.9 0.05,0.7 C0,0.5 0.05,0.3 0.15,0.15 C0.3,0 0.7,0 0.85,0.15 Z
                        " />
                    </path>
                  </clipPath>
                </defs>
              </svg>
              
              <div 
                className="w-full h-full bg-surface-elevated overflow-hidden"
                style={{ clipPath: 'url(#organic-blob)' }}
              >
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover object-[center_15%] scale-[1.02] transition-transform duration-700 hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-color-primary-500 mix-blend-color dark:mix-blend-overlay opacity-30 dark:opacity-20" />
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted rotate-90 mb-6">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-text-muted to-transparent" />
      </motion.div>
    </section>
  );
};
