"use client";

import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, Users, ShoppingBag, TrendingUp, FileText, Briefcase, ArrowUpRight } from "lucide-react";

const budgetData = [
  { dept: "Sales", budget: 2800, actual: 2450 },
  { dept: "HR", budget: 1200, actual: 1180 },
  { dept: "IT", budget: 980, actual: 920 },
  { dept: "Ops", budget: 1600, actual: 1720 },
  { dept: "Mktg", budget: 750, actual: 680 },
  { dept: "Legal", budget: 400, actual: 380 },
];

const modules = [
  { title: "Finance & Accounting", desc: "General ledger, AP/AR, cash flow", icon: DollarSign, color: "text-primary", bg: "bg-primary/10", stats: "KES 8.2M processed" },
  { title: "Human Resources", desc: "Payroll, leave, performance mgmt", icon: Users, color: "text-green-600", bg: "bg-green-50", stats: "184 employees" },
  { title: "Procurement", desc: "Purchase orders, vendor management", icon: ShoppingBag, color: "text-amber-600", bg: "bg-amber-50", stats: "48 active POs" },
  { title: "Asset Management", desc: "Track and depreciate company assets", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", stats: "324 assets tracked" },
  { title: "Financial Reports", desc: "P&L, balance sheet, cash statements", icon: FileText, color: "text-rose-600", bg: "bg-rose-50", stats: "Last: Oct 2025" },
  { title: "Forecasting", desc: "Revenue projections and budgeting", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50", stats: "Q4 forecast ready" },
];

export default function ErpPage() {
  return (
    <AppShell title="ERP System" subtitle="Enterprise resource planning and financial management">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.title}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", mod.bg)}>
                  <Icon size={18} className={mod.color} />
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{mod.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{mod.desc}</p>
              <p className="text-xs font-medium text-primary">{mod.stats}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-foreground">Department Budget vs Actual (KES 000s)</h3>
          <p className="text-xs text-muted-foreground mt-0.5">FY 2025 — Current quarter</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={budgetData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
            <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 20%, 88%)", borderRadius: "8px", fontSize: "12px" }}
              formatter={(v: any) => `KES ${v}K`}
            />
            <Bar dataKey="budget" fill="hsl(213, 94%, 48%)" radius={[3, 3, 0, 0]} name="Budget" />
            <Bar dataKey="actual" fill="hsl(142, 72%, 42%)" radius={[3, 3, 0, 0]} name="Actual" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 justify-center">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-2 rounded-sm" style={{ background: "hsl(213, 94%, 48%)" }} />
            Budget
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-2 rounded-sm" style={{ background: "hsl(142, 72%, 42%)" }} />
            Actual Spend
          </span>
        </div>
      </div>
    </AppShell>
  );
}
