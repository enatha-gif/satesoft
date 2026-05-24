"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Phone,
  Package,
  X,
  Check,
} from "lucide-react";

const catalog = [
  { id: 1, name: "Office Chair", category: "Furniture", price: 24500, sku: "FUR-001", stock: 12 },
  { id: 2, name: "A4 Printer Paper", category: "Office", price: 650, sku: "OFF-002", stock: 84 },
  { id: 3, name: "HP LaserJet Toner", category: "Electronics", price: 8200, sku: "ELC-003", stock: 7 },
  { id: 4, name: "Ballpoint Pens (Box)", category: "Office", price: 480, sku: "OFF-004", stock: 120 },
  { id: 5, name: "Dell Monitor 24\"", category: "Electronics", price: 42000, sku: "ELC-005", stock: 4 },
  { id: 6, name: "Stapler Heavy Duty", category: "Office", price: 1800, sku: "OFF-006", stock: 23 },
  { id: 7, name: "Filing Cabinet", category: "Furniture", price: 15800, sku: "FUR-007", stock: 6 },
  { id: 8, name: "Keyboard Wireless", category: "Electronics", price: 3200, sku: "ELC-008", stock: 18 },
  { id: 9, name: "Whiteboard Markers", category: "Office", price: 450, sku: "OFF-009", stock: 60 },
  { id: 10, name: "Laptop Stand", category: "Accessories", price: 4500, sku: "ACC-010", stock: 15 },
  { id: 11, name: "Mouse Wireless", category: "Electronics", price: 2800, sku: "ELC-011", stock: 22 },
  { id: 12, name: "Desk Organizer", category: "Office", price: 1200, sku: "OFF-012", stock: 35 },
];

const categories = ["All", "Furniture", "Electronics", "Office", "Accessories"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function PosPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "mpesa">("cash");
  const [paid, setPaid] = useState(false);

  const filtered = catalog.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const addToCart = (product: (typeof catalog)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) return prev.map((c) => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length > 0) {
      setPaid(true);
      setTimeout(() => {
        setPaid(false);
        setCart([]);
      }, 2500);
    }
  };

  return (
    <AppShell title="Point of Sale" subtitle="Counter 1 — Active session">
      <div className="flex gap-5 h-[calc(100vh-8rem)]">
        {/* Product Grid */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search + Category */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-9 h-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors",
                    activeCategory === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product) => {
                const inCart = cart.find((c) => c.id === product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className={cn(
                      "bg-card border rounded-xl p-4 text-left hover:shadow-md transition-all duration-150 group",
                      inCart ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"
                    )}
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Package size={15} className="text-primary" />
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-tight mb-1 line-clamp-2">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground mb-2">{product.sku}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary tabular-nums">
                        KES {product.price.toLocaleString()}
                      </p>
                      {inCart && (
                        <Badge className="bg-primary/20 text-primary text-[10px] h-4 px-1.5 border-0">
                          {inCart.qty}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Stock: {product.stock}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-80 shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
          {/* Cart Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingCart size={15} className="text-primary" />
              <span className="text-sm font-semibold">Cart</span>
              {cart.length > 0 && (
                <Badge className="bg-primary text-white text-[10px] h-4 w-4 p-0 flex items-center justify-center rounded-full border-0">
                  {cart.length}
                </Badge>
              )}
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <ShoppingCart size={32} className="text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Cart is empty</p>
                <p className="text-xs text-muted-foreground mt-1">Click products to add them</p>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {cart.map((item) => (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-start gap-2 mb-2">
                      <p className="text-xs font-medium text-foreground flex-1 leading-tight">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors mt-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-5 h-5 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-5 h-5 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-foreground tabular-nums">
                        KES {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals & Payment */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (16%)</span>
                <span>KES {Math.round(tax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground text-sm border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>KES {Math.round(total).toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "cash", label: "Cash", icon: Banknote },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "mpesa", label: "M-Pesa", icon: Phone },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPaymentMethod(id as any)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs transition-all",
                    paymentMethod === id
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            <Button
              className="w-full h-10 text-sm font-semibold gap-2"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              {paid ? (
                <>
                  <Check size={15} />
                  Payment Successful!
                </>
              ) : (
                <>
                  <CreditCard size={15} />
                  Charge KES {Math.round(total).toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
