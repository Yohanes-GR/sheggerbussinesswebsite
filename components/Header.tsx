"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Company, Division } from "@/lib/types";
import { telHref } from "@/lib/geo";
import { Logo } from "./Logo";
import { ServiceMark } from "./ServiceMark";
import { SocialLinks } from "./SocialLinks";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  divisions: Division[];
  company: Company;
};

export function Header({ divisions, company }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const isHome = pathname === "/";
  const light = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        light
          ? "bg-transparent"
          : "border-b border-black/5 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <Link href="/" aria-label={`${company.name} home`} className="min-w-0">
          <Logo company={company} light={light} compact />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isServices = link.href === "/services";
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => isServices && setMega(true)}
                onMouseLeave={() => isServices && setMega(false)}
              >
                <Link
                  href={link.href}
                  className={`rounded-sm px-3 py-2 text-[13px] font-medium tracking-wide transition ${
                    light
                      ? active
                        ? "text-accent"
                        : "text-white/85 hover:text-white"
                      : active
                        ? "text-accent"
                        : "text-ink/80 hover:text-brand"
                  }`}
                >
                  {link.label}
                </Link>
                {isServices && mega && (
                  <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-xl border border-black/8 bg-white p-3 shadow-xl">
                      {divisions.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/services/${d.slug}`}
                          className="flex gap-3 rounded-lg p-3 hover:bg-sand"
                        >
                          <span>
                            <ServiceMark
                              slug={d.slug}
                              logo={d.logo}
                              title={d.title}
                              className="h-10 w-10 shrink-0"
                            />
                          </span>
                          <span>
                            <div className="font-semibold text-brand">{d.title}</div>
                            <div className="mt-1 text-xs text-muted">{d.accent}</div>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a
            href={telHref(company.phone)}
            aria-label={`Call ${company.phone}`}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden ${
              light ? "text-white" : "text-brand"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z" />
            </svg>
          </a>
          <div className="hidden xl:block">
            <SocialLinks
              company={company}
              light={light}
              compact
              include={["facebook", "linkedin", "twitter"]}
            />
          </div>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden ${
              light ? "text-white" : "text-brand"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 ${light ? "bg-white" : "bg-brand"}`} />
              <span className={`block h-0.5 w-6 ${light ? "bg-white" : "bg-brand"}`} />
              <span className={`block h-0.5 w-4 ${light ? "bg-accent" : "bg-accent"}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[60px] bottom-0 z-50 overflow-y-auto bg-white lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 pb-28">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`min-h-12 rounded-sm px-3 py-3 text-base font-semibold ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-sand text-accent"
                    : "text-brand"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Divisions
            </p>
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/services/${d.slug}`}
                className="flex min-h-11 items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-muted"
              >
                <span className="shrink-0">
                  <ServiceMark
                    slug={d.slug}
                    logo={d.logo}
                    title={d.title}
                    className="h-9 w-9"
                  />
                </span>
                {d.title}
              </Link>
            ))}
            <a
              href={telHref(company.phone)}
              className="mt-4 min-h-12 rounded-sm border border-brand/15 px-4 py-3 text-center text-sm font-semibold text-brand"
            >
              Call {company.phone}
            </a>
            <div className="mt-4 px-3">
              <SocialLinks company={company} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
