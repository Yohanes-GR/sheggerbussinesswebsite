import type { Company } from "./types";

export type FaqItem = {
  topic: string;
  keywords: string[];
  answer: string;
};

export function faqItems(company: Company): FaqItem[] {
  return [
    {
      topic: "Services",
      keywords: ["service", "services", "division", "divisions", "what do you do", "offer"],
      answer: `${company.name} works through five divisions: Sheger Architect, Technology General Contractor, Finfine Real Estate, Export and Import, and Interior Design. You can browse each one on the Services page.`,
    },
    {
      topic: "Location",
      keywords: ["location", "office", "address", "map", "dembel", "kirkos", "where", "visit"],
      answer: `Our office is at ${company.address}. You can open the map and get directions from the Contact page.`,
    },
    {
      topic: "Contact",
      keywords: ["contact", "phone", "call", "email", "mobile", "reach", "number"],
      answer: `Call ${company.phone}, mobile ${company.mobile}, or email ${company.email}. Office hours: ${company.hours}.`,
    },
    {
      topic: "Architecture",
      keywords: ["architect", "architecture", "design", "supervision", "engineering", "sheger architect"],
      answer:
        "Sheger Architect covers consulting architecture and engineering: design and supervision, post tension, interiors, 2D/3D, structural strengthening, urban planning, water works, and feasibility studies.",
    },
    {
      topic: "Construction",
      keywords: ["construction", "contractor", "building", "road", "bridge", "tgc"],
      answer:
        "Technology General Contractor delivers building, road, water, bridge, post-tension, and substructure construction across Ethiopia.",
    },
    {
      topic: "Real estate",
      keywords: ["real estate", "property", "housing", "finfine", "listing", "apartments"],
      answer:
        "Finfine Real Estate develops property and connects buyers, sellers, and investors. See current listings on the Real Estate page.",
    },
    {
      topic: "Trade",
      keywords: ["export", "import", "trade", "coffee", "materials", "crop"],
      answer:
        "Export and Import ships Ethiopian cash crops out and brings construction materials in for local projects.",
    },
    {
      topic: "Interiors",
      keywords: ["interior", "interiors", "furniture", "fit out", "fit-out"],
      answer:
        "Our Interior Design studio handles residential, commercial, and hospitality interiors — from concept through fit-out.",
    },
    {
      topic: "Hours",
      keywords: ["hours", "open", "time", "saturday", "when"],
      answer: `We are open ${company.hours} (East Africa Time).`,
    },
    {
      topic: "Projects",
      keywords: ["project", "projects", "portfolio", "work", "completed"],
      answer:
        "Selected work across the group is on the Projects page — buildings, roads, architecture, and more.",
    },
  ];
}

const STOP = new Set(["the", "and", "for", "are", "you", "your", "what", "how", "can", "our", "is", "at", "to", "of", "in", "on", "a", "an"]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9+]+/i)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

export function matchFaq(query: string, items: FaqItem[]): FaqItem | null {
  const q = tokens(query);
  if (!q.length) return null;

  let best: FaqItem | null = null;
  let score = 0;

  for (const item of items) {
    const hay = tokens([item.topic, ...item.keywords].join(" "));
    const hits = q.filter((t) => hay.some((h) => h === t || (t.length > 3 && (h.includes(t) || t.includes(h))))).length;
    if (hits > score) {
      score = hits;
      best = item;
    }
  }

  return score > 0 ? best : null;
}

export function faqFallback(company: Company) {
  return `I can help with services, location, and how to reach the group. Call ${company.phone}, email ${company.email}, or use WhatsApp below.`;
}
