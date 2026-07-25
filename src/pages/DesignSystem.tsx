import React from 'react';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FadeIn } from '../components/animation/FadeIn';
import { Reveal } from '../components/animation/Reveal';

export const DesignSystem: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-24">
      <Section id="typography" className="pt-24 border-b border-border">
        <SectionHeading subtitle="Scale and hierarchy based on the Inter font family.">
          Typography
        </SectionHeading>
        <div className="flex flex-col space-y-6 max-w-2xl">
          <div>
            <span className="text-sm text-text-muted mb-1 block">Display / H1</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">Building the future.</h1>
          </div>
          <div>
            <span className="text-sm text-text-muted mb-1 block">H2</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Section Heading</h2>
          </div>
          <div>
            <span className="text-sm text-text-muted mb-1 block">H3</span>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Card Title</h3>
          </div>
          <div>
            <span className="text-sm text-text-muted mb-1 block">Body Large</span>
            <p className="text-xl text-text-muted">A beautiful, modern, and performant portfolio.</p>
          </div>
          <div>
            <span className="text-sm text-text-muted mb-1 block">Body Regular</span>
            <p className="text-base text-foreground leading-relaxed">
              This is standard body text used for descriptions, paragraphs, and general reading. It has a comfortable line height for maximum legibility.
            </p>
          </div>
        </div>
      </Section>

      <Section id="colors" className="border-b border-border">
        <SectionHeading subtitle="Semantic colors mapped to Tailwind CSS variables.">
          Colors
        </SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-background border border-border shadow-sm">
            <div className="font-semibold text-foreground">Background</div>
            <div className="text-sm text-text-muted">var(--background)</div>
          </div>
          <div className="p-4 rounded-lg bg-surface border border-border shadow-sm">
            <div className="font-semibold text-foreground">Surface</div>
            <div className="text-sm text-text-muted">var(--surface)</div>
          </div>
          <div className="p-4 rounded-lg bg-surface-elevated border border-border shadow-sm">
            <div className="font-semibold text-foreground">Elevated</div>
            <div className="text-sm text-text-muted">var(--surface-elevated)</div>
          </div>
          <div className="p-4 rounded-lg bg-primary-500 text-white shadow-sm">
            <div className="font-semibold">Primary</div>
            <div className="text-sm opacity-90">var(--color-primary-500)</div>
          </div>
        </div>
      </Section>

      <Section id="buttons" className="border-b border-border">
        <SectionHeading subtitle="Interactive components with hover and tap states.">
          Buttons & Links
        </SectionHeading>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="badges" className="border-b border-border">
        <SectionHeading subtitle="Tags for skills and technologies.">
          Badges
        </SectionHeading>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">React</Badge>
          <Badge variant="primary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="outline">Framer Motion</Badge>
        </div>
      </Section>

      <Section id="cards" className="border-b border-border">
        <SectionHeading subtitle="Containers for projects and experience.">
          Cards
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-2">Static Card</h3>
            <p className="text-text-muted text-sm">A standard card without interaction.</p>
          </Card>
          <Card className="p-6" interactive>
            <h3 className="text-lg font-bold mb-2">Interactive Card</h3>
            <p className="text-text-muted text-sm">Hover me to see the elevation effect.</p>
          </Card>
        </div>
      </Section>

      <Section id="animations">
        <SectionHeading subtitle="Framer Motion animation primitives.">
          Animations
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4">Fade In</h3>
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.1} direction="up">
                <Card className="p-4 text-center">Fades Up</Card>
              </FadeIn>
              <FadeIn delay={0.2} direction="left">
                <Card className="p-4 text-center">Fades Left</Card>
              </FadeIn>
              <FadeIn delay={0.3} direction="right">
                <Card className="p-4 text-center">Fades Right</Card>
              </FadeIn>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Reveal</h3>
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tighter">Premium.</h1>
            </Reveal>
            <div className="mt-4">
              <Reveal delay={0.2}>
                <h1 className="text-4xl font-bold tracking-tighter text-primary-500">Futuristic.</h1>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
