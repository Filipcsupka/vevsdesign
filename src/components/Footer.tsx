import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  OPERATOR_DIC,
  OPERATOR_ICO,
  OPERATOR_IC_DPH,
  OPERATOR_NAME,
} from "@/data/businessInfo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-block">
          <span className="foot-brand">
            VEVS<em>DESIGN</em>
          </span>
          <p className="foot-copy">
            Svadobný dizajn, výzdoba a prenájom inventáru.
          </p>
          <p className="foot-company">
            Prevádzkovateľ webu: <strong>{OPERATOR_NAME}</strong>
          </p>
          <p className="foot-company">
            IČO {OPERATOR_ICO} · DIČ {OPERATOR_DIC} · IČ DPH {OPERATOR_IC_DPH}
          </p>
        </div>

        <div className="footer-block">
          <div className="foot-links">
            <Link href="/obchodne-udaje">Obchodné údaje</Link>
            <Link href="/obchodne-podmienky">Obchodné podmienky</Link>
            <Link href="/ochrana-osobnych-udajov">Ochrana osobných údajov</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/ako-funguje-rezervacia">Ako funguje rezervácia</Link>
          </div>
        </div>

        <div className="footer-block">
          <span className="footer-title">Kontakt</span>
          <div className="foot-social">
            <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={CONTACT_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              {CONTACT_INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <div className="foot-note">
        Odoslaním formulára posielate nezáväzný dopyt. Rezervácia alebo objednávka vzniká až po individuálnom potvrdení
        termínu, rozsahu a ceny.
      </div>
    </footer>
  );
}
