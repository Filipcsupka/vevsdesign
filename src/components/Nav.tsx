"use client";

import { useEffect, useRef } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} id="main-nav">
      <a href="#hero" className="nav-logo">
        Vevs<em>design</em>
      </a>
      <ul>
        <li><a href="#about">O nás</a></li>
        <li><a href="#baliky">Balíky</a></li>
        <li><a href="#services">Služby</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
    </nav>
  );
}
