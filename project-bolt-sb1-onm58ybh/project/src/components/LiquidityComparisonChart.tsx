import { useState } from "react";
import type { FinancialData } from "@/types";

interface LiquidityComparisonProps {
  data: FinancialData;
}

export default function LiquidityComparisonChart({
  data,
}: LiquidityComparisonProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const bars = [
    {
      key: "cash",
      label: "Cash & Equivalents",
      value: data.cashAndEquivalents,
      color: "#34d399",
      gradientFrom: "#6ee7b7",
      gradientTo: "#059669",
    },
    {
      key: "debt",
      label: "Total Debt",
      value: data.totalDebt,
      color: "#f87171",
      gradientFrom: "#fca5a5",
      gradientTo: "#dc2626",
    },
    {
      key: "ebit",
      label: "Operating Income (EBIT)",
      value: data.operatingIncome,
      color: "#60a5fa",
      gradientFrom: "#93c5fd",
      gradientTo: "#2563eb",
    },
  ];

  const maxValue = Math.max(...bars.map((b) => b.value), 1);
  const chartHeight = 240;
  const barWidth = 80;
  const gap = 56;

  const gridCount = 4;
  const gridValues = Array.from({ length: gridCount + 1 }, (_, i) =>
    (maxValue * i) / gridCount
  );

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-200">
          Liquidity vs. Debt Comparison
        </h3>
        <p className="text-xs text-slate-500">
          Cash position, total debt, and earnings power (in $B)
        </p>
      </div>

      <div className="flex">
        {/* Y-axis */}
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

        {/* Chart */}
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
          <div className="absolute inset-0 flex items-end justify-center gap-14">
            {bars.map((bar) => {
              const barHeight = (bar.value / maxValue) * chartHeight;
              const isHovered = hoveredBar === bar.key;
              return (
                <div
                  key={bar.key}
                  className="group relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredBar(bar.key)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {isHovered && (
                    <div className="absolute -top-10 z-10 whitespace-nowrap rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-xl">
                      ${bar.value.toFixed(1)}B
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-600" />
                    </div>
                  )}
                  <div
                    className="rounded-t-md transition-all duration-500 ease-out"
                    style={{
                      width: barWidth,
                      height: barHeight,
                      background: isHovered
                        ? `linear-gradient(180deg, ${bar.gradientFrom} 0%, ${bar.gradientTo} 100%)`
                        : `linear-gradient(180deg, ${bar.color}99 0%, ${bar.gradientTo}99 100%)`,
                      boxShadow: isHovered
                        ? `0 0 20px ${bar.color}55`
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
      <div className="mt-3 flex items-center justify-center gap-14 pl-10">
        {bars.map((bar) => (
          <div key={bar.key} className="flex w-20 flex-col items-center">
            <div className="mb-1 h-2 w-2 rounded-full" style={{ background: bar.color }} />
            <span className="text-center text-[11px] font-medium leading-tight text-slate-400">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
