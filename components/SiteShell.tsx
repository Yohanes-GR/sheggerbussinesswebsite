"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FaqAssistant } from "./FaqAssistant";
import type { SiteContent } from "@/lib/types";

export function SiteShell({
  children,
  site,
}: {
  children: React.ReactNode;
  site: SiteContent;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header divisions={site.divisions} company={site.company} />
      <main className="flex-1">{children}</main>
      <Footer company={site.company} divisions={site.divisions} />
      <FaqAssistant company={site.company} />
    </>
  );
}
