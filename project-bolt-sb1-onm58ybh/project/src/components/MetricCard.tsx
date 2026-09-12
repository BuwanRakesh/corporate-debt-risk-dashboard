import { useState, useId } from "react";
import { Info } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  accentColor?: string;
  icon: React.ReactNode;
  tooltip?: {
    title: string;
    formula: string;
    calculation: string;
    result: string;
  };
}

export default function MetricCard({
  label,
  value,
  sublabel,
  accentColor = "#3b82f6",
  icon,
  tooltip,
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipId = useId();

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 transition-all duration-300 hover:border-slate-600/80 hover:bg-slate-800/60">
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {label}
            </span>
            {tooltip && (
              <div className="relative">
                <button
                  type="button"
                  aria-label={`${label} formula info`}
                  aria-describedby={showTooltip ? tooltipId : undefined}
                  onClick={() => setShowTooltip((s) => !s)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-slate-500 transition-colors hover:text-slate-300"
                >
                  <Info size={13} />
                </button>
                {showTooltip && (
                  <div
                    id={tooltipId}
                    role="tooltip"
                    className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg border border-slate-600 bg-slate-900 p-3 shadow-2xl"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                      {tooltip.title}
                    </div>
                    <div className="mb-2 rounded bg-slate-800/80 px-2 py-1.5 text-center font-mono text-xs text-slate-200">
                      {tooltip.formula}
                    </div>
                    <div className="mb-1.5 font-mono text-[11px] leading-relaxed text-slate-400">
                      {tooltip.calculation}
                    </div>
                    <div className="border-t border-slate-700/50 pt-1.5 text-center font-mono text-sm font-bold" style={{ color: accentColor }}>
                      = {tooltip.result}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ color: accentColor }}
          >
            {value}
          </span>
          {sublabel && (
            <span className="text-xs text-slate-500">{sublabel}</span>
          )}
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
