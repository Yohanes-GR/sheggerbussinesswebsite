import Link from "next/link";
import { ImageFrame } from "@/components/ImageFrame";
import { ServiceMark } from "@/components/ServiceMark";
import type { ContentNode } from "@/lib/data";

export function SubServiceList({
  items,
  kicker = "Sub services",
}: {
  items: ContentNode[];
  kicker?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-12 flex items-end gap-6 sm:mb-16">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">{kicker}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
            Crafted capabilities.
          </h2>
        </div>
        <span className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-accent via-brand/20 to-transparent sm:block" />
      </div>

      <div className="space-y-16 lg:space-y-28">
        {items.map((item, index) => {
          const flip = index % 2 === 1;
          const nested = item.children ?? [];
          return (
            <article key={item.slug} className="relative">
              <div className="relative grid items-center lg:grid-cols-12">
                <Link
                  href={`/services/${item.slug}`}
                  className={`group relative isolate h-[260px] overflow-hidden sm:h-[340px] lg:col-span-9 lg:h-[460px] ${
                    flip ? "photo-cut-left lg:col-start-4" : "photo-cut-right lg:col-start-1"
                  }`}
                >
                  {item.image ? (
                    <ImageFrame src={item.image} alt={item.title} className="absolute inset-0 h-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/75 via-brand-deep/15 to-transparent" />
                      <span className="grain pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay" />
                    </ImageFrame>
                  ) : (
                    <div className="absolute inset-0 bg-brand-deep">
                      <div className="absolute inset-0 bg-dot-grid opacity-80" />
                    </div>
                  )}
                  <div className="absolute left-5 top-5 z-10">
                    <ServiceMark
                      slug={item.slug}
                      logo={item.logo}
                      title={item.title}
                      className="h-14 w-14 bg-white/90 shadow-sm"
                    />
                  </div>
                </Link>

                <div
                  className={`relative z-10 mx-3 -mt-14 rounded-2xl bg-white/95 p-6 shadow-[0_24px_60px_-28px_rgba(1,38,138,0.45)] ring-1 ring-black/5 backdrop-blur-sm sm:mx-6 sm:p-8 lg:absolute lg:top-1/2 lg:mx-0 lg:w-[min(26rem,38%)] lg:-translate-y-1/2 lg:p-10 ${
                    flip ? "lg:left-[4%]" : "lg:right-[4%]"
                  }`}
                >
                  <span
                    className={`absolute top-8 hidden h-16 w-1 bg-accent lg:block ${
                      flip ? "right-0" : "left-0"
                    }`}
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                    {nested.length > 0 ? "Studio specialisms" : "Capability"}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-brand sm:text-3xl">
                    <Link href={`/services/${item.slug}`} className="transition hover:text-accent">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-[15px]">{item.summary}</p>

                  {nested.length > 0 ? (
                    <ul className="mt-6 grid grid-cols-3 gap-2">
                      {nested.map((child) => (
                        <li key={child.slug}>
                          <Link
                            href={`/services/${child.slug}`}
                            className="group/tile relative block overflow-hidden rounded-lg"
                          >
                            <span
                              className="block h-[4.5rem] bg-brand-deep bg-cover bg-center transition duration-500 group-hover/tile:scale-110"
                              style={
                                child.image ? { backgroundImage: `url(${child.image})` } : undefined
                              }
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 to-brand-deep/10" />
                            <span className="absolute inset-x-1.5 bottom-1.5 line-clamp-2 text-[11px] font-semibold leading-tight text-white">
                              {child.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-5 space-y-2">
                      {item.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm text-ink/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    href={`/services/${item.slug}`}
                    className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    View this service
                    <span aria-hidden className="transition-transform group-hover/cta:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
