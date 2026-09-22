"use client";

import type { Division } from "@/lib/data";

export function ServicesJumpNav({ divisions }: { divisions: Division[] }) {
  return (
    <div className="sticky top-[60px] z-40 border-b border-white/10 bg-brand-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 pr-28 [-ms-overflow-style:none] [scrollbar-width:none] lg:px-8 lg:pr-8 [&::-webkit-scrollbar]:hidden">
        {divisions.map((d) => (
          <a
            key={d.slug}
            href={`#${d.slug}`}
            className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-accent hover:bg-accent"
          >
            {d.shortName}
          </a>
        ))}
      </div>
    </div>
  );
}
