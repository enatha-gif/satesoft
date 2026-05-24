"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  Download,
  Package,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { id: "P001", name: "Office Chair Executive", sku: "FUR-CHR-001", category: "Furniture", stock: 45, reorder: 10, price: 24500, status: "in_stock" },
  { id: "P002", name: "HP LaserJet Pro M404dn", sku: "ELEC-PRN-012", category: "Electronics", stock: 7, reorder: 5, price: 58000, status: "low_stock" },
  { id: "P003", name: "Printer Paper A4 (Ream)", sku: "OFF-PAP-002", category: "Office Supplies", stock: 4, reorder: 50, price: 650, status: "critical" },
  { id: "P004", name: "Dell Monitor 24\"", sku: "ELEC-MON-008", category: "Electronics", stock: 23, reorder: 5, price: 42000, status: "in_stock" },
  { id: "P005", name: "Ergonomic Keyboard", sku: "ELEC-KBD-003", category: "Electronics", stock: 0, reorder: 8, price: 5200, status: "out_of_stock" },
  { id: "P006", name: "Filing Cabinet 4-Draw", sku: "FUR-CAB-007", category: "Furniture", stock: 18, reorder: 3, price: 15800, status: "in_stock" },
  { id: "P007", name: "Stapler Heavy Duty", sku: "OFF-STA-011", category: "Office Supplies", stock: 92, reorder: 20, price: 1800, status: "in_stock" },
  { id: "P008", name: "Whiteboard Markers (Set)", sku: "OFF-MRK-004", category: "Office Supplies", stock: 3, reorder: 30, price: 450, status: "critical" },
  { id: "P009", name: "Logitech Webcam C920", sku: "ELEC-CAM-006", category: "Electronics", stock: 14, reorder: 5, price: 12400, status: "in_stock" },
  { id: "P010", name: "Conference Table 8-Seat", sku: "FUR-TBL-002", category: "Furniture", stock: 2, reorder: 1, price: 89000, status: "low_stock" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  in_stock: { label: "In Stock", className: "bg-green-50 text-green-700 border-green-200" },
  low_stock: { label: "Low Stock", className: "bg-amber-50 text-amber-700 border-amber-200" },
  critical: { label: "Critical", className: "bg-red-50 text-red-600 border-red-200" },
  out_of_stock: { label: "Out of Stock", className: "bg-gray-50 text-gray-600 border-gray-200" },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: products.length,
    in_stock: products.filter((p) => p.status === "in_stock").length,
    low_stock: products.filter((p) => p.status === "low_stock").length,
    out_of_stock: products.filter((p) => p.status === "out_of_stock" || p.status === "critical").length,
  };

  return (
    <AppShell title="Inventory Management" subtitle="Track and manage your product stock levels">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Products", value: stats.total, icon: Package, color: "text-primary", bg: "bg-primary/10" },
          { label: "In Stock", value: stats.in_stock, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Low Stock", value: stats.low_stock, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Out of Stock", value: stats.out_of_stock, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
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

      {/* Table Card */}
      <div className="bg-card border border-border rounded-xl">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or SKU..."
              className="pl-9 h-8 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            {["in_stock", "low_stock", "critical", "out_of_stock"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(filterStatus === s ? null : s)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border transition-colors",
                  filterStatus === s
                    ? "bg-primary text-white border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {statusConfig[s].label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <Download size={13} />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <Plus size={13} />
              Add Product
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Product</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">SKU</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Category</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Stock</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Reorder At</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Unit Price</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const status = statusConfig[product.status];
                return (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                          <Package size={12} className="text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-xs font-mono text-muted-foreground">{product.sku}</td>
                    <td className="px-3 py-3.5 text-xs text-muted-foreground">{product.category}</td>
                    <td className="px-3 py-3.5 text-xs font-semibold text-foreground text-right tabular-nums">
                      <span className={product.stock <= product.reorder ? "text-red-600" : ""}>{product.stock}</span>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-muted-foreground text-right tabular-nums">{product.reorder}</td>
                    <td className="px-3 py-3.5 text-xs font-medium text-foreground text-right tabular-nums">
                      KES {product.price.toLocaleString()}
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-2 py-0.5 h-5 font-medium border", status.className)}
                      >
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal size={13} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem className="text-xs gap-2">
                            <Edit size={12} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2 text-destructive">
                            <Trash2 size={12} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              No products found matching your criteria
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {products.length} products</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs px-3" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-3 bg-primary text-white border-primary">1</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-3">Next</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
