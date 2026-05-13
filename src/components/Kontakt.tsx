"use client";

import {
  calculateSelectionsPricing,
  CONTACT_SELECTION_GROUPS,
  formatSelectionHiddenValue,
  formatSelectionMeta,
  formatSelectionsTotalLabel,
  type ContactSelections,
  type SelectionKind,
} from "@/components/contactSelection";
import { useState } from "react";

const AJAX_ENDPOINT = "https://formsubmit.co/ajax/vevsdesignn@gmail.com";

type KontaktProps = {
  selections: ContactSelections;
  onRemoveSelection: (kind: SelectionKind, value: string) => void;
  onClearSelections: () => void;
};

export default function Kontakt({
  selections,
  onRemoveSelection,
  onClearSelections,
}: KontaktProps) {
  const [status, setStatus] = useState<{ text: string; type: "" | "success" | "error" }>({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const hasSelections = CONTACT_SELECTION_GROUPS.some(({ kind }) => selections[kind].length > 0);
  const pricing = calculateSelectionsPricing(selections);
  const totalLabel = formatSelectionsTotalLabel(selections);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (data.get("_honey")) {
      form.reset();
      return;
    }

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
      onClearSelections();
      setStatus({ text: "Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.", type: "success" });
    } catch {
      setStatus({
        text: "Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nám napíšte priamo na email.",
        type: "error",
      });
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
            Kontaktujte nás a spoločne vytvoríme váš vysnívaný deň. Dizajn Vám odošleme do 3 dní.
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
              <span className="k-label">Instagram a Facebook</span>
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

            {CONTACT_SELECTION_GROUPS.flatMap(({ kind, inputName }) =>
              selections[kind].map((item) => (
                <input key={`${kind}-${item.id}`} type="hidden" name={inputName} value={formatSelectionHiddenValue(item)} />
              ))
            )}
            <input type="hidden" name="predbezna_cena" value={hasSelections ? totalLabel : "Bez vybraných položiek"} />

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
              <label>Vybrané položky</label>
              <div className="selection-panel">
                {hasSelections ? (
                  CONTACT_SELECTION_GROUPS.map(({ kind, label }) => (
                    selections[kind].length ? (
                      <div key={kind} className="selection-group">
                        <span className="selection-group-label">{label}</span>
                        <div className="selection-chip-list">
                          {selections[kind].map((item) => (
                            <span key={item.id} className="selection-chip">
                              <span className="selection-chip-copy">
                                <span className="selection-chip-text">{item.name}</span>
                                <span className="selection-chip-meta">{formatSelectionMeta(item)}</span>
                              </span>
                              <button
                                type="button"
                                className="selection-chip-remove"
                                aria-label={`Odstrániť položku ${item.name}`}
                                onClick={() => onRemoveSelection(kind, item.id)}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null
                  ))
                ) : (
                  <p className="selection-empty">
                    Kliknite na <strong>Vybrať</strong> pri balíku, doplnku alebo prenájme a položka sa sem pridá automaticky.
                  </p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Predbežná cena</label>
              <div className="selection-total-card">
                <strong>{hasSelections ? totalLabel : "Zatiaľ bez ceny"}</strong>
                {pricing.hasIndividualPricing ? (
                  <span>Niektoré položky majú individuálne nacenenie a potvrdíme ich po odoslaní formulára.</span>
                ) : pricing.hasFromPricing ? (
                  <span>Pri položkách označených „od“ ide o minimálnu orientačnú cenu podľa aktuálneho výberu.</span>
                ) : (
                  <span>Súčet vychádza z vybraných položiek a zadaného množstva.</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Poznámka k produktu</label>
              <textarea
                name="poznamka_a_predstava"
                placeholder="Napíšte nám svoju predstavu, počet hostí alebo detaily k vybraným položkám"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Odosielame..." : "Odoslať správu"}
            </button>

            {status.text ? (
              <p
                className={`form-status${status.type ? ` ${status.type}` : ""}`}
                aria-live="polite"
              >
                {status.text}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
