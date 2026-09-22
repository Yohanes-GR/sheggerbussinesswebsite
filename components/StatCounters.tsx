"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

function parseStat(value: string) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: null as number | null, suffix: value };
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

function CountUpValue({
  value,
  delay = 0,
  className = "",
}: {
  value: string;
  delay?: number;
  className?: string;
}) {
  const { target, suffix } = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const [display, setDisplay] = useState(target == null ? value : `0${suffix}`);

  useEffect(() => {
    if (target == null) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const run = () => {
      if (played.current) return;
      played.current = true;
      const startAt = performance.now() + delay;
      const duration = 1400;
      const tick = (now: number) => {
        if (now < startAt) {
          requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, (now - startAt) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const visible = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 80;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (visible()) run();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [delay, suffix, target, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function StatCounters({
  stats,
  variant = "home",
}: {
  stats: Stat[];
  variant?: "home" | "about";
}) {
  if (variant === "about") {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        {stats.map((stat, index) => (
          <div key={stat.label}>
            <CountUpValue
              value={stat.value}
              delay={index * 120}
              className="block text-3xl font-semibold tabular-nums text-brand sm:text-4xl"
            />
            <span className="mt-2 block h-0.5 w-8 bg-accent" />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-brand-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="px-5 py-7 text-center sm:px-6 lg:border-r lg:border-white/5 lg:last:border-r-0"
          >
            <CountUpValue
              value={stat.value}
              delay={index * 110}
              className="block text-3xl font-semibold tabular-nums text-white/80 sm:text-4xl"
            />
            <span className="mx-auto mt-2 block h-px w-8 bg-accent/60" />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
