import type { Company } from "@/lib/types";

export function Logo({
  company,
  light = false,
  compact = false,
}: {
  company?: Company;
  light?: boolean;
  compact?: boolean;
}) {
  if (company?.logo) {
    return (
      <span className="inline-flex max-w-full flex-col items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt=""
          className={`w-auto object-contain object-left ${compact ? "h-6 max-w-[120px] sm:h-7 sm:max-w-[132px]" : "h-8 max-w-[148px]"} ${
            light ? "brightness-0 invert" : ""
          }`}
        />
        {compact ? (
          <span className="mt-1 text-[9px] font-semibold leading-none tracking-[0.12em] text-accent sm:text-[10px]">
            {company.name}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="44" height="44" rx="4" fill="#01268A" />
      <path
        d="M31 16.1c0-2.8-2.6-4.6-7.2-4.6H13.5v3.4H23.6c2.4 0 3.7.8 3.7 2.1 0 1.4-1.2 2.2-3.9 2.6l-4.2.7c-4.6.7-7.5 2.8-7.5 6.6 0 4.2 3.5 6.7 8.8 6.7H32v-3.4H21.1c-2.7 0-4.2-.9-4.2-2.4 0-1.4 1.2-2.2 4.1-2.6l4-.7c4.9-.8 8-3 8-6.4Z"
        fill="white"
      />
      <rect x="30" y="30" width="8" height="8" fill="#FE7E03" />
    </svg>
  );
}
