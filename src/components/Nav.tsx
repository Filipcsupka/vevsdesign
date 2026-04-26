"use client";

import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const packagesMenuRef = useRef<HTMLLIElement>(null);
  const servicesMenuRef = useRef<HTMLLIElement>(null);
  const rentalMenuRef = useRef<HTMLLIElement>(null);
  const [openMenu, setOpenMenu] = useState<"packages" | "services" | "rental" | null>(null);

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
      if (
        !packagesMenuRef.current?.contains(target) &&
        !servicesMenuRef.current?.contains(target) &&
        !rentalMenuRef.current?.contains(target)
      ) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
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
        Vevs<em>design</em>
      </a>
      <ul>
        <li><a href="#hero">Domov</a></li>
        <li><a href="#about">O nás</a></li>
        <li
          ref={packagesMenuRef}
          className={`nav-item-has-menu${openMenu === "packages" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("packages")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#baliky" className="nav-menu-link" onClick={() => setOpenMenu(null)}>
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
            <li><a href="#balik-s-detail" onClick={() => setOpenMenu(null)}>Balík S</a></li>
            <li><a href="#balik-m-detail" onClick={() => setOpenMenu(null)}>Balík M</a></li>
            <li><a href="#balik-l-detail" onClick={() => setOpenMenu(null)}>Balík L</a></li>
            <li><a href="#kontakt" onClick={() => setOpenMenu(null)}>Vlastný balík</a></li>
          </ul>
        </li>
        <li
          ref={servicesMenuRef}
          className={`nav-item-has-menu${openMenu === "services" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("services")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#services" className="nav-menu-link" onClick={() => setOpenMenu(null)}>
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
            <li><a href="#doplnky-na-mieru" onClick={() => setOpenMenu(null)}>Doplnky na mieru</a></li>
            <li><a href="#doplnky-pre-hosti" onClick={() => setOpenMenu(null)}>Doplnky pre hostí</a></li>
          </ul>
        </li>
        <li
          ref={rentalMenuRef}
          className={`nav-item-has-menu${openMenu === "rental" ? " open" : ""}`}
          onMouseEnter={() => setOpenMenu("rental")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="nav-menu-head">
            <a href="#galeria" className="nav-menu-link" onClick={() => setOpenMenu(null)}>
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
            <li><a href="#prenajom-kvetinova-vyzdoba" onClick={() => setOpenMenu(null)}>Kvetinová výzdoba</a></li>
            <li><a href="#prenajom-detsky-kutik" onClick={() => setOpenMenu(null)}>Detský kútik</a></li>
            <li><a href="#prenajom-stojany-zrkadla" onClick={() => setOpenMenu(null)}>Stojany a zrkadlá</a></li>
            <li><a href="#prenajom-vazy-svietniky" onClick={() => setOpenMenu(null)}>Vázy a svietniky</a></li>
            <li><a href="#prenajom-ostatne" onClick={() => setOpenMenu(null)}>Ostatné</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
