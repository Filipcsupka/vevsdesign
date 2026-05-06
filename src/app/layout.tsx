import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
  description:
    "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
  keywords: ["svadobná výzdoba", "dizajn", "Košice", "Slovensko", "svadba"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cloudflareAnalyticsToken =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN
      : undefined;

  return (
    <html lang="sk">
      <body>{children}</body>
      {cloudflareAnalyticsToken ? (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: cloudflareAnalyticsToken,
          })}
          strategy="afterInteractive"
        />
      ) : null}
    </html>
  );
}
