interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby={`${title}-chart`}>
      <h2 id={`${title}-chart`} className="text-lg font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-5 grid gap-4">
        {data.map((item) => (
          <div key={item.label} className="grid grid-cols-[7.5rem_1fr_4rem] items-center gap-3 text-sm">
            <span className="font-medium text-ink/75">{item.label}</span>
            <div className="h-3 rounded-full bg-ink/10">
              <div
                className="h-3 rounded-full"
                style={{ width: `${Math.max((item.value / max) * 100, 2)}%`, backgroundColor: item.color }}
                aria-hidden="true"
              />
            </div>
            <span className="text-right font-semibold text-ink">{item.value.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
