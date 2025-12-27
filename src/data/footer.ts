import { FooterStats } from "./types";
import { personalInfo, socialLinks } from "./common";
import { projects } from "./projects";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFile,
  FaLightbulb,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";

export const footerStats: FooterStats = {
  totalVisitors: "15,475",
  lastUpdated: "August 16, 2025",
  dsaRating: 5,
  totalProblems: "500+",
  totalProjects: `${projects.length}+`,
  yearsExperience: "2+",
};

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
        icon: FaFile,
        external: true,
      },
      {
        name: "LeetCode",
        href: socialLinks.leetcode.url,
        icon: SiLeetcode,
        external: true,
      },
      {
        name: "GeeksforGeeks",
        href: socialLinks.geeksforgeeks.url,
        icon: FaFile,
        external: true,
      },
      {
        name: "CodeChef",
        href: socialLinks.codechef.url,
        icon: FaFile,
        external: true,
      },
      {
        name: "Projects",
        href: "/projects",
        icon: FaLightbulb,
        external: false,
      },
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
    icon: FaInstagram,
    href: socialLinks.instagram.url,
    description: "Follow for updates",
    colorStyle: { color: "hsl(var(--accent))" },
    bgColor: "bg-accent/20",
    borderColor: "border-accent/30",
  },
  {
    name: "Email",
    icon: HiMail,
    href: socialLinks.email.url,
    description: "Send me a message",
    colorStyle: { color: "hsl(var(--destructive))" },
    bgColor: "bg-destructive/20",
    borderColor: "border-destructive/30",
  },
];
