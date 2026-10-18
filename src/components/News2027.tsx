import Link from "next/link";

export default function News2027() {
  return (
    <section id="novinky" className="news-2027">
      <div className="news-2027-glow" aria-hidden="true" />
      <div className="news-2027-card reveal">
        <p className="sec-label">Novinky pre rok 2027</p>
        <div className="rule">
          <div className="rule-diamond" />
        </div>
        <h2>Nové stojany pre <em>výnimočný priestor</em></h2>
        <p>
          Objavte nové výrazné kúsky pre obrad, vstup do sály aj miesto za novomanželmi.
          Jemné línie a možnosť kvetinovej výzdoby vytvoria nezabudnuteľný wau efekt.
        </p>
        <Link className="news-2027-link" href="/inventar/#prenajom-stojany-zrkadla">
          Pozrieť stojany a zrkadlá <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
