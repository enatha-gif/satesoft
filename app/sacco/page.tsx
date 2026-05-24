"use client";

import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Landmark, Users, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";

const loanTrend = [
  { month: "Jul", disbursed: 4200, repaid: 3800 },
  { month: "Aug", disbursed: 4800, repaid: 4100 },
  { month: "Sep", disbursed: 5200, repaid: 4600 },
  { month: "Oct", disbursed: 4900, repaid: 4800 },
  { month: "Nov", disbursed: 5600, repaid: 5100 },
  { month: "Dec", disbursed: 6200, repaid: 5400 },
];

const members = [
  { id: "M001", name: "Alice Kamau", savings: 184000, loan: 250000, status: "active", dueDate: "Dec 15" },
  { id: "M002", name: "Brian Omondi", savings: 92000, loan: 0, status: "active", dueDate: "—" },
  { id: "M003", name: "Catherine Njoki", savings: 340000, loan: 180000, status: "active", dueDate: "Jan 3" },
  { id: "M004", name: "David Kiprop", savings: 56000, loan: 120000, status: "overdue", dueDate: "Nov 30" },
  { id: "M005", name: "Esther Waweru", savings: 210000, loan: 350000, status: "active", dueDate: "Dec 28" },
];

export default function SaccoPage() {
  return (
    <AppShell title="SACCO Platform" subtitle="Savings and credit cooperative management">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Members", value: "1,248", icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Total Savings", value: "KES 48.2M", icon: Wallet, color: "text-green-600", bg: "bg-green-50" },
          { label: "Loans Disbursed", value: "KES 31.8M", icon: Landmark, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Recovery Rate", value: "94.2%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
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
        {/* Loan chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Loan Activity (KES 000s)</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Disbursements vs repayments</p>
            </div>
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <Plus size={12} /> New Loan
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={loanTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(214, 20%, 88%)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: any) => `KES ${v}K`}
              />
              <Line type="monotone" dataKey="disbursed" stroke="hsl(213, 94%, 48%)" strokeWidth={2} dot={{ r: 3 }} name="Disbursed" />
              <Line type="monotone" dataKey="repaid" stroke="hsl(142, 72%, 42%)" strokeWidth={2} dot={{ r: 3 }} name="Repaid" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent members */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Members</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="divide-y divide-border/50">
            {members.map((m) => (
              <div key={m.id} className="px-4 py-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-foreground">{m.name}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] h-4 px-1.5",
                      m.status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                    )}
                  >
                    {m.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ArrowUpRight size={10} className="text-green-500" />
                    KES {(m.savings / 1000).toFixed(0)}K savings
                  </span>
                  {m.loan > 0 && (
                    <span className="flex items-center gap-1">
                      <ArrowDownLeft size={10} className="text-amber-500" />
                      KES {(m.loan / 1000).toFixed(0)}K loan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
