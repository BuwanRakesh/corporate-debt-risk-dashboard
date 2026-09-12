import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import type { RiskAssessment } from "@/types";

interface RiskBadgeProps {
  assessment: RiskAssessment;
}

export default function RiskBadge({ assessment }: RiskBadgeProps) {
  const icon =
    assessment.level === "Low Risk" ? (
      <ShieldCheck size={18} />
    ) : assessment.level === "Moderate Risk" ? (
      <Shield size={18} />
    ) : (
      <ShieldAlert size={18} />
    );

  return (
    <div
      className="relative flex flex-col gap-2 rounded-xl border p-5 transition-all duration-300"
      style={{
        backgroundColor: assessment.bgColor,
        borderColor: assessment.borderColor,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `${assessment.color}1a`,
            color: assessment.color,
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Risk Assessment
          </span>
          <span
            className="text-xl font-bold"
            style={{ color: assessment.color }}
          >
            {assessment.level}
          </span>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-slate-400">
        {assessment.description}
      </p>
    </div>
  );
}
