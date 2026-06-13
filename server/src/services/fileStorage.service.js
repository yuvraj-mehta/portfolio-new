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
 * FileStorage Service.
 * Provides static utility methods for reading, writing, checking, and deleting
 * JSON files containing portfolio metadata and content details.
 *
 * @class FileStorageService
 */
class FileStorageService {
  /**
   * Reads master portfolio data from the primary portfolio.json file.
   *
   * @static
   * @async
   * @returns {Promise<Object>} Resolves with the parsed JSON content of the portfolio file.
   * @throws {AppError} 404 - If the file does not exist.
   * @throws {AppError} 500 - If reading or parsing the file fails.
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
   * Saves the validated portfolio payload into the portfolio.latest.json file.
   * Creates the destination directory if it does not already exist, and appends a
   * timestamp field `_savedAt` to the saved object.
   *
   * @static
   * @async
   * @param {Object} data - The validated portfolio schema payload to save.
   * @returns {Promise<{success: boolean, message: string, filePath: string, savedAt: string}>} Resolves with a success wrapper containing the written file path and timestamp.
   * @throws {Error} If writing to the file or directory creation fails.
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
   * Reads the latest portfolio data from the portfolio.latest.json file.
   *
   * @static
   * @async
   * @returns {Promise<Object|null>} Resolves with the parsed JSON data, or null if the file does not exist.
   * @throws {Error} If reading or parsing the file encounters an unexpected storage error.
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
   * Deletes the portfolio.latest.json file if it exists.
   *
   * @static
   * @async
   * @returns {Promise<{success: boolean, message: string}>} Resolves with a success indicator and description message.
   * @throws {Error} If deleting the file fails due to system permission or locking issues.
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
   * Checks if the portfolio.latest.json file exists on the local disk.
   *
   * @static
   * @async
   * @returns {Promise<boolean>} Resolves to true if the file exists and is accessible, false otherwise.
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
