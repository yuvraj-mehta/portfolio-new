// Re-export all data from individual files for convenient imports
// This allows components to import from a single source: import { ... } from "@/data"
import { interestData as _interestData } from "./commonData";

// Common/Shared Data
export {
  personalInfo,
  socialLinks,
  interestData,
  achievements,
  getThemeColor,
  siteMetadata,
  footerStats,
} from "./commonData";

// Page-Specific Data
export { aboutPageData, pageInterests } from "./aboutData";
export { codingData } from "./codingData";
export { contactMethods } from "./contactData";
export {
  education,
  educationTimeline,
  certifications,
  certificationsList,
} from "./educationData";
export { experiences } from "./experienceData";
export { overviewData } from "./overviewData";
export { projects } from "./projectsData";
export { skills, techStack } from "./skillsData";
export { footerData, quickLinks, socialMediaLinks } from "./footerData";

// Legacy exports for backward compatibility with portfolioData
// These are now split into the files above but exported from index for easy migration
// (interestData already exported above via Common/Shared Data)

// Back-compat: interests array matching old portfolioData shape
export const interests = [
  _interestData.competitiveProgramming,
  _interestData.athletics,
  _interestData.problemSolving,
];
