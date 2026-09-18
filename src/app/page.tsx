import BackgroundCanvas from "@/components/BackgroundCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News2027 from "@/components/News2027";
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
        <News2027 />
        <HomeInteractiveSections />
      </main>
      <a href="#kontakt" className="mobile-contact-cta">Kontaktujte nás</a>
      <Footer />
    </>
  );
}
