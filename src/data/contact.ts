import { personalInfo, socialLinks } from "./common";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaLinkedin, FaFile, FaLightbulb } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

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
  { name: "Projects", href: "/projects", icon: FaLightbulb, external: false },
];
