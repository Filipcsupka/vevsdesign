import BackgroundCanvas from "@/components/BackgroundCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News2027 from "@/components/News2027";
import Footer from "@/components/Footer";
import Baliky from "@/components/Baliky";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import NfcHeart from "@/components/NfcHeart";
import Kontakt from "@/components/Kontakt";
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
        <Baliky />
        <Services />
        <Gallery />
        <NfcHeart />
        <Kontakt />
      </main>
      <a href="#kontakt" className="mobile-contact-cta">Kontaktujte nás</a>
      <Footer />
    </>
  );
}
