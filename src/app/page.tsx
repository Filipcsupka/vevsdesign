"use client";

import { useEffect, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Baliky from "@/components/Baliky";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
import {
  EMPTY_CONTACT_SELECTIONS,
  type ContactSelections,
  type SelectionItem,
} from "@/components/contactSelection";
import { useReveal } from "@/hooks/useReveal";

export default function Page() {
  const [selections, setSelections] = useState<ContactSelections>(EMPTY_CONTACT_SELECTIONS);
  const [selectionToast, setSelectionToast] = useState<{ id: number; text: string } | null>(null);
  useReveal();

  useEffect(() => {
    if (!selectionToast) return;

    const timeoutId = window.setTimeout(() => {
      setSelectionToast(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [selectionToast]);

  function addSelection(selection: SelectionItem) {
    setSelections((current) => {
      return {
        ...current,
        [selection.kind]: [
          ...current[selection.kind].filter((item) => item.id !== selection.id),
          selection,
        ],
      };
    });
    setSelectionToast({ id: Date.now(), text: "Pridané do výberu" });
  }

  function removeSelection(kind: SelectionItem["kind"], id: string) {
    setSelections((current) => ({
      ...current,
      [kind]: current[kind].filter((item) => item.id !== id),
    }));
  }

  function clearSelections() {
    setSelections(EMPTY_CONTACT_SELECTIONS);
  }

  return (
    <>
      <BackgroundCanvas />
      <Nav />
      <main>
        <Hero />
        <About />
        <Baliky onSelectPackage={addSelection} />
        <Services onSelectService={addSelection} />
        <Gallery onSelectRental={addSelection} />
        <Kontakt
          selections={selections}
          onRemoveSelection={removeSelection}
          onClearSelections={clearSelections}
        />
      </main>
      {selectionToast ? <div className="selection-toast">{selectionToast.text}</div> : null}
      <Footer />
    </>
  );
}
