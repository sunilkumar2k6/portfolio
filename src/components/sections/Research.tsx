import React from 'react';
import { research } from '../../data/research';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FadeIn } from '../animation/FadeIn';

export const Research: React.FC = () => {
  

  return (
    <Section id="research" className="bg-background py-24 md:py-32 border-none">
      <SectionHeading subtitle="Academic publications and research contributions.">
        Research
      </SectionHeading>

      {research.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {research.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1}>
              <Card className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground leading-tight">{item.title}</h3>
                  <Badge variant={item.status === 'Published' ? 'primary' : 'outline'} className="ml-4 whitespace-nowrap">
                    {item.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-text-muted mb-4">
                  <span className="font-medium text-foreground">Authors:</span> {item.authors.join(', ')}
                </p>
                
                <p className="text-text-muted mb-6 flex-grow">
                  {item.description }
                </p>

                {item.topics[0] && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border mt-auto">
                    {item.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                )}
              </Card>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="text-center p-8 border border-dashed border-border rounded-xl">
            <p className="text-text-muted mb-2">No research documented yet.</p>
            
          </div>
        </FadeIn>
      )}
    </Section>
  );
};
