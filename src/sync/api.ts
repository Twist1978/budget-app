const BASE_URL = "https://budget-app.dev/";

type Json = Record<string, unknown>;

async function request<T>(
  method: "GET" | "POST",
  path: string,
  body?: Json
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // falls du Auth hast
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}

export function apiGet<T>(path: string) {
  return request<T>("GET", path);
}

export function apiPost<T>(path: string, body: Json) {
  return request<T>("POST", path, body);
}
