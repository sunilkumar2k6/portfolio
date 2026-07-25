import React, { useState, useRef } from 'react';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../animation/FadeIn';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ProjectDetailModal } from './ProjectDetailModal';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <FadeIn delay={0.2} direction="up" className="group">
      <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
        
        {/* Image Presentation */}
        <div className="w-full lg:w-3/5 relative aspect-video rounded-2xl overflow-hidden glass border border-border/50 group-hover:glow-border transition-all duration-700">
          <motion.div 
            className="absolute inset-[-20%] bg-surface-elevated"
            style={{ y }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" 
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                <span className="text-8xl font-display font-black text-border">{String(index + 1).padStart(2, '0')}</span>
              </div>
            )}
          </motion.div>
          
          {/* Floating Overlay Info */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {project.featured && (
              <span className="px-3 py-1 bg-color-primary-500 text-black text-xs font-bold uppercase tracking-widest rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-start lg:items-end lg:text-right'}`}>
          <span className="text-8xl md:text-[120px] font-display font-black leading-none text-foreground/5 dark:text-border/20 -mb-6 md:-mb-10 pointer-events-none select-none transition-colors duration-500 group-hover:text-foreground/10 dark:group-hover:text-border/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 z-10 relative">
            {project.title}
          </h3>
          
          <div className="prose prose-lg dark:prose-invert text-text-muted mb-8 relative z-10">
            <p>{project.shortDescription}</p>
          </div>

          <div className={`flex flex-wrap gap-2 mb-10 relative z-10 ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}>
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1 text-xs font-medium uppercase tracking-wider border border-border/50 text-text-muted rounded-full">
                {tech}
              </span>
            ))}
          </div>

          <div className={`flex items-center gap-6 relative z-10 ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('open-project-detail', { detail: project }))}
              className="group/btn flex items-center gap-2 px-6 py-3 bg-foreground text-background dark:bg-foreground dark:text-background rounded-full font-medium tracking-wide transition-transform hover:scale-105"
            >
              Explore Project
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-foreground hover:text-color-primary-500 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                Source
                <span className="group-hover/link:rotate-12 transition-transform">
                  <GithubIcon />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category))).filter(c => c && c.trim() !== "")];

  let filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (activeTech) {
    filteredProjects = filteredProjects.filter(p => p.technologies.includes(activeTech));
  }

  React.useEffect(() => {
    const handleOpenDetail = (e: Event) => {
      const customEvent = e as CustomEvent<Project>;
      setSelectedProject(customEvent.detail);
    };
    const handleFilterTech = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveCategory('All'); // Reset category
      setActiveTech(customEvent.detail);
    };

    document.addEventListener('open-project-detail', handleOpenDetail);
    document.addEventListener('filter-project-tech', handleFilterTech);
    return () => {
      document.removeEventListener('open-project-detail', handleOpenDetail);
      document.removeEventListener('filter-project-tech', handleFilterTech);
    };
  }, []);

  return (
    <Section id="projects" className="bg-background py-24 md:py-32 border-none">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Selected works spanning systems and experiences.">
          Selected Projects
        </SectionHeading>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-4 mt-12 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setActiveTech(null); }}
                className={`px-6 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category && !activeTech
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-transparent text-text-muted hover:text-foreground border border-border hover:border-text-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {activeTech && (
          <div className="flex items-center gap-4 mb-20">
            <span className="text-sm text-text-muted">Filtered by:</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-color-primary-500/10 border border-color-primary-500/30 rounded-full">
              <span className="text-xs font-bold text-color-primary-500 uppercase tracking-widest">{activeTech}</span>
              <button onClick={() => setActiveTech(null)} className="text-color-primary-500 hover:text-color-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        )}
        
        {!activeTech && <div className="mb-20" />}

        <motion.div layout className="flex flex-col gap-32 lg:gap-48 mt-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </Section>
  );
};
