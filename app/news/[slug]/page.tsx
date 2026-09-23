import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite();
  const item = site.news?.find((row) => row.slug === slug);
  return { title: item?.title ?? "News", description: item?.excerpt || item?.body };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const site = await getSite();
  const item = site.news?.find((row) => row.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-28 lg:px-8">
      <Link href="/news" className="text-sm font-semibold text-brand">
        ← News & Insights
      </Link>
      {item.date ? (
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {item.date}
        </p>
      ) : null}
      <h1 className="mt-3 text-4xl font-semibold text-brand">{item.title}</h1>
      {item.image ? (
        <div
          className="mt-8 h-80 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      ) : null}
      {item.excerpt ? <p className="mt-8 text-lg leading-8 text-ink">{item.excerpt}</p> : null}
      {item.body ? (
        <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-muted">{item.body}</div>
      ) : null}
    </article>
  );
}
