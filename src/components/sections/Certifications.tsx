import React, { useState } from 'react';
import { certifications } from '../../data/certifications';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { FadeIn } from '../animation/FadeIn';
import { ExternalLink, X, FileText, Award } from 'lucide-react';

export const Certifications: React.FC = () => {
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
    <Section id="certifications" className="bg-background border-none py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-color-primary-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading subtitle="Verified professional credentials and continuous learning.">
          Credential Vault
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <div className="h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-color-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
                <div className="relative h-full p-8 flex flex-col bg-surface-elevated/80 glass border border-border/50 group-hover:border-color-primary-500/50 rounded-2xl transition-all duration-500 overflow-hidden">
                  
                  {/* Decorative Icon */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-color-primary-500/10 rounded-full flex items-center justify-center pointer-events-none opacity-50 group-hover:scale-150 transition-transform duration-700">
                    <Award size={64} className="text-color-primary-500/20" />
                  </div>

                  <div className="relative z-10 mb-8">
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-color-primary-400 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-text-muted font-medium uppercase tracking-widest text-xs">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div className="text-sm text-text-muted mb-8 flex-grow space-y-2 relative z-10 font-mono text-xs">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="opacity-60">Issued</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    {cert.expirationDate && (
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="opacity-60">Expires</span>
                        <span>{cert.expirationDate}</span>
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="opacity-60">ID</span>
                        <span className="truncate ml-4">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                      {cert.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] font-medium uppercase tracking-widest border border-border/50 bg-background/50 text-text-muted rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {cert.credentialUrl && (
                    <div className="mt-auto relative z-10">
                      <button 
                        className="w-full py-3 flex items-center justify-center gap-2 border border-border text-foreground hover:bg-foreground hover:text-background rounded-xl transition-all duration-300 font-medium text-sm group/btn"
                        onClick={() => setSelectedPdf(cert.credentialUrl!)}
                      >
                        <FileText size={16} />
                        View Credential
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
                Verified Credential
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
