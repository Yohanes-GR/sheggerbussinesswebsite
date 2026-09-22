"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              filter === f ? "bg-brand text-white" : "bg-white text-brand hover:bg-mist"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <article
            key={p.slug}
            className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
          >
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${p.image})` }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span>{p.category}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-brand">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.location}</p>
              <p className="mt-3 text-sm leading-6 text-ink/80">{p.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
