import type { ReactNode } from "react";

type Props = {
  slug: string;
  className?: string;
};

function Svg({
  children,
  className = "h-7 w-7",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ServiceIcon({ slug, className }: Props) {
  const icon = iconFor(slug);
  return <Svg className={className}>{icon}</Svg>;
}

function iconFor(slug: string) {
  if (slug.includes("road")) {
    return (
      <>
        <path d="M9 3 6 21" />
        <path d="M15 3 18 21" />
        <path d="M12 7v3M12 13v3" />
      </>
    );
  }
  if (slug.includes("bridge")) {
    return (
      <>
        <path d="M3 16h18" />
        <path d="M5 16V10c2.5 3 4.5 3 7 0 2.5 3 4.5 3 7 0v6" />
        <path d="M8 16v5M16 16v5" />
      </>
    );
  }
  if (slug.includes("water")) {
    return (
      <>
        <path d="M12 3s6 6.2 6 10.2A6 6 0 1 1 6 13.2C6 9.2 12 3 12 3Z" />
      </>
    );
  }
  if (slug.includes("post-tension")) {
    return (
      <>
        <path d="M4 8h16M4 16h16" />
        <path d="M7 8v8M12 8v8M17 8v8" />
        <path d="M4 8V6M20 16v2" />
      </>
    );
  }
  if (slug.includes("substructure")) {
    return (
      <>
        <path d="M4 10h16v10H4z" />
        <path d="M8 10V7h8v3" />
        <path d="M4 15h16" />
      </>
    );
  }
  if (slug.includes("interior") || slug.includes("residential") || slug.includes("hospitality")) {
    return (
      <>
        <path d="M4 12h16v8H4z" />
        <path d="M8 12V9a4 4 0 0 1 8 0v3" />
        <path d="M4 16h16" />
      </>
    );
  }
  if (slug.includes("export") || slug.includes("crop") || slug.includes("import") || slug.includes("trade") || slug.includes("materials")) {
    return (
      <>
        <path d="M3 17h18" />
        <path d="M5 17V11l7-4 7 4v6" />
        <path d="M9 17v-4h6v4" />
      </>
    );
  }
  if (slug.includes("real-estate") || slug.includes("finfine") || slug.includes("developing") || slug.includes("market")) {
    return (
      <>
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M10 20v-6h4v6" />
      </>
    );
  }
  if (slug.includes("urban") || slug.includes("2d") || slug.includes("3d")) {
    return (
      <>
        <path d="M12 3 4 7.5V16.5L12 21l8-4.5V7.5Z" />
        <path d="M12 21V12M4 7.5 12 12l8-4.5" />
      </>
    );
  }
  if (slug.includes("feasibility") || slug.includes("bill")) {
    return (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4M10 12h4M10 16h2" />
      </>
    );
  }
  if (slug.includes("strengthen") || slug.includes("retrofit")) {
    return (
      <>
        <path d="M8 21V8l4-4 4 4v13" />
        <path d="M6 21h12" />
        <path d="M10 12h4" />
      </>
    );
  }
  if (slug.includes("design") || slug.includes("architect") || slug.includes("supervision")) {
    return (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <path d="m6.2 6.2 2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2 15.7 8.3M8.3 15.7 6.2 17.8" />
      </>
    );
  }
  if (slug.includes("contractor") || slug.includes("construction") || slug.includes("building")) {
    return (
      <>
        <path d="M4 20V10l6-4 4 3v11" />
        <path d="M14 12h6v8H4" />
        <path d="M17 20v-5" />
      </>
    );
  }
  return (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M10 20v-6h4v6" />
    </>
  );
}
