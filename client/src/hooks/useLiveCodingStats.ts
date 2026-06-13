import { useState, useEffect, useCallback, useRef } from "react";
import { codingPlatformsApi, AllPlatformStats } from "@/services/codingPlatformsApi";

interface UseLiveCodingStatsResult {
  stats: AllPlatformStats | null;
  isLoading: boolean;
  error: string | null;
  lastUpdatedAt: Date | null;
  refetch: () => void;
}

export function useLiveCodingStats(pollIntervalMs = 5 * 60 * 1000): UseLiveCodingStatsResult {
  // Enforce rate limit: do not poll faster than every 5 minutes
  const intervalTime = Math.max(pollIntervalMs, 5 * 60 * 1000);

  const [stats, setStats] = useState<AllPlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  // Use a ref to store active fetching state to prevent multiple concurrent calls
  const isFetchingRef = useRef<boolean>(false);

  const fetchStats = useCallback(async (isBackground = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (!isBackground) {
      setIsLoading(true);
    }
    setError(null);

    try {
      // console.log("useLiveCodingStats: fetching live coding stats...");
      const data = await codingPlatformsApi.getAllPlatformData();
      if (data) {
        setStats(data);
        setLastUpdatedAt(new Date());
        setError(null);
      } else {
        throw new Error("No data received from coding platforms API");
      }
    } catch (err) {
      console.error("Error in useLiveCodingStats:", err);
      setError(err instanceof Error ? err.message : "Failed to load live coding stats");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const refetch = useCallback(() => {
    fetchStats(false);
  }, [fetchStats]);

  useEffect(() => {
    // Initial fetch on mount
    fetchStats(false);

    let intervalId: NodeJS.Timeout | null = null;

    const startPolling = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        // Only fetch if page is currently visible
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

    // Start polling if tab is visible on mount
    if (document.visibilityState === "visible") {
      startPolling();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Tab became active: immediately refresh background data and restart interval
        fetchStats(true);
        startPolling();
      } else {
        // Tab is hidden: stop interval/timer to conserve API calls
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
