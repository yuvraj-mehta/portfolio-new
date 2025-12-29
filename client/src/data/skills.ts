import { getThemeColor } from "./common";

export const skills = {
  "Web Development": {
    Frontend: [
      {
        name: "React",
        level: "Advanced",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "JavaScript",
        level: "Advanced",
        colorKey: "warning",
        style: getThemeColor("warning"),
      },
      {
        name: "TypeScript",
        level: "Intermediate",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "HTML5",
        level: "Advanced",
        colorKey: "danger",
        style: getThemeColor("danger"),
      },
      {
        name: "CSS3",
        level: "Advanced",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        colorKey: "info",
        style: getThemeColor("info"),
      },
      {
        name: "Next.js",
        level: "Intermediate",
        colorKey: "secondary",
        style: getThemeColor("secondary"),
      },
      {
        name: "Redux",
        level: "Intermediate",
        colorKey: "accent",
        style: getThemeColor("accent"),
      },
      {
        name: "Vue",
        level: "Beginner",
        colorKey: "success",
        style: getThemeColor("success"),
      },
    ],
    Backend: [
      {
        name: "Node.js",
        level: "Intermediate",
        colorKey: "success",
        style: getThemeColor("success"),
      },
      {
        name: "RESTful APIs",
        level: "Intermediate",
        colorKey: "info",
        style: getThemeColor("info"),
      },
      {
        name: "Express.js",
        level: "Intermediate",
        colorKey: "secondary",
        style: getThemeColor("secondary"),
      },
    ],
  },
  Database: {
    Database: [
      {
        name: "MongoDB",
        level: "Intermediate",
        colorKey: "success",
        style: getThemeColor("success"),
      },
      {
        name: "SQL",
        level: "Intermediate",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "Database Design",
        level: "Intermediate",
        colorKey: "accent",
        style: getThemeColor("accent"),
      },
    ],
  },
  Languages: {
    Languages: [
      {
        name: "JavaScript",
        level: "Advanced",
        colorKey: "warning",
        style: getThemeColor("warning"),
      },
      {
        name: "TypeScript",
        level: "Intermediate",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "C++",
        level: "Advanced",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "Java",
        level: "Intermediate",
        colorKey: "danger",
        style: getThemeColor("danger"),
      },
      {
        name: "Python",
        level: "Beginner",
        colorKey: "warning",
        style: getThemeColor("warning"),
      },
    ],
  },
  Tools: {
    Tools: [
      {
        name: "Git & GitHub",
        level: "Advanced",
        colorKey: "danger",
        style: getThemeColor("danger"),
      },
      {
        name: "VS Code",
        level: "Advanced",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "Webpack",
        level: "Intermediate",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
      {
        name: "Docker",
        level: "Beginner",
        colorKey: "primary",
        style: getThemeColor("primary"),
      },
    ],
  },
};

export const techStack = [
  { name: "React", icon: "R", color: "from-primary to-primary-glow" },
  { name: "Node.js", icon: "N", color: "from-skill-database to-accent" },
  { name: "MongoDB", icon: "M", color: "from-skill-languages to-accent" },
  { name: "TypeScript", icon: "TS", color: "from-accent to-primary" },
  { name: "Tailwind", icon: "TW", color: "from-skill-tools to-primary" },
];
