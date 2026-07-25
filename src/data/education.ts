export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  relevantCoursework: string[];
}

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "Chandigarh University",
    degree: "Bachelor of Engineering (BE)",
    field: "Computer Science and Engineering",
    startDate: "2022",
    endDate: "2026",
    location: "India",
    description: "Focused on software development, web technologies, programming, and computer science fundamentals.",
    relevantCoursework: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Object-Oriented Programming"
    ],
  },
  {
    id: "edu-2",
    institution: "MNA SR SEC SCH",
    degree: "Senior Secondary Education (Class 12)",
    field: "",
    startDate: "2021",
    endDate: "2022",
    location: "India",
    description: "",
    relevantCoursework: [],
  },
  {
    id: "edu-3",
    institution: "SVM SR SEC SCH",
    degree: "Secondary Education (Class 10)",
    field: "",
    startDate: "2019",
    endDate: "2020",
    location: "India",
    description: "",
    relevantCoursework: [],
  }
];
