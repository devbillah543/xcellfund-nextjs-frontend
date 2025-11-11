// /api/form-submissions.ts
import config from "@/config";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (config.API_TOKEN) {
    headers["Authorization"] = `Bearer ${config.API_TOKEN}`;
  }
  return headers;
}

export async function submitForm(formData: FormData) {
  const apiUrl = `${config.API_URL.replace(/\/+$/, "")}/api/form-submissions`;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ data: formData }), // ⚠ wrap in "data"
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Submission error:", result);
      return { success: false, error: result };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("Submission failed:", err);
    return { success: false, error: err };
  }
}
