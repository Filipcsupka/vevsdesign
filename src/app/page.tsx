"use client";

import { useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Baliky from "@/components/Baliky";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function Page() {
  const [selectedPackage, setSelectedPackage] = useState("");
  useReveal();

  return (
    <>
      <BackgroundCanvas />
      <Nav />
      <main>
        <Hero />
        <About />
        <Baliky onSelectPackage={setSelectedPackage} />
        <Services />
        <Gallery />
        <Kontakt selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </>
  );
}
