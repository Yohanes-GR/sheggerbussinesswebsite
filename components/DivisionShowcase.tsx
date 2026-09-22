import Link from "next/link";
import { ImageFrame } from "@/components/ImageFrame";
import { ServiceMark } from "@/components/ServiceMark";
import type { Division } from "@/lib/data";

export function DivisionShowcase({ divisions }: { divisions: Division[] }) {
  if (divisions.length === 0) return null;

  return (
    <div className="space-y-8 lg:space-y-12">
      {divisions.map((division, index) => {
        const flip = index % 2 === 1;
        const services = division.children ?? [];

        return (
          <article
            key={division.slug}
            className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_60px_-32px_rgba(1,38,138,0.35)] ring-1 ring-black/5"
          >
            <div className="grid lg:grid-cols-12">
              <Link
                href={`/services/${division.slug}`}
                className={`group relative isolate min-h-[240px] sm:min-h-[320px] lg:col-span-5 lg:min-h-[480px] ${
                  flip ? "lg:order-2" : ""
                }`}
              >
                {division.image ? (
                  <ImageFrame
                    src={division.image}
                    alt={division.title}
                    className="absolute inset-0 h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/20 to-transparent" />
                    <span className="grain pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />
                  </ImageFrame>
                ) : (
                  <div className="absolute inset-0 bg-brand-deep">
                    <div className="absolute inset-0 bg-dot-grid opacity-80" />
                  </div>
                )}
                <div className="absolute left-5 top-5 z-10">
                  <ServiceMark
                    slug={division.slug}
                    logo={division.logo}
                    title={division.title}
                    className="h-16 w-16"
                  />
                </div>
              </Link>

              <div
                className={`relative flex flex-col justify-center px-6 py-8 sm:px-10 lg:col-span-7 lg:px-12 lg:py-12 ${
                  flip ? "lg:order-1" : ""
                }`}
              >
                <span
                  className={`absolute top-10 hidden h-16 w-1 bg-accent lg:block ${
                    flip ? "right-0" : "left-0"
                  }`}
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  {division.accent || "Operating division"}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand sm:text-4xl">
                  <Link href={`/services/${division.slug}`} className="transition hover:text-accent">
                    {division.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  {division.summary}
                </p>

                {services.length > 0 && (
                  <ul className="mt-7 grid gap-2 lg:grid-cols-2">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group/item flex items-center gap-3 rounded-xl bg-sand/80 px-2.5 py-2.5 ring-1 ring-brand/5 transition hover:bg-white hover:shadow-sm hover:ring-accent/40"
                        >
                          <span
                            className="h-12 w-12 shrink-0 rounded-lg bg-brand-deep bg-cover bg-center"
                            style={
                              service.image
                                ? { backgroundImage: `url(${service.image})` }
                                : undefined
                            }
                          />
                          <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-brand">
                            {service.title}
                          </span>
                          <span
                            aria-hidden
                            className="pr-1 text-accent/50 transition group-hover/item:translate-x-0.5 group-hover/item:text-accent"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/services/${division.slug}`}
                  className="group/cta mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent"
                >
                  Explore this division
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
  );
}
