"use client";

type SliderProps = {
  label: string;
  lowLabel: string;
  highLabel: string;
  value: number;
  onChange: (value: number) => void;
};

function Slider({ label, lowLabel, highLabel, value, onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink/80">{label}</span>
        <span className="text-sm tabular-nums text-moss">{value}/5</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-ink/40">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

type Props = {
  mechanical: number;
  nature: number;
  margin: number;
  onMechanicalChange: (v: number) => void;
  onNatureChange: (v: number) => void;
  onMarginChange: (v: number) => void;
};

export function ReflectionSliders({
  mechanical,
  nature,
  margin,
  onMechanicalChange,
  onNatureChange,
  onMarginChange,
}: Props) {
  return (
    <div className="space-y-6">
      <Slider
        label="Mechanical feeling"
        lowLabel="Not mechanical"
        highLabel="Very mechanical"
        value={mechanical}
        onChange={onMechanicalChange}
      />
      <Slider
        label="Nature connection"
        lowLabel="Disconnected"
        highLabel="Deeply connected"
        value={nature}
        onChange={onNatureChange}
      />
      <Slider
        label="Inner margin"
        lowLabel="No space"
        highLabel="Spacious"
        value={margin}
        onChange={onMarginChange}
      />
    </div>
  );
}
