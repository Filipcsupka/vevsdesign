import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Kontakt from "@/components/Kontakt";
import KontaktSelectionHint from "@/components/KontaktSelectionHint";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";

export const metadata: Metadata = {
  title: "Kontakt | Vevsdesign",
  description:
    "Nezáväzný dopyt na svadobnú výzdobu, prenájom dekorácií alebo NFC srdce. Košice a východné Slovensko.",
  alternates: {
    canonical: "/kontakt/",
  },
};

export default function KontaktPage() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <section className="home-intro kontakt-head">
          <p className="sec-label reveal">Kontakt</p>
          <div className="rule reveal reveal-d1">
            <div className="rule-diamond" />
          </div>
          <h1 className="reveal reveal-d1">Napíšte <em>nám</em></h1>
          <KontaktSelectionHint />
        </section>
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
