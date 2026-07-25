import React from 'react';
import { profile } from '../../data/profile';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../animation/FadeIn';

export const About: React.FC = () => {
  return (
    <Section id="about" className="relative bg-background overflow-hidden py-24 md:py-32 border-none">
      <div className="absolute -top-10 -right-10 text-[200px] font-black text-border/20 font-display pointer-events-none select-none z-0">
        ABOUT
      </div>

      <div className="relative z-10">
        <SectionHeading 
          subtitle="The narrative behind the code."
        >
          My Story
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-12">
          {/* Typographic Story Column */}
          <FadeIn delay={0.2} direction="up" className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="text-3xl md:text-5xl font-display font-medium text-foreground leading-tight">
              {profile.shortBio}
            </h3>
            
            <div className="w-12 h-1 bg-color-primary-500 rounded-full" />
            
            <div className="prose prose-lg dark:prose-invert prose-slate text-text-muted leading-relaxed">
              {profile.longBio && (
                <p className="text-lg md:text-xl font-light">{profile.longBio}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 pt-8 border-t border-border/50">
              <div className="group">
                <span className="block text-xs uppercase tracking-widest text-text-muted mb-2 group-hover:text-color-primary-500 transition-colors">Base</span>
                <span className="text-xl text-foreground font-display">{profile.location}</span>
              </div>
              <div className="group">
                <span className="block text-xs uppercase tracking-widest text-text-muted mb-2 group-hover:text-color-primary-500 transition-colors">Contact</span>
                <a href={`mailto:${profile.email}`} className="text-xl text-foreground font-display hover:text-color-primary-500 transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Visual/Image Column */}
          <FadeIn delay={0.4} direction="left" className="lg:col-span-5 relative w-full h-[600px] hidden lg:block">
            <div className="absolute inset-0 border border-border/50 rounded-[40px] rotate-3 transition-transform duration-700 hover:rotate-6" />
            <div className="absolute inset-0 bg-surface-elevated rounded-[40px] -rotate-3 overflow-hidden shadow-2xl transition-transform duration-700 hover:-rotate-1 z-10 glass">
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={`Portrait of ${profile.name}`} 
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 scale-105 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-color-primary-900/50 to-background flex items-center justify-center">
                   <span className="text-border text-6xl font-display opacity-20">{profile.name.charAt(0)}</span>
                </div>
              )}
              {/* Internal glow */}
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-background border border-border p-6 rounded-3xl shadow-xl glass">
              <span className="block text-sm text-text-muted uppercase tracking-widest mb-1">Status</span>
              <span className="text-lg font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-color-primary-500 animate-pulse" />
                Available
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
};
