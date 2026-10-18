"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelections } from "@/components/SelectionProvider";
import { itemsLabel } from "@/components/contactSelection";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/data/businessInfo";

const NAV_ITEMS = [
  { href: "/", label: "Domov" },
  { href: "/svadba", label: "Svadba" },
  { href: "/prenajom", label: "Prenájom" },
  { href: "/inventar", label: "Inventár" },
  { href: "/nfc-srdce", label: "NFC srdce" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

function normalizePath(path: string | null) {
  if (!path) return "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = normalizePath(usePathname());
  const { count } = useSelections();

  // Close the mobile menu on route change (adjust state during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const nav = navRef.current;
    const topbar = topbarRef.current;
    if (!nav) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle("scrolled", scrolled);
      topbar?.classList.toggle("hidden", scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeNavigation = () => setMobileMenuOpen(false);

  return (
    <>
      <div ref={topbarRef} className="topbar">
        <a
          href={CONTACT_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-instagram"
        >
          <svg
            className="topbar-ig-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          {CONTACT_INSTAGRAM_HANDLE.replace(/^@/, "")}
        </a>
        <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE_DISPLAY}</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <nav ref={navRef} id="main-nav">
        <Link href="/" className="nav-logo" onClick={closeNavigation}>
          VEVS<em>DESIGN</em>
        </Link>
        <button
          type="button"
          className={`mobile-menu-button${mobileMenuOpen ? " open" : ""}`}
          aria-label={mobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <ul id="site-navigation" className={`nav-links${mobileMenuOpen ? " open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeNavigation}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {count > 0 && (
            <li>
              <Link
                href="/kontakt"
                className="nav-selection"
                aria-label={`Môj výber, ${count} ${itemsLabel(count)}`}
                aria-current={pathname === "/kontakt" ? "page" : undefined}
                onClick={closeNavigation}
              >
                Môj výber
                <span className="nav-badge" aria-hidden="true">{count}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
