export interface AskRequest {
  query: string;
}

export interface AskResponse {
  success: boolean;
  answer?: string;
  error?: {
    code: string;
    title: string;
    description: string;
    details?: Record<string, any>;
    suggestion?: string;
  };
}

export interface ErrorResponse {
  code: string;
  title: string;
  description: string;
  details?: Record<string, any>;
  suggestion?: string;
}

function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return envUrl && envUrl.length > 0 ? envUrl : "http://localhost:3500";
}

export async function askPortfolio(query: string): Promise<string> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query } satisfies AskRequest),
  });

  const json = (await res.json()) as
    | AskResponse
    | { error?: Record<string, any> };

  if (!res.ok) {
    // Handle error response
    if (json.error) {
      const err = json.error as ErrorResponse;
      const errorObj = new Error(err.title);
      (errorObj as any).errorData = err;
      throw errorObj;
    }
    throw new Error(`Ask failed: ${res.status}`);
  }

  if (!json.answer && (json as AskResponse).success === false) {
    const err = (json as AskResponse).error;
    if (err) {
      const errorObj = new Error(err.title);
      (errorObj as any).errorData = err;
      throw errorObj;
    }
  }

  return (json as AskResponse).answer ?? "";
}
