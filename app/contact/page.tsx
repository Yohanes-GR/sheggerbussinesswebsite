import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/cms";
import { mapsEmbedSrc, mapsLink, telHref } from "@/lib/geo";
import { whatsappHref } from "@/lib/social";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Contact", description: site.pages.contact.text };
}

export default async function ContactPage() {
  const site = await getSite();
  const { company, pages } = site;
  const page = pages.contact;
  const wa = whatsappHref(company);
  const mapSearch = mapsLink(company.address, company.mapsUrl);
  const mapEmbed = await mapsEmbedSrc(company.address, company.mapsUrl);

  const channels = [
    {
      label: "Our office",
      value: company.address,
      href: mapSearch,
      action: "View on map",
      external: true,
    },
    {
      label: "Call us",
      value: company.phone,
      href: telHref(company.phone),
      action: "Call now",
    },
    {
      label: "Mobile",
      value: company.mobile,
      href: telHref(company.mobile),
      action: "Call mobile",
    },
    {
      label: "Email us",
      value: company.email,
      href: `mailto:${company.email}`,
      action: "Send email",
    },
    {
      label: "WhatsApp",
      value: company.mobile,
      href: wa,
      action: "Chat now",
      external: true,
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-deep pt-24 text-white">
        {page.image && (
          <div
            className="hero-kenburns absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${page.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/88 to-brand/45" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Get in touch
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Let’s start a conversation.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{page.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={telHref(company.phone)}
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Call us now
            </a>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            ) : (
              <a
                href={`mailto:${company.email}`}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Email us
              </a>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            <span className="rounded-full border border-white/20 px-3 py-1.5">Available now</span>
            <span className="rounded-full border border-white/20 px-3 py-1.5">24h response</span>
            <span className="rounded-full border border-white/20 px-3 py-1.5">{company.hours}</span>
          </div>
        </div>
      </section>

      <section className="bg-sand px-4 py-8 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {channels.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="min-h-[7.5rem] rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.label}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-brand">{item.value}</p>
                <p className="mt-3 text-sm font-medium text-accent">{item.action}</p>
              </a>
            ) : null,
          )}
        </div>
      </section>

      <section className="overflow-hidden bg-brand-deep text-white" aria-label="Our location on map">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Our location
            </p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-4xl">
              Visit us at <span className="text-accent">Dembel City Center</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 fill-accent" aria-hidden>
                <path d="M12 2.5A7.2 7.2 0 0 0 4.8 9.7c0 5.1 5.6 11 6.7 12.2a.7.7 0 0 0 1 0c1.1-1.2 6.7-7.1 6.7-12.2A7.2 7.2 0 0 0 12 2.5Zm0 9.8A2.6 2.6 0 1 1 14.6 9.7 2.6 2.6 0 0 1 12 12.3Z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-white">{company.name}</p>
                <p className="mt-1 max-w-xs text-xs leading-5 text-white/60">{company.address}</p>
              </div>
            </div>
            <a
              href={mapSearch}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M21.4 11.2 4.7 3.6a.9.9 0 0 0-1.3 1l2.3 7.2H13a.8.8 0 0 1 0 1.6H5.7l-2.3 7.2a.9.9 0 0 0 1.3 1l16.7-7.6a.9.9 0 0 0 0-1.8Z" />
              </svg>
              Get directions
            </a>
          </div>
        </div>
        <div className="relative h-[360px] w-full sm:h-[440px] lg:h-[560px]">
          <iframe
            title={`${company.name} location`}
            src={mapEmbed}
            className="h-full w-full border-0 contrast-[1.04] grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute bottom-5 left-4 z-10 max-w-[min(100%-2rem,20rem)] rounded-xl border border-white/10 bg-brand-deep/90 px-5 py-4 shadow-2xl backdrop-blur-md sm:bottom-8 sm:left-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={company.logo || "/brand/sbg-logo.png"}
              alt=""
              className="h-7 w-auto object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-white">{company.name}</p>
            <p className="mt-1 text-xs text-white/55">Dembel City Center · Kirkos · Addis Ababa</p>
          </div>
        </div>
      </section>

      <section className="bg-brand px-4 py-12 pb-24 text-white lg:px-8 sm:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Ready to brief Sheger?</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">
              Architecture, construction, property, interiors, or trade — start with one conversation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Our Divisions
            </Link>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                WhatsApp us
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
