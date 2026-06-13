/**
 * Standardized configuration for API services
 */

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envUrl && envUrl.length > 0) return envUrl;

  const environment = import.meta.env.VITE_ENVIRONMENT as string | undefined;
  if (environment === "prod") {
    return "https://portfolio-new-0m64.onrender.com";
  }
  return "http://localhost:3500";
}

// Returns the base URL for coding platforms API
export function getCodingPlatformsApiUrl(): string {
  const envUrl = import.meta.env.VITE_CODING_API_BASE_URL as string | undefined;
  return envUrl ? envUrl.replace(/\/$/, "") : `${getApiBaseUrl()}/api`;
}
