"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    function update() {
      const heroHeight = Math.max(hero!.offsetHeight, 1);
      const y = Math.min(Math.max(window.scrollY, 0), heroHeight);
      const progress = Math.min(y / heroHeight, 1);
      hero!.style.setProperty("--hero-logo-y", `${y * 0.16}px`);
      hero!.style.setProperty("--hero-copy-y", `${y * 0.22}px`);
      hero!.style.setProperty("--hero-ring-y", `${y * 0.08}px`);
      hero!.style.setProperty("--hero-line-y", `${y * 0.14}px`);
      hero!.style.setProperty("--hero-glow-y", `${y * 0.28}px`);
      hero!.style.setProperty("--hero-scroll-y", `${y * 0.1}px`);
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
      <div className="hero-deco-circle c1" />
      <div className="hero-deco-circle c2" />

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

      <div className="hero-eyebrow">Svadobná výzdoba &amp; dizajn</div>

      <h1>
        Váš deň,<br />
        <em>naša vášeň</em>
        <span className="h1-line2">Výzdoba, ktorú si zapamätáte</span>
      </h1>

      <p className="hero-sub">
        Tvoríme svadobnú výzdobu s dušou — personalizovanú, elegantnú a plnú detailov.
      </p>

      <div className="btn-pair">
        <a href="#baliky" className="btn-p">Pozrieť balíky</a>
        <a href="#kontakt" className="btn-o">Kontaktujte nás</a>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
