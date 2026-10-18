import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prenájom dekorácií | Vevsdesign",
  alternates: { canonical: "https://vevsdesign.sk/inventar/" },
  robots: { index: false, follow: true },
};

export default function PrenajomPage() {
  return (
    <main style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
      <meta httpEquiv="refresh" content="0; url=/inventar/" />
      <p>
        Prenájom dekorácií nájdete na stránke <Link href="/inventar/">Inventár</Link>.
      </p>
    </main>
  );
}
