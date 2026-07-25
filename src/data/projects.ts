export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  problem?: string;
  solution?: string;
  contribution?: string;
  keyFeatures?: string[];
  category: string;
  technologies: string[];
  features: string[];
  role: string;
  status: string;
  image: string;
  gallery: string[];
  githubUrl: string;
  liveUrl: string;
  caseStudyUrl: string;
  featured: boolean;
  priority: number;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "sattva",
    title: "Sattva",
    shortDescription: "An Indian ancient-theme yoga website that combines a culturally inspired visual direction with modern web functionality.",
    longDescription: "Sattva is a yoga-focused web application that combines an Indian ancient-inspired visual theme with AI-assisted features, nutrient information, subscription-oriented interfaces, and separate user and admin experiences.",
    category: "Web Application",
    technologies: ["React", "Node.js", "AI Integration"],
    features: ["Visual Design", "AI Integration", "User Experience", "Nutritional Information", "Subscription Experience", "User Interface", "Admin Interface"],
    role: "Full Stack Developer",
    status: "Completed",
    image: new URL('../assets/projects/sattva.png', import.meta.url).href,
    gallery: [],
    githubUrl: "https://github.com/sunilkumar/sattva",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
    priority: 1
  },
  {
    id: "proj-2",
    slug: "voting-dapp",
    title: "Voting DApp",
    shortDescription: "A decentralized voting application designed around blockchain-based voting functionality.",
    longDescription: "A decentralized voting application that provides blockchain-based voting functionality, leveraging Ethereum smart contracts and a Vue.js frontend for a seamless user experience.",
    category: "Blockchain / Web3 Application",
    technologies: ["Ethereum", "Vue.js", "Solidity", "Web3.js"],
    features: ["Decentralized Application Development", "Blockchain Concepts", "Ethereum", "Voting Logic", "Frontend Development"],
    role: "Blockchain Developer",
    status: "Completed",
    image: new URL('../assets/projects/voting.png', import.meta.url).href,
    gallery: [],
    githubUrl: "https://github.com/sunilkumar/voting-dapp",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
    priority: 2
  },
  {
    id: "proj-3",
    slug: "tic-tac-toe",
    title: "Updated Tic-Tac-Toe",
    shortDescription: "An updated version of the traditional Tic-Tac-Toe game implemented in Java with additional gameplay conditions.",
    longDescription: "A Java-based implementation of the traditional Tic-Tac-Toe game featuring enhanced conditional logic, turn management, and expanded win/draw conditions.",
    category: "Java Application",
    technologies: ["Java"],
    features: ["Game Logic", "Conditional Rules", "State Management", "Problem Solving", "Input Handling"],
    role: "Developer",
    status: "Completed",
    image: new URL('../assets/projects/tictactoe.png', import.meta.url).href,
    gallery: [],
    githubUrl: "https://github.com/sunilkumar/tic-tac-toe",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
    priority: 3
  },
  {
    id: "proj-4",
    slug: "portfolio",
    title: "Professional Portfolio Website",
    shortDescription: "A modern, responsive, and accessible professional portfolio built with React and Tailwind CSS.",
    longDescription: "A fully functional personal portfolio website designed to showcase projects, experience, and technical skills. Built with modern web development practices including responsive design, accessible UI components, and SEO optimization.",
    category: "Web Development",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    features: ["Frontend Development", "Responsive Design", "Component Architecture", "UI/UX Design", "Accessibility", "Performance"],
    role: "Frontend Developer",
    status: "Completed",
    image: new URL('../assets/projects/portfolio.png', import.meta.url).href,
    gallery: [],
    githubUrl: "https://github.com/sunilkumar/portfolio",
    liveUrl: "https://example.com",
    caseStudyUrl: "",
    featured: true,
    priority: 4
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured).sort((a, b) => a.priority - b.priority);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
