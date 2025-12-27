import { SiteMetadata, PersonalInfo, SocialLinks } from "./types";
import {
  FaRobot,
  FaRunning,
  FaPuzzlePiece,
  FaBullseye,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

export const personalInfo: PersonalInfo = {
  name: "Yuvraj Mehta",
  title: "Full Stack Developer",
  subtitle: "B.Tech CS Student • NIT Patna",
  tagline:
    "Full Stack Developer • B.Tech CS Student • NIT Patna • Passionate about creating impactful digital solutions",
  email: "yuvraj.mehta532@gmail.com",
  phone: "+91-9334083113",
  location: "Gaya, Bihar, India",
  currentLocation: "Patna, India",
  timezone: "IST (UTC +5:30)",
  university: "NIT Patna",
  course: "Computer Science and Engineering",
  bio: {
    intro:
      "B.Tech CS student at NIT Patna passionate about building full stack applications with a focus on user-friendly interfaces. Skilled in MERN Stack.",
    full: "Computer Science student at NIT Patna passionate about full stack development with a strong foundation in Data Structures & Algorithms. I approach technical challenges analytically and continually expand my skills in GenAI and modern web technologies. As a Robotics Club member, I've organized workshops and led teams building combat and soccer bots. Outside coding, I enjoy competitive programming and sports, having won Bronze in 50m Hurdles at NIT Patna Intramurals.",
    robotics:
      "As a Robotics Club member, I've organized workshops and led teams building combat and soccer bots. I believe in learning by doing and enjoy sharing knowledge with others through mentoring and technical discussions.",
    interests:
      "When I'm not coding, you can find me solving algorithmic challenges on competitive programming platforms, participating in hackathons, or running track. I won Bronze in 50m Hurdles at NIT Patna Intramurals!",
  },
  profileImage:
    "https://images.pexels.com/photos/32326782/pexels-photo-32326782.jpeg",
  resume: "/src/assets/Yuvraj_Resume.pdf",
  status: {
    availability: "Available",
    workMode: "Remote",
  },
};

export const socialLinks: SocialLinks = {
  github: { url: "https://github.com/yuvraj-mehta", username: "yuvraj-mehta" },
  linkedin: {
    url: "https://www.linkedin.com/in/mehta-yuvraj",
    username: "yuvraj-mehta-a0274528a",
  },
  leetcode: { url: "https://leetcode.com/u/holaGuy/", username: "mythical-UV" },
  geeksforgeeks: {
    url: "https://www.geeksforgeeks.org/user/yuvrajmevbrx/",
    username: "yuvrajmevbrx",
  },
  codechef: {
    url: "https://www.codechef.com/users/quick_unity_53",
    username: "quick_unity_53",
  },
  codeforces: {
    url: "https://codeforces.com/profile/yuvraj.mehta532",
    username: "yuvraj.mehta532",
  },
  instagram: {
    url: "https://www.instagram.com/yuvraj.mehta4261/",
    username: "yuvraj.mehta4261",
  },
  twitter: { url: "https://x.com/yuvraj_mehta02", username: "yuvraj_mehta02" },
  email: {
    url: "mailto:yuvraj.mehta532@gmail.com",
    address: "yuvraj.mehta532@gmail.com",
  },
};

export const siteMetadata: SiteMetadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  titleTemplate: `%s | ${personalInfo.name} Portfolio`,
  description: personalInfo.tagline,
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Web Development",
    "NIT Patna",
  ],
  author: personalInfo.name,
  siteUrl: "https://yuvrajmehta.codes",
  twitterUsername: socialLinks.twitter.username || "",
  lang: "en",
  locale: "en_US",
};

export const getThemeColor = (colorName: string): React.CSSProperties => {
  const colorMap: { [key: string]: React.CSSProperties } = {
    primary: { color: "hsl(var(--primary))" },
    accent: { color: "hsl(var(--accent))" },
    secondary: { color: "hsl(var(--secondary))" },
    success: { color: "hsl(var(--skill-database))" },
    info: { color: "hsl(var(--skill-tools))" },
    warning: { color: "hsl(var(--skill-languages))" },
    danger: { color: "hsl(var(--destructive))" },
  };
  return colorMap[colorName] || { color: "hsl(var(--primary))" };
};
