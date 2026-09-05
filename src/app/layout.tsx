import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Raleway } from "next/font/google";
import { CONTACT_EMAIL, CONTACT_PHONE_HREF } from "@/data/businessInfo";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
  description:
    "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
  keywords: ["svadobná výzdoba", "dizajn", "Košice", "Slovensko", "svadba"],
  metadataBase: new URL("https://vevsdesign.sk"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.png", sizes: "2000x2000", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    type: "website",
    url: "https://vevsdesign.sk",
    siteName: "Vevsdesign",
    title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
    description:
      "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
    images: [
      {
        url: "/images/social/vevsdesign-og-2026-05.png",
        width: 1200,
        height: 630,
        alt: "Vevsdesign — svadobna vyzdoba a dizajn",
      },
    ],
    locale: "sk_SK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vevsdesign — Svadobná Výzdoba & Dizajn",
    description:
      "Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov. Košice & Východné Slovensko.",
    images: ["/images/social/vevsdesign-og-2026-05.png"],
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
    telephone: CONTACT_PHONE_HREF,
    email: CONTACT_EMAIL,
    logo: "https://vevsdesign.sk/logo.png",
    image: "https://vevsdesign.sk/images/social/vevsdesign-og-2026-05.png",
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
      <body className={`${bodoniModa.variable} ${cormorantGaramond.variable} ${raleway.variable}`}>
        {children}
        <CookieBanner />
      </body>
      <AnalyticsConsent token={cloudflareAnalyticsToken} />
    </html>
  );
}
