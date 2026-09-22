import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ImageFrame } from "@/components/ImageFrame";
import { SocialLinks } from "@/components/SocialLinks";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { StatCounters } from "@/components/StatCounters";
import { getSite } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "About", description: site.about.text };
}

export default async function AboutPage() {
  const site = await getSite();
  const { about, stats, divisions, partners } = site;

  return (
    <div>
      <PageHero kicker={about.kicker} title={about.title} text={about.text} image={about.image} />
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {about.whyKicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand">{about.whyTitle}</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <StatCounters stats={stats} variant="about" />
        </div>
      </section>
      <PartnerMarquee partners={partners} />
      <section className="bg-white py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-brand">Divisions</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/services/${d.slug}`}
                className="group overflow-hidden rounded-xl border border-black/5 bg-white hover:border-accent/40"
              >
                <ImageFrame src={d.image} alt={d.title} className="h-44" />
                <div className="p-5">
                    <h3 className="text-xl font-semibold text-brand">{d.title}</h3>
                    <p className="mt-1 text-sm text-accent">{d.accent}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{d.description}</p>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
