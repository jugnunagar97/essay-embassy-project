const BOT_USER_AGENTS = [
  "googlebot",
  "google-inspectiontool",
  "storebot-google",
  "google-extended",
  "bingbot",
  "baiduspider",
  "yandexbot",
  "duckduckbot",
  "slurp",
];

const SITE_URL_FALLBACK = "https://essay-embassy-project.onrender.com";

export function isGooglebot(): boolean {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent?.toLowerCase?.() || "";
  if (!userAgent) return false;
  return BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));
}

export function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildQaCanonicalUrl(
  questionNumber: string,
  slug: string,
  siteUrl?: string
): string {
  const base =
    siteUrl?.replace(/\/$/, "") ||
    import.meta.env?.VITE_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    SITE_URL_FALLBACK;
  return `${base}/question/${encodeURIComponent(
    questionNumber
  )}/${encodeURIComponent(slug)}`;
}

