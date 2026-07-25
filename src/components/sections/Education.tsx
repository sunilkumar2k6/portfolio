import React from 'react';
import { education } from '../../data/education';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../animation/FadeIn';

export const Education: React.FC = () => {
  return (
    <Section id="education" className="relative bg-background overflow-hidden py-24 md:py-32 border-none">
      <SectionHeading subtitle="My academic background.">
        Education
      </SectionHeading>

      <div className="relative max-w-4xl mx-auto mt-16 group/list">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[19px] md:left-[39px] top-4 bottom-0 w-[2px] bg-border" />
        
        {education.map((edu, index) => (
          <FadeIn key={edu.id} delay={index * 0.15} direction="up">
            <div className="relative pl-14 md:pl-24 pb-16 group/item transition-opacity duration-500 group-hover/list:opacity-30 hover:!opacity-100">
              {/* Timeline Node */}
              <div className="absolute left-[13px] md:left-[33px] top-2 w-3.5 h-3.5 rounded-full bg-surface-elevated border-2 border-border group-hover/item:border-color-primary-500 group-hover/item:bg-color-primary-500 transition-colors duration-500 z-10" />
              
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-sm font-display tracking-widest uppercase text-color-primary-600 dark:text-color-primary-400">
                  {edu.startDate} — {edu.endDate}
                </span>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {edu.degree} {edu.field && <span className="text-text-muted font-normal">in {edu.field}</span>}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xl text-text-muted">{edu.institution}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="text-sm text-text-muted">{edu.location}</span>
                </div>
              </div>

              {edu.description && (
                <div className="prose prose-lg dark:prose-invert text-text-muted leading-relaxed mb-6 max-w-3xl">
                  <p>{edu.description}</p>
                </div>
              )}

              {edu.relevantCoursework[0] && (
                <div className="mt-6 max-w-3xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-foreground block mb-3">Relevant Coursework</span>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevantCoursework.map((course, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium border border-border/50 bg-surface-elevated/50 text-text-muted rounded-md">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
