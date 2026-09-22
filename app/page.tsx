import Link from "next/link";
import { getSite } from "@/lib/cms";
import { showcaseImages } from "@/lib/gallery";
import { HeroMotion } from "@/components/HeroMotion";
import { ImageFrame } from "@/components/ImageFrame";
import { DivisionShowcase } from "@/components/DivisionShowcase";
import { SocialLinks } from "@/components/SocialLinks";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { StatCounters } from "@/components/StatCounters";

export default async function Home() {
  const site = await getSite();
  const { company, divisions, projects, stats, partners, home, about } = site;
  const featured = projects.slice(0, 3);
  const gallery = showcaseImages.concat(showcaseImages);

  return (
    <div>
      <HeroMotion motion={home.motion}>
        {home.kicker && home.kicker.trim().toLowerCase() !== company.name.trim().toLowerCase() ? (
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            {home.kicker}
          </p>
        ) : null}
        <h1 className="animate-fade-up delay-1 mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          {home.title}
          <span className="block text-white/90">{home.titleLine2}</span>
        </h1>
        <p className="animate-fade-up delay-2 mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          {home.subtitle}
        </p>
        <div className="animate-fade-up delay-3 mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={home.ctaPrimaryHref}
            className="rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            {home.ctaPrimaryLabel}
          </Link>
          <Link
            href={home.ctaSecondaryHref}
            className="rounded-sm border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            {home.ctaSecondaryLabel}
          </Link>
        </div>
      </HeroMotion>

      <section className="overflow-hidden bg-brand-deep">
        <div className="marquee-track flex">
          {gallery.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="relative h-36 w-64 shrink-0 sm:h-48 sm:w-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image.src})` }}
              />
              <div className="absolute inset-0 bg-brand-deep/20" />
            </div>
          ))}
        </div>
      </section>

      <StatCounters stats={stats} />

      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-28">
        <ImageFrame src={about.image} alt={about.title} className="h-72 rounded-2xl shadow-xl sm:h-[520px]">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-xs text-sm font-medium text-white">
            {company.tagline}
          </p>
        </ImageFrame>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {about.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-brand sm:text-4xl">{about.title}</h2>
          <p className="mt-5 text-base leading-7 text-muted">{about.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="rounded-sm bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              About the group
            </Link>
            <SocialLinks company={company} />
          </div>
        </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 pb-4 lg:px-8 lg:pb-6">
          <div className="flex items-end justify-between gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {home.divisionsKicker}
            </p>
            <Link
              href="/services"
              className="text-sm font-semibold text-brand underline decoration-accent underline-offset-4"
            >
              View all services
            </Link>
          </div>
          <div className="mt-8">
            <DivisionShowcase divisions={divisions} />
          </div>
        </div>
      </section>

      <PartnerMarquee partners={partners} />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {home.projectsKicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand sm:text-4xl">
              {home.projectsTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-semibold text-brand underline decoration-accent underline-offset-4 sm:inline"
          >
            All projects
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
              <ImageFrame src={p.image} alt={p.title} className="h-64 sm:h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/50 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{p.location}</p>
                </div>
              </ImageFrame>
            </article>
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-block text-sm font-semibold text-brand underline decoration-accent underline-offset-4 sm:hidden"
        >
          All projects
        </Link>
      </section>

      <section className="relative overflow-hidden bg-brand py-20 text-white lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${showcaseImages[3].src})` }}
        />
        <div className="absolute inset-0 bg-brand/80" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-accent/15 diagonal-cut" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{home.ctaTitle}</h2>
            <p className="mt-3 max-w-lg text-white/75">{home.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Contact the group
            </Link>
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="rounded-sm border border-white/30 px-6 py-3.5 text-sm font-semibold"
            >
              {company.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
