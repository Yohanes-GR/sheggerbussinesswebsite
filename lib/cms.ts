import type { SiteContent } from "./types";
import { fallbackSite } from "./fallback";

function cmsApiUrl() {
  return (
    process.env.CMS_API_URL ||
    process.env.NEXT_PUBLIC_CMS_API_URL ||
    "http://127.0.0.1:3001"
  ).replace(/\/$/, "");
}

export async function getSite(): Promise<SiteContent> {
  try {
    const response = await fetch(`${cmsApiUrl()}/api/site`, { cache: "no-store" });
    if (!response.ok) throw new Error(String(response.status));
    return (await response.json()) as SiteContent;
  } catch {
    return fallbackSite();
  }
}
