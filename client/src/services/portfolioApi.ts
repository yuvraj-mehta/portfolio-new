import { getApiBaseUrl } from "./apiConfig";
import { PortfolioData } from "../data/types";
import fallbackData from "../../portfolioKnowledge.generated.json";

export interface PortfolioApiResponse {
  success: boolean;
  data: PortfolioData;
}

let prefetchPromise: Promise<PortfolioData> | null = null;

export function preloadPortfolioData() {
  if (!prefetchPromise) {
    const base = getApiBaseUrl();
    prefetchPromise = fetch(`${base}/api/portfolio`)
      .then(async (res) => {
        if (!res.ok) {
          console.warn(`Failed to fetch portfolio data: Status ${res.status}. Using fallback local data.`);
          return fallbackData as unknown as PortfolioData;
        }
        const json = (await res.json()) as PortfolioApiResponse;
        if (!json.success || !json.data) {
          console.warn("Portfolio API returned unsuccessful response. Using fallback local data.");
          return fallbackData as unknown as PortfolioData;
        }
        return json.data;
      })
      .catch((err) => {
        console.warn("Server unavailable, using fallback local data.", err);
        return fallbackData as unknown as PortfolioData;
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
