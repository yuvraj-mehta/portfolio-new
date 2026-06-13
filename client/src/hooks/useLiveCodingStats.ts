import { useState, useEffect, useCallback, useRef } from "react";
import { codingPlatformsApi, AllPlatformStats } from "@/services/codingPlatformsApi";

interface UseLiveCodingStatsResult {
  stats: AllPlatformStats | null;
  isLoading: boolean;
  error: string | null;
  lastUpdatedAt: Date | null;
  refetch: () => void;
}

// Global in-memory cache to survive hook unmounts / page navigation
let memoryCache: AllPlatformStats | null = null;
let lastFetchTime: Date | null = null;

/**
 * Hook to retrieve coding platform statistics with in-memory caching and polling.
 * Returns cached data immediately if available, then updates in the background.
 *
 * @param {number} pollIntervalMs - Polling interval in milliseconds (default: 5 minutes)
 * @returns {UseLiveCodingStatsResult} Coding statistics state and controls.
 */
export function useLiveCodingStats(pollIntervalMs = 5 * 60 * 1000): UseLiveCodingStatsResult {
  const intervalTime = Math.max(pollIntervalMs, 5 * 60 * 1000);

  const [stats, setStats] = useState<AllPlatformStats | null>(memoryCache);
  const [isLoading, setIsLoading] = useState<boolean>(!memoryCache);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(lastFetchTime);

  const isFetchingRef = useRef<boolean>(false);

  const fetchStats = useCallback(async (isBackground = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    // Only show loading spinner if we don't have any cached data
    if (!isBackground && !memoryCache) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await codingPlatformsApi.getAllPlatformData();
      if (data) {
        memoryCache = data;
        lastFetchTime = new Date();
        setStats(data);
        setLastUpdatedAt(lastFetchTime);
        setError(null);
      } else {
        throw new Error("No data received from coding platforms API");
      }
    } catch (err) {
      console.error("Error in useLiveCodingStats:", err);
      if (!memoryCache) {
        setError(err instanceof Error ? err.message : "Failed to load live coding stats");
      }
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const refetch = useCallback(() => {
    fetchStats(false);
  }, [fetchStats]);

  useEffect(() => {
    // Immediately fetch fresh data from the server on mount (e.g. opens portfolio)
    // Run in background if we already have cached data in memory
    fetchStats(!!memoryCache);

    let intervalId: NodeJS.Timeout | null = null;

    const startPolling = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (document.visibilityState === "visible") {
          fetchStats(true);
        }
      }, intervalTime);
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (document.visibilityState === "visible") {
      startPolling();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStats(true);
        startPolling();
      } else {
        stopPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchStats, intervalTime]);

  return {
    stats,
    isLoading,
    error,
    lastUpdatedAt,
    refetch,
  };
}
