import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { personalInfo, socialLinks } from "../src/data/common";
import { achievements } from "../src/data/achievements";
import { projects } from "../src/data/projects";
import { experiences } from "../src/data/experiences";
import { education } from "../src/data/education";
import { interests } from "../src/data/interests";
import { skills as skillsData } from "../src/data/skills";
import { certificationsList } from "../src/data/certifications";
import { overviewData } from "../src/data/overview";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../");

const pkgJson = fs.readFileSync(path.join(rootDir, "package.json"), "utf-8");
const pkg = JSON.parse(pkgJson);

const careerPreferences = {
  targetRoles: [
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
  ],
  jobTypes: ["Internship", "Full-Time"],
  preferredDomains: [
    "Web Development",
    "Backend Systems",
    "Distributed Systems",
    "Generative AI",
  ],
  workModePreferences: ["Remote", "Hybrid", "Onsite"],
  openToRelocation: true,
  preferredLocations: ["India", "Remote"],
  availability: personalInfo.status.availability,
  noticePeriod: "Not applicable (student)",
};

const skills = {
  frontend:
    skillsData["Web Development"]?.Frontend.map((item) => item.name) ?? [],
  backend:
    skillsData["Web Development"]?.Backend.map((item) => item.name) ?? [],
  database: skillsData.Database?.Database.map((item) => item.name) ?? [],
  languages: skillsData.Languages?.Languages.map((item) => item.name) ?? [],
  tools: skillsData.Tools?.Tools.map((item) => item.name) ?? [],
};

const ragPayload = {
  meta: {
    owner: personalInfo.name,
    generatedAt: new Date().toISOString(),
    source: "src/data consolidated",
    version: "",
  },
  personalInfo: {
    name: personalInfo.name,
    title: personalInfo.title,
    subtitle: personalInfo.subtitle,
    tagline: personalInfo.tagline,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    currentLocation: personalInfo.currentLocation,
    timezone: personalInfo.timezone,
    university: personalInfo.university,
    course: personalInfo.course,
    availability: personalInfo.status.availability,
    workMode: personalInfo.status.workMode,
    bio: {
      intro: personalInfo.bio.intro,
      full: personalInfo.bio.full,
      robotics: personalInfo.bio.robotics,
      interests: personalInfo.bio.interests,
    },
  },
  careerPreferences,
  socialLinks: {
    github: socialLinks.github.url,
    linkedin: socialLinks.linkedin.url,
    leetcode: socialLinks.leetcode.url,
    geeksforgeeks: socialLinks.geeksforgeeks.url,
    codechef: socialLinks.codechef.url,
    codeforces: socialLinks.codeforces.url,
    twitter: socialLinks.twitter.url,
    instagram: socialLinks.instagram.url,
  },
  interests: interests.map((interest) => ({
    id: interest.id,
    name: interest.name,
    description: interest.description,
  })),
  achievements: {
    competitiveProgramming: {
      leetcode: achievements.leetcode,
      codechef: achievements.codechef,
      codeforces: achievements.codeforces,
      geeksforgeeks: achievements.geeksforgeeks,
    },
    overallStats: {
      yearsExperience: achievements.stats.yearsExperience,
      commits: achievements.stats.commits,
      totalProblemsSolved: achievements.stats.totalProblemsSolved,
    },
    awards: achievements.awards.map((award) => ({
      title: award.title,
      year: award.year,
      description: award.description,
    })),
  },
  certifications: certificationsList.map((cert) => ({
    title: cert.title,
    issuer: cert.issuer,
    year: cert.year,
    description: cert.description,
  })),
  education: education.map((item) => ({
    level: item.level,
    degree: item.title,
    institution: item.institution,
    location: item.location,
    duration: item.duration,
    status: item.status,
    cgpa: item.cgpa,
    percentage: item.percentage,
    courses: item.courses,
    activities: item.activities,
    achievements: item.achievements,
  })),
  experience: experiences.map((exp) => ({
    role: exp.title,
    organization: exp.company,
    location: exp.location,
    period: exp.period,
    description: exp.description,
    skills: exp.skills,
  })),
  projects: projects.map((project) => ({
    id: project.slug || project.id,
    name: project.name,
    category: project.category,
    description: project.description,
    techStack: project.techStack,
    features: project.features,
    links: {
      live: project.live || project.demo,
      github: project.github,
    },
    status: project.status,
  })),
  skills,
  currentFocus: {
    learning: overviewData.currentStatus.learning,
    building: overviewData.currentStatus.currentFocus,
    lookingFor: overviewData.currentStatus.lookingFor,
  },
};

// Derive deterministic version hash from full payload
const version = createHash("sha256")
  .update(JSON.stringify(ragPayload))
  .digest("hex")
  .slice(0, 8);

ragPayload.meta.version = version;

const outputPath = path.join(rootDir, "portfolioKnowledge.generated.json");

fs.writeFileSync(outputPath, JSON.stringify(ragPayload, null, 2));

console.log(`RAG payload written to ${outputPath}`);

// Send data to portfolio server
const PORTFOLIO_SERVER_URL =
  process.env.PORTFOLIO_SERVER_URL ||
  "http://localhost:3001/api/portfolio/update";

async function sendToServer() {
  try {
    const response = await fetch(PORTFOLIO_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ragPayload),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `✓ Portfolio data successfully synced to server (version: ${version})`
      );
      console.log(`  Response:`, result);
    } else {
      console.warn(
        `⚠ Server returned status ${response.status}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`✗ Failed to sync portfolio data to server:`);
    console.error(
      `  ${error instanceof Error ? error.message : String(error)}`
    );
    console.error(
      `  Ensure PORTFOLIO_SERVER_URL is set correctly (current: ${PORTFOLIO_SERVER_URL})`
    );
  }
}

// Execute the API call
await sendToServer();
