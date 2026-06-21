interface ProgressRingProps {
  value: number;
  label: string;
}

export function ProgressRing({ value, label }: ProgressRingProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <figure className="flex items-center gap-5" aria-label={`${label}: ${value} out of 100`}>
      <svg className="h-32 w-32" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} stroke="#dfe8df" strokeWidth="10" fill="transparent" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#49a078"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="67" textAnchor="middle" className="fill-ink text-2xl font-bold">
          {value}
        </text>
      </svg>
      <figcaption>
        <p className="text-sm font-medium uppercase text-moss">{label}</p>
        <p className="mt-1 max-w-52 text-sm text-ink/65">Higher scores reflect lower daily emissions and steadier habits.</p>
      </figcaption>
    </figure>
  );
}
