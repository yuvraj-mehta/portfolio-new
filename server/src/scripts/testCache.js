import { getCachedCodingStats, updateCodingStatsCache } from "../services/codingPlatforms.service.js";

async function testCache() {
  console.log("=== Testing Backend Cache ===");
  
  console.log("1. Fetching coding stats (should trigger initial update)...");
  const startTime1 = Date.now();
  const stats1 = await getCachedCodingStats();
  const duration1 = Date.now() - startTime1;
  console.log(`First call took ${duration1}ms`);
  console.log("Stats platforms fetched:", Object.keys(stats1).filter(k => stats1[k] !== null));

  console.log("\n2. Fetching coding stats again (should be instant from cache)...");
  const startTime2 = Date.now();
  const stats2 = await getCachedCodingStats();
  const duration2 = Date.now() - startTime2;
  console.log(`Second call took ${duration2}ms`);

  if (duration2 < 50) {
    console.log("SUCCESS: Cache hit is extremely fast!");
  } else {
    console.log("WARNING: Cache hit took longer than expected:", duration2);
  }

  // Verify they are the exact same reference
  console.log("Are references identical?", stats1 === stats2);

  // Let's print some sample stats
  console.log("\nSample LeetCode Solved Count:", stats1.leetcode?.problemsSolved);
  console.log("Sample Codeforces Solved Count:", stats1.codeforces?.problemsSolved);
  console.log("Sample CodeChef Rating:", stats1.codechef?.profile?.rating);
  console.log("Sample GFG Solved Count:", stats1.gfg?.problemsSolved);

  process.exit(0);
}

testCache().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
