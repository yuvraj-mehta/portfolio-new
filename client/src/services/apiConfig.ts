/**
 * Standardized configuration for API services
 */

// Returns the base URL for the backend API (RAG, Profile, etc.)
export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  // If no env variable is provided, default to the relative path in production
  // or localhost in development
  if (envUrl && envUrl.length > 0) return envUrl;
  return import.meta.env.DEV ? "http://localhost:3500" : "";
}

// Returns the base URL for coding platforms API
export function getCodingPlatformsApiUrl(): string {
  const envUrl = import.meta.env.VITE_CODING_API_BASE_URL as string | undefined;
  return envUrl ? envUrl.replace(/\/$/, "") : "https://portfolio-1-1rg6.onrender.com/api/v1";
}
