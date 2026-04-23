import type { Metadata } from "next";
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
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
