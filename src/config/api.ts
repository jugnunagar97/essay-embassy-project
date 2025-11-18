const rawBase =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "https://essayembassy.com");

export const API_BASE_URL = rawBase.replace(/\/$/, "");

export const apiEndpoint = (path: string) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

