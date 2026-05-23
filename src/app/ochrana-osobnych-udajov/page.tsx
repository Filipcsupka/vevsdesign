import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  OPERATOR_ADDRESS,
  OPERATOR_NAME,
} from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Vevsdesign",
  description: "Základné informácie o spracúvaní osobných údajov na webe Vevsdesign.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Ochrana osobných údajov"
      intro="Na tejto stránke nájdete základné informácie o tom, ako spracúvame osobné údaje pri odoslaní dopytu cez web Vevsdesign."
    >
      <section className="legal-section">
        <h2>Prevádzkovateľ</h2>
        <p>
          Prevádzkovateľom osobných údajov je {OPERATOR_NAME}, {OPERATOR_ADDRESS}. V prípade otázok nás môžete
          kontaktovať na adrese <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> alebo telefonicky na{" "}
          <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>Aké údaje spracúvame</h2>
        <p>
          Pri dopyte cez kontaktný formulár môžeme spracúvať najmä meno, email, telefónne číslo, dátum svadby,
          lokalitu, informácie o vybraných službách alebo prenájme a obsah vašej správy.
        </p>
      </section>

      <section className="legal-section">
        <h2>Účel a právny základ</h2>
        <p>
          Údaje spracúvame za účelom vybavenia vášho dopytu, prípravy cenovej ponuky, predzmluvnej komunikácie a
          následnej realizácie služby, ak sa na spolupráci dohodneme. Právnym základom je najmä vykonanie opatrení na
          žiadosť dotknutej osoby pred uzatvorením zmluvy a náš oprávnený záujem na efektívnej komunikácii s klientmi.
        </p>
      </section>

      <section className="legal-section">
        <h2>Doba uchovávania</h2>
        <p>
          Dopyty uchovávame po dobu nevyhnutnú na vybavenie komunikácie a prípravu ponuky, spravidla najviac 12
          mesiacov, pokiaľ z komunikácie nevznikne spolupráca. Údaje súvisiace s objednávkou, fakturáciou a účtovnými
          povinnosťami uchovávame podľa príslušných právnych predpisov.
        </p>
      </section>

      <section className="legal-section">
        <h2>Komu môžu byť údaje sprístupnené</h2>
        <p>
          Údaje môžu byť sprístupnené našim technickým dodávateľom len v nevyhnutnom rozsahu, najmä poskytovateľovi
          hostingu, bezpečnostného overenia formulára a emailovej infraštruktúry. Údaje neposkytujeme tretím stranám na
          ich vlastné marketingové účely.
        </p>
      </section>

      <section className="legal-section">
        <h2>Vaše práva</h2>
        <p>
          Máte právo požadovať prístup k údajom, opravu, vymazanie, obmedzenie spracúvania, namietať proti
          spracúvaniu a podať sťažnosť na Úrad na ochranu osobných údajov SR. Svoje práva môžete uplatniť cez{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
