import { getApiBaseUrl } from "./apiConfig";
import { PortfolioData } from "../data/types";

export interface PortfolioApiResponse {
  success: boolean;
  data: PortfolioData;
}

let prefetchPromise: Promise<PortfolioData> | null = null;

export function preloadPortfolioData() {
  if (!prefetchPromise) {
    const base = getApiBaseUrl();
    prefetchPromise = fetch(`${base}/api/portfolio`).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch portfolio data: Status ${res.status}`);
      }
      const json = (await res.json()) as PortfolioApiResponse;
      if (!json.success || !json.data) {
        throw new Error("Portfolio API returned unsuccessful response");
      }
      return json.data;
    });
  }
  return prefetchPromise;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  if (prefetchPromise) {
    return prefetchPromise;
  }
  return preloadPortfolioData();
}
