"use client";

import Link from "next/link";
import { useSelections } from "@/components/SelectionProvider";
import { itemsLabel } from "@/components/contactSelection";

export default function SelectionBar() {
  const { count, clearSelections } = useSelections();
  if (count === 0) return null;

  return (
    <div className="selection-bar" role="region" aria-label="Zhrnutie výberu">
      <span className="selection-bar-text" aria-live="polite">
        Vo výbere: {count} {itemsLabel(count)}
      </span>
      <div className="selection-bar-actions">
        <button type="button" className="selection-bar-clear" onClick={clearSelections}>
          Vymazať
        </button>
        <Link href="/kontakt/" className="btn-p">
          Pokračovať na dopyt
        </Link>
      </div>
    </div>
  );
}
