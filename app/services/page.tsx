import type { Metadata } from "next";
import { HeroMotion } from "@/components/HeroMotion";
import { ServiceIconCards } from "@/components/ServiceIconCards";
import { getSite } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Services", description: site.pages.services.text };
}

export default async function ServicesPage() {
  const site = await getSite();
  const { pages, divisions } = site;
  const specialists = divisions.flatMap((d) =>
    (d.children ?? []).map((child) => ({
      slug: child.slug,
      title: child.title,
      summary: child.summary,
      logo: child.logo,
      image: child.image,
    })),
  );

  return (
    <div className="bg-sand">
      <HeroMotion motion={site.home.motion}>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
          Home / Services
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {pages.services.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          {pages.services.text}
        </p>
      </HeroMotion>

      <section className="bg-dot-grid px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">What we do</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Five specialist divisions. One group.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
            Architecture and engineering, construction, real estate, interiors, and international
            trade — pick a division to see the work behind it.
          </p>
          <div className="mt-12">
            <ServiceIconCards
              items={divisions.map((d) => ({
                slug: d.slug,
                title: d.title,
                summary: d.summary,
                logo: d.logo,
                image: d.image,
              }))}
            />
          </div>
        </div>
      </section>

      {specialists.length > 0 && (
        <section className="bg-dot-grid border-t border-white/10 px-4 py-16 text-white lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Specialist services
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              Every capability, as its own brief.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
              Design packages, construction trades, property, crop exports, and interiors — each with
              its own icon and page.
            </p>
            <div className="mt-12">
              <ServiceIconCards items={specialists} compact />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
