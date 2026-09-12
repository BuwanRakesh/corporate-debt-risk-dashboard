export interface DebtMaturity {
  year: number;
  amount: number; // in billions
}

export interface FinancialData {
  companyName: string;
  ticker: string;
  totalDebt: number; // in billions
  cashAndEquivalents: number; // in billions
  operatingIncome: number; // in billions (EBIT)
  annualInterestExpense: number; // in billions
  debtMaturities: DebtMaturity[];
}

export type RiskLevel = "Low Risk" | "Moderate Risk" | "High Risk";

export interface RiskAssessment {
  level: RiskLevel;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}
