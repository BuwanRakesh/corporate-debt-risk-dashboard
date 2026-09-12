import type { FinancialData, RiskAssessment, RiskLevel } from "@/types";

export const DEFAULT_MSFT_DATA: FinancialData = {
  companyName: "Microsoft Corporation",
  ticker: "MSFT",
  totalDebt: 40.3,
  cashAndEquivalents: 76.8,
  operatingIncome: 155.2,
  annualInterestExpense: 3.1,
  debtMaturities: [
    { year: 2026, amount: 10.0 },
    { year: 2027, amount: 12.5 },
    { year: 2028, amount: 17.8 },
  ],
};

export function calculateInterestCoverage(data: FinancialData): number {
  if (data.annualInterestExpense === 0) return Infinity;
  return data.operatingIncome / data.annualInterestExpense;
}

export function calculateNetDebt(data: FinancialData): number {
  return data.totalDebt - data.cashAndEquivalents;
}

export function calculateDebtToEBIT(data: FinancialData): number {
  if (data.operatingIncome === 0) return Infinity;
  return data.totalDebt / data.operatingIncome;
}

export function assessRisk(interestCoverage: number): RiskAssessment {
  if (interestCoverage > 3.0) {
    return {
      level: "Low Risk",
      color: "#34d399",
      bgColor: "rgba(52, 211, 153, 0.12)",
      borderColor: "rgba(52, 211, 153, 0.35)",
      description: "Strong ability to cover interest obligations from operating income.",
    };
  }
  if (interestCoverage >= 1.5) {
    return {
      level: "Moderate Risk",
      color: "#fbbf24",
      bgColor: "rgba(251, 191, 36, 0.12)",
      borderColor: "rgba(251, 191, 36, 0.35)",
      description: "Adequate interest coverage but with less margin of safety.",
    };
  }
  return {
    level: "High Risk",
    color: "#f87171",
    bgColor: "rgba(248, 113, 113, 0.12)",
    borderColor: "rgba(248, 113, 113, 0.35)",
    description: "Elevated risk of difficulty meeting interest obligations.",
  };
}

export function formatCurrency(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1000) {
    return `${sign}$${(abs / 1000).toFixed(2)}T`;
  }
  return `${sign}$${abs.toFixed(1)}B`;
}

export function formatRatio(value: number): string {
  if (value === Infinity) return "∞";
  return `${value.toFixed(1)}x`;
}
