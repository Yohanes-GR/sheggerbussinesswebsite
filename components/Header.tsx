"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Company, Division } from "@/lib/types";
import { Logo } from "./Logo";
import { ServiceMark } from "./ServiceMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Divisions", menu: true },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News & Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  divisions: Division[];
  company: Company;
};

export function Header({ divisions, company }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" aria-label={`${company.name} home`} className="min-w-0 shrink-0">
          <Logo company={company} />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.menu && setMega(true)}
                onMouseLeave={() => link.menu && setMega(false)}
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1 px-2.5 py-2 text-[15px] font-medium text-brand ${
                    active ? "border-b-2 border-[#e6a317]" : "border-b-2 border-transparent hover:text-brand-dark"
                  }`}
                >
                  {link.label}
                  {link.menu ? (
                    <svg viewBox="0 0 12 8" className="h-2 w-2 fill-current" aria-hidden>
                      <path d="M1 1.5 6 6.5 11 1.5" />
                    </svg>
                  ) : null}
                </Link>
                {link.menu && mega && (
                  <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-1 gap-1 rounded-xl border border-black/8 bg-white p-3 shadow-xl">
                      {divisions.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/services/${d.slug}`}
                          className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-sand"
                        >
                          <ServiceMark
                            slug={d.slug}
                            logo={d.logo}
                            title={d.title}
                            className="h-9 w-9 shrink-0"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-brand">{d.title}</span>
                            <span className="mt-0.5 block text-xs text-muted">{d.accent}</span>
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-md bg-[#e6a317] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#cf8f10] lg:inline-flex"
          >
            Request a Consultation
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-brand xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-brand" />
              <span className="block h-0.5 w-6 bg-brand" />
              <span className="block h-0.5 w-4 bg-[#e6a317]" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[4.75rem] bottom-0 z-50 overflow-y-auto bg-white xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 pb-28">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`min-h-12 rounded-sm px-3 py-3 text-base font-semibold ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-sand text-brand underline decoration-[#e6a317] decoration-2 underline-offset-4"
                    : "text-brand"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/services/${d.slug}`}
                className="flex min-h-11 items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-muted"
              >
                <ServiceMark slug={d.slug} logo={d.logo} title={d.title} className="h-9 w-9" />
                {d.title}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-[#e6a317] px-4 py-3 text-sm font-semibold text-white"
            >
              Request a Consultation →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
