import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/cms";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#01268A",
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.company.name,
      template: `%s · ${site.company.name}`,
    },
    description: site.company.description,
    icons: {
      icon: [
        { url: "/favicon.ico?v=2", sizes: "48x48" },
        { url: "/icon.png?v=2", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico?v=2",
      apple: "/apple-icon.png?v=2",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-sand text-ink" suppressHydrationWarning>
        <SiteShell site={site}>{children}</SiteShell>
      </body>
    </html>
  );
}
