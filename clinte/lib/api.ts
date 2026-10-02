const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function fetchPortfolioSync() {
  const res = await fetch(`${API_BASE_URL}/portfolio/sync`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load portfolio database.");
  const json = await res.json();
  if (json.success && json.data) {
    return json.data;
  }
  throw new Error("Invalid API response format.");
}

export async function savePortfolioSync(data: any) {
  const res = await fetch(`${API_BASE_URL}/portfolio/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || "Failed to save portfolio database.");
  }
  const json = await res.json();
  return json.success;
}

export async function sendAIChatMessage(question: string, history: any[]) {
  const res = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });
  if (!res.ok) throw new Error("AI query failed.");
  const json = await res.json();
  if (json.success && json.data?.answer) {
    return json.data.answer;
  }
  throw new Error("Invalid AI assistant response format.");
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to deliver contact message.");
  const json = await res.json();
  return json.success;
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Invalid email or password.");
  }
  return json.data; // contains accessToken, user
}
