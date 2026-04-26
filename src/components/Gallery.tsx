const IMAGES = [
  { src: "/images/gallery/01.webp", alt: "Svadobná výzdoba" },
  { src: "/images/gallery/02.webp", alt: "Detail výzdoby" },
  { src: "/images/gallery/03.webp", alt: "Svadobný stôl" },
  { src: "/images/gallery/04.webp", alt: "Srdcový stojan" },
  { src: "/images/gallery/05.webp", alt: "Výzdoba obradu" },
  { src: "/images/gallery/06.webp", alt: "Kvety & ikebany" },
];

const RENTAL_CATEGORIES = [
  {
    id: "prenajom-kvetinova-vyzdoba",
    title: "Kvetinová výzdoba",
    text: "Kvetinové aranžmány, doplnky na stoly aj romantické akcenty, ktoré vieme zladiť s celou svadbou.",
  },
  {
    id: "prenajom-detsky-kutik",
    title: "Detský kútik",
    text: "Prakticky pripravený detský kútik so zábavou pre malých hostí, aby si svadbu užili aj rodičia.",
  },
  {
    id: "prenajom-stojany-zrkadla",
    title: "Stojany a zrkadlá",
    text: "Dekoračné stojany, zrkadlá a výrazné prvky vhodné na uvítanie hostí, fotenie aj personalizovaný program.",
  },
  {
    id: "prenajom-vazy-svietniky",
    title: "Vázy a svietniky",
    text: "Elegantné vázy, svietniky a stolové detaily, ktoré dotvoria jemný a butikový charakter svadobného dňa.",
  },
  {
    id: "prenajom-ostatne",
    title: "Ostatné",
    text: "Ak hľadáte konkrétny prvok navyše, vieme spolu vyskladať prenájom aj podľa vašej vlastnej predstavy.",
  },
];

export default function Gallery() {
  return (
    <section id="galeria">
      <p className="sec-label reveal">Prenájom</p>
      <h2 className="reveal reveal-d1">
        Kúsky, ktoré vieme <em>zapožičať</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Vyberte si kategóriu prenájmu, ktorá najlepšie doplní atmosféru vášho svadobného dňa.
      </p>
      <div className="rental-grid reveal reveal-d2">
        {RENTAL_CATEGORIES.map((item) => (
          <article key={item.id} id={item.id} className="rental-card">
            <div className="rental-card-kicker">Prenájom</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
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
