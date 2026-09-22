"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getFlatServices, type Division } from "@/lib/data";

export function ServiceExplorer({ divisions }: { divisions: Division[] }) {
  const all = getFlatServices(divisions);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((s) => {
      const inDivision = active === "all" || s.divisionSlug === active;
      const inText =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.divisionTitle.toLowerCase().includes(q);
      return inDivision && inText;
    });
  }, [all, query, active]);

  return (
    <div>
      <div className="sticky top-[68px] z-30 -mx-4 flex flex-col gap-4 bg-sand/95 px-4 py-3 backdrop-blur lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              active === "all"
                ? "bg-brand text-white"
                : "bg-white text-brand hover:bg-mist"
            }`}
          >
            All
          </button>
          {divisions.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => setActive(d.slug)}
              className={`rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                active === d.slug
                  ? "bg-brand text-white"
                  : "bg-white text-brand hover:bg-mist"
              }`}
            >
              {d.shortName}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search services</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="w-full rounded-sm border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>

      <p className="mt-6 text-sm text-muted">{results.length} services</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${s.image})` }}
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {s.divisionTitle}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-brand group-hover:text-accent">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{s.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
