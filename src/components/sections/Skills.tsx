import React, { useState, useMemo, useEffect } from 'react';
import { skills } from '../../data/skills';
import { projects } from '../../data/projects';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Cpu, Folder, Terminal } from 'lucide-react';
import type { Skill } from '../../data/skills';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<Skill | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      if (skill.name !== 'TODO') {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
      }
      return acc;
    }, {} as Record<string, Skill[]>);
  }, []);

  // Pre-calculate organic animations
  const categoryAnimations = useMemo(() => {
    return Object.keys(groupedSkills).map((_, i) => ({
      y: [0, -10 + (i % 3) * 3, 0],
      rotate: [0, (i % 2 === 0 ? 1 : -1), 0],
      duration: 6 + (i % 4) * 2,
    }));
  }, [groupedSkills]);

  const coreStack = useMemo(() => {
    return skills.filter(s => s.priority <= 2).slice(0, 6);
  }, []);

  const getProjectsForTech = (techName: string) => {
    return projects.filter(p => p.technologies.some(t => t.toLowerCase() === techName.toLowerCase()));
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setActiveTech(null);
    } else {
      setActiveCategory(category);
      setActiveTech(null);
    }
  };

  const handleTechClick = (e: React.MouseEvent, skill: Skill) => {
    e.stopPropagation();
    setActiveTech(skill);
  };

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      document.dispatchEvent(new CustomEvent('open-project-detail', { detail: project }));
    }
  };

  return (
    <Section id="skills" className="relative bg-background overflow-hidden py-24 md:py-32 border-none">
      
      {/* Organic Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-color-primary-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="The technical ecosystem I navigate.">
          Capabilities
        </SectionHeading>

        {/* Core Stack Indicator */}
        <div className="mt-12 mb-16 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
            <Cpu size={14} className="text-color-primary-500" /> Core Stack
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {coreStack.map(skill => (
              <div key={skill.name} className="px-4 py-2 rounded-full border border-border/50 bg-surface-elevated/30 glass text-sm text-foreground font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-color-primary-500 animate-pulse" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Ecosystem Map (Left Col) */}
          <div className={`w-full ${activeCategory && !isMobile ? 'lg:w-2/3' : 'lg:w-full'} transition-all duration-700 ease-out flex flex-wrap justify-center gap-x-8 gap-y-16 mt-8`}>
            {Object.entries(groupedSkills).map(([category, items], index) => {
              const isActive = activeCategory === category;
              const isFaded = activeCategory !== null && !isActive;
              const anim = categoryAnimations[index] || categoryAnimations[0];

              return (
                <motion.div 
                  key={category} 
                  className={`flex flex-col items-center transition-opacity duration-500 ${isFaded ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
                  animate={isActive ? { y: 0, rotate: 0 } : { y: anim.y, rotate: anim.rotate }}
                  transition={isActive ? { type: 'spring' } : { duration: anim.duration, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div 
                    className="relative group outline-none"
                    tabIndex={0}
                    onClick={() => handleCategoryClick(category)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
                  >
                    {/* Category Node */}
                    <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full border bg-background/50 glass flex items-center justify-center p-4 text-center shadow-2xl transition-all duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-color-primary-500 ${isActive ? 'border-color-primary-500 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-105' : 'border-border/50 group-hover:border-color-primary-500/50 group-hover:scale-105'}`}>
                      <span className={`text-lg md:text-xl font-display transition-colors ${isActive ? 'text-color-primary-500 font-bold' : 'text-foreground font-medium group-hover:text-color-primary-400'}`}>
                        {category}
                      </span>
                    </div>
                    
                    {/* Skill Satellites */}
                    <AnimatePresence>
                      {isActive && (
                        <div className="absolute inset-0 w-full h-full pointer-events-none">
                          {items.map((skill, i) => {
                            const angle = (i / items.length) * Math.PI * 2 - (Math.PI / 2);
                            const radius = isMobile ? 100 : 130 + (Math.random() * 20);
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            const isTechActive = activeTech?.name === skill.name;
                            
                            return (
                              <motion.div
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-auto"
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={{ x, y, opacity: 1, scale: 1 }}
                                exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.05 * i }}
                                style={{ marginLeft: '-15px', marginTop: '-15px' }}
                              >
                                {/* Connection Line */}
                                <svg className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible pointer-events-none z-[-1]">
                                  <motion.line 
                                    x1="0" y1="0" x2={-x} y2={-y} 
                                    stroke="currentColor" 
                                    strokeWidth="1" 
                                    className={isTechActive ? "text-color-primary-500/50" : "text-border"} 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                  />
                                </svg>

                                <button 
                                  className={`group/skill relative w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-color-primary-500 ${isTechActive ? 'bg-color-primary-500 border-color-primary-500 scale-125 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-surface-elevated border-border hover:border-color-primary-500 hover:scale-110'}`}
                                  onClick={(e) => handleTechClick(e, skill)}
                                >
                                  <span className={`w-2 h-2 rounded-full transition-colors ${isTechActive ? 'bg-background' : 'bg-color-primary-500 group-hover/skill:bg-color-primary-400'}`} />
                                  <span className={`absolute ${x > 0 ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 transition-opacity whitespace-nowrap text-xs font-medium px-2 py-1 rounded glass pointer-events-none z-20 ${isTechActive ? 'opacity-100 border-color-primary-500/50 text-foreground' : 'opacity-0 group-hover/skill:opacity-100 border-border text-text-muted'}`}>
                                    {skill.name}
                                  </span>
                                </button>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Context Panel (Right Col / Bottom Mobile) */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div 
                key="context-panel"
                initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
                className={`w-full ${isMobile ? 'mt-8' : 'lg:w-1/3 lg:sticky lg:top-32'} bg-surface-elevated/30 glass border border-border/50 rounded-[32px] p-8 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-color-primary-500/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Panel Header */}
                  <div className="mb-8 border-b border-border/50 pb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-color-primary-500 mb-2 block">
                      {activeTech ? 'Technology Context' : 'Category Overview'}
                    </span>
                    <h3 className="text-3xl font-display font-bold text-foreground">
                      {activeTech ? activeTech.name : activeCategory}
                    </h3>
                  </div>

                  {/* Panel Content */}
                  <AnimatePresence mode="wait">
                    {!activeTech ? (
                      <motion.div 
                        key="category-view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <span className="text-sm text-text-muted flex items-center gap-2 mb-4">
                            <Terminal size={14} /> Technologies included
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {groupedSkills[activeCategory].map(skill => (
                              <button
                                key={skill.name}
                                onClick={(e) => handleTechClick(e, skill)}
                                className="px-3 py-1.5 rounded-lg border border-border bg-background/50 text-xs font-medium text-foreground hover:border-color-primary-500 hover:text-color-primary-500 transition-colors text-left"
                              >
                                {skill.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed mt-4">
                          Select a technology above to see where it has been applied in actual projects.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="tech-view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-8"
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setActiveTech(null)}
                            className="text-xs font-medium uppercase tracking-widest text-text-muted hover:text-color-primary-500 transition-colors flex items-center gap-1"
                          >
                            <ArrowRight size={12} className="rotate-180" /> Back to Category
                          </button>
                        </div>
                        
                        <div>
                          <span className="text-sm text-text-muted flex items-center gap-2 mb-4">
                            <Folder size={14} /> Applied In Projects
                          </span>
                          
                          {getProjectsForTech(activeTech.name).length > 0 ? (
                            <div className="flex flex-col gap-3">
                              {getProjectsForTech(activeTech.name).map(project => (
                                <button
                                  key={project.id}
                                  onClick={() => handleProjectClick(project.id)}
                                  className="group flex flex-col p-4 rounded-xl border border-border bg-background/50 hover:border-color-primary-500 hover:bg-surface-elevated transition-all text-left"
                                >
                                  <span className="text-foreground font-medium font-display group-hover:text-color-primary-500 transition-colors">
                                    {project.title}
                                  </span>
                                  <span className="text-xs text-text-muted mt-1 line-clamp-1">
                                    {project.shortDescription}
                                  </span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl border border-border/50 bg-background/30 flex flex-col items-center justify-center text-center gap-2">
                              <Code size={20} className="text-text-muted/50" />
                              <span className="text-sm text-text-muted">No featured projects explicitly list this technology yet.</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </Section>
  );
};
