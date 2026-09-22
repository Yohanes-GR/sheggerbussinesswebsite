import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RealEstateBoard } from "@/components/RealEstateBoard";
import { getSite } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Finfine Real Estate", description: site.pages.realEstate.text };
}

export default async function RealEstatePage() {
  const site = await getSite();
  const page = site.pages.realEstate;

  return (
    <div>
      <PageHero kicker={page.kicker} title={page.title} text={page.text} image={page.image} />
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-brand">Live market</h2>
            <p className="mt-2 text-muted">Filter by type and sale or lease status.</p>
          </div>
          <Link
            href="/services/finfine-real-estate"
            className="text-sm font-semibold text-brand underline decoration-accent underline-offset-4"
          >
            About the division
          </Link>
        </div>
        <RealEstateBoard listings={site.listings} />
      </section>
    </div>
  );
}
