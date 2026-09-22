"use client";

import { useMemo, useState } from "react";
import type { Listing } from "@/lib/types";

export function RealEstateBoard({ listings }: { listings: Listing[] }) {
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const types = ["All", ...Array.from(new Set(listings.map((l) => l.type)))];
  const statuses = ["All", ...Array.from(new Set(listings.map((l) => l.status)))];

  const list = useMemo(
    () =>
      listings.filter(
        (l) =>
          (type === "All" || l.type === type) &&
          (status === "All" || l.status === status),
      ),
    [type, status, listings],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <label className="text-sm">
          <span className="mr-2 text-muted">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-sm border border-black/10 bg-white px-3 py-2"
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mr-2 text-muted">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-sm border border-black/10 bg-white px-3 py-2"
          >
            {statuses.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((l) => (
          <article
            key={l.id}
            className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
          >
            <div className="relative h-64 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${l.image})` }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="text-accent">{l.status}</span>
                <span className="text-muted">{l.id}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-brand">{l.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {l.area} · {l.type} · {l.size}
              </p>
              <p className="mt-4 text-lg font-semibold text-brand">{l.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
