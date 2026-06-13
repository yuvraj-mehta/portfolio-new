import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import AppError from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const LATEST_DATA_FILE = path.join(DATA_DIR, "portfolio.latest.json");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");

/**
 * FileStorage Service
 * Handles reading and writing portfolio data to JSON files
 */
class FileStorageService {
  /**
   * Read master portfolio data from portfolio.json file
   * @returns {Promise<Object>} Master portfolio data
   */
  static async getPortfolioData() {
    try {
      const fileContent = await fs.readFile(PORTFOLIO_FILE, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new AppError("Portfolio data file not found.", 404, "PORTFOLIO_NOT_FOUND");
      }
      throw new AppError(`Failed to read portfolio data: ${error.message}`, 500, "FILE_READ_ERROR");
    }
  }

  /**
   * Save portfolio data to latestData.json file
   * @param {Object} data - Validated portfolio data
   * @returns {Promise<Object>} Response object with success status and file path
   */
  static async saveLatestPortfolio(data) {
    try {
      // Ensure data directory exists
      await fs.mkdir(DATA_DIR, { recursive: true });

      // Add timestamp to data if not already present
      const portfolioData = {
        ...data,
        _savedAt: new Date().toISOString(),
      };

      // Write to file with pretty formatting
      await fs.writeFile(
        LATEST_DATA_FILE,
        JSON.stringify(portfolioData, null, 2),
        "utf-8"
      );

      return {
        success: true,
        message: "Portfolio data saved successfully",
        filePath: LATEST_DATA_FILE,
        savedAt: portfolioData._savedAt,
      };
    } catch (error) {
      throw new Error(
        `Failed to save portfolio data: ${error.message}`
      );
    }
  }

  /**
   * Read latest portfolio data from file
   * @returns {Promise<Object>} Latest portfolio data or null if file doesn't exist
   */
  static async getLatestPortfolio() {
    try {
      const fileContent = await fs.readFile(LATEST_DATA_FILE, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        return null; // File doesn't exist
      }
      throw new Error(
        `Failed to read portfolio data: ${error.message}`
      );
    }
  }

  /**
   * Delete latest portfolio data file
   * @returns {Promise<Object>} Success response
   */
  static async deleteLatestPortfolio() {
    try {
      await fs.unlink(LATEST_DATA_FILE);
      return {
        success: true,
        message: "Portfolio data deleted successfully",
      };
    } catch (error) {
      if (error.code === "ENOENT") {
        return {
          success: true,
          message: "Portfolio data file does not exist",
        };
      }
      throw new Error(
        `Failed to delete portfolio data: ${error.message}`
      );
    }
  }

  /**
   * Check if portfolio data exists
   * @returns {Promise<boolean>} True if file exists, false otherwise
   */
  static async portfolioExists() {
    try {
      await fs.access(LATEST_DATA_FILE);
      return true;
    } catch {
      return false;
    }
  }
}

export default FileStorageService;
