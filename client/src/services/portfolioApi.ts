import { getApiBaseUrl } from "./apiConfig";
import { PortfolioData } from "../data/types";

export interface PortfolioApiResponse {
  success: boolean;
  data: PortfolioData;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/portfolio`);

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio data: Status ${res.status}`);
  }

  const json = (await res.json()) as PortfolioApiResponse;
  if (!json.success || !json.data) {
    throw new Error("Portfolio API returned unsuccessful response");
  }

  return json.data;
}
