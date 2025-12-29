export interface AskRequest {
  query: string;
}

export interface AskResponse {
  answer: string;
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

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Ask failed: ${res.status} ${msg}`);
  }

  const json = (await res.json()) as AskResponse;
  return json.answer ?? "";
}
