import type { Metadata } from "next";

const SITE_URL = "https://vevsdesign.sk";
const OG_IMAGE = "/images/social/vevsdesign-og-2026-05.png";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Metadata for a sub-page: title, description, canonical plus matching Open Graph and Twitter tags. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "Vevsdesign",
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Vevsdesign — svadobna vyzdoba a dizajn",
        },
      ],
      locale: "sk_SK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
