export default function About() {
  return (
    <section id="about">
      <p className="sec-label reveal">O nás</p>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <div className="about-inner">
        <div className="about-quote-block reveal reveal-d1">
          <div className="about-quote-mark">&ldquo;</div>
          <div className="about-quote-text">Detaily robia svadbu nezabudnuteľnou.</div>
        </div>
        <div className="about-text reveal reveal-d2">
          <h3>Vaša svadba, naša vášeň</h3>
          <p>
            Kreativita je našou silnou stránkou a vieme, že práve detaily robia svadbu
            nezabudnuteľnou. Vašu svadbu nevnímame ako zákazku, ale ako jedinečný príbeh,
            pri ktorom záleží na každom prvku a každej emócii.
          </p>
          <p>
            Naším cieľom je, aby si hostia aj po rokoch povedali: &bdquo;Táto svadba bola úžasná.&ldquo;
            Všetko tvoríme srdcom a s dôrazom na to, aby bol váš deň výnimočný presne tak, ako vy.
          </p>
          <div className="about-stats">
            <div>
              <div className="stat-n">3</div>
              <div className="stat-l">Hlavné balíky</div>
            </div>
            <div>
              <div className="stat-n">Doplnky</div>
              <div className="stat-l">Na mieru</div>
            </div>
            <div>
              <div className="stat-n">Prenájom</div>
              <div className="stat-l">Výzdoby</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
