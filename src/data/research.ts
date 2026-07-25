export interface Research {
  id: string;
  title: string;
  description: string;
  status: 'Published' | 'In Progress' | 'Completed' | 'Independent';
  date: string;
  authors: string[];
  publication?: string;
  url?: string;
  technologies: string[];
  topics: string[];
}

export const research: Research[] = [
  {
    id: "res-1",
    title: "Energy Consumption in Proof-of-Work Blockchain Systems",
    description: "Explored the energy consumption characteristics of Proof-of-Work blockchain systems, examining how computational requirements associated with blockchain consensus can influence energy usage and sustainability considerations.",
    status: "Completed",
    date: "2024",
    authors: ["Sunil Kumar"],
    technologies: ["Blockchain", "Proof-of-Work", "Ethereum"],
    topics: ["Sustainable Computing", "Distributed Systems", "Energy Consumption", "Consensus Mechanisms"]
  }
];
