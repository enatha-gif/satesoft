"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Users,
  TrendingUp,
  Building2,
  Star,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: "C001", name: "Wanjiku Enterprises", contact: "Grace Wanjiku", email: "grace@wanjiku.co.ke",
    phone: "+254 712 345 678", location: "Nairobi", segment: "enterprise", value: 2840000,
    orders: 48, lastOrder: "2 days ago", rating: 5, status: "active",
  },
  {
    id: "C002", name: "Nairobi Tech Hub", contact: "James Otieno", email: "james@ntechhub.co.ke",
    phone: "+254 722 456 789", location: "Nairobi", segment: "sme", value: 1560000,
    orders: 27, lastOrder: "1 week ago", rating: 4, status: "active",
  },
  {
    id: "C003", name: "Mombasa Traders Ltd", contact: "Fatuma Hassan", email: "fatuma@momtraders.co.ke",
    phone: "+254 733 567 890", location: "Mombasa", segment: "wholesale", value: 3200000,
    orders: 62, lastOrder: "Today", rating: 5, status: "active",
  },
  {
    id: "C004", name: "Kampala Supplies Co", contact: "Moses Kato", email: "mkato@kampala-sup.ug",
    phone: "+256 772 123 456", location: "Kampala", segment: "enterprise", value: 4100000,
    orders: 78, lastOrder: "3 days ago", rating: 4, status: "active",
  },
  {
    id: "C005", name: "Kisumu Fresh Mart", contact: "Achieng Omondi", email: "achieng@kisumart.co.ke",
    phone: "+254 701 234 567", location: "Kisumu", segment: "retail", value: 420000,
    orders: 15, lastOrder: "2 weeks ago", rating: 3, status: "inactive",
  },
  {
    id: "C006", name: "Nakuru Hardware", contact: "Peter Mwangi", email: "peter@nakuruhard.co.ke",
    phone: "+254 798 345 678", location: "Nakuru", segment: "sme", value: 980000,
    orders: 33, lastOrder: "5 days ago", rating: 5, status: "active",
  },
  {
    id: "C007", name: "Eldoret Agri Supplies", contact: "Jane Chebet", email: "jchebet@eldagri.co.ke",
    phone: "+254 711 456 789", location: "Eldoret", segment: "wholesale", value: 1870000,
    orders: 41, lastOrder: "4 days ago", rating: 4, status: "active",
  },
];

const segmentConfig: Record<string, { label: string; className: string }> = {
  enterprise: { label: "Enterprise", className: "bg-primary/10 text-primary border-primary/20" },
  wholesale: { label: "Wholesale", className: "bg-amber-50 text-amber-700 border-amber-200" },
  sme: { label: "SME", className: "bg-blue-50 text-blue-700 border-blue-200" },
  retail: { label: "Retail", className: "bg-green-50 text-green-700 border-green-200" },
};

export default function CrmPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = customers.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell title="CRM — Customers" subtitle="Manage customer relationships and accounts">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Customers", value: customers.length, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active", value: customers.filter((c) => c.status === "active").length, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Enterprise", value: customers.filter((c) => c.segment === "enterprise").length, icon: Building2, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Value", value: `KES ${(totalValue / 1000000).toFixed(1)}M`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", stat.bg)}>
                <Icon size={16} className={stat.color} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="pl-9 h-8 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Filter size={12} /> Filter
        </Button>
        <Button size="sm" className="h-8 gap-1.5 text-xs ml-auto">
          <Plus size={13} /> Add Customer
        </Button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((customer) => {
          const seg = segmentConfig[customer.segment];
          return (
            <div
              key={customer.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{customer.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{customer.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] h-5 px-2 font-medium", seg.className)}
                  >
                    {seg.label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal size={12} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 text-xs">
                      <DropdownMenuItem className="text-xs">View Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs text-destructive">Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail size={11} className="shrink-0" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={11} className="shrink-0" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={11} className="shrink-0" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                <div className="text-center">
                  <p className="text-xs font-bold text-foreground tabular-nums">{customer.orders}</p>
                  <p className="text-[10px] text-muted-foreground">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-foreground tabular-nums">
                    {(customer.value / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[10px] text-muted-foreground">Lifetime</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < customer.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Rating</p>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground mt-2.5">
                Last order: {customer.lastOrder}
              </p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
