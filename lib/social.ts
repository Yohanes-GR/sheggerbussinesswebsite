import type { Company } from "./types";

export type SocialNetwork = {
  key: string;
  label: string;
  href: string;
};

const CORE_NETWORKS = ["facebook", "linkedin", "twitter"] as const;

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function publicHttpUrl(value: string) {
  const href = value.trim();
  return /^https?:\/\//i.test(href) ? href : "";
}

export function whatsappHref(company: Company) {
  if (company.whatsapp) {
    if (/^https?:\/\//i.test(company.whatsapp)) return company.whatsapp;
    const n = digits(company.whatsapp);
    return n ? `https://wa.me/${n}` : "";
  }
  const n = digits(company.mobile || company.phone);
  return n ? `https://wa.me/${n}` : "";
}

export function socialNetworks(company: Company): SocialNetwork[] {
  const catalog: SocialNetwork[] = [
    { key: "facebook", label: "Facebook", href: publicHttpUrl(company.facebook) },
    { key: "instagram", label: "Instagram", href: publicHttpUrl(company.instagram) },
    { key: "linkedin", label: "LinkedIn", href: publicHttpUrl(company.linkedin) },
    { key: "twitter", label: "X / Twitter", href: publicHttpUrl(company.twitter) },
    { key: "youtube", label: "YouTube", href: publicHttpUrl(company.youtube) },
    { key: "telegram", label: "Telegram", href: publicHttpUrl(company.telegram) },
    { key: "whatsapp", label: "WhatsApp", href: publicHttpUrl(company.whatsapp) },
  ];

  return catalog.filter(
    (item) => CORE_NETWORKS.includes(item.key as (typeof CORE_NETWORKS)[number]) || Boolean(item.href),
  );
}
