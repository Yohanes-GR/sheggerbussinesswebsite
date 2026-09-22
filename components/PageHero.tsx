type Props = {
  kicker?: string;
  title: string;
  text?: string;
  image?: string;
  compact?: boolean;
};

export function PageHero({ kicker, title, text, image, compact = true }: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-brand-deep text-white ${
        compact ? "pt-24" : "min-h-[92vh] pt-28"
      }`}
    >
      {image && (
        <div
          className="hero-kenburns absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/80 to-brand/35" />
      <div className="grain absolute inset-0 opacity-20 mix-blend-overlay" />
      <div
        className={`relative mx-auto max-w-7xl px-4 lg:px-8 ${
          compact ? "py-8 lg:py-10" : "flex min-h-[92vh] flex-col justify-end py-16 lg:py-24"
        }`}
      >
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {kicker}
          </p>
        )}
        <h1
          className={`mt-3 max-w-4xl font-semibold leading-tight tracking-tight ${
            compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
          }`}
        >
          {title}
        </h1>
        {text && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{text}</p>
        )}
        <div className="mt-6 h-1 w-24 bg-accent" />
      </div>
    </section>
  );
}
