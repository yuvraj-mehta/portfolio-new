import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ---------- ESM-safe __dirname ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- Paths ---------- */
const INPUT_FILE = path.join(__dirname, "../../data/portfolio.latest.json");
const OUTPUT_FILE = path.join(__dirname, "../../data/normalized.json");

/* ---------- Utilities ---------- */
/**
 * Synchronously reads a JSON file from disk and parses its content.
 * Wraps any storage or parse errors in a descriptive error wrapper.
 *
 * @param {string} filePath - The absolute file path to load.
 * @returns {Object} Parsed JSON data object.
 * @throws {Error} If reading the file or parsing the JSON fails.
 */
function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    throw new Error(`Failed to read portfolio data at "${filePath}": ${e.message}`);
  }
}

/**
 * Converts a string into a URL-friendly lowercase slug, truncating to 80 characters.
 * Removes non-alphanumeric characters and replaces space sequences with dashes.
 *
 * @param {string} [s=""] - The input string to slugify.
 * @returns {string} The formatted lowercase slug.
 */
function slugify(s = "") {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/**
 * Constructs a unique string identifier prefixing a slugified title.
 *
 * @param {string} prefix - The namespace or category prefix for the ID (e.g. chunkType).
 * @param {string} title - The title of the content item.
 * @returns {string} The formatted ID string.
 */
function mkId(prefix, title) {
  return `${prefix}-${slugify(title || "item")}`;
}

/**
 * Standardizes line endings and redundant line breaks in a text string.
 *
 * @param {string} s - The text content to normalize.
 * @returns {string} Cleaned text content with unified spacing.
 */
function cleanText(s) {
  if (!s) return "";
  return String(s)
    .replace(/\r\n|\r/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

/* ---------- Grammar Guard ---------- */
/**
 * Normalizes grammar constraints to ensure text starts in a clean first-person statement,
 * correcting common casing issues and initial patterns.
 *
 * @param {string} text - The input text block.
 * @returns {string} Grammar-corrected text block.
 */
function toFirstPerson(text) {
  return cleanText(text)
    .replace(/^i\s+/i, "I ")
    .replace(/^i\s+am\s+/i, "I am ")
    .replace(/^i\s+as\s+/i, "As a ")
    .replace(/^i\s+when/i, "When")
    .replace(/^as a/i, "As a")
    .replace(/^when i/i, "When I")
    .replace(/^\w/, c => c.toUpperCase());
}

/**
 * Pushes a new structured chunk into the accumulation list, completing fields
 * like unique ID, tag array, first-person grammar check, and defaults.
 *
 * @param {Array<Object>} arr - The destination chunks array.
 * @param {Object} chunk - The target chunk payload.
 * @param {string} [chunk.id] - Optional pre-defined unique string ID.
 * @param {string} chunk.chunkType - Category classification name.
 * @param {string} chunk.source - Origin identifier of the data section.
 * @param {string} chunk.title - Label/title of the text segment.
 * @param {string[]} [chunk.tags] - Descriptive tags associated with the chunk.
 * @param {string} chunk.text - Text narrative of the chunk.
 * @param {Object} [chunk.meta] - Associated reference metadata.
 * @param {boolean} [chunk.shouldEmbed=true] - Whether the chunk should be vectorized in index.
 * @returns {void}
 */
function pushChunk(arr, chunk) {
  arr.push({
    id: chunk.id || mkId(chunk.chunkType, chunk.title),
    chunkType: chunk.chunkType,
    source: chunk.source,
    title: chunk.title,
    tags: chunk.tags || [],
    text: toFirstPerson(chunk.text),
    meta: chunk.meta || {},
    shouldEmbed: chunk.shouldEmbed !== false
  });
}

/* ---------- Main Normalizer ---------- */
/**
 * Main parser that reads raw portfolio JSON schema content, divides sections into
 * granular structured semantic text chunks, and persists them to normalized.json.
 * Extracts details about personal info, certifications, education, projects, skills, etc.
 *
 * @returns {Array<Object>} List of newly generated and structured portfolio chunks.
 * @throws {Error} If reading or parsing raw json files fails.
 */
export function normalizePortfolio() {
  const profile = safeReadJson(INPUT_FILE);
  const chunks = [];
  const name = profile.personalInfo?.name || "User";
  const p = profile.personalInfo || {};

  /* ---------- Meta ---------- */
  if (profile.meta) {
    pushChunk(chunks, {
      chunkType: "meta",
      source: "meta",
      title: `Profile metadata for ${name}`,
      tags: ["meta"],
      text: `This profile belongs to ${profile.meta.owner || name} and is currently at version ${profile.meta.version}.`,
      shouldEmbed: false
    });
  }

  /* ---------- Meta Audit ---------- */
  if (profile._savedAt || profile.meta?.owner) {
    pushChunk(chunks, {
      chunkType: "metaAudit",
      source: "meta",
      title: `${name} — Profile Audit`,
      tags: ["meta", "audit"],
      text: `This profile is owned by ${profile.meta?.owner || name} and was last saved at ${profile._savedAt}.`,
      meta: {
        owner: profile.meta?.owner,
        savedAt: profile._savedAt
      },
      shouldEmbed: false
    });
  }

  /* ---------- Identity ---------- */
  pushChunk(chunks, {
    chunkType: "identity",
    source: "personalInfo",
    title: `${name} — Overview`,
    tags: ["identity"],
    text: `I am ${name}, a ${p.title}. I am a B.Tech Computer Science student at ${p.university} and currently based in ${p.currentLocation || p.location}.`
  });

  /* ---------- Contact & Availability ---------- */
  pushChunk(chunks, {
    chunkType: "contact",
    source: "personalInfo",
    title: `${name} — Contact & Availability`,
    tags: ["contact", "availability"],
    text: `I can be contacted via email at ${p.email} and phone at ${p.phone}. I am currently ${profile.careerPreferences?.availability} and prefer ${profile.careerPreferences?.workModePreferences?.join(", ")} work modes. I operate in the ${p.timezone} timezone.`,
    meta: {
      email: p.email,
      phone: p.phone,
      availability: profile.careerPreferences?.availability,
      workModes: profile.careerPreferences?.workModePreferences,
      timezone: p.timezone,
      location: p.location,
      currentLocation: p.currentLocation
    }
  });

  /* ---------- Social Links ---------- */
  if (profile.socialLinks) {
    pushChunk(chunks, {
      chunkType: "social",
      source: "socialLinks",
      title: `${name} — Social & Coding Profiles`,
      tags: ["social"],
      text: `I maintain active profiles across platforms such as GitHub, LinkedIn, LeetCode, CodeChef, Codeforces, GeeksForGeeks, Twitter, and Instagram.`,
      meta: profile.socialLinks,
      shouldEmbed: false
    });
  }

  /* ---------- Bio ---------- */
  if (p.bio && typeof p.bio === "object") {
    const HIGH_VALUE_BIOS = new Set(["intro", "full"]);
    Object.entries(p.bio).forEach(([k, v]) => {
      pushChunk(chunks, {
        chunkType: "bio",
        source: "personalInfo",
        title: `${name} — Bio (${k})`,
        tags: ["bio", k],
        text: v,
        shouldEmbed: HIGH_VALUE_BIOS.has(k)  // only embed intro + full
      });
    });
  }

  /* ---------- Career Preferences ---------- */
  if (profile.careerPreferences) {
    const cp = profile.careerPreferences;
    pushChunk(chunks, {
      chunkType: "careerPreference",
      source: "careerPreferences",
      title: `${name} — Career Preferences`,
      tags: ["career"],
      text: `I am seeking ${cp.jobTypes?.join(" and ")} roles such as ${cp.targetRoles?.join(", ")} in domains including ${cp.preferredDomains?.join(", ")}.`
    });
  }

  /* ---------- Interests ---------- */
  profile.interests?.forEach(it => {
    pushChunk(chunks, {
      chunkType: "interest",
      source: "interests",
      title: it.name,
      tags: ["interest"],
      text: `When I'm not coding, I enjoy ${it.description}.`
    });
  });

  /* ---------- Certifications ---------- */
  profile.certifications?.forEach(cert => {
    pushChunk(chunks, {
      chunkType: "certification",
      source: "certifications",
      title: `${cert.title} — ${cert.issuer}`,
      tags: ["certification"],
      text: `I completed ${cert.title} from ${cert.issuer} in ${cert.year}. ${cert.description}`,
      meta: {
        issuer: cert.issuer,
        year: cert.year
      }
    });
  });

  /* ---------- Education ---------- */
  profile.education?.forEach(edu => {
    pushChunk(chunks, {
      chunkType: "education",
      source: "education",
      title: `${edu.degree} — ${edu.institution}`,
      tags: ["education"],
      text: `${edu.degree} at ${edu.institution}. Duration: ${edu.duration}. Courses include ${edu.courses?.join(", ")}. Activities include ${edu.activities?.length ? edu.activities.join(", ") : "academic coursework"}.`,
      meta: {
        location: edu.location,
        status: edu.status,
        cgpa: edu.cgpa || edu.percentage
      }
    });
  });

  /* ---------- Achievements ---------- */
  profile.achievements?.awards?.forEach(a => {
    pushChunk(chunks, {
      chunkType: "achievement",
      source: "achievements",
      title: a.title,
      tags: ["achievement"],
      text: `I earned the ${a.title} in ${a.year}. ${a.description}`
    });
  });

  /* ---------- Competitive Programming Stats ---------- */
  const cps = profile.achievements?.competitiveProgramming;

  if (cps?.leetcode) {
    pushChunk(chunks, {
      chunkType: "stat",
      source: "achievements",
      title: "LeetCode Performance",
      tags: ["leetcode", "competitive-programming"],
      text: `I have a LeetCode rating of ${cps.leetcode.rating} with a maximum rating of ${cps.leetcode.maxRating}. I rank in the top ${cps.leetcode.percentile} globally with a global rank of ${cps.leetcode.globalRanking} and have solved ${cps.leetcode.problemsSolved} problems.`
    });
  }

  if (cps?.codechef) {
    pushChunk(chunks, {
      chunkType: "stat",
      source: "achievements",
      title: "CodeChef Performance",
      tags: ["codechef", "competitive-programming"],
      text: `I am a ${cps.codechef.stars} rated CodeChef programmer competing in ${cps.codechef.division}. My rating is ${cps.codechef.rating} with a maximum of ${cps.codechef.maxRating}.`
    });
  }

  if (cps?.codeforces) {
    pushChunk(chunks, {
      chunkType: "stat",
      source: "achievements",
      title: "Codeforces Performance",
      tags: ["codeforces", "competitive-programming"],
      text: `I have a Codeforces rating of ${cps.codeforces.rating} with a maximum of ${cps.codeforces.maxRating}. My rank is ${cps.codeforces.rank} and I have solved ${cps.codeforces.problemsSolved} problems.`
    });
  }

  if (cps?.geeksforgeeks) {
    pushChunk(chunks, {
      chunkType: "stat",
      source: "achievements",
      title: "GeeksForGeeks Performance",
      tags: ["geeksforgeeks", "competitive-programming"],
      text: `I have solved ${cps.geeksforgeeks.problemsSolved} problems on GeeksForGeeks and hold a global rank of ${cps.geeksforgeeks.rank}.`
    });
  }

  /* ---------- Overall Stats ---------- */
  const overall = profile.achievements?.overallStats;
  if (overall) {
    pushChunk(chunks, {
      chunkType: "stat",
      source: "achievements",
      title: "Overall Coding Statistics",
      tags: ["stats"],
      text: `I have over ${overall.yearsExperience} years of coding experience, made more than ${overall.commits} commits, and solved over ${overall.totalProblemsSolved} algorithmic problems.`
    });
  }

  /* ---------- Experience ---------- */
  profile.experience?.forEach(ex => {
    pushChunk(chunks, {
      chunkType: "experience",
      source: "experience",
      title: `${ex.role} at ${ex.organization}`,
      tags: ["experience"],
      text: `As a ${ex.role} at ${ex.organization}, I ${ex.description}`,
      meta: { skills: ex.skills, location: ex.location }
    });
  });

  /* ---------- Projects ---------- */
  const projectList = profile.projects || [];

  // Summary chunk — enables generic queries like "list your projects" or "what have you built?"
  if (projectList.length > 0) {
    const featuredNames = projectList.filter(p => p.featured).map(p => p.name);
    const allNames = projectList.map(p => p.name);
    pushChunk(chunks, {
      chunkType: "projectSummary",
      source: "projects",
      title: `${name} — Projects Overview`,
      tags: ["project", "summary"],
      text: `I have built ${allNames.length} software projects. My featured projects are: ${featuredNames.join(", ")}. All my projects include: ${allNames.join(", ")}. These span areas such as ${[...new Set(projectList.map(p => p.category))].join(", ")}.`
    });
  }

  // Individual project chunks
  projectList.forEach(prj => {
    const desc = prj.description.replace(
      new RegExp(`^${prj.name}\\s+is\\s+`, "i"),
      ""
    );

    pushChunk(chunks, {
      chunkType: "project",
      source: "projects",
      title: `${prj.name} — ${prj.status}`,
      tags: ["project", prj.category],
      text: `One of my software projects is ${prj.name}. I built ${prj.name}, ${desc}. I used ${prj.techStack.join(", ")} to implement features such as ${prj.features.join(", ")}.`,
      meta: prj.links
    });
  });

  /* ---------- Skills ---------- */
  Object.entries(profile.skills || {}).forEach(([cat, skills]) => {
    pushChunk(chunks, {
      chunkType: "skill",
      source: "skills",
      title: `Skills — ${cat}`,
      tags: ["skills", cat],
      text: `I am proficient in ${skills.join(", ")}.`
    });
  });

  /* ---------- Persist ---------- */
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), count: chunks.length, chunks },
      null,
      2
    )
  );

  console.log(`✅ Normalized ${chunks.length} chunks written to ${OUTPUT_FILE}`);
  return chunks;
}

/* ---------- Run Directly ---------- */
if (process.argv[1] === __filename) {
  normalizePortfolio();
}
