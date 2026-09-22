import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-brand">This page is not on the drawings.</h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be outdated. Return home or browse services.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-sm bg-brand px-5 py-3 text-sm font-semibold text-white">
          Home
        </Link>
        <Link
          href="/services"
          className="rounded-sm border border-brand px-5 py-3 text-sm font-semibold text-brand"
        >
          Services
        </Link>
      </div>
    </div>
  );
}
