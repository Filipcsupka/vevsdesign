"use client";

import { useEffect } from "react";

const CONSENT_KEY = "vevsdesign-cookie-consent";

export default function AnalyticsConsent({ token }: { token?: string }) {
  useEffect(() => {
    if (!token) return;

    const loadAnalytics = () => {
      if (window.localStorage.getItem(CONSENT_KEY) !== "accepted") return;
      if (document.querySelector("script[data-vevsdesign-analytics]")) return;

      const script = document.createElement("script");
      script.src = "https://static.cloudflareinsights.com/beacon.min.js";
      script.defer = true;
      script.dataset.vevsdesignAnalytics = "true";
      script.dataset.cfBeacon = JSON.stringify({ token });
      document.head.appendChild(script);
    };

    loadAnalytics();
    window.addEventListener("vevsdesign-consent-changed", loadAnalytics);
    return () => window.removeEventListener("vevsdesign-consent-changed", loadAnalytics);
  }, [token]);

  return null;
}
