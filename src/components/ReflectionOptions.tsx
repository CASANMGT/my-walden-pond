"use client";

import { useState } from "react";

type Props = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multi?: boolean;
};

export function ReflectionOptions({
  options,
  selected,
  onChange,
  multi = true,
}: Props) {
  const [customValue, setCustomValue] = useState("");
  const showCustom = selected.includes("Custom");

  function toggle(option: string) {
    if (!multi) {
      onChange([option]);
      return;
    }
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2.5">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                isSelected
                  ? "chip-selected"
                  : "border-mist bg-white/50 text-ink/80 hover:border-pond-500/30"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showCustom && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => {
            setCustomValue(e.target.value);
            const withoutCustom = selected.filter((s) => s !== "Custom");
            if (e.target.value.trim()) {
              onChange([...withoutCustom, "Custom", e.target.value.trim()]);
            } else {
              onChange([...withoutCustom, "Custom"]);
            }
          }}
          placeholder="Type your own..."
          className="w-full rounded-xl border border-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-pond-500"
        />
      )}
    </div>
  );
}

export function SingleSelectOptions({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
              isSelected
                ? "chip-selected"
                : "border-mist bg-white/50 text-ink/80 hover:border-pond-500/30"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
