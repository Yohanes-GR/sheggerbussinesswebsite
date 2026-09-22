import { ServiceIcon } from "@/components/ServiceIcon";

export function ServiceMark({
  slug,
  logo,
  title,
  className = "h-14 w-14",
}: {
  slug: string;
  logo?: string;
  title?: string;
  className?: string;
}) {
  if (logo) {
    return (
      <span
        className={`inline-flex items-center justify-center overflow-hidden rounded-xl bg-transparent ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={title || ""} className="h-full w-full object-contain p-1" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent ${className}`}
    >
      <ServiceIcon slug={slug} className="h-[55%] w-[55%]" />
    </span>
  );
}
