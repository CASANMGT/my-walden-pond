type Props = {
  value: number;
  max?: number;
  size?: number;
  label?: string;
};

export function ProgressRing({ value, max = 5, size = 48, label }: Props) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-mist)"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-pond-500)"
          strokeWidth={4}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {label && <span className="text-[10px] text-ink/50">{label}</span>}
      <span className="text-xs font-medium text-pond-700">
        {value}/{max}
      </span>
    </div>
  );
}
