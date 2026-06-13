import { ProxyAgent, setGlobalDispatcher } from "undici";
import FileStorageService from "./fileStorage.service.js";
import AppError from "../utils/AppError.js";
import { FALLBACK_HANDLES } from "../constants/codingHandles.js";

// Setup global proxy agent for sandboxed terminal environment if proxy variables are present
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.https_proxy || process.env.http_proxy;
if (proxyUrl) {
  const dispatcher = new ProxyAgent({ uri: proxyUrl });
  setGlobalDispatcher(dispatcher);
}

/**
 * Extracts the user handle from a profile URL.
 *
 * @param {string} url - The full profile URL.
 * @returns {string} The extracted username/handle.
 */
function extractHandle(url) {
  if (!url) return "";
  const cleanUrl = url.replace(/\/$/, "");
  const parts = cleanUrl.split("/");
  return parts[parts.length - 1];
}

/**
 * Retrieves the profile handles from the portfolio data file.
 *
 * @async
 * @returns {Promise<Object>} Object containing handles for all platforms.
 */
async function getPlatformHandles() {
  try {
    const portfolio = await FileStorageService.getPortfolioData();
    const links = portfolio?.socialLinks || {};
    return {
      leetcode: extractHandle(links.leetcode) || FALLBACK_HANDLES.leetcode,
      codeforces: extractHandle(links.codeforces) || FALLBACK_HANDLES.codeforces,
      codechef: extractHandle(links.codechef) || FALLBACK_HANDLES.codechef,
      gfg: extractHandle(links.geeksforgeeks) || FALLBACK_HANDLES.gfg
    };
  } catch (err) {
    // If reading portfolio data fails, fallback to standard handles
    return FALLBACK_HANDLES;
  }
}

/**
 * Fetches statistics from LeetCode GraphQL API.
 *
 * @async
 * @param {string} handle - The LeetCode handle.
 * @returns {Promise<Object>} Formatted LeetCode statistics.
 * @throws {AppError} If request fails or parsing errors occur.
 */
export async function fetchLeetCode(handle) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          countryName
          school
          reputation
          ranking
          userAvatar
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Referer": "https://leetcode.com/"
      },
      body: JSON.stringify({
        query,
        variables: { username: handle }
      })
    });

    if (!response.ok) {
      throw new AppError(`LeetCode GraphQL API responded with status ${response.status}`, response.status, "LEETCODE_API_ERROR");
    }

    const result = await response.json();
    if (result.errors && result.errors.length > 0) {
      throw new AppError(`LeetCode GraphQL error: ${result.errors[0].message}`, 400, "LEETCODE_GRAPHQL_ERROR");
    }

    const data = result.data || {};
    const matchedUser = data.matchedUser;
    if (!matchedUser) {
      throw new AppError(`LeetCode user "${handle}" not found`, 404, "USER_NOT_FOUND");
    }

    const profile = matchedUser.profile || {};
    const contest = data.userContestRanking || {};
    const submissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];

    const statsMap = {};
    submissions.forEach(sub => {
      statsMap[sub.difficulty] = sub.count;
    });

    const rating = Math.round(contest.rating || 0);

    return {
      handle,
      profile: {
        name: profile.realName || handle,
        rating,
        maxRating: rating,
        rank: contest.badge?.name || (rating >= 1800 ? "Knight" : rating >= 2000 ? "Guardian" : "User"),
        globalRanking: profile.ranking || 0,
        avatar: profile.userAvatar || "",
        country: profile.countryName || "",
        organization: profile.school || "",
        reputation: profile.reputation || 0,
        starRating: rating ? Math.min(5, Math.max(1, Math.round(rating / 400))) : 0
      },
      problemsSolved: {
        total: statsMap["All"] || 0,
        easy: statsMap["Easy"] || 0,
        medium: statsMap["Medium"] || 0,
        hard: statsMap["Hard"] || 0
      },
      contests: {
        rating,
        attendedCount: contest.attendedContestsCount || 0,
        globalRanking: contest.globalRanking || 0,
        bestRank: 0,
        topPercentage: contest.topPercentage ? `${contest.topPercentage}%` : "0%"
      },
      achievements: {
        stars: contest.badge?.name || "",
        streaks: {
          currentStreak: 0,
          maxStreak: 0,
          totalActiveDays: 0
        }
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to fetch LeetCode statistics: ${error.message}`, 500, "LEETCODE_FETCH_FAILED");
  }
}

/**
 * Fetches statistics from Codeforces APIs.
 *
 * @async
 * @param {string} handle - The Codeforces handle.
 * @returns {Promise<Object>} Formatted Codeforces statistics.
 * @throws {AppError} If requests fail or parsing errors occur.
 */
export async function fetchCodeforces(handle) {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    ]);

    if (!infoRes.ok) {
      throw new AppError(`Codeforces user.info error: status ${infoRes.status}`, infoRes.status, "CF_INFO_ERROR");
    }

    const infoData = await infoRes.json();
    if (infoData.status !== "OK" || !infoData.result || infoData.result.length === 0) {
      throw new AppError(`Codeforces handle "${handle}" not found`, 404, "USER_NOT_FOUND");
    }
    const info = infoData.result[0];

    let ratingData = [];
    if (ratingRes.ok) {
      const rData = await ratingRes.json();
      if (rData.status === "OK") {
        ratingData = rData.result || [];
      }
    }

    let statusData = [];
    if (statusRes.ok) {
      const sData = await statusRes.json();
      if (sData.status === "OK") {
        statusData = sData.result || [];
      }
    }

    // Process unique solved problems
    const solvedMap = new Map();
    statusData.forEach(sub => {
      if (sub.verdict === "OK" && sub.problem) {
        const prob = sub.problem;
        const probId = `${prob.contestId}-${prob.index}`;
        solvedMap.set(probId, prob);
      }
    });

    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;
    let unratedCount = 0;

    solvedMap.forEach(prob => {
      const rating = prob.rating;
      if (rating === undefined || rating === null) {
        unratedCount++;
      } else if (rating < 1200) {
        easyCount++;
      } else if (rating < 1900) {
        mediumCount++;
      } else {
        hardCount++;
      }
    });

    const bestRank = ratingData.length > 0 ? Math.min(...ratingData.map(r => r.rank)) : 0;

    return {
      handle,
      profile: {
        name: [info.firstName, info.lastName].filter(Boolean).join(" ") || info.handle,
        rating: info.rating || 0,
        maxRating: info.maxRating || 0,
        rank: info.rank || "Newbie",
        avatar: info.avatar || "",
        country: info.country || "",
        organization: info.organization || "",
        contribution: info.contribution || 0
      },
      problemsSolved: {
        total: solvedMap.size,
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount,
        unrated: unratedCount
      },
      contests: {
        rating: info.rating || 0,
        attendedCount: ratingData.length,
        bestRank,
        globalRanking: 0
      },
      achievements: {
        badges: info.rank || ""
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to fetch Codeforces statistics: ${error.message}`, 500, "CF_FETCH_FAILED");
  }
}

/**
 * Fetches statistics from CodeChef by screenscraping the public profile page.
 *
 * @async
 * @param {string} handle - The CodeChef handle.
 * @returns {Promise<Object>} Formatted CodeChef statistics.
 * @throws {AppError} If request fails or parsing errors occur.
 */
export async function fetchCodeChef(handle) {
  const url = `https://www.codechef.com/users/${handle}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new AppError(`CodeChef user "${handle}" not found`, 404, "USER_NOT_FOUND");
      }
      throw new AppError(`CodeChef page responded with status ${response.status}`, response.status, "CODECHEF_API_ERROR");
    }

    const html = await response.text();

    // Parse values via regular expressions
    const ratingMatch = html.match(/class=["']rating-number["']>\s*(\d+)/i);
    const maxRatingMatch = html.match(/\(Highest Rating\s*(\d+)\)/i);
    const globalRankMatch = html.match(/<strong>\s*(\d+)\s*<\/strong>\s*<\/a>\s*Global Rank/i) || html.match(/global-rank["']>\s*(\d+)/i);
    const countryMatch = html.match(/class="user-country-name"[^>]*>([^<]+)/i);
    const starMatch = html.match(/class=['"]rating['"]\s*style=[^>]*>(\d)&#9733;<\/span>/i);
    const divMatch = html.match(/<div>\((Div [^)]+)\)<\/div>/i);
    const nameMatch = html.match(/<h1 class="h2-style">([^<]+)<\/h1>/i);
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
    const contestsMatch = html.match(/<h3>Contests\s*\((\d+)\)\s*<\/h3>/i);

    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 0;
    const maxRating = maxRatingMatch ? parseInt(maxRatingMatch[1], 10) : rating;
    const globalRanking = globalRankMatch ? parseInt(globalRankMatch[1], 10) : 0;
    const country = countryMatch ? countryMatch[1].trim() : "";
    const stars = starMatch ? `${starMatch[1]}★` : "";
    const division = divMatch ? divMatch[1] : "";
    const name = nameMatch ? nameMatch[1].trim() : handle;
    const totalSolved = solvedMatch ? parseInt(solvedMatch[1], 10) : 0;
    const attendedCount = contestsMatch ? parseInt(contestsMatch[1], 10) : 0;

    // Approximate difficulty breakdown
    const easy = Math.round(totalSolved * 0.5);
    const medium = Math.round(totalSolved * 0.3);
    const hard = Math.round(totalSolved * 0.05);
    const basic = totalSolved - (easy + medium + hard);

    return {
      handle,
      profile: {
        name,
        rating,
        maxRating,
        rank: [stars, division].filter(Boolean).join(" "),
        globalRanking,
        avatar: "",
        country,
        organization: ""
      },
      problemsSolved: {
        total: totalSolved,
        easy,
        medium,
        hard,
        basic
      },
      contests: {
        rating,
        attendedCount,
        globalRanking
      },
      achievements: {
        stars
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to fetch CodeChef statistics: ${error.message}`, 500, "CODECHEF_FETCH_FAILED");
  }
}

/**
 * Fetches statistics from GeeksforGeeks by parsing Next.js page hydration payload.
 *
 * @async
 * @param {string} handle - The GeeksforGeeks handle.
 * @returns {Promise<Object>} Formatted GeeksforGeeks statistics.
 * @throws {AppError} If request fails or parsing errors occur.
 */
export async function fetchGFG(handle) {
  const url = `https://www.geeksforgeeks.org/user/${handle}/`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new AppError(`GeeksforGeeks user "${handle}" not found`, 404, "USER_NOT_FOUND");
      }
      throw new AppError(`GeeksforGeeks page responded with status ${response.status}`, response.status, "GFG_API_ERROR");
    }

    const html = await response.text();
    const cleanHtml = html.replace(/\\"/g, '"');

    // Parse hydration data
    const match = cleanHtml.match(/"userData"\s*:\s*\{\s*"message"\s*:\s*"[^"]+"\s*,\s*"data"\s*:\s*({.+?})\s*,\s*"error"\s*:\s*(?:null|"[^"]*")\s*\}/);
    if (!match) {
      throw new AppError("Failed to extract GeeksforGeeks hydration payload", 500, "GFG_PARSE_ERROR");
    }

    const userData = JSON.parse(match[1]);
    const totalProblems = userData.total_problems_solved || 0;

    // Approximate difficulty breakdown
    const easy = Math.round(totalProblems * 0.5);
    const medium = Math.round(totalProblems * 0.3);
    const hard = Math.round(totalProblems * 0.05);
    const basic = totalProblems - (easy + medium + hard);

    return {
      handle,
      profile: {
        name: userData.name || handle,
        rating: userData.score || 0,
        maxRating: userData.score || 0,
        rank: userData.designation || "",
        globalRanking: 0,
        avatar: userData.profile_image_url || "",
        organization: userData.institute_name || "",
        codingScore: userData.score || 0,
        contestRating: userData.score || 0,
        instituteRank: String(userData.institute_rank || 0),
        totalProblems,
        currentStreak: userData.pod_solved_current_streak || 0,
        maxStreak: userData.pod_solved_longest_streak || 0,
        yearlySubmissions: userData.pod_correct_submissions_count || 0
      },
      problemsSolved: {
        total: totalProblems,
        easy,
        medium,
        hard,
        basic
      },
      contests: {
        rating: userData.score || 0
      },
      achievements: {
        badges: userData.designation || "",
        streaks: {
          current: userData.pod_solved_current_streak || 0,
          max: userData.pod_solved_longest_streak || 0
        }
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to fetch GeeksforGeeks statistics: ${error.message}`, 500, "GFG_FETCH_FAILED");
  }
}

/**
 * Aggregates statistics for all coding platforms dynamically.
 *
 * @async
 * @returns {Promise<Object>} Map of platform statistics.
 */
export async function fetchAllCodingStats() {
  const handles = await getPlatformHandles();

  const [leetcodeResult, codeforcesResult, codechefResult, gfgResult] = await Promise.allSettled([
    fetchLeetCode(handles.leetcode),
    fetchCodeforces(handles.codeforces),
    fetchCodeChef(handles.codechef),
    fetchGFG(handles.gfg)
  ]);

  return {
    leetcode: leetcodeResult.status === "fulfilled" ? leetcodeResult.value : null,
    codeforces: codeforcesResult.status === "fulfilled" ? codeforcesResult.value : null,
    codechef: codechefResult.status === "fulfilled" ? codechefResult.value : null,
    gfg: gfgResult.status === "fulfilled" ? gfgResult.value : null
  };
}
