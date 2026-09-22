export type ServiceStory = {
  line1: string;
  line2: string;
  lead: string;
  stats: { value: string; label: string }[];
};

export const serviceStories: Record<string, ServiceStory> = {
  "sheger-architect": {
    line1: "From first sketch",
    line2: "to last hold point.",
    lead: "Concept, coordinated packages, bills, and resident engineers on site — so the drawing still holds when the last finish goes in.",
    stats: [
      { value: "Design", label: "Buildings, roads, water" },
      { value: "Site", label: "Resident supervision" },
      { value: "Specialist", label: "Post-tension & retrofit" },
    ],
  },
  "technology-general-contractor": {
    line1: "We pour. We pave.",
    line2: "We hand over.",
    lead: "Licensed construction for buildings, roads, water works, bridges, post-tension, and substructure — plant, labour, and programme on one contract.",
    stats: [
      { value: "Build", label: "Turnkey construction" },
      { value: "Civil", label: "Roads, water, bridges" },
      { value: "Specialist", label: "PT and substructure" },
    ],
  },
  "finfine-real-estate": {
    line1: "The plot. The home.",
    line2: "The deal.",
    lead: "We develop, market, and transact land and homes — with the group’s architects and contractors behind the product, not a brochure.",
    stats: [
      { value: "Develop", label: "In-house pipeline" },
      { value: "Market", label: "Buyers and sellers" },
      { value: "Group", label: "Design and build" },
    ],
  },
  "export-import": {
    line1: "Crops out.",
    line2: "Materials in.",
    lead: "Ethiopian coffee, oilseeds, pulses, and spices to buyers abroad — construction materials, plant, and interiors goods back to Ethiopian sites.",
    stats: [
      { value: "Export", label: "Ethiopian cash crops" },
      { value: "Import", label: "Construction supply" },
      { value: "Compliance", label: "Documents and QC" },
    ],
  },
  "interior-design": {
    line1: "Rooms that work",
    line2: "in Ethiopian light.",
    lead: "Homes, workplaces, and hospitality interiors — concept through FF&E and site direction, including show suites for Finfine sales floors.",
    stats: [
      { value: "Homes", label: "Apartments and villas" },
      { value: "Work", label: "Offices and hospitality" },
      { value: "Fit-out", label: "Show suites and FF&E" },
    ],
  },
};