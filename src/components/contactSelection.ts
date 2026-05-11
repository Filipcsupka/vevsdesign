export type SelectionKind = "packages" | "services" | "rentals";
export type PriceKind = "fixed" | "from" | "individual";

export type SelectionItem = {
  kind: SelectionKind;
  id: string;
  name: string;
  quantity: number;
  unitLabel: string;
  priceLabel: string;
  unitPrice: number | null;
  priceKind: PriceKind;
};

export type ContactSelections = Record<SelectionKind, SelectionItem[]>;

export const EMPTY_CONTACT_SELECTIONS: ContactSelections = {
  packages: [],
  services: [],
  rentals: [],
};

export const CONTACT_SELECTION_GROUPS = [
  { kind: "packages" as const, label: "Balík", inputName: "balik" },
  { kind: "services" as const, label: "Doplnok", inputName: "doplnky" },
  { kind: "rentals" as const, label: "Prenájom", inputName: "prenajom" },
];

export function formatMoney(value: number) {
  return `${value.toLocaleString("sk-SK", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })} €`;
}

export function normalizeQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.floor(value));
}

export function calculateSelectionSubtotal(item: SelectionItem) {
  if (item.unitPrice == null) return null;
  return item.unitPrice * item.quantity;
}

export function formatSelectionMeta(item: SelectionItem) {
  const subtotal = calculateSelectionSubtotal(item);
  const quantityLabel = `${item.quantity} ${item.unitLabel}`;

  if (subtotal == null) return `${quantityLabel} · ${item.priceLabel}`;
  if (item.priceKind === "fixed" && item.quantity === 1 && !item.priceLabel.includes("/")) {
    return `${quantityLabel} · ${item.priceLabel}`;
  }
  return `${quantityLabel} · ${item.priceLabel} · ${formatMoney(subtotal)}`;
}

export function formatSelectionHiddenValue(item: SelectionItem) {
  return `${item.name} — ${formatSelectionMeta(item)}`;
}

export function calculateSelectionsPricing(selections: ContactSelections) {
  const allItems = Object.values(selections).flat();

  return allItems.reduce(
    (acc, item) => {
      const subtotal = calculateSelectionSubtotal(item);

      if (subtotal != null) acc.total += subtotal;
      if (item.priceKind === "from") acc.hasFromPricing = true;
      if (item.priceKind === "individual") acc.hasIndividualPricing = true;

      return acc;
    },
    {
      total: 0,
      hasFromPricing: false,
      hasIndividualPricing: false,
    }
  );
}

export function formatSelectionsTotalLabel(selections: ContactSelections) {
  const pricing = calculateSelectionsPricing(selections);

  if (pricing.total <= 0 && pricing.hasIndividualPricing) {
    return "Predbežná cena na dopyt";
  }

  if (pricing.hasFromPricing || pricing.hasIndividualPricing) {
    return `Predbežná cena od ${formatMoney(pricing.total)}`;
  }

  return `Predbežná cena ${formatMoney(pricing.total)}`;
}
