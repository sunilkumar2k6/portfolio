import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/projects';
import { easings } from '../../lib/motion';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-background/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.4, ease: easings.easeOut }}
            className="fixed inset-x-0 bottom-0 md:inset-4 md:bottom-4 z-[120] bg-surface border border-border md:rounded-3xl shadow-2xl overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-surface-elevated hover:bg-border rounded-full text-text-muted hover:text-foreground transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left Column - Image */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative bg-surface-elevated">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-display font-black text-border opacity-30">
                      {project.title.substring(0, 2)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface to-transparent opacity-50" />
              </div>

              {/* Right Column - Content */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-color-primary-500/20 text-color-primary-500 text-xs font-bold uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
                    {project.role}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                  {project.title}
                </h2>
                
                <p className="text-xl text-text-muted mb-12">
                  {project.longDescription || project.shortDescription}
                </p>

                {project.problem && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-3">The Problem</h4>
                    <p className="text-text-muted leading-relaxed">{project.problem}</p>
                  </div>
                )}

                {project.solution && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-3">The Solution</h4>
                    <p className="text-text-muted leading-relaxed">{project.solution}</p>
                  </div>
                )}

                <div className="mb-12">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-surface-elevated border border-border text-xs font-medium uppercase tracking-wider text-text-muted rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-auto pt-8 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-transform"
                    >
                      Visit Live Site <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-surface-elevated text-foreground border border-border font-medium rounded-full hover:bg-border transition-colors"
                    >
                      Source Code <GithubIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
