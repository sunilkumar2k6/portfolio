export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string; // We'll use this for the PDF URL now since we have the assets
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "5G Mobile Networks",
    issuer: "Relevant Institution",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/5G Mobile Networks.pdf', import.meta.url).href,
    skills: ["5G", "Telecommunications", "Networking"]
  },
  {
    id: "cert-2",
    name: "AWS Cloud Solutions",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/AWS Cloud Solutions.pdf', import.meta.url).href,
    skills: ["AWS", "Cloud Computing", "Architecture"]
  },
  {
    id: "cert-3",
    name: "Adobe Digital Marketing",
    issuer: "Adobe",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Adobe Digital Marketing.pdf', import.meta.url).href,
    skills: ["Digital Marketing", "Adobe", "Analytics"]
  },
  {
    id: "cert-4",
    name: "Developing Industrial IoT",
    issuer: "Relevant Institution",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Developing Industrial IoT.pdf', import.meta.url).href,
    skills: ["IoT", "Industrial Systems", "Hardware"]
  },
  {
    id: "cert-5",
    name: "Django for Everybody",
    issuer: "University of Michigan (Coursera)",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Django for Everybody.pdf', import.meta.url).href,
    skills: ["Python", "Django", "Web Development"]
  },
  {
    id: "cert-6",
    name: "Google IT Support",
    issuer: "Google",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Google IT Support.pdf', import.meta.url).href,
    skills: ["IT Support", "Networking", "System Administration"]
  },
  {
    id: "cert-7",
    name: "Meta Database Engineer",
    issuer: "Meta",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Meta Database Engineer.pdf', import.meta.url).href,
    skills: ["Databases", "SQL", "Database Engineering", "Data Modeling"]
  },
  {
    id: "cert-8",
    name: "Python for Everybody",
    issuer: "University of Michigan (Coursera)",
    issueDate: "Recent",
    credentialUrl: new URL('../assets/certificates/Python for Everybody.pdf', import.meta.url).href,
    skills: ["Python", "Programming Fundamentals"]
  }
];
