import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
  description:
    "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
  keywords: ["svadobná výzdoba", "dizajn", "Košice", "Slovensko", "svadba"],
  metadataBase: new URL("https://vevsdesign.sk"),
  openGraph: {
    type: "website",
    url: "https://vevsdesign.sk",
    siteName: "Vevsdesign",
    title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
    description:
      "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
    images: [{ url: "/logo.png", width: 340, height: 340, alt: "Vevsdesign logo" }],
    locale: "sk_SK",
  },
  twitter: {
    card: "summary",
    title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
    description:
      "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cloudflareAnalyticsToken =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vevsdesign",
    description:
      "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov.",
    url: "https://vevsdesign.sk",
    telephone: "+421915309721",
    email: "vevsdesignn@gmail.com",
    image: "https://vevsdesign.sk/logo.png",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Košice",
      addressCountry: "SK",
    },
    areaServed: "Košice a Východné Slovensko",
    sameAs: ["https://www.instagram.com/vevsdesign"],
  };

  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
