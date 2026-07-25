import React, { useState } from 'react';
import { achievements } from '../../data/achievements';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { FadeIn } from '../animation/FadeIn';
import { ExternalLink, X, FileText, Trophy } from 'lucide-react';

export const Achievements: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPdf]);

  return (
    <Section id="achievements" className="bg-background border-none py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-color-primary-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading subtitle="Awards, recognition, and milestones.">
          Milestones
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {achievements.map((achievement, index) => (
            <FadeIn key={achievement.id} delay={index * 0.1}>
              <div className="h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-color-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
                <div className="relative h-full p-8 flex flex-col bg-background/80 glass border border-border/50 group-hover:border-color-primary-500/50 rounded-2xl transition-all duration-500 overflow-hidden">
                  
                  {/* Decorative Icon */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-color-primary-500/5 rounded-full flex items-center justify-center pointer-events-none opacity-50 group-hover:scale-150 transition-transform duration-700">
                    <Trophy size={80} className="text-color-primary-500/10" />
                  </div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium uppercase tracking-widest text-color-primary-500">
                        {achievement.date}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-color-primary-400 transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-text-muted font-medium">
                        {achievement.organization}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-text-muted text-sm flex-grow mb-8 relative z-10 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  {achievement.evidenceUrl && (
                    <div className="mt-auto relative z-10">
                      <button 
                        className="w-full py-3 flex items-center justify-center gap-2 border border-border text-foreground hover:bg-foreground hover:text-background rounded-xl transition-all duration-300 font-medium text-sm group/btn"
                        onClick={() => setSelectedPdf(achievement.evidenceUrl!)}
                      >
                        <FileText size={16} />
                        View Evidence
                        <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedPdf(null)}
          ></div>
          
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-surface-elevated border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h3 className="font-display font-bold text-foreground flex items-center uppercase tracking-widest text-sm">
                <FileText size={18} className="mr-3 text-color-primary-500" />
                Verified Evidence
              </h3>
              <div className="flex gap-4">
                <a 
                  href={selectedPdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-text-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
                <button 
                  className="text-text-muted hover:text-color-primary-500 transition-colors"
                  onClick={() => setSelectedPdf(null)}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-grow w-full h-full bg-background overflow-hidden relative">
              <object 
                data={selectedPdf} 
                type="application/pdf" 
                className="absolute inset-0 w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-foreground mb-6 font-display">Your browser does not support inline PDFs.</p>
                  <a href={selectedPdf} target="_blank" rel="noopener noreferrer">
                    <Button>Download PDF Instead</Button>
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
