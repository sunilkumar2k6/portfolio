import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Research } from '../components/sections/Research';
import { Education } from '../components/sections/Education';
import { Certifications } from '../components/sections/Certifications';
import { Achievements } from '../components/sections/Achievements';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Research />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
    </div>
  );
};

