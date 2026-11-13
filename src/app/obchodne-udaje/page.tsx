import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import {
  BRAND_NAME,
  CONTACT_AREA,
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  OWNER_ADDRESS,
  OWNER_DIC,
  OWNER_ICO,
  OWNER_NAME,
  OWNER_REGISTRY,
  WEB_PROVIDER_ICO,
  WEB_PROVIDER_NAME,
} from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Obchodné údaje | Vevsdesign",
  description: "Identifikačné a kontaktné údaje spoločnosti, ktorá vlastní a prevádzkuje Vevsdesign.",
  alternates: { canonical: "/obchodne-udaje/" },
};

export default function BusinessDetailsPage() {
  return (
    <LegalPage
      title="Obchodné údaje"
      intro="Tieto údaje slúžia na identifikáciu majiteľa značky Vevsdesign a kontaktného bodu pre dopyty týkajúce sa svadobnej výzdoby, dizajnu a prenájmu inventáru."
    >
      <section className="legal-section">
        <h2>Majiteľ a predávajúci</h2>
        <dl className="legal-facts">
          <div>
            <dt>Značka</dt>
            <dd>{BRAND_NAME}</dd>
          </div>
          <div>
            <dt>Obchodné meno</dt>
            <dd>{OWNER_NAME}</dd>
          </div>
          <div>
            <dt>Sídlo</dt>
            <dd>{OWNER_ADDRESS}</dd>
          </div>
          <div>
            <dt>IČO</dt>
            <dd>{OWNER_ICO}</dd>
          </div>
          <div>
            <dt>DIČ</dt>
            <dd>{OWNER_DIC}</dd>
          </div>
          <div>
            <dt>Zápis v registri</dt>
            <dd>{OWNER_REGISTRY}</dd>
          </div>
        </dl>
      </section>

      <section className="legal-section">
        <h2>Kontakt</h2>
        <dl className="legal-facts">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>Telefón</dt>
            <dd>
              <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={CONTACT_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                {CONTACT_INSTAGRAM_HANDLE}
              </a>
            </dd>
          </div>
          <div>
            <dt>Pôsobnosť</dt>
            <dd>{CONTACT_AREA}</dd>
          </div>
        </dl>
      </section>

      <p className="legal-credit">
        Tvorbu, technickú správu a hosting webu zabezpečuje {WEB_PROVIDER_NAME}, IČO {WEB_PROVIDER_ICO}. Nie je
        predávajúcim ani poskytovateľom služieb Vevsdesign.
      </p>
    </LegalPage>
  );
}
