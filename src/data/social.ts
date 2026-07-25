export interface SocialProfile {
  platform: string;
  username: string;
  url: string;
  label: string;
  icon: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: "GitHub",
    username: "sunilkumar2k6",
    url: "https://github.com/sunilkumar2k6/",
    label: "GitHub Profile",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    username: "sunilsiyol",
    url: "https://www.linkedin.com/in/sunilsiyol/",
    label: "LinkedIn Profile",
    icon: "linkedin"
  },
  {
    platform: "Instagram",
    username: "shunil.siyol",
    url: "https://www.instagram.com/shunil.siyol",
    label: "Instagram Profile",
    icon: "instagram"
  },
  {
    platform: "Reddit",
    username: "Ancient_Goose_9743",
    url: "https://www.reddit.com/u/Ancient_Goose_9743/",
    label: "Reddit Profile",
    icon: "reddit"
  },
  {
    platform: "X",
    username: "SuniilSiyol9",
    url: "https://x.com/SuniilSiyol9",
    label: "X Profile",
    icon: "x"
  }
];
