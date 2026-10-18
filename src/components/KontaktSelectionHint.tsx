"use client";

import Link from "next/link";
import { CONTACT_SELECTION_GROUPS } from "@/components/contactSelection";
import { useSelections } from "@/components/SelectionProvider";

export default function KontaktSelectionHint() {
  const { selections } = useSelections();
  const hasSelections = CONTACT_SELECTION_GROUPS.some(({ kind }) => selections[kind].length > 0);

  if (hasSelections) {
    return null;
  }

  return (
    <p className="home-intro-text kontakt-hint">
      Zatiaľ nemáte nič vybrané.{" "}
      <Link href="/inventar/" className="home-link">Vybrať z celého inventára</Link>
      {" "}alebo si pozrite{" "}
      <Link href="/svadba/" className="home-link">plánovanie svadby</Link>.
    </p>
  );
}
