export interface Profile {
  name: string;
  professionalTitle: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  location: string;
  email: string;
  availability: string;
  profileImage: string;
  resumeUrl: string;
  seo?: {
    siteTitle: string;
    defaultDescription: string;
    canonicalUrl: string;
    openGraphImage: string;
    twitterHandle: string;
  };
}

export const profile: Profile = {
  name: "Sunil Kumar",
  professionalTitle: "Computer Science & Engineering Student",
  tagline: "Building modern digital experiences and practical software solutions.",
  shortBio: "Computer Science and Engineering student focused on software development, modern web technologies, and building practical projects that solve real problems.",
  longBio: "I’m Sunil Kumar, a Computer Science and Engineering student at Chandigarh University. My journey in technology is driven by curiosity, experimentation, and a desire to build things that are both useful and engaging.\n\nI enjoy working on software projects that allow me to combine problem-solving with creativity, particularly in web development and modern digital experiences. Through academic work, personal projects, and my internship experience, I’ve gained practical exposure to different areas of software development and learned the importance of continuously improving both technical and professional skills.\n\nI’m currently focused on strengthening my development fundamentals, exploring modern technologies, and building projects that demonstrate real-world problem-solving. I’m always interested in learning something new, collaborating with others, and taking on challenges that help me grow as a developer.",
  location: "India",
  email: "sunilkumar1758.er@gmail.com", 
  availability: "Open to Opportunities",
  profileImage: new URL('../assets/profile/MySelf.png', import.meta.url).href, 
  resumeUrl: new URL('../assets/profile/Resume.pdf', import.meta.url).href,
  seo: {
    siteTitle: "Sunil Kumar | Portfolio",
    defaultDescription: "Computer Science and Engineering student focused on software development, modern web technologies, and practical project building.",
    canonicalUrl: "https://example.com",
    openGraphImage: "/og-image.png",
    twitterHandle: "@sunil_kumar",
  }
};
