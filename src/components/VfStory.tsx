import Link from "next/link";
import FallbackImage from "@/components/FallbackImage";
import VfPhotos from "@/components/VfPhotos";

export type VfChapter = {
  label: string;
  title: string;
  text: string;
  alt: string;
  images: string[];
};

type VfStoryProps = {
  heroImages: string[];
  chapters: VfChapter[];
};

export default function VfStory({ heroImages, chapters }: VfStoryProps) {
  const hero = heroImages[0] ?? "/images/gallery/placeholder.png";

  return (
    <main className="vf-shell">
      <Link href="/" className="vf-close" aria-label="Späť na vevsdesign.sk">
        <span aria-hidden="true">×</span>
      </Link>
      <p className="vf-back">
        <Link href="/">← Späť na vevsdesign.sk</Link>
      </p>

      <header className="vf-hero reveal">
        <div className="vf-hero-photo">
          <FallbackImage src={hero} alt="Veronika a Filip" loading="eager" />
        </div>
      </header>

      <section className="vf-intro">
        <p className="sec-label reveal">Veronika &amp; Filip</p>
        <div className="rule reveal reveal-d1">
          <div className="rule-diamond" />
        </div>
        <h1 className="vf-title reveal reveal-d1">
          Toto sme <em>my</em>
        </h1>
        <p className="vf-lead reveal reveal-d2">
          Dvaja ľudia, jeden malý parťák a jeden veľký deň. Naskenovali ste náš tag, tak vám
          v skratke povieme, ako sme sa sem dostali — bez prikrášľovania, zato s láskou
          (a štipkou humoru).
        </p>
      </section>

      <div className="vf-story">
        {chapters.map((chapter, index) => (
          <section
            key={chapter.title}
            className={`vf-chapter${index % 2 === 1 ? " vf-chapter-alt" : ""} reveal`}
          >
            <div className="vf-chapter-photo">
              <VfPhotos images={chapter.images} alt={chapter.alt} />
            </div>
            <div className="vf-chapter-text">
              <p className="vf-chapter-label">{chapter.label}</p>
              <h2>{chapter.title}</h2>
              <p>{chapter.text}</p>
            </div>
          </section>
        ))}
      </div>

      <footer className="vf-outro reveal">
        <div className="rule">
          <div className="rule-diamond" />
        </div>
        <p className="vf-outro-text">S láskou,</p>
        <p className="vf-outro-sign">Veronika &amp; Filip</p>
      </footer>
    </main>
  );
}
