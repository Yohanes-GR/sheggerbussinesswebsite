import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite();
  const item = site.careers?.find((row) => row.slug === slug);
  return { title: item?.title ?? "Careers", description: item?.excerpt || item?.body };
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params;
  const site = await getSite();
  const item = site.careers?.find((row) => row.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-28 lg:px-8">
      <Link href="/careers" className="text-sm font-semibold text-brand">
        ← Careers
      </Link>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        {[item.type, item.location].filter(Boolean).join(" · ")}
      </p>
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
      <Link
        href="/contact"
        className="mt-10 inline-flex rounded-md bg-[#e6a317] px-5 py-3 text-sm font-semibold text-white"
      >
        Apply →
      </Link>
    </article>
  );
}
