export default function About() {
  return (
    <section id="about">
      <p className="sec-label reveal">Kto sme</p>
      <div className="rule reveal reveal-d1">
        <div className="rule-diamond" />
      </div>
      <div className="about-inner">
        <div className="about-quote-block reveal reveal-d1">
          <div className="about-quote-mark">&ldquo;</div>
          <div className="about-quote-text">Detaily robia svadbu nezabudnuteľnou.</div>
          <div className="about-quote-by">Vevsdesign · Košice &amp; východné Slovensko</div>
        </div>
        <div className="about-text reveal reveal-d2">
          <h3>Vaša svadba, naša vášeň</h3>
          <p>
            Kreativita je našou silnou stránkou a veríme, že práve detaily robia svadbu
            nezabudnuteľnou. Vašu svadbu nevnímame ako zákazku, ale ako jedinečný príbeh,
            pri ktorom záleží na každom prvku, každej emócii aj na atmosfére, ktorú spolu vytvárame.
          </p>
          <p>
            Naším cieľom je, aby si hostia aj po rokoch povedali: &bdquo;Táto svadba bola úžasná.&ldquo;
            Všetko tvoríme srdcom a s dôrazom na to, aby bol váš deň výnimočný presne tak, ako vy.
          </p>
          <div className="about-stats">
            <div>
              <div className="stat-n">Desiatky+</div>
              <div className="stat-l">Návrhov</div>
            </div>
            <div>
              <div className="stat-n">3</div>
              <div className="stat-l">Hlavné balíky</div>
            </div>
            <div>
              <div className="stat-n">Na mieru</div>
              <div className="stat-l">Balíky návrhov</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
