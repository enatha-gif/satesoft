import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: number;
  changePeriod?: string;
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
  suffix?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changePeriod = "vs last month",
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  prefix,
  suffix,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              isPositive && "bg-green-50 text-green-700",
              isNegative && "bg-red-50 text-red-600",
              isNeutral && "bg-muted text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp size={11} />}
            {isNegative && <TrendingDown size={11} />}
            {isNeutral && <Minus size={11} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground tabular-nums">
          {prefix && <span className="text-base font-semibold text-muted-foreground">{prefix}</span>}
          {value}
          {suffix && <span className="text-base font-semibold text-muted-foreground ml-1">{suffix}</span>}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">{changePeriod}</p>
        )}
      </div>
    </div>
  );
}
