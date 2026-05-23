import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Ako funguje rezervácia | Vevsdesign",
  description: "Informácie o tom, ako vo Vevsdesign funguje dopyt, cenová ponuka a potvrdenie rezervácie.",
};

export default function ReservationInfoPage() {
  return (
    <LegalPage
      title="Ako funguje rezervácia"
      intro="Web Vevsdesign slúži na prezentáciu ponuky a na odoslanie nezáväzného dopytu. Samotná rezervácia vzniká až po individuálnom potvrdení."
    >
      <section className="legal-section">
        <h2>1. Nezáväzný dopyt</h2>
        <p>
          Odoslaním formulára alebo kontaktovaním cez email či telefón nám posielate nezáväzný dopyt. Na základe neho
          preveríme dostupnosť termínu, rozsah výzdoby, prenajímaných položiek a ďalšie detaily.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Individuálna ponuka</h2>
        <p>
          Konečnú cenu vždy pripravujeme individuálne podľa výberu položiek, množstva, lokality, dopravy,
          inštalácie, deinštalácie a časovej náročnosti realizácie. Ceny uvedené na webe preto slúžia najmä ako
          orientačný rámec.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Potvrdenie rezervácie</h2>
        <p>
          Rezervácia termínu alebo prenájmu vzniká až po tom, ako si spolu odsúhlasíme rozsah služby, cenu, termín a
          spôsob realizácie, a keď vám rezerváciu výslovne potvrdíme emailom alebo inou dohodnutou formou.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Prenájom inventáru</h2>
        <p>
          Pri položkách určených na prenájom ide o prenájom nášho vlastného inventáru. Presné podmienky prevzatia,
          vrátenia, zodpovednosti za poškodenie, stratu, prípadnú zálohu alebo kauciu riešime individuálne ešte pred
          finálnym potvrdením rezervácie.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Prenájom aj bez kompletnej realizácie</h2>
        <p>
          Ak máte záujem len o prenájom dekorácií alebo inventáru, je to možné. Nie je nutné objednať si od nás celú
          realizáciu svadobnej výzdoby, pokiaľ vám viac vyhovuje vlastná inštalácia alebo čiastočné zabezpečenie.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Showroom a osobná konzultácia</h2>
        <p>
          Vybrané položky a možnosti výzdoby si s vami radi prejdeme aj osobne. Návštevu showroomu alebo konzultáciu si
          prosím dohodnite vopred telefonicky alebo emailom, aby sme sa vám vedeli venovať podľa termínu a rozsahu
          dopytu.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Odpoveď na dopyt</h2>
        <p>
          Na dopyty odpovedáme spravidla do 2 až 4 pracovných dní. Pri zložitejších realizáciách alebo počas hlavnej
          sezóny môže byť príprava ponuky individuálna, o čom vás budeme priebežne informovať.
        </p>
      </section>
    </LegalPage>
  );
}
