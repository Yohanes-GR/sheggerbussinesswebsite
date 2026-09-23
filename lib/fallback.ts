import {
  company,
  divisions,
  listings,
  processSteps,
  projects,
  stats,
} from "./data";
import { showcaseImages } from "./gallery";
import type { SiteContent } from "./types";

export function fallbackSite(): SiteContent {
  return {
    company,
    stats,
    partners: [],
    divisions,
    projects,
    news: [],
    careers: [],
    listings,
    processSteps,
    home: {
      kicker: "Sheger Business Group",
      title: "Engineering ambition.",
      titleLine2: "Building Ethiopia.",
      subtitle:
        "Five divisions. One accountable group. Architecture and engineering, construction, real estate, interiors, and international trade.",
      ctaPrimaryLabel: "Explore services",
      ctaPrimaryHref: "/services",
      ctaSecondaryLabel: "Talk to the group",
      ctaSecondaryHref: "/contact",
      divisionsKicker: "Operating divisions",
      divisionsTitle: "A full stack for the built environment and trade.",
      processKicker: "How we work",
      processTitle: "From first sketch to last shipment.",
      processText:
        "Clients stay with Sheger because the same group can study, design, build, furnish, sell, and supply. Fewer handoffs. Clearer accountability.",
      projectsKicker: "Selected work",
      projectsTitle: "Projects across the group.",
      ctaTitle: "Ready to brief Sheger?",
      ctaText:
        "Whether you need a feasibility study, a contractor, a home, or a container of materials — start with one conversation.",
      motion: {
        mode: "slideshow",
        effect: "kenburns",
        videoUrl: "",
        intervalMs: 7000,
        images: showcaseImages.slice(0, 6),
      },
    },
    about: {
      kicker: "The group",
      title: "One name behind design, construction, property, interiors, and trade.",
      text: company.description,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      whyKicker: "Why Sheger",
      whyTitle:
        "Built for clients who are tired of assembling a project from five different firms.",
      paragraphs: [
        "Sheger Business Group was formed so Ethiopian clients — public agencies, private developers, and families — could brief a single organisation for the full life of a project.",
        "Sheger Architect studies and designs. Technology General Contractor builds. Finfine Real Estate develops and sells. Interior Design fits out the rooms people actually use. Export and Import moves cash crops out and construction materials in.",
        "We work from Addis Ababa across Ethiopia, with a particular strength in building, roads, water, bridges, post-tension, and substructure.",
      ],
    },
    pages: {
      services: {
        kicker: "Services",
        title: "Every capability, searchable and organised by division.",
        text: "Filter the group’s work — from building design and post-tension to cash-crop exports and show-home interiors.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80",
      },
      projects: {
        kicker: "Portfolio",
        title: "Work that cuts across the group.",
        text: "Filter by architecture, building, roads, bridges, interiors, and trade.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80",
      },
      contact: {
        kicker: "Contact",
        title: "Brief the group. We will route it to the right division.",
        text: "Architecture, construction, real estate, interiors, or trade — one desk takes the first call.",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80",
      },
      realEstate: {
        kicker: "Finfine Real Estate",
        title: "Homes, villas, and commercial space — developed and marketed by the group.",
        text: "Browse current listings or talk to us about a development site.",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
      },
      news: {
        kicker: "News & Insights",
        title: "Stories from the group.",
        text: "Project updates and perspectives from Sheger Business Group.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80",
      },
      careers: {
        kicker: "Careers",
        title: "Build with Sheger.",
        text: "Open roles across architecture, construction, real estate, interiors, and trade.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      },
    },
  };
}
