"use client";

import Script from "next/script";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/data/businessInfo";
import {
  calculateSelectionsPricing,
  CONTACT_SELECTION_GROUPS,
  formatSelectionHiddenValue,
  formatSelectionMeta,
  formatSelectionsTotalLabel,
  type ContactSelections,
  type SelectionKind,
} from "@/components/contactSelection";
import { useEffect, useRef, useState } from "react";

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type KontaktProps = {
  selections: ContactSelections;
  onRemoveSelection: (kind: SelectionKind, value: string) => void;
  onClearSelections: () => void;
};

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

export default function Kontakt({
  selections,
  onRemoveSelection,
  onClearSelections,
}: KontaktProps) {
  const [status, setStatus] = useState<{ text: string; type: "" | "success" | "error" }>({ text: "", type: "" });
  const [fallbackHref, setFallbackHref] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const hasSelections = CONTACT_SELECTION_GROUPS.some(({ kind }) => selections[kind].length > 0);
  const pricing = calculateSelectionsPricing(selections);
  const totalLabel = formatSelectionsTotalLabel(selections);
  const hasTurnstile = Boolean(TURNSTILE_SITE_KEY);

  useEffect(() => {
    if (!hasTurnstile) {
      return;
    }

    const renderTurnstile = () => {
      const turnstile = window.turnstile;
      const container = turnstileContainerRef.current;
      if (!turnstile || !container || turnstileWidgetIdRef.current) {
        return;
      }

      turnstileWidgetIdRef.current = turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        callback: (token) => {
          setTurnstileToken(token);
          setStatus((current) =>
            current.type === "error" && current.text.includes("robot")
              ? { text: "", type: "" }
              : current
          );
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
        "error-callback": () => {
          setTurnstileToken("");
        },
      });
    };

    renderTurnstile();

    return () => {
      const turnstile = window.turnstile;
      if (turnstile && turnstileWidgetIdRef.current) {
        turnstile.remove(turnstileWidgetIdRef.current);
      }
      turnstileWidgetIdRef.current = null;
    };
  }, [hasTurnstile, turnstileReady]);

  function resetTurnstile() {
    const turnstile = window.turnstile;
    if (!turnstile || !turnstileWidgetIdRef.current) {
      setTurnstileToken("");
      return;
    }

    turnstile.reset(turnstileWidgetIdRef.current);
    setTurnstileToken("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!hasTurnstile) {
      setStatus({
        text: "Odoslanie formulára ešte nie je nakonfigurované. Dočasne nás prosím kontaktujte priamo emailom.",
        type: "error",
      });
      return;
    }

    const data = new FormData(form);
    if (data.get("_honey")) {
      form.reset();
      resetTurnstile();
      return;
    }
    if (!turnstileToken || !data.get("cf-turnstile-response")) {
      setStatus({
        text: "Prosím potvrďte overenie, že nie ste robot, a skúste to znova.",
        type: "error",
      });
      return;
    }

    setStatus({ text: "Správu odosielame...", type: "" });
    setFallbackHref(buildFallbackMailtoHref(data));
    setSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: data,
      });

      const payload = await response.json().catch(() => null) as { error?: string; ok?: boolean } | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "send_failed");
      }

      form.reset();
      resetTurnstile();
      onClearSelections();
      setFallbackHref("");
      setStatus({ text: "Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.", type: "success" });
    } catch {
      resetTurnstile();
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
      {hasTurnstile ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
          async
          defer
        />
      ) : null}
      <div className="kontakt-wrap">
        <div className="kontakt-info reveal">
          <p className="sec-label">Spojte sa s nami</p>
          <h2>Začnime <em>plánovať</em></h2>
          <p className="lead">
            Kontaktujte nás a spoločne vytvoríme váš vysnívaný deň. Dizajn Vám odošleme do 3 dní.
          </p>
          <p className="kontakt-note">
            Formulár slúži na nezáväzný dopyt. Finálnu dostupnosť, cenu, dopravu, inštaláciu a presný rozsah služby si
            s vami potvrdíme individuálne.
          </p>
          <div className="kontakt-details">
            <div className="kontakt-item">
              <span className="k-label">Telefón</span>
              <span className="k-val"><a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a></span>
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
              <span className="k-label">Osobná konzultácia</span>
              <span className="k-val">Po dohode vopred telefonicky alebo emailom</span>
            </div>
            <div className="kontakt-item">
              <span className="k-label">Instagram a Facebook</span>
              <span className="k-val">
                <a href={CONTACT_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {CONTACT_INSTAGRAM_HANDLE}
                </a>
              </span>
            </div>
          </div>
          <div className="kontakt-faq">
            <div className="kontakt-faq-item">
              <span className="kontakt-faq-question">Len prenájom dekorácií?</span>
              <p>
                Áno. Nemusíte mať od nás kompletnú realizáciu výzdoby, vieme pripraviť aj samostatný prenájom vybraných
                položiek podľa dostupnosti termínu.
              </p>
            </div>
            <div className="kontakt-faq-item">
              <span className="kontakt-faq-question">Ako sa určuje cena?</span>
              <p>
                Cenu potvrdzujeme individuálne podľa výberu inventáru, množstva, lokality, dopravy a rozsahu
                inštalácie.
              </p>
            </div>
            <div className="kontakt-faq-item">
              <span className="kontakt-faq-question">Kedy odpovedáme?</span>
              <p>Na dopyty odpovedáme spravidla do 3 pracovných dní.</p>
            </div>
          </div>
        </div>

        <div className="kontakt-form-wrap reveal reveal-d2">
          <p className="sec-label">Formulár</p>
          <h2>Napíšte <em>nám</em></h2>
          <form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="poznamka-a-predstava">Poznámka a vaša predstava</label>
              <textarea
                id="poznamka-a-predstava"
                name="poznamka_a_predstava"
                placeholder="Opíšte nám približne, čo by mal váš individuálny balík obsahovať, počet hostí alebo ďalšie detaily"
              />
            </div>

            {hasTurnstile ? (
              <div className="form-group">
                <label>Overenie</label>
                <div ref={turnstileContainerRef} />
                <p className="captcha-note">Formulár je chránený cez Cloudflare Turnstile.</p>
              </div>
            ) : null}

            <button type="submit" className="btn-submit" disabled={submitting || !hasTurnstile}>
              {submitting ? "Odosielame..." : "Odoslať správu"}
            </button>

            <p className="form-note">
              Odoslaním formulára odosielate nezáväzný dopyt. Rezervácia alebo objednávka vzniká až po individuálnom
              potvrdení e-mailom alebo telefonicky.
            </p>

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
