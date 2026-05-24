"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 1840000, expenses: 920000, profit: 920000 },
  { month: "Feb", revenue: 2120000, expenses: 1040000, profit: 1080000 },
  { month: "Mar", revenue: 1960000, expenses: 980000, profit: 980000 },
  { month: "Apr", revenue: 2450000, expenses: 1100000, profit: 1350000 },
  { month: "May", revenue: 2280000, expenses: 1020000, profit: 1260000 },
  { month: "Jun", revenue: 2710000, expenses: 1150000, profit: 1560000 },
  { month: "Jul", revenue: 3020000, expenses: 1280000, profit: 1740000 },
  { month: "Aug", revenue: 2850000, expenses: 1200000, profit: 1650000 },
  { month: "Sep", revenue: 3180000, expenses: 1310000, profit: 1870000 },
  { month: "Oct", revenue: 3450000, expenses: 1420000, profit: 2030000 },
  { month: "Nov", revenue: 3720000, expenses: 1500000, profit: 2220000 },
  { month: "Dec", revenue: 4100000, expenses: 1650000, profit: 2450000 },
];

const formatKES = (value: number) => `${(value / 1000000).toFixed(1)}M`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-foreground mb-2">{label} 2025</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="font-medium text-foreground">KES {(p.value / 1000).toFixed(0)}K</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Full year 2025 performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-3 h-0.5 rounded" style={{ background: "hsl(213 94% 48%)" }} />
            Revenue
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-3 h-0.5 rounded" style={{ background: "hsl(0 84% 60%)" }} />
            Expenses
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-3 h-0.5 rounded" style={{ background: "hsl(142 72% 42%)" }} />
            Profit
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 72%, 42%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(142, 72%, 42%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatKES}
            tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(213, 94%, 48%)"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="hsl(0, 84%, 60%)"
            strokeWidth={2}
            fill="none"
            strokeDasharray="4 2"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="hsl(142, 72%, 42%)"
            strokeWidth={2}
            fill="url(#colorProfit)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
