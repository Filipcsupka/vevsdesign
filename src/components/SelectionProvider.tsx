"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  EMPTY_CONTACT_SELECTIONS,
  normalizeQuantity,
  type ContactSelections,
  type PriceKind,
  type SelectionItem,
  type SelectionKind,
} from "@/components/contactSelection";

const STORAGE_KEY = "vevsdesign:selections:v1";
const SELECTION_KINDS: SelectionKind[] = ["packages", "services", "rentals"];
const PRICE_KINDS: PriceKind[] = ["fixed", "from", "individual"];

type SelectionContextValue = {
  selections: ContactSelections;
  count: number;
  addSelection: (selection: SelectionItem) => void;
  removeSelection: (kind: SelectionKind, id: string) => void;
  clearSelections: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

function isSelectionItem(value: unknown, kind: SelectionKind): value is SelectionItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    item.kind === kind &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    typeof item.unitLabel === "string" &&
    typeof item.priceLabel === "string" &&
    (item.unitPrice === null ||
      (typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice))) &&
    typeof item.priceKind === "string" &&
    PRICE_KINDS.includes(item.priceKind as PriceKind)
  );
}

function parseStoredSelections(raw: string | null): ContactSelections | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Record<string, unknown>;
    const result: ContactSelections = { packages: [], services: [], rentals: [] };
    for (const kind of SELECTION_KINDS) {
      const list = record[kind];
      if (!Array.isArray(list)) continue;
      const seen = new Set<string>();
      for (const entry of list) {
        if (!isSelectionItem(entry, kind) || seen.has(entry.id)) continue;
        seen.add(entry.id);
        result[kind].push({ ...entry, quantity: normalizeQuantity(entry.quantity) });
      }
    }
    return result;
  } catch {
    return null;
  }
}

function readStorage(): ContactSelections | null {
  try {
    return parseStoredSelections(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStorage(selections: ContactSelections) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  } catch {
    // storage unavailable; keep in-memory state only
  }
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<ContactSelections>(EMPTY_CONTACT_SELECTIONS);
  const [selectionToast, setSelectionToast] = useState<{ id: number; text: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate after mount so the static export markup matches the first client render.
  useEffect(() => {
    const stored = readStorage();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelections((current) => {
        const merged: ContactSelections = { packages: [], services: [], rentals: [] };
        for (const kind of SELECTION_KINDS) {
          const currentIds = new Set(current[kind].map((item) => item.id));
          merged[kind] = [...stored[kind].filter((item) => !currentIds.has(item.id)), ...current[kind]];
        }
        return merged;
      });
    }
    setHydrated(true);
  }, []);

  // Persist changes, but only after hydration so we never overwrite stored data with the empty initial state.
  useEffect(() => {
    if (!hydrated) return;
    writeStorage(selections);
  }, [selections, hydrated]);

  // Sync across tabs.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      setSelections(parseStoredSelections(event.newValue) ?? EMPTY_CONTACT_SELECTIONS);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!selectionToast) return;
    const timeoutId = window.setTimeout(() => setSelectionToast(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [selectionToast]);

  const addSelection = useCallback((selection: SelectionItem) => {
    setSelections((current) => ({
      ...current,
      [selection.kind]: [
        ...current[selection.kind].filter((item) => item.id !== selection.id),
        selection,
      ],
    }));
    setSelectionToast({ id: Date.now(), text: "Pridané do výberu" });
  }, []);

  const removeSelection = useCallback((kind: SelectionKind, id: string) => {
    setSelections((current) => ({
      ...current,
      [kind]: current[kind].filter((item) => item.id !== id),
    }));
  }, []);

  const clearSelections = useCallback(() => {
    setSelections(EMPTY_CONTACT_SELECTIONS);
  }, []);

  const count = useMemo(
    () => SELECTION_KINDS.reduce((sum, kind) => sum + selections[kind].length, 0),
    [selections]
  );

  const value = useMemo<SelectionContextValue>(
    () => ({ selections, count, addSelection, removeSelection, clearSelections }),
    [selections, count, addSelection, removeSelection, clearSelections]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
      {selectionToast ? <div className="selection-toast">{selectionToast.text}</div> : null}
    </SelectionContext.Provider>
  );
}

export function useSelections(): SelectionContextValue {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelections must be used within a <SelectionProvider>");
  }
  return context;
}
