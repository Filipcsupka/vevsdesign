"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { normalizeQuantity } from "@/components/contactSelection";

type QuantityInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function QuantityInput({ label, value, onChange }: QuantityInputProps) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(nextValue: string) {
    if (!nextValue) {
      onChange(1);
      setDraft("1");
      return;
    }

    const normalized = normalizeQuantity(Number(nextValue));
    onChange(normalized);
    setDraft(String(normalized));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = event.target.value.replace(/[^\d]/g, "");
    setDraft(digitsOnly);

    if (!digitsOnly) return;

    onChange(normalizeQuantity(Number(digitsOnly)));
  }

  return (
    <label className="modal-qty-field">
      <span>{label}</span>
      <div className="quantity-input">
        <button
          type="button"
          className="quantity-input-button"
          aria-label="Znížiť počet"
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
        >
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={label}
          value={draft}
          onChange={handleInputChange}
          onBlur={() => commit(draft)}
          onFocus={(event) => event.currentTarget.select()}
        />
        <button
          type="button"
          className="quantity-input-button"
          aria-label="Zvýšiť počet"
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </label>
  );
}
