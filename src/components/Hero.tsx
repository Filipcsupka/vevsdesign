"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-photo-frame", {
          clipPath: "inset(0 0 8% 0)", duration: 0.65, clearProps: "clipPath",
        }, 0)
        .from(".hero-logo-wrap", {
          opacity: 0, y: 10, duration: 0.45, clearProps: "opacity,transform",
        }, 0.05)
        .from("[data-hero-line]", {
          opacity: 0, y: 14, stagger: 0.09, duration: 0.5, clearProps: "opacity,transform",
        }, 0.12);
    }, heroRef);

    media.add("(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let rafId = 0;
      function update() {
        const heroHeight = Math.max(hero!.offsetHeight, 1);
        const y = Math.min(Math.max(window.scrollY, 0), heroHeight);
        hero!.style.setProperty("--hero-logo-y", `${y * 0.16}px`);
        hero!.style.setProperty("--hero-copy-y", `${y * 0.22}px`);
        hero!.style.setProperty("--hero-line-y", `${y * 0.14}px`);
        hero!.style.setProperty("--hero-glow-y", `${y * 0.28}px`);
        hero!.style.setProperty("--hero-photo-y", `${y * 0.08}px`);
        hero!.style.setProperty("--hero-parallax-progress", (y / heroHeight).toFixed(3));
        rafId = 0;
      }

      function request() {
        if (!rafId) rafId = requestAnimationFrame(update);
      }

      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request, { passive: true });
      update();
      return () => {
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
        cancelAnimationFrame(rafId);
        for (const property of ["logo-y", "copy-y", "line-y", "glow-y", "photo-y", "parallax-progress"]) {
          hero.style.removeProperty(`--hero-${property}`);
        }
      };
    });

    return () => media.revert();
  }, { scope: heroRef });

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
            <span className="hero-headline-line" data-hero-line>Váš deň,</span>
            <em className="hero-headline-line" data-hero-line>naša vášeň</em>
            <span className="h1-line2" data-hero-line>Výzdoba, ktorú si zapamätáte</span>
          </h1>
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
