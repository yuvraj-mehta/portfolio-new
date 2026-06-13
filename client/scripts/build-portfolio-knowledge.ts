/**
 * build-portfolio-knowledge.ts
 *
 * Reads the canonical portfolio.json from the server data directory and:
 *  1. Copies it to portfolioKnowledge.generated.json in the client root.
 *  2. Optionally POSTs it to the portfolio server (for production sync).
 *
 * The server's portfolio.json is now the single source of truth (Phase 8).
 * The individual src/data/*.ts files have been removed.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, "../");
const repoRoot = path.resolve(clientRoot, "../");

// Read canonical data from server
const serverPortfolioPath = path.join(
  repoRoot,
  "server/src/data/portfolio.json"
);

if (!fs.existsSync(serverPortfolioPath)) {
  console.error(
    `❌ Source not found: ${serverPortfolioPath}\n   Make sure the server/src/data/portfolio.json file exists.`
  );
  process.exit(1);
}

const ragPayload = JSON.parse(fs.readFileSync(serverPortfolioPath, "utf-8"));

// Write generated knowledge file to client root
const outputPath = path.join(clientRoot, "portfolioKnowledge.generated.json");
fs.writeFileSync(outputPath, JSON.stringify(ragPayload, null, 2));
console.log(`✅ RAG payload written to ${outputPath}`);
console.log(`   Version: ${ragPayload.meta?.version ?? "unknown"}`);

// Optionally sync to the portfolio server API
const PORTFOLIO_SERVER_URL =
  process.env.PORTFOLIO_SERVER_URL ||
  "https://portfolio-new-0m64.onrender.com/api/portfolio/update";

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
        `✅ Portfolio data successfully synced to server (version: ${ragPayload.meta?.version})`
      );
      console.log(`   Response:`, result);
    } else {
      console.warn(
        `⚠ Server returned status ${response.status}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.warn(`⚠ Could not sync to server (this is OK during local dev):`);
    console.warn(
      `  ${error instanceof Error ? error.message : String(error)}`
    );
    console.warn(`  Server URL: ${PORTFOLIO_SERVER_URL}`);
  }
}

await sendToServer();