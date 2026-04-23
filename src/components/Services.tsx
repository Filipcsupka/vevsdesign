const SERVICES = [
  "Živé kvety od 50 €",
  "Ikebany od 20 €",
  "Pierka od 0,25 €",
  "Svadobné pozvánky od 0,50 €",
  "Výslužkové krabice od 0,30 €",
  "Instax fotoaparát od 20 €",
  "Obrusy od 10 €",
  "Výzdoba obradu od 20 €",
  "Cigar bar od 30 €",
  "Iné (vaša predstava)",
];

export default function Services() {
  return (
    <section id="services">
      <div className="services-bg-lines" />
      <div className="services-glow" />
      <p className="sec-label reveal">Rozšírte svadbu</p>
      <h2 className="reveal reveal-d1">
        Doplnkové <em>služby</em>
      </h2>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <p className="sec-intro reveal reveal-d2">
        Ku každému balíku si môžete pridať ďalšie služby podľa vašich predstáv.
        Cena závisí od počtu hostí a použitého materiálu.
      </p>
      <div className="doplnkove-inner reveal reveal-d2">
        <div className="doplnkove-title">Doplnkové služby</div>
        <div className="doplnkove-grid">
          {SERVICES.map((s) => (
            <div key={s} className="doplnkove-item">
              <span className="doplnkove-dot" />
              {s}
            </div>
          ))}
        </div>
        <p className="price-note">Taktiež vieme zaobstarať candy bar, koláče a tortu.</p>
      </div>
    </section>
  );
}
