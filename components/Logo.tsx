import type { Company } from "@/lib/types";

export function Logo({
  company,
  light = false,
}: {
  company?: Company;
  light?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/sbg-mark.png"
        alt=""
        className="h-12 w-auto shrink-0 sm:h-14"
      />
      <span className="min-w-0 leading-none">
        <span
          className={`block text-[15px] font-extrabold tracking-[0.04em] sm:text-lg ${
            light ? "text-white" : "text-brand"
          }`}
        >
          SHEGER
        </span>
        <span
          className={`mt-0.5 block text-[9px] font-bold tracking-[0.14em] sm:text-[11px] ${
            light ? "text-white" : "text-brand"
          }`}
        >
          BUSINESS GROUP
        </span>
        <span
          className={`mt-1 block text-[8px] font-medium tracking-wide sm:text-[10px] ${
            light ? "text-white/70" : "text-[#8a93a6]"
          }`}
        >
          Building Today <span className="text-[#e6a317]">|</span> Shaping Tomorrow
        </span>
        {company?.name ? <span className="sr-only">{company.name}</span> : null}
      </span>
    </span>
  );
}
