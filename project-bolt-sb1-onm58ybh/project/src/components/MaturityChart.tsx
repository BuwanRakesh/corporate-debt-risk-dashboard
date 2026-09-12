import { useState } from "react";
import type { DebtMaturity } from "@/types";

interface MaturityChartProps {
  maturities: DebtMaturity[];
}

export default function MaturityChart({ maturities }: MaturityChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxAmount = Math.max(...maturities.map((m) => m.amount), 1);
  const chartHeight = 220;
  const barWidth = 64;
  const gap = 48;
  const totalWidth = maturities.length * barWidth + (maturities.length - 1) * gap;

  // Y-axis gridlines
  const gridCount = 4;
  const gridValues = Array.from({ length: gridCount + 1 }, (_, i) =>
    (maxAmount * i) / gridCount
  );

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Debt Maturity Schedule
          </h3>
          <p className="text-xs text-slate-500">
            Upcoming debt obligations by year (in $B)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-sm bg-sky-500" />
          <span className="text-xs text-slate-400">Maturity Amount</span>
        </div>
      </div>

      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between" style={{ height: chartHeight }}>
          {gridValues
            .slice()
            .reverse()
            .map((val, i) => (
              <div
                key={i}
                className="flex items-center justify-end pr-2 text-[10px] font-medium text-slate-500"
                style={{ height: chartHeight / gridCount }}
              >
                ${val.toFixed(0)}B
              </div>
            ))}
        </div>

        {/* Chart area */}
        <div className="relative flex-1" style={{ height: chartHeight }}>
          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {gridValues.map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-slate-700/30"
                style={{ height: chartHeight / gridCount }}
              />
            ))}
          </div>

          {/* Bars */}
          <div
            className="absolute inset-0 flex items-end justify-center gap-12 pb-0"
          >
            {maturities.map((m, i) => {
              const barHeight = (m.amount / maxAmount) * chartHeight;
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={m.year}
                  className="group relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-10 z-10 whitespace-nowrap rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-xl">
                      {m.year}: ${m.amount.toFixed(1)}B
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-600" />
                    </div>
                  )}
                  {/* Bar */}
                  <div
                    className="w-16 rounded-t-md transition-all duration-500 ease-out"
                    style={{
                      height: barHeight,
                      background: isHovered
                        ? "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)"
                        : "linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%)",
                      boxShadow: isHovered
                        ? "0 0 20px rgba(14, 165, 233, 0.4)"
                        : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="mt-3 flex items-center justify-center gap-12 pl-10">
        {maturities.map((m) => (
          <div key={m.year} className="flex w-16 flex-col items-center">
            <span className="text-sm font-semibold text-slate-300">{m.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
