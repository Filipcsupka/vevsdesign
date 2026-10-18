import type { Metadata } from "next";
import { pageMetadata } from "@/data/pageMetadata";
import Link from "next/link";
import Nav from "@/components/Nav";
import NfcHeart from "@/components/NfcHeart";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";

export const metadata: Metadata = pageMetadata({
  title: "NFC srdce | Vevsdesign",
  description:
    "Personalizované 3D tlačené srdce s vlastným nápisom, dátumom a NFC tagom, ktorý otvorí zvolený osobný odkaz. Košice a okolie.",
  path: "/nfc-srdce/",
});

export default function NfcSrdcePage() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <NfcHeart />
      </main>
      <Link href="/kontakt/" className="mobile-contact-cta">Kontaktujte nás</Link>
      <Footer />
    </>
  );
}
