import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Ako funguje rezervácia | Vevsdesign",
  description: "Informácie o tom, ako vo Vevsdesign funguje dopyt, cenová ponuka a potvrdenie rezervácie.",
  alternates: { canonical: "/ako-funguje-rezervacia/" },
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
        <h2>3. Potvrdenie rezervácie svadobnej výzdoby</h2>
        <p>
          Rezerváciu si potvrdzujeme cez formulár, ktorý vám odošleme emailom s vašimi vybranými produktmi a službami.
          Následne vám pošleme faktúru na zaplatenie. Termín je záväzne rezervovaný po zaplatení 50% zálohy, zvyšok sa
          dopláca mesiac pred svadbou.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Prenájom inventáru</h2>
        <p>
          Ak máte záujem len o prenájom dekorácií alebo inventáru, je to možné. Nie je nutné objednať si od nás celú
          realizáciu svadobnej výzdoby, pokiaľ vám viac vyhovuje vlastná inštalácia alebo čiastočné zabezpečenie.
          Presné podmienky prevzatia, vrátenia, zodpovednosti za poškodenie, stratu riešime individuálne ešte pred
          finálnym potvrdením rezervácie. Všetky informácie budú uvedené vo formulári, ktorý vám odošleme mailom.
          Prenájom je záväzne rezervovaný po zaplatení 100% ceny prenájmu.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Osobná konzultácia</h2>
        <p>
          Vybrané položky a možnosti výzdoby si s vami radi prejdeme aj osobne. Konzultáciu si prosím dohodnite vopred
          telefonicky alebo emailom, aby sme sa vám vedeli venovať podľa termínu a rozsahu dopytu.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Odpoveď na dopyt</h2>
        <p>
          Na dopyty odpovedáme spravidla do 3 pracovných dní. Pri zložitejších realizáciách alebo počas hlavnej
          sezóny môže byť príprava ponuky individuálna, o čom vás budeme priebežne informovať.
        </p>
      </section>
    </LegalPage>
  );
}
