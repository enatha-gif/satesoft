"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Electronics", value: 38, amount: 1480000 },
  { name: "Food & Bev", value: 24, amount: 936000 },
  { name: "Clothing", value: 18, amount: 702000 },
  { name: "Furniture", value: 12, amount: 468000 },
  { name: "Other", value: 8, amount: 312000 },
];

const COLORS = [
  "hsl(213, 94%, 48%)",
  "hsl(142, 72%, 42%)",
  "hsl(38, 92%, 50%)",
  "hsl(195, 85%, 45%)",
  "hsl(215, 16%, 70%)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-2.5 text-xs">
        <p className="font-semibold text-foreground">{d.name}</p>
        <p className="text-muted-foreground">KES {(d.amount / 1000).toFixed(0)}K</p>
        <p className="text-primary font-medium">{d.value}%</p>
      </div>
    );
  }
  return null;
};

export function SalesByCategory() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sales by Category</h3>
        <p className="text-xs text-muted-foreground mt-0.5">This month distribution</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2.5">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: COLORS[i] }}
              />
              <span className="text-xs text-muted-foreground flex-1 truncate">{item.name}</span>
              <span className="text-xs font-semibold text-foreground tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
