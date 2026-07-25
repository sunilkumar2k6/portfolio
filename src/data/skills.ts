export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming Languages' | 'Databases' | 'Tools' | 'DevOps' | 'Other' | 'Blockchain & Web3';
  icon: string;
  priority: number;
}

export const skills: Skill[] = [
  { name: "JavaScript", category: "Programming Languages", icon: "javascript", priority: 1 },
  { name: "Java", category: "Programming Languages", icon: "java", priority: 2 },
  { name: "C++", category: "Programming Languages", icon: "cpp", priority: 3 },
  { name: "Python", category: "Programming Languages", icon: "python", priority: 4 },
  { name: "React", category: "Frontend", icon: "react", priority: 1 },
  { name: "HTML", category: "Frontend", icon: "html", priority: 2 },
  { name: "CSS", category: "Frontend", icon: "css", priority: 3 },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", priority: 4 },
  { name: "Node.js", category: "Backend", icon: "nodejs", priority: 1 },
  { name: "Express.js", category: "Backend", icon: "express", priority: 2 },
  { name: "MySQL", category: "Databases", icon: "mysql", priority: 1 },
  { name: "MongoDB", category: "Databases", icon: "mongodb", priority: 2 },
  { name: "Blockchain", category: "Blockchain & Web3", icon: "blockchain", priority: 1 },
  { name: "Ethereum", category: "Blockchain & Web3", icon: "ethereum", priority: 2 },
  { name: "Solidity", category: "Blockchain & Web3", icon: "solidity", priority: 3 },
  { name: "Git", category: "Tools", icon: "git", priority: 1 },
  { name: "GitHub", category: "Tools", icon: "github", priority: 2 }
];

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category).sort((a, b) => a.priority - b.priority);
};
