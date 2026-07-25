export interface Experience {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  contributions: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "MetaCrafters",
    role: "Blockchain / Ethereum Intern",
    employmentType: "Internship",
    startDate: "May 2024",
    endDate: "August 2024",
    location: "Remote",
    description: "Participated in a practical internship program focused on Blockchain and Ethereum, gaining hands-on exposure to decentralized technologies through mentorship, technical learning, and real-world project experience.",
    responsibilities: [
      "Gained hands-on experience with Blockchain and Ethereum concepts through a structured practical internship program.",
      "Worked under mentorship to strengthen understanding of decentralized technologies and blockchain development workflows.",
      "Applied technical concepts through real-world project experience, developing practical exposure to building blockchain-based solutions.",
      "Strengthened problem-solving and development skills through hands-on learning and project-oriented tasks."
    ],
    contributions: [],
    technologies: ["Blockchain", "Ethereum", "Web3", "Solidity"]
  }
];
