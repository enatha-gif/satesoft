"use client";

import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, DollarSign, Calendar, Award, Plus, Check, X } from "lucide-react";

const students = [
  { id: "STU001", name: "Kevin Njoroge", class: "Form 4A", fee: 48000, paid: 48000, status: "cleared" },
  { id: "STU002", name: "Mary Achieng", class: "Form 3B", fee: 48000, paid: 24000, status: "partial" },
  { id: "STU003", name: "Peter Maina", class: "Form 4A", fee: 48000, paid: 0, status: "unpaid" },
  { id: "STU004", name: "Grace Wambui", class: "Form 2C", fee: 48000, paid: 48000, status: "cleared" },
  { id: "STU005", name: "Samuel Kibet", class: "Form 1D", fee: 48000, paid: 36000, status: "partial" },
  { id: "STU006", name: "Faith Chemutai", class: "Form 3B", fee: 48000, paid: 48000, status: "cleared" },
];

const classes = [
  { name: "Form 1", students: 142, teacher: "Mr. Kamau", subjects: 12 },
  { name: "Form 2", students: 138, teacher: "Mrs. Ochieng", subjects: 12 },
  { name: "Form 3", students: 126, teacher: "Mr. Mwenda", subjects: 14 },
  { name: "Form 4", students: 118, teacher: "Mrs. Njoki", subjects: 14 },
];

const feeStatus: Record<string, { label: string; className: string; icon: any }> = {
  cleared: { label: "Cleared", className: "bg-green-50 text-green-700 border-green-200", icon: Check },
  partial: { label: "Partial", className: "bg-amber-50 text-amber-700 border-amber-200", icon: null },
  unpaid: { label: "Unpaid", className: "bg-red-50 text-red-600 border-red-200", icon: X },
};

export default function SchoolPage() {
  return (
    <AppShell title="School Management" subtitle="Student records, fees, and academic management">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", value: "524", icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Teachers", value: "38", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
          { label: "Fee Collected", value: "KES 18.4M", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Next Exam", value: "Dec 2", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
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
        {/* Classes */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Classes Overview</h3>
          </div>
          <div className="divide-y divide-border/50">
            {classes.map((cls) => (
              <div key={cls.name} className="px-5 py-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen size={13} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{cls.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] h-5 px-2">
                    {cls.students} students
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Class Teacher: {cls.teacher}</span>
                  <span>{cls.subjects} subjects</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Management */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Fee Management</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Term 3 2025 — selected students</p>
            </div>
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <Plus size={12} /> Record Payment
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Class</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Fee</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Paid</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Balance</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const st = feeStatus[s.status];
                  const balance = s.fee - s.paid;
                  return (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-xs font-medium text-foreground">{s.name}</td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">{s.class}</td>
                      <td className="px-3 py-3 text-xs text-right tabular-nums">KES {s.fee.toLocaleString()}</td>
                      <td className="px-3 py-3 text-xs font-medium text-green-600 text-right tabular-nums">KES {s.paid.toLocaleString()}</td>
                      <td className="px-3 py-3 text-xs font-medium text-right tabular-nums" style={{ color: balance > 0 ? "hsl(0, 84%, 60%)" : "hsl(142, 72%, 42%)" }}>
                        {balance > 0 ? `KES ${balance.toLocaleString()}` : "Nil"}
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
