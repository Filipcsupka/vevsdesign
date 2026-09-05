"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "vevsdesign-cookie-consent";

export default function CookieBanner() {
  const visible = useSyncExternalStore(
    (callback) => {
      window.addEventListener("vevsdesign-consent-changed", callback);
      return () => window.removeEventListener("vevsdesign-consent-changed", callback);
    },
    () => window.localStorage.getItem(CONSENT_KEY) === null,
    () => false,
  );

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("vevsdesign-consent-changed"));
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Nastavenie cookies">
      <div>
        <strong>Vaše súkromie</strong>
        <p>
          Používame nevyhnutné technológie a po vašom súhlase aj anonymizovanú analytiku na zlepšenie webu. Viac v
          <a href="/cookies/"> zásadách cookies</a>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-button secondary" onClick={() => choose("rejected")}>
          Len nevyhnutné
        </button>
        <button type="button" className="cookie-button" onClick={() => choose("accepted")}>
          Súhlasím
        </button>
      </div>
    </aside>
  );
}
