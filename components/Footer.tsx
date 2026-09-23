import Link from "next/link";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { mapsLink } from "@/lib/geo";
import type { Company, Division } from "@/lib/types";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Divisions" },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News & Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const linkClass = "text-sm text-white/80 hover:text-accent";

export function Footer({
  company,
  divisions,
}: {
  company: Company;
  divisions: Division[];
}) {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo company={company} light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            {company.description}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-accent">
            {company.tagline}
          </p>
          <div className="mt-6">
            <SocialLinks company={company} light />
          </div>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Our Divisions
          </h3>
          <ul className="mt-4 space-y-2">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link href={`/services/${d.slug}`} className={linkClass}>
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Visit us
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a
                href={mapsLink(company.address, company.mapsUrl)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                {company.address}
              </a>
            </li>
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${company.mobile.replace(/\s/g, "")}`} className="hover:text-accent">
                {company.mobile}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-accent">
                {company.email}
              </a>
            </li>
            <li>{company.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pb-[5.5rem] sm:pb-16">
        <div className="mx-auto flex max-w-7xl px-4 py-5 text-xs text-white/50 lg:px-8">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
