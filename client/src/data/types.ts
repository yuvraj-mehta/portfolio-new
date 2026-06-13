// TypeScript interfaces for canonical data layer (no implementations)

// Centralized icon type for consistency
export type IconType = React.ComponentType<{ className?: string }>;

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  currentLocation: string;
  timezone: string;
  university: string;
  course: string;
  bio: {
    intro: string;
    full: string;
    robotics: string;
    interests: string;
  };
  profileImage: string;
  resume: string;
  status: {
    availability: string;
    workMode: string;
  };
}

export interface SocialLinkItem {
  url: string;
  username?: string;
  address?: string;
}

export interface SocialLinks {
  github: SocialLinkItem;
  linkedin: SocialLinkItem;
  leetcode: SocialLinkItem;
  geeksforgeeks: SocialLinkItem;
  codechef: SocialLinkItem;
  codeforces: SocialLinkItem;
  instagram: SocialLinkItem;
  twitter: SocialLinkItem;
  email: SocialLinkItem;
}

export interface Interest {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: string;
}

export interface AchievementStats {
  leetcode: {
    rating: string;
    maxRating: string;
    problemsSolved: string;
    globalRanking?: string;
    percentile?: string;
  };
  codechef: {
    rating: string;
    maxRating: string;
    problemsSolved: string;
    stars?: string;
    division?: string;
  };
  codeforces: {
    rating: string;
    maxRating: string;
    problemsSolved: string;
    rank?: string;
  };
  geeksforgeeks: {
    problemsSolved: string;
    rank?: string;
  };
  stats: {
    yearsExperience: string;
    commits: string;
    totalProblemsSolved: string;
  };
  awards: Array<{
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
  }>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  tags: string[];
  techStack: string[];
  demo?: string;
  live?: string;
  github?: string;
  status?: string;
  features?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  status?: string;
  description: string;
  highlights?: string[];
  skills?: string[];
}

export interface EducationItem {
  id: string;
  level: string;
  title: string;
  institution: string;
  location: string;
  duration: string;
  status: string;
  cgpa?: string;
  percentage?: string;
  activities?: string[];
  courses?: string[];
  achievements?: string[];
}

export interface EducationTimelineItem {
  id: number;
  status?: string;
  type: string;
  period: string;
  institution: string;
  degree: string;
  location: string;
  description: string;
  keyPoints?: {
    courses?: string[];
    achievements?: string[];
    activities?: Array<{ role: string; detail: string }>;
  };
}

export interface FooterStats {
  totalVisitors: string;
  lastUpdated: string;
  dsaRating: number;
  totalProblems: string;
  totalProjects: string;
  yearsExperience: string;
}

export interface SiteMetadata {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  twitterUsername: string;
  lang: string;
  locale: string;
}

export interface PortfolioData {
  meta: {
    owner: string;
    generatedAt: string;
    source: string;
    version: string;
  };
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    currentLocation: string;
    timezone: string;
    university: string;
    course: string;
    availability: string;
    workMode: string;
    bio: {
      intro: string;
      full: string;
      robotics: string;
      interests: string;
    };
  };
  careerPreferences: {
    targetRoles: string[];
    jobTypes: string[];
    preferredDomains: string[];
    workModePreferences: string[];
    openToRelocation: boolean;
    preferredLocations: string[];
    availability: string;
    noticePeriod: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    geeksforgeeks: string;
    codechef: string;
    codeforces: string;
    twitter: string;
    instagram: string;
  };
  interests: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  achievements: {
    competitiveProgramming: {
      leetcode: {
        rating: string;
        maxRating: string;
        problemsSolved: string;
        globalRanking?: string;
        percentile?: string;
      };
      codechef: {
        rating: string;
        maxRating: string;
        problemsSolved: string;
        stars?: string;
        division?: string;
      };
      codeforces: {
        rating: string;
        maxRating: string;
        problemsSolved: string;
        rank?: string;
      };
      geeksforgeeks: {
        problemsSolved: string;
        rank?: string;
      };
    };
    overallStats: {
      yearsExperience: string;
      commits: string;
      totalProblemsSolved: string;
    };
    awards: Array<{
      title: string;
      year: string;
      description: string;
    }>;
  };
  certifications: Array<{
    title: string;
    issuer: string;
    year: string;
    description: string;
  }>;
  education: Array<{
    level: string;
    degree: string;
    institution: string;
    location: string;
    duration: string;
    status: string;
    cgpa?: string;
    percentage?: string;
    courses?: string[];
    activities?: string[];
    achievements?: string[];
  }>;
  experience: Array<{
    role: string;
    organization: string;
    location: string;
    period: string;
    description: string;
    skills?: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    techStack: string[];
    features?: string[];
    links: {
      live?: string;
      github?: string;
    };
    status?: string;
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    languages: string[];
    tools: string[];
  };
  currentFocus: {
    learning: string;
    building: string;
    lookingFor: string;
  };
}
