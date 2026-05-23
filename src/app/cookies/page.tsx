import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookies | Vevsdesign",
  description: "Informácie o používaní cookies a podobných technológií na webe Vevsdesign.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      intro="Web Vevsdesign používa len technológie, ktoré pomáhajú správnemu fungovaniu stránky, ochrane formulára a prípadne základnej anonymizovanej analytike."
    >
      <section className="legal-section">
        <h2>Nevyhnutné technológie</h2>
        <p>
          Niektoré technológie sú potrebné na správne načítanie obsahu, bezpečný chod webu a ochranu formulára proti
          zneužitiu. Bez nich nemusia niektoré časti stránky fungovať správne.
        </p>
      </section>

      <section className="legal-section">
        <h2>Ochrana formulára</h2>
        <p>
          Pri kontaktnom formulári používame Cloudflare Turnstile, ktorý pomáha rozlišovať skutočných návštevníkov od
          automatizovaných botov. Pri tejto kontrole môže dochádzať k spracúvaniu technických údajov potrebných na
          bezpečnostné overenie.
        </p>
      </section>

      <section className="legal-section">
        <h2>Analytika</h2>
        <p>
          V produkčnom prostredí môžeme používať základnú webovú analytiku Cloudflare na agregované meranie návštevnosti
          a výkonu stránky. Účelom je zlepšovanie obsahu a technickej stability webu.
        </p>
      </section>

      <section className="legal-section">
        <h2>Ako cookies spravovať</h2>
        <p>
          Cookies a podobné technológie môžete spravovať vo svojom prehliadači. Obmedzenie niektorých nevyhnutných
          technológií však môže ovplyvniť funkčnosť formulára alebo zobrazenie stránky.
        </p>
      </section>
    </LegalPage>
  );
}
