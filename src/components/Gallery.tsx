const IMAGES = [
  { src: "/images/gallery/01.webp", alt: "Svadobná výzdoba" },
  { src: "/images/gallery/02.webp", alt: "Detail výzdoby" },
  { src: "/images/gallery/03.webp", alt: "Svadobný stôl" },
  { src: "/images/gallery/04.webp", alt: "Srdcový stojan" },
  { src: "/images/gallery/05.webp", alt: "Výzdoba obradu" },
  { src: "/images/gallery/06.webp", alt: "Kvety & ikebany" },
];

export default function Gallery() {
  return (
    <section id="galeria">
      <p className="sec-label reveal">Naša práca</p>
      <h2 className="reveal reveal-d1">
        Momenty, ktoré sme <em>vytvorili</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <div className="gallery-grid reveal reveal-d2">
        {IMAGES.map((img) => (
          <div key={img.src} className="gal-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="gal-img"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).hidden = true; }}
            />
            <div className="gal-overlay" />
          </div>
        ))}
      </div>
    </section>
  );
}
