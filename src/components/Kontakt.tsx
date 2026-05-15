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

const CONTACT_EMAIL = "vevsdesignn@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;
const AJAX_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

function createCaptchaChallenge() {
  const left = Math.floor(Math.random() * 7) + 2;
  const right = Math.floor(Math.random() * 7) + 2;
  return {
    left,
    right,
    answer: left + right,
  };
}

function buildFallbackMailtoHref(data: FormData) {
  const lines = [
    ["Meno", data.get("meno")],
    ["Email", data.get("email")],
    ["Dátum svadby", data.get("datum_svadby")],
    ["Lokalita svadby", data.get("lokalita_svadby")],
    ["Predbežná cena", data.get("predbezna_cena")],
    ...CONTACT_SELECTION_GROUPS.map(({ label, inputName }) => [label, data.getAll(inputName).join(", ")]),
    ["Poznámka k produktu", data.get("poznamka_a_predstava")],
  ]
    .map(([label, value]) => [label, typeof value === "string" ? value.trim() : ""] as const)
    .filter(([, value]) => value);

  const subject = encodeURIComponent("Nová správa z webu Vevsdesign");
  const body = encodeURIComponent(lines.map(([label, value]) => `${label}: ${value}`).join("\n"));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

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
  const [fallbackHref, setFallbackHref] = useState("");
  const [captcha, setCaptcha] = useState(createCaptchaChallenge);
  const [captchaValue, setCaptchaValue] = useState("");
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
    if (Number(captchaValue) !== captcha.answer) {
      setStatus({
        text: "Prosím vyriešte krátke overenie, aby sme vedeli, že formulár odosiela človek.",
        type: "error",
      });
      setCaptchaValue("");
      setCaptcha(createCaptchaChallenge());
      return;
    }

    setStatus({ text: "Správu odosielame...", type: "" });
    setFallbackHref("");
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
      setFallbackHref("");
      setCaptchaValue("");
      setCaptcha(createCaptchaChallenge());
      setStatus({ text: "Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.", type: "success" });
    } catch {
      setFallbackHref(buildFallbackMailtoHref(data));
      setCaptchaValue("");
      setCaptcha(createCaptchaChallenge());
      setStatus({
        text: "Správu sa nepodarilo odoslať cez formulár. Skúste to prosím znova alebo použite záložný email nižšie.",
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
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
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
          <form action={FORM_ENDPOINT} method="POST" onSubmit={handleSubmit} noValidate>
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

            <div className="form-group">
              <label>Overenie</label>
              <div className="captcha-inline">
                <span className="captcha-prompt" aria-live="polite">
                  Koľko je {captcha.left} + {captcha.right}?
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  name="human_check"
                  placeholder="Výsledok"
                  value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}
                  required
                />
              </div>
              <p className="captcha-note">Krátke overenie proti spamu pred odoslaním formulára.</p>
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Odosielame..." : "Odoslať správu"}
            </button>

            {status.text ? (
              <>
                <p
                  className={`form-status${status.type ? ` ${status.type}` : ""}`}
                  aria-live="polite"
                >
                  {status.text}
                </p>
                {status.type === "error" ? (
                  <p className="form-status error">
                    <a href={fallbackHref || `mailto:${CONTACT_EMAIL}`}>Otvoriť záložný email na {CONTACT_EMAIL}</a>
                  </p>
                ) : null}
              </>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
