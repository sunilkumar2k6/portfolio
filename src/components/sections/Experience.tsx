import React from 'react';
import { experience } from '../../data/experience';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../animation/FadeIn';

export const Experience: React.FC = () => {

  return (
    <Section id="experience" className="relative bg-background overflow-hidden py-24 md:py-32 border-none">
      <SectionHeading subtitle="My professional journey and impact.">
        Experience
      </SectionHeading>

      <div className="relative max-w-4xl mx-auto mt-16 group/list">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[19px] md:left-[39px] top-4 bottom-0 w-[2px] bg-border" />
        
        {experience.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 0.15} direction="up">
            <div className="relative pl-14 md:pl-24 pb-16 group/item transition-opacity duration-500 group-hover/list:opacity-30 hover:!opacity-100">
              {/* Timeline Node */}
              <div className="absolute left-[13px] md:left-[33px] top-2 w-3.5 h-3.5 rounded-full bg-surface border-2 border-border group-hover/item:border-color-primary-500 group-hover/item:bg-color-primary-500 transition-colors duration-500 z-10" />
              
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-sm font-display tracking-widest uppercase text-color-primary-600 dark:text-color-primary-400">
                  {exp.startDate} — {exp.endDate}
                </span>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xl text-text-muted">{exp.company}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="text-sm text-text-muted">{exp.location}</span>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert text-text-muted leading-relaxed mb-6 max-w-3xl">
                <p>{exp.description}</p>
              </div>

              {exp.responsibilities[0] && (
                <div className="mb-6 max-w-3xl">
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-muted">
                        <span className="text-color-primary-500 mt-1.5">▹</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.technologies[0] && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium uppercase tracking-wider border border-border/50 bg-background/50 text-text-muted rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
