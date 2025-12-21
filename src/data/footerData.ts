import { personalInfo, socialLinks, footerStats } from "./commonData";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const footerData = {
  brand: {
    name: personalInfo.name,
    title: personalInfo.title,
    description:
      "Full Stack Developer specializing in modern web technologies and algorithms, currently exploring the exciting world of Generative AI.",
  },
  contact: {
    location: personalInfo.currentLocation,
    email: personalInfo.email,
    emailDisplay: "yuvrajmehta2003@...",
  },
  sections: {
    quickLinks: [
      {
        name: "Resume",
        href: personalInfo.resume,
        icon: "FileText",
        external: true,
      },
      {
        name: "LeetCode",
        href: socialLinks.leetcode.url,
        icon: "SiLeetcode",
        external: true,
      },
      {
        name: "GeeksforGeeks",
        href: socialLinks.geeksforgeeks.url,
        icon: "SiGeeksforgeeks",
        external: true,
      },
      {
        name: "CodeChef",
        href: socialLinks.codechef.url,
        icon: "SiCodechef",
        external: true,
      },
      { name: "Projects", href: "/projects", icon: "Zap", external: false },
    ],
    navigation: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Skills", href: "/skills" },
      { name: "Projects", href: "/projects" },
      { name: "Experience", href: "/experience" },
      { name: "Contact", href: "/contact" },
    ],
  },
  stats: footerStats,
  copyright: {
    year: new Date().getFullYear(),
    owner: personalInfo.name,
    tech: "React & TypeScript",
  },
};

export const quickLinks = [
  {
    name: "Resume",
    href: personalInfo.resume,
    icon: "📄",
    external: true,
  },
  {
    name: "LeetCode",
    href: socialLinks.leetcode.url,
    icon: "⚡",
    external: true,
  },
  {
    name: "GeeksforGeeks",
    href: socialLinks.geeksforgeeks.url,
    icon: "🟢",
    external: true,
  },
  {
    name: "CodeChef",
    href: socialLinks.codechef.url,
    icon: "👨‍🍳",
    external: true,
  },
  { name: "Projects", href: "/projects", icon: "🚀", external: false },
];

export const socialMediaLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: socialLinks.github.url,
    description: "Check out my code",
    colorStyle: { color: "hsl(var(--secondary))" },
    bgColor: "bg-secondary/20",
    borderColor: "border-secondary/30",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: socialLinks.linkedin.url,
    description: "Let's connect professionally",
    colorStyle: { color: "hsl(var(--primary))" },
    bgColor: "bg-primary/20",
    borderColor: "border-primary/30",
  },
  {
    name: "Instagram",
    icon: "FaInstagram",
    href: socialLinks.instagram.url,
    description: "Follow for updates",
    colorStyle: { color: "hsl(var(--accent))" },
    bgColor: "bg-accent/20",
    borderColor: "border-accent/30",
  },
  {
    name: "Email",
    icon: "HiMail",
    href: socialLinks.email.url,
    description: "Send me a message",
    colorStyle: { color: "hsl(var(--destructive))" },
    bgColor: "bg-destructive/20",
    borderColor: "border-destructive/30",
  },
];
