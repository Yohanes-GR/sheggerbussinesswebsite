import type { SiteContent } from "./types";
import { fallbackSite } from "./fallback";
import { showcaseImages } from "./gallery";

function cmsApiUrl() {
  return (
    process.env.CMS_API_URL ||
    process.env.NEXT_PUBLIC_CMS_API_URL ||
    "http://127.0.0.1:3001"
  ).replace(/\/$/, "");
}

function sameOriginBrand(value: unknown): unknown {
  if (typeof value === "string") {
    if (value.startsWith("/brand/") || value.startsWith("/addis/")) return value;
    try {
      const url = new URL(value);
      if (url.pathname.startsWith("/brand/") || url.pathname.startsWith("/addis/")) {
        return `${url.pathname}${url.search}`;
      }
    } catch {
      return value;
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(sameOriginBrand);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sameOriginBrand(item)]),
    );
  }
  return value;
}

function isStockPhoto(src: string) {
  return /images\.unsplash\.com/i.test(src);
}

function preferAddis(site: SiteContent): SiteContent {
  const hero = showcaseImages;
  const motionImages = site.home?.motion?.images ?? [];
  const stockHero =
    motionImages.length === 0 || motionImages.every((image) => isStockPhoto(image.src));
  if (stockHero && site.home?.motion) {
    site.home.motion.images = hero;
  }
  if (site.about && isStockPhoto(site.about.image)) {
    site.about.image = hero[2].src;
  }
  const banners = [hero[0], hero[1], hero[2], hero[3]];
  (["services", "projects", "contact", "realEstate", "news", "careers"] as const).forEach(
    (key, index) => {
      const page = site.pages?.[key];
      if (page && isStockPhoto(page.image)) page.image = banners[index % banners.length].src;
    },
  );
  return site;
}

export async function getSite(): Promise<SiteContent> {
  try {
    const response = await fetch(`${cmsApiUrl()}/api/site`, { cache: "no-store" });
    if (!response.ok) throw new Error(String(response.status));
    return preferAddis(sameOriginBrand(await response.json()) as SiteContent);
  } catch {
    return preferAddis(fallbackSite());
  }
}
