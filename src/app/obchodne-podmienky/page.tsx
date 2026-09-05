import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BRAND_NAME, CONTACT_EMAIL, OPERATOR_NAME } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Obchodné podmienky | Vevsdesign",
  description: "Všeobecné obchodné podmienky pre služby a prenájom inventáru Vevsdesign.",
  alternates: { canonical: "/obchodne-podmienky/" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Obchodné podmienky"
      intro={`Tieto podmienky upravujú základný rámec spolupráce medzi ${OPERATOR_NAME} pod značkou ${BRAND_NAME} a klientom pri svadobnej výzdobe, dizajne a prenájme inventáru.`}
    >
      <section className="legal-section">
        <h2>1. Dopyt a cenová ponuka</h2>
        <p>Odoslanie kontaktného formulára predstavuje nezáväzný dopyt. Ponuku, dostupnosť termínu, rozsah služieb, dopravu a konečnú cenu potvrdzujeme individuálne podľa požiadaviek klienta.</p>
      </section>
      <section className="legal-section">
        <h2>2. Potvrdenie objednávky</h2>
        <p>Objednávka alebo rezervácia vzniká až po písomnom potvrdení podmienok a úhrade dohodnutej zálohy alebo celej ceny prenájmu. Konkrétne podmienky budú uvedené vo formulári alebo ponuke zaslanej klientovi.</p>
      </section>
      <section className="legal-section">
        <h2>3. Prenájom inventáru</h2>
        <p>Klient je povinný prenajaté predmety chrániť pred poškodením, stratou a zničením a vrátiť ich v dohodnutom termíne. Rozsah zodpovednosti a prípadná náhrada škody sa dohodnú podľa konkrétneho prenájmu.</p>
      </section>
      <section className="legal-section">
        <h2>4. Kontakt</h2>
        <p>Otázky k ponuke alebo týmto podmienkam môžete poslať na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Individuálne podmienky v potvrdenej objednávke majú prednosť pred týmto všeobecným rámcom.</p>
      </section>
    </LegalPage>
  );
}
