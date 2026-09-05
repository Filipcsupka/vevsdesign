import BackgroundCanvas from "@/components/BackgroundCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HomeInteractiveSections from "@/components/HomeInteractiveSections";
import RevealController from "@/components/RevealController";

export default function Page() {
  return (
    <>
      <RevealController />
      <BackgroundCanvas />
      <Nav />
      <main>
        <Hero />
        <About />
        <HomeInteractiveSections />
      </main>
      <a href="#kontakt" className="mobile-contact-cta">Kontaktujte nás</a>
      <Footer />
    </>
  );
}
