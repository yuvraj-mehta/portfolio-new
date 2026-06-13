/**
 * Standardized configuration for API services
 */

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  // If no env variable is provided, default to the Render host in production
  // or localhost in development
  if (envUrl && envUrl.length > 0) return envUrl;
  return import.meta.env.DEV ? "http://localhost:3500" : "https://portfolio-1-1rg6.onrender.com";
}

// Returns the base URL for coding platforms API
export function getCodingPlatformsApiUrl(): string {
  const envUrl = import.meta.env.VITE_CODING_API_BASE_URL as string | undefined;
  return envUrl ? envUrl.replace(/\/$/, "") : `${getApiBaseUrl()}/api`;
}
