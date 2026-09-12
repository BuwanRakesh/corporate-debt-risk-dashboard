# Corporate Debt Risk Dashboard

An interactive, web-based financial analytics application designed to evaluate corporate debt obligations, credit risk profiles, and capital structure dynamics. Built using real-world corporate financial data from **Microsoft Corporation (MSFT)**, the dashboard provides dynamic risk assessments, live recalculations, and transparent methodological breakdowns for recruiters, analysts, and stakeholders.

---

## 🔗 Live Application & Links
* **Live Interactive Dashboard:** [https://corporate-debt-risk-x7n6.bolt.host](https://corporate-debt-risk-x7n6.bolt.host)
* **GitHub Repository:** [https://github.com/BuwanRakesh/corporate-debt-risk-dashboard](https://github.com/BuwanRakesh/corporate-debt-risk-dashboard)

---

## 📊 Core Features & Functionality

* **Dynamic Financial Recalculation Engine:** Adjust operational inputs in the Control Panel to visualize real-time updates across debt, coverage, and liquidity metrics.
* **Automated Credit Risk Statusing:** Built-in threshold logic categorizes metric health across Green (Low Risk), Yellow (Moderate Risk), and Red (High Risk) indicators.
* **Educational Tooltips:** Integrated `ℹ️` info icons next to each primary metric display immediate formula definitions and live step-by-step arithmetic.
* **Collapsible Methodology Module:** An expandable section detailing full mathematical definitions, variable definitions, and qualitative interpretations for financial reviewers.
* **Dark-Mode Financial UI:** Tailored for corporate presentation and executive review.

---
## 📐 Financial Methodology & Metrics

The dashboard evaluates corporate solvency and credit risk across three primary analytical framework pillars:

### 1. Interest Coverage Ratio
Evaluates a company's capacity to service its outstanding debt using operational earnings.

**Formula:** `Operating Income (EBIT) / Interest Expense`

* **MSFT Evaluation:** $155.2B / $3.1B = **50.1x**
* **Benchmark:** Ratios above **3.0x** indicate strong debt service capability; ratios below **1.5x** signal distress risk.

### 2. Net Debt
Measures total obligations after accounting for highly liquid cash reserves that could immediately extinguish debt.

**Formula:** `Total Debt - Cash & Cash Equivalents`

* **MSFT Evaluation:** $10.0B - $46.5B = **-$36.5B** *(Net Cash Position)*
* **Benchmark:** Negative Net Debt indicates a net-cash fortress balance sheet.

### 3. Debt / EBIT (Leverage Multiple)
Assesses the number of years of operating earnings required to pay off total outstanding principal debt.

**Formula:** `Total Debt / EBIT`

* **MSFT Evaluation:** $10.0B / $155.2B = **0.3x**
* **Benchmark:** Multiples below **2.0x** signify conservative leverage; above **4.0x–5.0x** indicates high credit risk.
---

## 🛠️ Technology Stack

* **Frontend:** React, TypeScript, Tailwind CSS
* **Icons & Components:** Lucide React, Framer Motion
* **Build & Deployment:** Vite, Bolt.new platform architecture

---

## 🚀 Getting Started Locally

To run this application on your local machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/BuwanRakesh/corporate-debt-risk-dashboard.git](https://github.com/BuwanRakesh/corporate-debt-risk-dashboard.git)
   cd corporate-debt-risk-dashboard
   npm install
   npm run dev
   npm run build
   Bhuvan Rakesh
GitHub: @BuwanRakesh
