import { useId } from "react";
import { RotateCcw, Sliders, Building2 } from "lucide-react";
import type { FinancialData } from "@/types";

interface ControlPanelProps {
  data: FinancialData;
  onChange: (data: FinancialData) => void;
  onReset: () => void;
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}

function NumberField({ label, value, onChange, prefix = "$", suffix = "B" }: NumberFieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-slate-400">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-slate-700/60 bg-slate-900/60 transition-colors focus-within:border-sky-500/60 focus-within:bg-slate-900/80">
        {prefix && (
          <span className="pl-3 text-sm font-medium text-slate-500">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          step="0.1"
          min="0"
          value={value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(isNaN(v) ? 0 : Math.max(0, v));
          }}
          className="w-full bg-transparent px-2 py-2.5 text-sm font-semibold text-slate-100 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="pr-3 text-sm font-medium text-slate-500">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export default function ControlPanel({ data, onChange, onReset }: ControlPanelProps) {
  const updateField = <K extends keyof FinancialData>(
    key: K,
    value: FinancialData[K]
  ) => {
    onChange({ ...data, [key]: value });
  };

  const updateMaturity = (index: number, amount: number) => {
    const maturities = data.debtMaturities.map((m, i) =>
      i === index ? { ...m, amount } : m
    );
    onChange({ ...data, debtMaturities: maturities });
  };

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-200">Control Panel</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-700/40 hover:text-slate-200"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Company info */}
      <div className="mb-4 flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-400">Company Name</label>
        <div className="flex items-center rounded-lg border border-slate-700/60 bg-slate-900/60 transition-colors focus-within:border-sky-500/60">
          <Building2 size={14} className="ml-3 text-slate-500" />
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="w-full bg-transparent px-2 py-2.5 text-sm font-semibold text-slate-100 outline-none"
          />
        </div>
        <div className="mt-1.5 flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Ticker Symbol</label>
          <input
            type="text"
            value={data.ticker}
            onChange={(e) => updateField("ticker", e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-sm font-semibold text-slate-100 outline-none transition-colors focus:border-sky-500/60"
          />
        </div>
      </div>

      <div className="mb-2 border-t border-slate-700/40 pt-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Financial Inputs
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <NumberField
          label="Total Debt"
          value={data.totalDebt}
          onChange={(v) => updateField("totalDebt", v)}
        />
        <NumberField
          label="Cash & Cash Equivalents"
          value={data.cashAndEquivalents}
          onChange={(v) => updateField("cashAndEquivalents", v)}
        />
        <NumberField
          label="Operating Income (EBIT)"
          value={data.operatingIncome}
          onChange={(v) => updateField("operatingIncome", v)}
        />
        <NumberField
          label="Annual Interest Expense"
          value={data.annualInterestExpense}
          onChange={(v) => updateField("annualInterestExpense", v)}
        />
      </div>

      <div className="mb-2 mt-4 border-t border-slate-700/40 pt-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Debt Maturity schedule
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {data.debtMaturities.map((m, i) => (
          <NumberField
            key={m.year}
            label={`Maturity ${m.year}`}
            value={m.amount}
            onChange={(v) => updateMaturity(i, v)}
          />
        ))}
      </div>
    </div>
  );
}
