import { personalInfo, socialLinks } from "./common";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";

export const contactMethods = [
  {
    icon: HiMail,
    label: "Email",
    value: personalInfo.email,
    href: socialLinks.email.url,
    preferred: true,
    responseTime: "Within 24 hours",
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    preferred: false,
    responseTime: "For urgent matters",
  },
  {
    icon: HiLocationMarker,
    label: "Location",
    value: personalInfo.location,
    href: null,
    preferred: false,
    responseTime: "Available for meetings",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: socialLinks.linkedin.username,
    href: socialLinks.linkedin.url,
    preferred: true,
    responseTime: "Within 12 hours",
  },
];

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
