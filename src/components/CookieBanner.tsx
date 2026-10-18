"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

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

  const bannerRef = useRef<HTMLElement>(null);

  // Publish the banner height so the selection bar can sit above it.
  useEffect(() => {
    const banner = bannerRef.current;
    if (!visible || !banner) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--cookie-banner-h", `${banner.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-banner-h");
    };
  }, [visible]);

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("vevsdesign-consent-changed"));
  }

  if (!visible) return null;

  return (
    <aside ref={bannerRef} className="cookie-banner" aria-label="Nastavenie cookies">
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
