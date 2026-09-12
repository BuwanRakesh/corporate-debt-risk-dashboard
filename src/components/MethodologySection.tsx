import { useState } from "react";
import { BookOpen, ChevronDown, TrendingUp, DollarSign, Calculator, Sigma } from "lucide-react";
import type { FinancialData } from "@/types";
import { formatCurrency, formatRatio } from "@/financial-utils";

interface MethodologySectionProps {
  data: FinancialData;
  interestCoverage: number;
  netDebt: number;
  debtToEBIT: number;
}

interface FormulaCardProps {
  title: string;
  formula: string;
  calculation: string;
  result: string;
  icon: React.ReactNode;
  accentColor: string;
}

function FormulaCard({ title, formula, calculation, result, icon, accentColor }: FormulaCardProps) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 transition-all duration-300 hover:border-slate-600/80">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
        >
          {icon}
        </div>
        <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      </div>

      {/* Formula */}
      <div className="mb-4">
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Formula
        </span>
        <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 px-4 py-3 text-center font-mono text-sm text-slate-200">
          {formula}
        </div>
      </div>

      {/* Live Calculation */}
      <div>
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Current Calculation
        </span>
        <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 px-4 py-3">
          <div className="mb-2 font-mono text-sm leading-relaxed text-slate-300">
            {calculation}
          </div>
          <div className="border-t border-slate-700/50 pt-2 text-center font-mono text-lg font-bold" style={{ color: accentColor }}>
            = {result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MethodologySection({
  data,
  interestCoverage,
  netDebt,
  debtToEBIT,
}: MethodologySectionProps) {
  const [expanded, setExpanded] = useState(false);

  const icCalculation = `${formatCurrency(data.operatingIncome)} / ${formatCurrency(data.annualInterestExpense)}`;
  const ndCalculation = `${formatCurrency(data.totalDebt)} - ${formatCurrency(data.cashAndEquivalents)}`;
  const dbCalculation = `${formatCurrency(data.totalDebt)} / ${formatCurrency(data.operatingIncome)}`;

  return (
    <div className="mt-6 rounded-xl border border-slate-700/60 bg-slate-800/30 overflow-hidden">
      {/* Expand/Collapse Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between p-5 transition-colors hover:bg-slate-800/50"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60">
            <BookOpen size={20} className="text-sky-400" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-slate-200">
              Financial Methodology &amp; Formulas
            </h3>
            <p className="text-xs text-slate-500">
              Formula definitions and live step-by-step calculations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {expanded ? "Hide" : "Show"}
          </span>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-700/40 p-5">
            <p className="mb-5 text-xs leading-relaxed text-slate-400">
              All metrics are calculated from the currently selected company's financial inputs.
              Adjust values in the Control Panel to see these calculations update in real time.
            </p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <FormulaCard
                title="Interest Coverage Ratio"
                formula="Operating Income (EBIT) / Annual Interest Expense"
                calculation={icCalculation}
                result={formatRatio(interestCoverage)}
                icon={<TrendingUp size={18} />}
                accentColor="#38bdf8"
              />
              <FormulaCard
                title="Net Debt"
                formula="Total Debt - Cash & Cash Equivalents"
                calculation={ndCalculation}
                result={formatCurrency(netDebt)}
                icon={<DollarSign size={18} />}
                accentColor={netDebt < 0 ? "#34d399" : "#f87171"}
              />
              <FormulaCard
                title="Debt / EBIT"
                formula="Total Debt / Operating Income (EBIT)"
                calculation={dbCalculation}
                result={formatRatio(debtToEBIT)}
                icon={<Calculator size={18} />}
                accentColor="#a78bfa"
              />
            </div>

            {/* Interpretation Guide */}
            <div className="mt-5 rounded-lg border border-slate-700/40 bg-slate-900/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sigma size={15} className="text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Interpretation Guide
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed text-slate-400 sm:grid-cols-3">
                <div>
                  <span className="font-semibold text-emerald-400">Interest Coverage</span>
                  <p className="mt-1">
                    Above 3.0x indicates strong ability to service debt.
                    1.5–3.0x is moderate; below 1.5x signals elevated risk.
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-sky-400">Net Debt</span>
                  <p className="mt-1">
                    A negative value means cash exceeds total debt — a net cash position,
                    generally favorable for financial flexibility.
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-violet-400">Debt / EBIT</span>
                  <p className="mt-1">
                    Measures how many years of operating income would be needed to
                    repay all debt. Lower values indicate lighter leverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
