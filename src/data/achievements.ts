export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  category: string;
  evidenceUrl?: string;
}

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "MetaCrafters Blockchain / Ethereum Internship",
    description: "Successfully completed a practical blockchain and Ethereum internship program involving mentorship and real-world project experience.",
    date: "August 2024",
    organization: "MetaCrafters",
    category: "Professional Recognition",
    evidenceUrl: new URL('../assets/achievements/Metacrafters_Internship.pdf', import.meta.url).href
  },
  {
    id: "ach-2",
    title: "Sattva AI-Integrated Wellness Platform",
    description: "Designed and developed a wellness platform combining an Indian ancient-inspired visual experience with AI and nutrition features.",
    date: "2026",
    organization: "Independent Project",
    category: "Technical Achievement",
  },
  {
    id: "ach-3",
    title: "Decentralized Voting DApp",
    description: "Developed a blockchain-based voting application demonstrating decentralized application development.",
    date: "2025",
    organization: "Independent Project",
    category: "Blockchain Achievement",
  },
  {
    id: "ach-4",
    title: "Updated Tic-Tac-Toe Application",
    description: "Built a Java-based enhanced Tic-Tac-Toe application demonstrating advanced game logic and condition handling.",
    date: "2024",
    organization: "Independent Project",
    category: "Coding Achievement",
  },
  {
    id: "ach-5",
    title: "Professional Portfolio Development",
    description: "Designed and developed a comprehensive professional portfolio to showcase technical skills and practical projects.",
    date: "2026",
    organization: "Independent Project",
    category: "Technical Achievement",
  },
  {
    id: "ach-6",
    title: "Energy Consumption in PoW Blockchain",
    description: "Conducted research into energy consumption associated with Proof-of-Work blockchain systems.",
    date: "2024",
    organization: "Independent Research",
    category: "Research",
  },
  {
    id: "ach-7",
    title: "Deep Learning-Based NLP Framework",
    description: "Authored/contributed to a research paper on developing advanced Natural Language Processing frameworks using Deep Learning.",
    date: "Recent",
    organization: "Research Publication",
    category: "Research",
    evidenceUrl: new URL('../assets/achievements/Deep Learning-Based NLP Framework  Research Paper.pdf', import.meta.url).href
  }
];
