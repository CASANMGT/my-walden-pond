import { Check } from "lucide-react";

type Props = {
  quote: string;
  className?: string;
};

export function QuoteBlock({ quote, className = "" }: Props) {
  return (
    <blockquote className={`quote-card ${className}`}>
      <p className="relative z-10 pl-6 font-serif text-lg leading-relaxed text-pond-900 md:text-xl">
        {quote}
      </p>
      <div className="mt-3 flex justify-end">
        <svg
          className="h-5 w-5 text-moss/25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="12" r="6" opacity="0.6" />
          <circle cx="12" cy="12" r="10" opacity="0.3" />
        </svg>
      </div>
    </blockquote>
  );
}

type ChecklistProps = {
  items: string[];
  title?: string;
};

export function LessonChecklist({ items, title = "In this lesson" }: ChecklistProps) {
  return (
    <div className="rounded-xl bg-mist/70 p-4">
      <p className="section-label">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pond-700/10">
              <Check className="h-2.5 w-2.5 text-pond-700" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
