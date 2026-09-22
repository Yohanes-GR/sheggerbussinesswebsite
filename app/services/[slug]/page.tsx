import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroMotion } from "@/components/HeroMotion";
import { ServiceMark } from "@/components/ServiceMark";
import { ExtraPhotoGrid, extraPhotosFor } from "@/components/ExtraPhotoGrid";
import { SubServiceList } from "@/components/SubServiceList";
import { getSite } from "@/lib/cms";
import {
  getAllSlugs,
  getDivision,
  getFlatServices,
  getService,
} from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const site = await getSite();
    return getAllSlugs(site.divisions).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite();
  const division = getDivision(slug, site.divisions);
  const service = getService(slug, site.divisions);
  const title = division?.title ?? service?.title;
  const description = division?.summary ?? service?.summary;
  if (!title) return { title: "Service" };
  return { title, description };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const site = await getSite();
  const motion = site.home.motion;
  const division = getDivision(slug, site.divisions);
  const service = getService(slug, site.divisions);

  if (division) {
    const children = division.children ?? [];
    return (
      <div className="bg-sand">
        <HeroMotion motion={motion}>
          <ServiceMark
            slug={division.slug}
            logo={division.logo}
            title={division.title}
            className="h-16 w-16"
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            {division.accent || division.shortName}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {division.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            {division.summary}
          </p>
        </HeroMotion>
        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <p className="max-w-3xl text-lg leading-8 text-ink/85">{division.description}</p>
          <SubServiceList items={children} />
        </section>
        <ExtraPhotoGrid images={extraPhotosFor(division)} />
      </div>
    );
  }

  if (!service) notFound();

  const siblings = getFlatServices(site.divisions).filter(
    (item) => item.divisionSlug === service.divisionSlug && item.slug !== service.slug,
  );

  return (
    <div className="bg-sand">
      <HeroMotion motion={motion}>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
          {service.divisionTitle}
          {service.parentTitle && service.parentSlug !== service.divisionSlug
            ? ` · ${service.parentTitle}`
            : ""}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          {service.summary}
        </p>
      </HeroMotion>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-12 lg:px-8">
        <article className="lg:col-span-8">
          <p className="text-lg leading-8 text-ink/85">{service.description}</p>
          {service.highlights && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-lg border-l-4 border-accent bg-white px-4 py-4 text-sm font-medium text-brand shadow-sm"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}
        </article>
        <aside className="lg:col-span-4">
          <div className="rounded-xl bg-brand p-6 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Division</p>
            <p className="mt-2 text-xl font-semibold">{service.divisionTitle}</p>
            <Link
              href={`/services/${service.divisionSlug}`}
              className="mt-4 inline-block text-sm underline decoration-accent underline-offset-4"
            >
              View full division
            </Link>
          </div>
          {siblings.length > 0 && (
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Related
              </h3>
              <ul className="mt-4 space-y-3">
                {siblings.slice(0, 6).map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`} className="text-brand hover:text-accent">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
      {service.children && service.children.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-4 lg:px-8">
          <SubServiceList items={service.children} kicker="Within this service" />
        </div>
      )}
      <ExtraPhotoGrid images={extraPhotosFor(service)} />
    </div>
  );
}
