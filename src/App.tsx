import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Calculator,
  Activity,
  BarChart3,
  Landmark,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import RiskBadge from "@/components/RiskBadge";
import MaturityChart from "@/components/MaturityChart";
import LiquidityComparisonChart from "@/components/LiquidityComparisonChart";
import ControlPanel from "@/components/ControlPanel";
import MethodologySection from "@/components/MethodologySection";
import { DEFAULT_MSFT_DATA } from "@/financial-utils";
import {
  calculateInterestCoverage,
  calculateNetDebt,
  calculateDebtToEBIT,
  assessRisk,
  formatCurrency,
  formatRatio,
} from "@/financial-utils";
import type { FinancialData } from "@/types";

export default function App() {
  const [data, setData] = useState<FinancialData>(DEFAULT_MSFT_DATA);

  const interestCoverage = calculateInterestCoverage(data);
  const netDebt = calculateNetDebt(data);
  const debtToEBIT = calculateDebtToEBIT(data);
  const risk = assessRisk(interestCoverage);
  const totalMaturity = data.debtMaturities.reduce((sum, m) => sum + m.amount, 0);

  const fmtB = (v: number) => `$${v.toFixed(1)}B`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/60">
              <Landmark size={24} className="text-sky-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                Corporate Debt Risk Dashboard
              </h1>
              <p className="text-xs text-slate-500 sm:text-sm">
                {data.companyName} ({data.ticker})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-2">
              <Activity size={14} className="text-slate-500" />
              <span className="text-xs text-slate-400">Live recalculation</span>
              <div className="ml-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>
          </div>
        </header>

        {/* Metric Cards Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Interest Coverage"
            value={formatRatio(interestCoverage)}
            sublabel="Operating Income / Interest Expense"
            accentColor="#38bdf8"
            icon={<TrendingUp size={20} />}
            tooltip={{
              title: "Interest Coverage Ratio",
              formula: "EBIT / Interest Expense",
              calculation: `${fmtB(data.operatingIncome)} / ${fmtB(data.annualInterestExpense)}`,
              result: formatRatio(interestCoverage),
            }}
          />
          <MetricCard
            label="Net Debt"
            value={formatCurrency(netDebt)}
            sublabel="Total Debt minus Cash"
            accentColor={netDebt < 0 ? "#34d399" : "#f87171"}
            icon={<DollarSign size={20} />}
            tooltip={{
              title: "Net Debt",
              formula: "Total Debt - Cash",
              calculation: `${fmtB(data.totalDebt)} - ${fmtB(data.cashAndEquivalents)}`,
              result: formatCurrency(netDebt),
            }}
          />
          <MetricCard
            label="Debt / EBIT"
            value={formatRatio(debtToEBIT)}
            sublabel="Leverage multiple"
            accentColor="#a78bfa"
            icon={<Calculator size={20} />}
            tooltip={{
              title: "Debt / EBIT Ratio",
              formula: "Total Debt / EBIT",
              calculation: `${fmtB(data.totalDebt)} / ${fmtB(data.operatingIncome)}`,
              result: formatRatio(debtToEBIT),
            }}
          />
          <MetricCard
            label="Total Maturities"
            value={formatCurrency(totalMaturity)}
            sublabel="2026–2028 obligations"
            accentColor="#fb923c"
            icon={<BarChart3 size={20} />}
          />
        </div>

        {/* Risk Badge */}
        <div className="mb-6">
          <RiskBadge assessment={risk} />
        </div>

        {/* Main content grid: charts + control panel */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Charts column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <MaturityChart maturities={data.debtMaturities} />
            <LiquidityComparisonChart data={data} />
          </div>

          {/* Control panel column */}
          <div className="lg:col-span-1">
            <ControlPanel
              data={data}
              onChange={setData}
              onReset={() => setData(DEFAULT_MSFT_DATA)}
            />
          </div>
        </div>

        {/* Financial Methodology & Formulas Section */}
        <MethodologySection
          data={data}
          interestCoverage={interestCoverage}
          netDebt={netDebt}
          debtToEBIT={debtToEBIT}
        />

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center gap-1 border-t border-slate-800/60 pt-6 text-center">
          <p className="text-xs text-slate-500">
            Data is illustrative and pre-loaded for demonstration purposes.
          </p>
          <p className="text-[11px] text-slate-600">
            Adjust values in the Control Panel to see metrics and charts update in real time.
          </p>
        </footer>
      </div>
    </div>
  );
}
