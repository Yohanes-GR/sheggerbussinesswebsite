import type { ReactNode } from "react";

export function ImageFrame({
  src,
  alt,
  className = "",
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden bg-brand ${className}`}>
      <div
        role="img"
        aria-label={alt || undefined}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${src})` }}
      />
      {children}
    </div>
  );
}
