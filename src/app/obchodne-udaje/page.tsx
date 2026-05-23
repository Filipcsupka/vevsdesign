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
  OPERATOR_ADDRESS,
  OPERATOR_DIC,
  OPERATOR_ICO,
  OPERATOR_IC_DPH,
  OPERATOR_NAME,
  OPERATOR_REGISTRY,
} from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Obchodné údaje | Vevsdesign",
  description: "Identifikačné a kontaktné údaje prevádzkovateľa webu Vevsdesign.",
};

export default function BusinessDetailsPage() {
  return (
    <LegalPage
      title="Obchodné údaje"
      intro="Tieto údaje slúžia na identifikáciu prevádzkovateľa webu a kontaktného bodu pre dopyty týkajúce sa svadobnej výzdoby, dizajnu a prenájmu inventáru."
    >
      <section className="legal-section">
        <h2>Prevádzkovateľ webu</h2>
        <dl className="legal-facts">
          <div>
            <dt>Brand</dt>
            <dd>{BRAND_NAME}</dd>
          </div>
          <div>
            <dt>Obchodné meno</dt>
            <dd>{OPERATOR_NAME}</dd>
          </div>
          <div>
            <dt>Sídlo</dt>
            <dd>{OPERATOR_ADDRESS}</dd>
          </div>
          <div>
            <dt>IČO</dt>
            <dd>{OPERATOR_ICO}</dd>
          </div>
          <div>
            <dt>DIČ</dt>
            <dd>{OPERATOR_DIC}</dd>
          </div>
          <div>
            <dt>IČ DPH</dt>
            <dd>{OPERATOR_IC_DPH}</dd>
          </div>
          <div>
            <dt>Zápis v registri</dt>
            <dd>{OPERATOR_REGISTRY}</dd>
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
    </LegalPage>
  );
}
