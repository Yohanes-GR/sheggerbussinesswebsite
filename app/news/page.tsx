import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getSite } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "News & Insights", description: site.pages.news.text };
}

export default async function NewsPage() {
  const site = await getSite();
  const page = site.pages.news;
  const items = site.news ?? [];

  return (
    <div>
      <PageHero kicker={page.kicker} title={page.title} text={page.text} image={page.image} />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {items.length === 0 ? (
          <p className="text-base leading-7 text-muted">There are no articles yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <div className="relative h-56 overflow-hidden bg-mist">
                  {item.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  {item.date ? (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {item.date}
                    </p>
                  ) : null}
                  <h2 className="mt-2 text-xl font-semibold text-brand">{item.title}</h2>
                  {item.excerpt ? (
                    <p className="mt-3 text-sm leading-6 text-muted">{item.excerpt}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
