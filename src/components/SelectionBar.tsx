"use client";

import Link from "next/link";
import { useSelections } from "@/components/SelectionProvider";

function itemsLabel(count: number) {
  if (count === 1) return "položka";
  if (count >= 2 && count <= 4) return "položky";
  return "položiek";
}

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
