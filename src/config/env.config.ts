// env.config.ts
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";

export { API_URL, API_TOKEN };
