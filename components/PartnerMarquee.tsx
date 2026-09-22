import type { Partner } from "@/lib/types";

function fillTrack(partners: Partner[]) {
  const withLogos = partners.filter((partner) => partner.logo);
  if (withLogos.length === 0) return [];
  const copies: Partner[] = [...withLogos];
  while (copies.length < 8) copies.push(...withLogos);
  return [...copies, ...copies];
}

export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  const withLogos = partners.filter((partner) => partner.logo);
  if (withLogos.length === 0) return null;
  const track = fillTrack(withLogos);

  return (
    <section className="relative overflow-hidden bg-sand pb-2 pt-2 lg:pb-3 lg:pt-3">
      <div className="flex items-center justify-center gap-4 px-4">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent sm:w-20" />
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand">
          Trusted partners
        </p>
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent sm:w-20" />
      </div>
      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-sand to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-sand to-transparent sm:w-24" />
        <div className="logo-marquee-track flex items-center gap-8 px-4 sm:gap-10">
          {track.map((partner, index) => {
            const mark = (
              <span className="group relative flex h-[4.25rem] w-44 items-center justify-center sm:h-20 sm:w-48">
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-11 max-w-[10rem] object-contain opacity-90 transition duration-500 group-hover:opacity-100 sm:max-h-12"
                />
                <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              </span>
            );
            return partner.url ? (
              <a
                key={`${partner.name}-${index}`}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
                title={partner.name}
              >
                {mark}
              </a>
            ) : (
              <div key={`${partner.name}-${index}`} className="shrink-0" title={partner.name}>
                {mark}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
