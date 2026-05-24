"use client";

import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package } from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 1840, orders: 142, customers: 98 },
  { month: "Feb", revenue: 2120, orders: 168, customers: 115 },
  { month: "Mar", revenue: 1960, orders: 155, customers: 102 },
  { month: "Apr", revenue: 2450, orders: 198, customers: 134 },
  { month: "May", revenue: 2280, orders: 182, customers: 121 },
  { month: "Jun", revenue: 2710, orders: 216, customers: 158 },
  { month: "Jul", revenue: 3020, orders: 248, customers: 172 },
  { month: "Aug", revenue: 2850, orders: 230, customers: 165 },
  { month: "Sep", revenue: 3180, orders: 264, customers: 188 },
  { month: "Oct", revenue: 3450, orders: 288, customers: 204 },
  { month: "Nov", revenue: 3720, orders: 312, customers: 218 },
  { month: "Dec", revenue: 4100, orders: 348, customers: 242 },
];

const categoryData = [
  { name: "Electronics", value: 38, revenue: 1556000 },
  { name: "Furniture", value: 24, revenue: 984000 },
  { name: "Office Supplies", value: 18, revenue: 738000 },
  { name: "Accessories", value: 12, revenue: 492000 },
  { name: "Other", value: 8, revenue: 328000 },
];

const topProducts = [
  { name: "Dell Monitor 24\"", sales: 184, revenue: 7728000 },
  { name: "Office Chair Exec", sales: 142, revenue: 3479000 },
  { name: "HP LaserJet Pro", sales: 98, revenue: 5684000 },
  { name: "Filing Cabinet 4D", sales: 87, revenue: 1374600 },
  { name: "Keyboard Wireless", sales: 256, revenue: 819200 },
];

const COLORS = [
  "hsl(213, 94%, 48%)",
  "hsl(142, 72%, 42%)",
  "hsl(38, 92%, 50%)",
  "hsl(195, 85%, 45%)",
  "hsl(215, 16%, 70%)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-foreground mb-1.5">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="font-medium text-foreground">{typeof p.value === "number" && p.name === "revenue" ? `KES ${p.value}K` : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics & Reports" subtitle="Business intelligence and performance insights">
      {/* KPIs Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "YTD Revenue", value: "KES 32.7M", change: 24.5, positive: true, icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
          { label: "Total Orders", value: "2,351", change: 18.2, positive: true, icon: ShoppingCart, color: "text-green-600", bg: "bg-green-50" },
          { label: "Unique Customers", value: "1,817", change: 11.4, positive: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Order Value", value: "KES 13,910", change: -2.1, positive: false, icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", kpi.bg)}>
                  <Icon size={16} className={kpi.color} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  kpi.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                )}>
                  {kpi.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {/* Revenue + Orders Trend */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Revenue & Orders Trend</h3>
            <p className="text-xs text-muted-foreground mt-0.5">12-month overview — 2025</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(213, 94%, 48%)" strokeWidth={2} fill="url(#revGrad)" />
              <Line type="monotone" dataKey="orders" stroke="hsl(142, 72%, 42%)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Donut */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Revenue by Category</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Annual distribution</p>
          </div>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 w-full mt-3">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                  <span className="text-xs font-semibold text-foreground tabular-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top Products Bar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Top Products by Revenue</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Ranked by annual revenue</p>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => {
              const maxRev = topProducts[0].revenue;
              const pct = (p.revenue / maxRev) * 100;
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground truncate flex-1 mr-2">{p.name}</span>
                    <span className="text-xs font-semibold text-foreground tabular-nums">
                      KES {(p.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{p.sales} units sold</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Customers Bar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Customer Acquisition</h3>
            <p className="text-xs text-muted-foreground mt-0.5">New customers per month — 2025</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="customers" fill="hsl(213, 94%, 48%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}
