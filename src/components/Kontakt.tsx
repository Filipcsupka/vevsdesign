"use client";

import { useState, useEffect } from "react";

const AJAX_ENDPOINT = "https://formsubmit.co/ajax/veronika.csupkova@gmail.com";

type KontaktProps = {
  selectedPackage: string;
};

export default function Kontakt({ selectedPackage }: KontaktProps) {
  const [balik, setBalik] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "" | "success" | "error" }>({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPackage) setBalik(selectedPackage);
  }, [selectedPackage]);

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
      setBalik("");
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
          <div className="kontakt-person-name">Veronika Csupková</div>
          <div className="kontakt-person-role">Manažérka &amp; Kontaktná osoba</div>
          <div className="kontakt-details">
            <div className="kontakt-item">
              <span className="k-label">Telefón</span>
              <span className="k-val"><a href="tel:+421910091009">0910 091 009</a></span>
            </div>
            <div className="kontakt-item">
              <span className="k-label">Email</span>
              <span className="k-val">
                <a href="mailto:veronika.csupkova@gmail.com">veronika.csupkova@gmail.com</a>
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
            <input type="hidden" name="_captcha" value="false" />
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
                <input type="text" name="meno" placeholder="Jana & Tomáš" required />
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
                <label>Záujem o balík</label>
                <select
                  name="balik"
                  value={balik}
                  onChange={(e) => setBalik(e.target.value)}
                >
                  <option value="">Vyberte balík…</option>
                  <option>Balík S — 350 €</option>
                  <option>Balík M — 500 €</option>
                  <option>Balík L — 650 €</option>
                  <option>Doplnkové služby</option>
                  <option>Individuálne (vyskladať)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Vaša správa</label>
              <textarea
                name="sprava"
                placeholder="Opíšte nám svoju predstavu — miesto, počet hostí, téma…"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Odosielame..." : "Odoslať správu →"}
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
