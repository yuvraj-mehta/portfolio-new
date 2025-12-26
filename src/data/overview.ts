import {
  FaGraduationCap,
  FaCode,
  FaTrophy,
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Download, MessageCircle } from "lucide-react";
import { BiGitCommit } from "react-icons/bi";
import { projects } from "./projects";
import { achievements } from "./achievements";
import { personalInfo, socialLinks } from "./common";

export const overviewData = {
  highlights: [
    {
      icon: FaGraduationCap,
      title: "B.Tech CS",
      subtitle: "NIT Patna",
      year: "2025",
      progress: 75,
      trend: "+5%",
      isLive: false,
    },
    {
      icon: FaCode,
      title: `${projects.length}`,
      subtitle: "Full Stack",
      year: achievements.stats.yearsExperience,
      progress: 85,
      trend: "+3 this month",
      isLive: true,
    },
    {
      icon: FaTrophy,
      title: "DSA Expert",
      subtitle: `${achievements.leetcode.problemsSolved} Problems`,
      year: "LeetCode",
      progress: 90,
      trend: "+50 this week",
      isLive: true,
    },
    {
      icon: FaBriefcase,
      title: "Experience",
      subtitle: "Internships & Projects",
      year: "Active",
      progress: 80,
      trend: "Growing",
      isLive: false,
    },
  ],
  quickActions: [
    {
      icon: FaEnvelope,
      label: "Send Email",
      href: socialLinks.email.url,
      type: "external",
    },
    {
      icon: Download,
      label: "Download Resume",
      href: personalInfo.resume,
      type: "download",
    },
    {
      icon: MessageCircle,
      label: "Schedule Call",
      href: "/contact",
      type: "internal",
    },
    {
      icon: FaGithub,
      label: "View GitHub",
      href: socialLinks.github.url,
      type: "external",
    },
  ],
  recentActivities: [
    {
      icon: BiGitCommit,
      title: "Portfolio Enhancement",
      description: "Updated portfolio with modern design and better UX",
      time: "2 days ago",
      type: "project",
      isLive: true,
      badge: "Live",
    },
    {
      icon: FaTrophy,
      title: "LeetCode Milestone",
      description: "Solved 50+ problems this month, reached 500+ total",
      time: "1 week ago",
      type: "achievement",
      badge: "Achievement",
    },
    {
      icon: FaCode,
      title: "Project Deployment",
      description: "Deployed E-commerce platform with CI/CD pipeline",
      time: "3 days ago",
      type: "deployment",
      isLive: true,
      badge: "Deployed",
    },
    {
      icon: FaCode,
      title: "Learning Next.js 14",
      description: "Completed advanced Next.js course with App Router",
      time: "2 weeks ago",
      type: "learning",
      badge: "Completed",
    },
  ],
  skillLevels: [
    { name: "React", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "TypeScript", level: 80, category: "Language" },
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "Next.js", level: 85, category: "Framework" },
    { name: "Express", level: 80, category: "Backend" },
  ],
  currentStatus: {
    availability: personalInfo.status.availability,
    currentFocus: "Building Full-Stack Projects with Next.js",
    learning: "Advanced React Patterns & System Design",
    lookingFor: "Internships & Full-time Opportunities",
    location: personalInfo.location,
    lastUpdated: "Updated 2 days ago",
  },
  contactInfo: {
    email: personalInfo.email,
    location: personalInfo.currentLocation,
    socialLinks: [
      {
        name: "GitHub",
        icon: FaGithub,
        url: socialLinks.github.url,
        color: "text-secondary",
      },
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        url: socialLinks.linkedin.url,
        color: "text-primary",
      },
    ],
  },
};
