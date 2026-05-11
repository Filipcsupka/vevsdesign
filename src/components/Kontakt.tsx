"use client";

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

const AJAX_ENDPOINT = "https://formsubmit.co/ajax/vevsdesignn@gmail.com";

type KontaktProps = {
  selectedPackage: string;
};

const PACKAGE_OPTIONS = [
  "Balík S",
  "Balík M",
  "Balík L",
  "Balík na mieru",
];

const SERVICE_OPTIONS = [
  "Pozvánky",
  "Menovky",
  "Balík tlačovín",
  "Servítky",
  "Kniha hostí",
  "Box na obálky",
  "Strom na plátne",
  "Uvítacia tabuľa",
  "Uvítací banner",
  "Cigar bar",
  "Detský balíček",
  "Omaľovánky",
  "Vejáre",
  "Papučky",
  "Okuliare",
  "Mini medík domáci",
  "Mini fľaštičky",
];

const RENTAL_OPTIONS = [
  "Ikebana na stoly",
  "Ikebana na stoly s vázami okolo",
  "Malá ikebana",
  "Dlhá ikebana",
  "Detský kútik",
  "Oválny stojan",
  "Srdcový stojan",
  "Stojace tyče s balónmi",
  "Zrkadlo s menami a textom",
  "Vysoké svietniky",
  "Champagne svietniky",
  "Vysoké vázy",
  "Úzke vázy",
  "Instax foto",
  "Champagne tower",
  "Behúň / štóla",
  "Lampáše",
  "Drevené boxy",
];

export default function Kontakt({ selectedPackage }: KontaktProps) {
  const [packageSelections, setPackageSelections] = useState<string[]>([]);
  const [serviceSelections, setServiceSelections] = useState<string[]>([]);
  const [rentalSelections, setRentalSelections] = useState<string[]>([]);
  const [status, setStatus] = useState<{ text: string; type: "" | "success" | "error" }>({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedPackage) return;
    const normalizedPackage =
      selectedPackage.startsWith("Balík S") ? "Balík S"
        : selectedPackage.startsWith("Balík M") ? "Balík M"
          : selectedPackage.startsWith("Balík L") ? "Balík L"
            : selectedPackage;
    setPackageSelections((current) => (
      current.includes(normalizedPackage) ? current : [...current, normalizedPackage]
    ));
  }, [selectedPackage]);

  function toggleSelection(
    value: string,
    setSelectedValues: Dispatch<SetStateAction<string[]>>
  ) {
    setSelectedValues((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = new FormData(form);
    if (data.get("_honey")) { form.reset(); return; }

    setStatus({ text: "Správu odosielame...", type: "" });
    setSubmitting(true);

    try {
      const res = await fetch(AJAX_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setPackageSelections([]);
      setServiceSelections([]);
      setRentalSelections([]);
      setStatus({ text: "Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.", type: "success" });
    } catch {
      setStatus({ text: "Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nám napíšte priamo na email.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="kontakt">
      <div className="kontakt-wrap">
        <div className="kontakt-info reveal">
          <p className="sec-label">Spojte sa s nami</p>
          <h2>Začnime <em>plánovať</em></h2>
          <p className="lead">
            Kontaktujte nás a spoločne vytvoríme váš vysnívaný deň. Odpovedáme do 24 hodín.
          </p>
          <div className="kontakt-details">
            <div className="kontakt-item">
              <span className="k-label">Telefón</span>
              <span className="k-val"><a href="tel:+421915309721">+421 915 309 721</a></span>
            </div>
            <div className="kontakt-item">
              <span className="k-label">Email</span>
              <span className="k-val">
                <a href="mailto:vevsdesignn@gmail.com">vevsdesignn@gmail.com</a>
              </span>
            </div>
            <div className="kontakt-item">
              <span className="k-label">Pôsobnosť</span>
              <span className="k-val">Košice &amp; Východné Slovensko</span>
            </div>
            <div className="kontakt-item">
              <span className="k-label">Instagram</span>
              <span className="k-val">
                <a href="https://instagram.com/vevsdesign" target="_blank" rel="noopener noreferrer">
                  @Vevsdesign
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="kontakt-form-wrap reveal reveal-d2">
          <p className="sec-label">Formulár</p>
          <h2>Napíšte <em>nám</em></h2>
          <form onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="_subject" value="Nová správa z webu Vevsdesign" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="true" />
            <input
              type="text"
              name="_honey"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="form-row">
              <div className="form-group">
                <label>Vaše meno</label>
                <input type="text" name="meno" placeholder="Vaše meno" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="vas@email.sk" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dátum svadby</label>
                <input type="date" name="datum_svadby" />
              </div>
              <div className="form-group">
                <label>Lokalita svadby</label>
                <input type="text" name="lokalita_svadby" placeholder="Košice a okolie" />
              </div>
            </div>

            <div className="form-group">
              <label>Záujem o balík (vyberte)</label>
              <div className="checkbox-group">
                {PACKAGE_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="balik"
                      value={option}
                      checked={packageSelections.includes(option)}
                      onChange={() => toggleSelection(option, setPackageSelections)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Záujem o doplnky (vyberte)</label>
              <div className="checkbox-group checkbox-group-dense">
                {SERVICE_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="doplnky"
                      value={option}
                      checked={serviceSelections.includes(option)}
                      onChange={() => toggleSelection(option, setServiceSelections)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Záujem o prenájom (vyberte)</label>
              <div className="checkbox-group checkbox-group-dense">
                {RENTAL_OPTIONS.map((option) => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="prenajom"
                      value={option}
                      checked={rentalSelections.includes(option)}
                      onChange={() => toggleSelection(option, setRentalSelections)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Poznámka k produktu a vaša predstava</label>
              <textarea
                name="poznamka_a_predstava"
                placeholder="Napíšte nám, o čo máte záujem a akú máte predstavu"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Odosielame..." : "Odoslať správu"}
            </button>

            {status.text && (
              <p
                className={`form-status${status.type ? ` ${status.type}` : ""}`}
                aria-live="polite"
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
