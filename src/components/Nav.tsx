"use client";

import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<"packages" | "services" | "rental" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeNavigation() {
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!navRef.current?.contains(target)) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav ref={navRef} id="main-nav">
      <a href="#hero" className="nav-logo">
        VEVS<em>DESIGN</em>
      </a>
      <button
        type="button"
        className={`mobile-menu-button${mobileMenuOpen ? " open" : ""}`}
        aria-label={mobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="site-navigation"
        onClick={() => {
          setMobileMenuOpen((open) => !open);
          setOpenMenu(null);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <ul id="site-navigation" className={`nav-links${mobileMenuOpen ? " open" : ""}`}>
        <li><a href="#hero" onClick={closeNavigation}>Domov</a></li>
        <li><a href="#about" onClick={closeNavigation}>O nás</a></li>
        <li
          className={`nav-item-has-menu${openMenu === "packages" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("packages")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#baliky" className="nav-menu-link" onClick={closeNavigation}>
              Svadobné balíčky
            </a>
            <button
              type="button"
              className="nav-menu-toggle"
              aria-label="Zobraziť podkategórie svadobných balíčkov"
              aria-haspopup="true"
              aria-expanded={openMenu === "packages"}
              aria-controls="packages-submenu"
              onClick={() => setOpenMenu((open) => (open === "packages" ? null : "packages"))}
            >
              <span aria-hidden="true">▾</span>
            </button>
          </div>
          <ul id="packages-submenu" className="nav-submenu">
            <li><a href="#balik-s-detail" onClick={closeNavigation}>Balík S</a></li>
            <li><a href="#balik-m-detail" onClick={closeNavigation}>Balík M</a></li>
            <li><a href="#balik-l-detail" onClick={closeNavigation}>Balík L</a></li>
            <li><a href="#kontakt" onClick={closeNavigation}>Vlastný balík</a></li>
          </ul>
        </li>
        <li
          className={`nav-item-has-menu${openMenu === "services" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("services")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#services" className="nav-menu-link" onClick={closeNavigation}>
              Svadobné doplnky
            </a>
            <button
              type="button"
              className="nav-menu-toggle"
              aria-label="Zobraziť podkategórie svadobných doplnkov"
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
              aria-controls="services-submenu"
              onClick={() => setOpenMenu((open) => (open === "services" ? null : "services"))}
            >
              <span aria-hidden="true">▾</span>
            </button>
          </div>
          <ul id="services-submenu" className="nav-submenu">
            <li><a href="#doplnky-na-mieru" onClick={closeNavigation}>Doplnky na mieru</a></li>
            <li><a href="#doplnky-pre-hosti" onClick={closeNavigation}>Doplnky pre hostí</a></li>
          </ul>
        </li>
        <li
          className={`nav-item-has-menu${openMenu === "rental" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("rental")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#galeria" className="nav-menu-link" onClick={closeNavigation}>
              Prenájom
            </a>
            <button
              type="button"
              className="nav-menu-toggle"
              aria-label="Zobraziť podkategórie prenájmu"
              aria-haspopup="true"
              aria-expanded={openMenu === "rental"}
              aria-controls="rental-submenu"
              onClick={() => setOpenMenu((open) => (open === "rental" ? null : "rental"))}
            >
              <span aria-hidden="true">▾</span>
            </button>
          </div>
          <ul id="rental-submenu" className="nav-submenu">
            <li><a href="#prenajom-kvetinova-vyzdoba" onClick={closeNavigation}>Kvetinová výzdoba</a></li>
            <li><a href="#prenajom-detsky-kutik" onClick={closeNavigation}>Detský kútik</a></li>
            <li><a href="#prenajom-stojany-zrkadla" onClick={closeNavigation}>Stojany a zrkadlá</a></li>
            <li><a href="#prenajom-vazy-svietniky" onClick={closeNavigation}>Vázy a svietniky</a></li>
            <li><a href="#prenajom-ostatne" onClick={closeNavigation}>Ostatné</a></li>
          </ul>
        </li>
        <li><a href="/vf" className="nav-link-vf" onClick={closeNavigation}>V/F</a></li>
      </ul>
    </nav>
  );
}
