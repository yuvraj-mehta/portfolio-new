// Centralized Portfolio Data Configuration
// This file contains all portfolio data to eliminate duplication and enable easy updates

import {
  FaRobot,
  FaRunning,
  FaPuzzlePiece,
  FaUsers,
  FaGraduationCap,
  FaCode,
  FaTrophy,
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaBook,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiExpress,
} from "react-icons/si";
import { Download } from "lucide-react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiGitCommit } from "react-icons/bi";

export const personalInfo = {
  name: "Yuvraj Mehta",
  title: "Full Stack Developer",
  subtitle: "B.Tech CS Student • NIT Patna",
  tagline:
    "Full Stack Developer • B.Tech CS Student • NIT Patna • Passionate about creating impactful digital solutions",
  email: "yuvraj.mehta532@gmail.com",
  phone: "+91-9334083113",
  location: "Gaya, Bihar, India",
  currentLocation: "New Delhi, India",
  timezone: "IST (UTC +5:30)",
  university: "NIT Patna",
  course: "Computer Science",
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

export const socialLinks = {
  github: {
    url: "https://github.com/yuvraj-mehta",
    username: "yuvraj-mehta",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/yuvraj-mehta-a0274528a/",
    username: "yuvraj-mehta-a0274528a",
  },
  leetcode: {
    url: "https://leetcode.com/u/mythical-UV/",
    username: "mythical-UV",
  },
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
  twitter: {
    url: "https://x.com/yuvraj_mehta02",
    username: "yuvraj_mehta02",
  },
  email: {
    url: "mailto:yuvraj.mehta532@gmail.com",
    address: "yuvraj.mehta532@gmail.com",
  },
};

export const achievements = {
  leetcode: {
    rating: "1649",
    maxRating: "1649",
    problemsSolved: "277",
    globalRanking: "125365",
    percentile: "Top 17.36%",
  },
  codechef: {
    rating: "1451",
    maxRating: "1456",
    problemsSolved: "25",
    stars: "2★",
    division: "Div 3",
  },
  codeforces: {
    rating: "1030",
    maxRating: "1085",
    problemsSolved: "27",
    rank: "Newbie",
  },
  geeksforgeeks: {
    problemsSolved: "130",
    rank: "1058",
  },
  stats: {
    yearsExperience: "2+",
    totalProjects: "4",
    commits: "500+",
    totalProblemsSolved: "459",
  },
  awards: [
    {
      title: "Winner - Model United Nations",
      category: "competition",
      year: "2023",
      description:
        "Represented the Republic of Poland at NIT Patna's Model United Nations. Earned the Best Delegate award for exceptional debate skills and impactful resolutions.",
    },
    {
      title: "Technical Member",
      category: "technical",
      year: "2023 - Present",
      description:
        "Active member of the Robotics Club, led team building combat and soccer bots, organized workshops.",
    },
    {
      title: "Class Representative",
      category: "leadership",
      year: "2023 - 2024",
      description:
        "Coordinated between faculty and students, organized department events for 3 semesters.",
    },
    {
      title: "Bronze Medal - NIT Patna Intramurals",
      category: "sports",
      year: "2023",
      description: "Won Bronze in 50m Hurdles at the university sports event.",
    },
  ],
};

export const experiences = [
  {
    title: "Technical Member",
    company: "Robotics Club, NIT Patna",
    location: "NIT Patna",
    period: "December 2023 - Present",
    type: "Technical",
    status: "Currently Active",
    description:
      "Organized and facilitated 3+ workshops on designing and building robotic bots. Led a team of 4 to build a combat-ready battle bot, achieving 4th place among 15+ teams at NIT Patna's tech fest. Directed a team of 3 in designing and developing a soccer bot for the annual tech fest, enhancing hands-on robotics and teamwork skills.",
    highlights: [
      "4th place in tech fest",
      "3+ workshops organized",
      "Team of 4-7 members",
    ],
    skills: ["Arduino", "Mechanical Design", "Team Leadership"],
  },
  {
    title: "Class Representative",
    company: "Computer Science Department, NIT Patna",
    location: "NIT Patna",
    period: "2023 - 2024",
    type: "Leadership",
    status: "Completed",
    description:
      "Served as the official representative for the Computer Science Engineering department for 3 consecutive semesters. Coordinated communication between faculty and students, organized department events and academic activities. Facilitated student concerns and feedback to administration, contributing to improved academic environment and student satisfaction.",
    highlights: [
      "3 semesters of service",
      "Faculty-student coordination",
      "Department event organization",
    ],
    skills: [
      "Communication",
      "Leadership",
      "Event Management",
      "Problem Resolution",
    ],
  },
  {
    title: "Team Leader",
    company: "Hackathons (including Smart India Hackathon)",
    location: "NIT Patna & Remote",
    period: "2023",
    type: "Leadership",
    description:
      "Led teams in 4 major hackathons, including the prestigious Smart India Hackathon. Guided my team to qualify at the internal NIT Patna hackathon and advance to the national level. Oversaw all phases from ideation to development and presentation, ensuring effective collaboration and timely delivery of innovative solutions.",
    highlights: [
      "National level qualification",
      "4 major hackathons",
      "End-to-end project management",
    ],
    skills: [
      "Problem Solving",
      "Team Management",
      "Presentation",
      "Innovation",
    ],
  },
];

export const skills = {
  "Web Development": {
    Frontend: [
      { name: "React", level: "Advanced", color: "text-blue-400" },
      { name: "JavaScript", level: "Advanced", color: "text-yellow-400" },
      { name: "TypeScript", level: "Intermediate", color: "text-blue-500" },
      { name: "HTML5", level: "Advanced", color: "text-orange-400" },
      { name: "CSS3", level: "Advanced", color: "text-blue-400" },
      { name: "Tailwind CSS", level: "Advanced", color: "text-cyan-400" },
      { name: "Next.js", level: "Intermediate", color: "text-gray-300" },
      { name: "Redux", level: "Intermediate", color: "text-purple-400" },
      { name: "Vue", level: "Beginner", color: "text-green-400" },
    ],
    Backend: [
      { name: "Node.js", level: "Intermediate", color: "text-green-400" },
      { name: "RESTful APIs", level: "Intermediate", color: "text-cyan-400" },
      { name: "Express.js", level: "Intermediate", color: "text-gray-400" },
    ],
  },
  Database: {
    Database: [
      { name: "MongoDB", level: "Intermediate", color: "text-green-400" },
      { name: "SQL", level: "Intermediate", color: "text-blue-400" },
      {
        name: "Database Design",
        level: "Intermediate",
        color: "text-purple-400",
      },
    ],
  },
  Languages: {
    Languages: [
      { name: "JavaScript", level: "Advanced", color: "text-yellow-400" },
      { name: "TypeScript", level: "Intermediate", color: "text-blue-500" },
      { name: "C++", level: "Advanced", color: "text-blue-400" },
      { name: "Java", level: "Intermediate", color: "text-orange-400" },
      { name: "Python", level: "Beginner", color: "text-yellow-400" },
    ],
  },
  Tools: {
    Tools: [
      { name: "Git & GitHub", level: "Advanced", color: "text-orange-400" },
      { name: "VS Code", level: "Advanced", color: "text-blue-400" },
      { name: "Webpack", level: "Intermediate", color: "text-blue-400" },
      { name: "Docker", level: "Beginner", color: "text-blue-400" },
    ],
  },
};

export const interests = [
  {
    icon: FaPuzzlePiece,
    name: "Competitive Programming",
    description: "LeetCode, Codeforces & more",
  },
  {
    icon: FaRunning,
    name: "Athletics",
    description: "Bronze in 50m Hurdles",
  },
  {
    icon: FaPuzzlePiece,
    name: "Problem Solving",
    description: "Analytical thinking and solutions",
  },
];

export const education = [
  {
    level: "Bachelor of Technology",
    title: "B.Tech in Computer Science and Engineering",
    institution: "National Institute of Technology, Patna",
    location: "Patna, Bihar",
    duration: "2023 - 2027",
    status: "current",
    cgpa: "7.68/10",
    activities: [
      "Class Representative for CSE Department",
      "Member of Technical Club",
      "Competitive Programming Participant",
    ],
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence",
    ],
    achievements: [
      "Maintaining CGPA of 7.68/10",
      "Class Representative for CSE Department",
      "MUN Best Delegate Award",
    ],
  },
  {
    level: "Higher Secondary",
    title: "Class XII (CBSE)",
    institution: "Pragya Bharti Public School, Gaya",
    location: "Gaya, Bihar",
    duration: "2021 - 2022",
    status: "completed",
    percentage: "88.88%",
    activities: [],
    courses: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "English",
      "Physical Education",
    ],
    achievements: ["Scored 88.88% in CBSE Class 12", "School Merit List"],
  },
  {
    level: "Secondary",
    title: "Class X (CBSE)",
    institution: "Pragya Bharti Public School, Gaya",
    location: "Gaya, Bihar",
    duration: "2019 - 2020",
    status: "completed",
    percentage: "91%",
    activities: [
      "Science Exhibitions",
      "Sports Competitions",
      "Debate Competitions",
    ],
    courses: [
      "Science",
      "Mathematics",
      "Social Studies",
      "English",
      "Sanskrit",
      "Information Technology",
    ],
    achievements: ["Scored 91% in CBSE Class 10"],
  },
];

export const certifications = [
  {
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    year: "2023",
    description:
      "Comprehensive full-stack web development course covering HTML, CSS, JavaScript, complete MERN stack, and deployment.",
    featured: true,
    category: "technical",
  },
];

export const projects = [
  {
    title: "BookHive",
    name: "BookHive",
    description:
      "BookNest is a full-stack library management system with distinct user and admin roles. It features book and PYQ management, a borrowing system, OTP-verified authentication, and separate dashboards. Built with React, Node.js, Express.js, and MongoDB.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F911edf0abfc44540bba885225b62aa26%2F6aff8a4cc2a44603904ec06dfbd17734?format=webp&width=2880&height=1560",
    category: "Full Stack",
    featured: true,
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "JWT"],
    techStack: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    demo: "https://bookhive-manager.vercel.app",
    live: "https://bookhive-manager.vercel.app",
    github: "https://github.com/yuvraj-mehta/Byteverse_NandiNinjas",
    status: "Live",
    features: [
      "Full-stack library management system",
      "User and admin role management",
      "Book and PYQ management",
      "OTP-verified authentication",
      "Separate user and admin dashboards",
    ],
  },
  {
    title: "Portfolio Website",
    name: "Portfolio Website",
    description:
      "Personal developer portfolio showcasing projects and skills. Designed and built a responsive single-page portfolio with smooth animations and dynamic navigation. Integrated a contact form using EmailJS and added a downloadable resume feature.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F911edf0abfc44540bba885225b62aa26%2F564561b9219a409f8cd1139440589eac?format=webp&width=2880&height=1560",
    category: "Frontend",
    featured: true,
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    demo: "https://yuvrajmehta.codes",
    live: "https://yuvrajmehta.codes",
    github: "https://github.com/yuvraj-mehta/My-Portfolio",
    status: "Live",
    features: [
      "Responsive single-page portfolio",
      "Smooth animations and dynamic navigation",
      "Integrated contact form with EmailJS",
      "Downloadable resume feature",
    ],
  },
  {
    title: "EcoGuardian",
    name: "EcoGuardian",
    description:
      "An online community platform empowering individuals to collaborate on environmental projects, report cleanliness issues, access educational resources, and drive positive change for a cleaner, greener future. 🌍",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F911edf0abfc44540bba885225b62aa26%2F2fbbcced95b94a128c0a7b5e14c085a0?format=webp&width=2880&height=1560",
    category: "Full Stack",
    featured: true,
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    demo: "https://yuvraj-mehta.github.io/EcoGuardian_prototype/",
    live: "https://yuvraj-mehta.github.io/EcoGuardian_prototype/",
    github: "https://github.com/yuvraj-mehta/EcoGuardian_prototype",
    status: "Live",
    features: [
      "Environmental community platform",
      "Project collaboration features",
      "Cleanliness issue reporting",
      "Educational resources access",
    ],
  },
  {
    title: "Stickify",
    name: "Stickify",
    description:
      "This is a simple notes application built with React and Vite. It allows users to create, update, delete, and manage notes with different colors. The application uses Appwrite as the backend service for managing notes.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F911edf0abfc44540bba885225b62aa26%2F66d04f4d2b8f4683a586836a1645fcd0?format=webp&width=2880&height=1560",
    category: "Frontend",
    featured: false,
    tags: ["React", "Vite", "Tailwind CSS", "Appwrite"],
    techStack: ["React", "Vite", "Tailwind CSS", "Appwrite"],
    demo: "https://stickify-git-master-yuvraj-mehtas-projects.vercel.app/",
    live: "https://stickify-git-master-yuvraj-mehtas-projects.vercel.app/",
    github: "https://github.com/yuvraj-mehta/Stickify",
    status: "Live",
    features: [
      "Simple notes application",
      "Create, update, delete notes",
      "Color-coded note organization",
      "Appwrite backend integration",
    ],
  },
];

export const siteMetadata = {
  title: "Yuvraj Mehta - Full Stack Developer",
  titleTemplate: "%s | Yuvraj Mehta Portfolio",
  description:
    "Full Stack Developer • B.Tech CS Student • NIT Patna • Passionate about creating impactful digital solutions",
  ogImage: "",
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Web Development",
    "NIT Patna",
  ],
  author: "Yuvraj Mehta",
  siteUrl: "https://yuvrajmehta.codes",
  image: "/public/yuvraj.png",
  twitterUsername: "@yuvraj_mehta02",
  lang: "en",
  locale: "en_US",
};

export const quickLinks = [
  {
    name: "Resume",
    href: "/src/assets/Yuvraj_Resume.pdf",
    icon: "📄",
    external: true,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/mythical-UV/",
    icon: "⚡",
    external: true,
  },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/user/yuvrajmevbrx/",
    icon: "🟢",
    external: true,
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/quick_unity_53",
    icon: "👨‍🍳",
    external: true,
  },
  { name: "Projects", href: "/projects", icon: "🚀", external: false },
];

export const techStack = [
  {
    name: "React",
    icon: "R",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-400",
  },
  {
    name: "Node.js",
    icon: "N",
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-400",
  },
  {
    name: "MongoDB",
    icon: "M",
    color: "from-yellow-500 to-orange-500",
    textColor: "text-yellow-400",
  },
  {
    name: "TypeScript",
    icon: "TS",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-400",
  },
  {
    name: "Tailwind",
    icon: "TW",
    color: "from-indigo-500 to-blue-600",
    textColor: "text-indigo-400",
  },
];

export const footerStats = {
  totalVisitors: "15,475",
  lastUpdated: "August 16, 2025",
  dsaRating: 5,
  totalProblems: "500+",
  totalProjects: "15+",
  yearsExperience: "2+",
};

export const aboutPageData = {
  interests: [
    {
      icon: "FaRobot",
      name: "Robotics",
      description: "Building combat & soccer bots",
      color: "text-blue-500",
    },
    {
      icon: "FaRunning",
      name: "Athletics",
      description: "Bronze in 50m Hurdles",
      color: "text-green-500",
    },
    {
      icon: "FaPuzzlePiece",
      name: "Problem Solving",
      description: "Competitive programming",
      color: "text-purple-500",
    },
    {
      icon: "FaBullseye",
      name: "Mentoring",
      description: "Leading workshops",
      color: "text-red-500",
    },
  ],
  achievementStats: [
    {
      value: achievements.leetcode.rating,
      label: "LeetCode Rating",
      color: "text-orange-500",
    },
    {
      value: achievements.stats.totalProblemsSolved,
      label: "Problems Solved",
      color: "text-green-500",
    },
    {
      value: achievements.stats.totalProjects,
      label: "Projects Built",
      color: "text-blue-500",
    },
    {
      value: achievements.leetcode.percentile,
      label: "LeetCode Percentile",
      color: "text-purple-500",
    },
  ],
};

// Overview page specific data
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
      title: achievements.stats.totalProjects,
      subtitle: "Full Stack",
      year: achievements.stats.yearsExperience,
      progress: 85,
      trend: "+3 this month",
      isLive: true,
    },
    {
      icon: FaTrophy,
      title: "DSA Expert",
      subtitle: achievements.leetcode.problemsSolved + " Problems",
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
      icon: HiChatBubbleLeftRight,
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
      isLive: false,
      badge: "Achievement",
    },
    {
      icon: FaRocket,
      title: "Project Deployment",
      description: "Deployed E-commerce platform with CI/CD pipeline",
      time: "3 days ago",
      type: "deployment",
      isLive: true,
      badge: "Deployed",
    },
    {
      icon: FaBook,
      title: "Learning Next.js 14",
      description: "Completed advanced Next.js course with App Router",
      time: "2 weeks ago",
      type: "learning",
      isLive: false,
      badge: "Completed",
    },
  ],
  skillLevels: [
    { name: "React", level: 90, icon: FaReact, category: "Frontend" },
    { name: "Node.js", level: 85, icon: FaNodeJs, category: "Backend" },
    { name: "TypeScript", level: 80, icon: SiTypescript, category: "Language" },
    { name: "MongoDB", level: 75, icon: SiMongodb, category: "Database" },
    { name: "Next.js", level: 85, icon: SiNextdotjs, category: "Framework" },
    { name: "Express", level: 80, icon: SiExpress, category: "Backend" },
  ],
  currentStatus: {
    availability: personalInfo.status.availability,
    currentFocus: "Building Full-Stack Projects with Next.js",
    learning: "Advanced React Patterns & System Design",
    lookingFor: "Internships & Full-time Opportunities",
    location: personalInfo.location + " (" + personalInfo.status.workMode + ")",
    lastUpdated: "Updated 2 days ago",
  },
  contactInfo: {
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    timezone: "IST (UTC +5:30)",
    availability: personalInfo.status.availability,
    preferredContact: "Email or LinkedIn",
    responseTime: "Within 24 hours",
    socialLinks: [
      {
        name: "GitHub",
        icon: FaGithub,
        url: socialLinks.github.url,
        username: "@" + socialLinks.github.username,
        color: "text-gray-300 hover:text-white",
      },
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        url: socialLinks.linkedin.url,
        username: socialLinks.linkedin.username,
        color: "text-blue-400 hover:text-blue-300",
      },
      {
        name: "Twitter",
        icon: FaTwitter,
        url: socialLinks.twitter.url,
        username: socialLinks.twitter.username,
        color: "text-sky-400 hover:text-sky-300",
      },
      {
        name: "Email",
        icon: FaEnvelope,
        url: socialLinks.email.url,
        username: socialLinks.email.address,
        color: "text-red-400 hover:text-red-300",
      },
    ],
  },
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
