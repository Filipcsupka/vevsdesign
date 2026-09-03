"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (
      !hero ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 900px), (pointer: coarse)").matches
    ) return;

    let ticking = false;

    function update() {
      const heroHeight = Math.max(hero!.offsetHeight, 1);
      const y = Math.min(Math.max(window.scrollY, 0), heroHeight);
      const progress = Math.min(y / heroHeight, 1);
      hero!.style.setProperty("--hero-logo-y", `${y * 0.16}px`);
      hero!.style.setProperty("--hero-copy-y", `${y * 0.22}px`);
      hero!.style.setProperty("--hero-line-y", `${y * 0.14}px`);
      hero!.style.setProperty("--hero-glow-y", `${y * 0.28}px`);
      hero!.style.setProperty("--hero-photo-y", `${y * 0.08}px`);
      hero!.style.setProperty("--hero-parallax-progress", progress.toFixed(3));
      ticking = false;
    }

    function request() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />
      <div className="hero-deco-line left" />
      <div className="hero-deco-line right" />
      <div className="hero-stage">
        <div className="hero-content">
          <div className="hero-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Vevsdesign logo"
              className="hero-logo-img"
              width={340}
              height={340}
            />
          </div>

          <h1>
            Váš deň,<br />
            <em>naša vášeň</em>
            <span className="h1-line2">Výzdoba, ktorú si zapamätáte</span>
          </h1>

          <p className="hero-sub">
            Tvoríme svadobnú výzdobu s dušou. Personalizovanú, elegantnú a plnú detailov.
          </p>

          <div className="btn-pair">
            <a href="#baliky" className="btn-p">Pozrieť balíky</a>
            <a href="#kontakt" className="btn-o">Kontaktujte nás</a>
          </div>
        </div>

        <figure className="hero-photo">
          <div className="hero-photo-frame">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/hero/table-decoration-768.webp 768w, /images/hero/table-decoration-1600.webp 1600w"
                sizes="(max-width: 900px) 100vw, 62vw"
              />
              <img
                src="/images/hero/table-decoration.jpeg"
                alt="Svadobný stôl s modro-bielou kvetinovou výzdobou a sviečkami"
                width={2701}
                height={1797}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="hero-photo-wash" aria-hidden="true" />
          </div>
          <figcaption>
            <span>Vevsdesign</span>
            <span>Košice &amp; okolie</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
