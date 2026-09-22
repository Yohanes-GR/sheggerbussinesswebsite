import Link from "next/link";
import { ServiceMark } from "@/components/ServiceMark";

export type ServiceCardItem = {
  slug: string;
  title: string;
  summary: string;
  logo?: string;
  image?: string;
};

export function ServiceIconCards({
  items,
  compact = false,
}: {
  items: ServiceCardItem[];
  compact?: boolean;
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${compact ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/services/${item.slug}`}
          className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10"
        >
          {item.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-white/[0.04]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/45 to-brand-deep/10" />
          <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6">
            <ServiceMark slug={item.slug} logo={item.logo} title={item.title} className="h-12 w-12 bg-white/90" />
            <h3 className={`mt-5 font-semibold text-white ${compact ? "text-lg" : "text-xl"}`}>
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/70">{item.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Learn more
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
