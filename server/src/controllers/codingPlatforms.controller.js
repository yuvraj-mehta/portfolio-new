import { catchAsyncErrors } from "../middlewares/index.js";
import {
  fetchLeetCode,
  fetchCodeforces,
  fetchCodeChef,
  fetchGFG,
  fetchAllCodingStats
} from "../services/codingPlatforms.service.js";
import FileStorageService from "../services/fileStorage.service.js";
import AppError from "../utils/AppError.js";
import { FALLBACK_HANDLES } from "../constants/codingHandles.js";

/**
 * Helper to dynamically extract user handle from URL.
 *
 * @param {string} url - The profile URL.
 * @returns {string} The username handle.
 */
function extractHandle(url) {
  if (!url) return "";
  const cleanUrl = url.replace(/\/$/, "");
  const parts = cleanUrl.split("/");
  return parts[parts.length - 1];
}

/**
 * Retrieves the handle for a specific platform from portfolio.json.
 *
 * @async
 * @param {string} platform - The key of the platform (leetcode, codeforces, codechef, geeksforgeeks).
 * @returns {Promise<string>} The active handle.
 */
async function getHandleFor(platform) {
  try {
    const portfolio = await FileStorageService.getPortfolioData();
    const links = portfolio?.socialLinks || {};
    const url = links[platform];
    const key = platform === "gfg" ? "geeksforgeeks" : platform;
    return extractHandle(links[key]) || FALLBACK_HANDLES[platform];
  } catch (err) {
    return FALLBACK_HANDLES[platform];
  }
}

/**
 * Express controller handler to get aggregated coding platform statistics.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const getCodingStats = catchAsyncErrors(async (req, res) => {
  const data = await fetchAllCodingStats();
  res.json({ success: true, data });
});

/**
 * Express controller handler to get LeetCode statistics.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const getLeetCodeStats = catchAsyncErrors(async (req, res) => {
  const handle = await getHandleFor("leetcode");
  const data = await fetchLeetCode(handle);
  res.json({ success: true, data });
});

/**
 * Express controller handler to get Codeforces statistics.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const getCodeforcesStats = catchAsyncErrors(async (req, res) => {
  const handle = await getHandleFor("codeforces");
  const data = await fetchCodeforces(handle);
  res.json({ success: true, data });
});

/**
 * Express controller handler to get CodeChef statistics.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const getCodeChefStats = catchAsyncErrors(async (req, res) => {
  const handle = await getHandleFor("codechef");
  const data = await fetchCodeChef(handle);
  res.json({ success: true, data });
});

/**
 * Express controller handler to get GeeksforGeeks statistics.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const getGFGStats = catchAsyncErrors(async (req, res) => {
  const handle = await getHandleFor("gfg");
  const data = await fetchGFG(handle);
  res.json({ success: true, data });
});
