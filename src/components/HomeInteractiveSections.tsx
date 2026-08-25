"use client";

import { useEffect, useState } from "react";
import Baliky from "@/components/Baliky";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import NfcHeart from "@/components/NfcHeart";
import Kontakt from "@/components/Kontakt";
import {
  EMPTY_CONTACT_SELECTIONS,
  type ContactSelections,
  type SelectionItem,
} from "@/components/contactSelection";

export default function HomeInteractiveSections() {
  const [selections, setSelections] = useState<ContactSelections>(EMPTY_CONTACT_SELECTIONS);
  const [selectionToast, setSelectionToast] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    if (!selectionToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSelectionToast(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [selectionToast]);

  function addSelection(selection: SelectionItem) {
    setSelections((current) => ({
      ...current,
      [selection.kind]: [
        ...current[selection.kind].filter((item) => item.id !== selection.id),
        selection,
      ],
    }));
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
      <Baliky onSelectPackage={addSelection} />
      <Services onSelectService={addSelection} />
      <Gallery onSelectRental={addSelection} />
      <NfcHeart />
      <Kontakt
        selections={selections}
        onRemoveSelection={removeSelection}
        onClearSelections={clearSelections}
      />
      {selectionToast ? <div className="selection-toast">{selectionToast.text}</div> : null}
    </>
  );
}
