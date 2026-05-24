"use client";

import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Building2, TrendingUp, Users, DollarSign, ArrowUpRight, Plus, Star } from "lucide-react";

const revenueData = [
  { month: "Jul", revenue: 280 },
  { month: "Aug", revenue: 320 },
  { month: "Sep", revenue: 295 },
  { month: "Oct", revenue: 380 },
  { month: "Nov", revenue: 410 },
  { month: "Dec", revenue: 465 },
];

const businesses = [
  { id: "B001", name: "Mama Njeri's Kitchen", sector: "F&B", revenue: 840000, employees: 12, growth: 18.4, status: "growing" },
  { id: "B002", name: "TechFix Nairobi", sector: "Tech", revenue: 1240000, employees: 8, growth: 32.1, status: "growing" },
  { id: "B003", name: "Kuza Crafts", sector: "Retail", revenue: 380000, employees: 4, growth: -3.2, status: "stable" },
  { id: "B004", name: "Green Farm Organics", sector: "Agri", revenue: 2100000, employees: 28, growth: 24.8, status: "growing" },
  { id: "B005", name: "PrintQuick Ltd", sector: "Services", revenue: 560000, employees: 6, growth: 8.5, status: "stable" },
  { id: "B006", name: "AutoCare Garage", sector: "Auto", revenue: 920000, employees: 10, growth: -1.8, status: "stable" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  growing: { label: "Growing", className: "bg-green-50 text-green-700 border-green-200" },
  stable: { label: "Stable", className: "bg-blue-50 text-blue-700 border-blue-200" },
  declining: { label: "At Risk", className: "bg-red-50 text-red-600 border-red-200" },
};

export default function SmePage() {
  return (
    <AppShell title="SME Management Platform" subtitle="Support and track small and medium enterprise clients">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Registered SMEs", value: "284", icon: Building2, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Clients", value: "241", icon: Users, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total Revenue", value: "KES 6.04M", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Avg Growth Rate", value: "13.1%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", s.bg)}>
                <Icon size={16} className={s.color} />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Platform Revenue (KES 000s)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 6 months trend</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="smeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(213, 94%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(214, 20%, 88%)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: any) => `KES ${v}K`}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(213, 94%, 48%)" strokeWidth={2} fill="url(#smeGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* SME List */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-foreground">SME Clients</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Top performing businesses</p>
            </div>
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <Plus size={12} /> Add SME
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Business</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Sector</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Revenue</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Staff</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Growth</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((b) => {
                  const st = statusConfig[b.status];
                  return (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 size={12} className="text-primary" />
                          </div>
                          <span className="text-xs font-medium text-foreground">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">{b.sector}</td>
                      <td className="px-3 py-3 text-xs font-semibold text-foreground text-right tabular-nums">
                        KES {(b.revenue / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground text-center">{b.employees}</td>
                      <td className={cn("px-3 py-3 text-xs font-semibold text-right tabular-nums", b.growth >= 0 ? "text-green-600" : "text-red-500")}>
                        {b.growth >= 0 ? "+" : ""}{b.growth}%
                      </td>
                      <td className="px-5 py-3 text-center">
                        <Badge variant="outline" className={cn("text-[10px] h-5 px-2 font-medium", st.className)}>
                          {st.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
