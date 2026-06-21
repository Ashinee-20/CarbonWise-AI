interface TrendChartProps {
  points: Array<{ label: string; value: number }>;
}

export function TrendChart({ points }: TrendChartProps) {
  const width = 520;
  const height = 190;
  const max = Math.max(...points.map((point) => point.value), 1);
  const path = points
    .map((point, index) => {
      const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
      const y = height - (point.value / max) * (height - 18) - 9;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby="trend-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="trend-title" className="text-lg font-semibold text-ink">
            Weekly Trend
          </h2>
          <p className="text-sm text-ink/65">Daily kg CO2e from recent logs</p>
        </div>
        <p className="text-sm font-semibold text-moss">{points.length} days</p>
      </div>
      <svg className="mt-5 h-52 w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Line chart of recent carbon footprint trend">
        <path d={path} fill="none" stroke="#4b8bbe" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => {
          const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
          const y = height - (point.value / max) * (height - 18) - 9;
          return <circle key={point.label} cx={x} cy={y} r="5" fill="#2f6b4f" />;
        })}
      </svg>
    </section>
  );
}
