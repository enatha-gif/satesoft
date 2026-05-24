"use client";

import { useState } from "react";
import { Bell, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  sidebarCollapsed: boolean;
  title?: string;
  subtitle?: string;
}

export function Header({ sidebarCollapsed, title = "Dashboard", subtitle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 bg-background/95 backdrop-blur border-b border-border flex items-center px-6 gap-4 transition-all duration-300"
      style={{ left: sidebarCollapsed ? "64px" : "256px" }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-foreground truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:block w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
        <Input
          placeholder="Search anything..."
          className="pl-9 h-8 text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative text-muted-foreground hover:text-foreground">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-background" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="text-xs text-muted-foreground">3 unread messages</p>
            </div>
            {[
              { title: "Low stock alert", desc: "Printer Paper A4 — 5 units left", time: "2m ago", type: "warning" },
              { title: "New order received", desc: "Order #1042 — KES 24,500", time: "18m ago", type: "success" },
              { title: "Payment confirmed", desc: "Invoice #892 paid in full", time: "1h ago", type: "info" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex flex-col items-start px-3 py-2.5 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: n.type === "warning" ? "hsl(38 92% 50%)" : n.type === "success" ? "hsl(142 72% 42%)" : "hsl(213 94% 48%)",
                    }}
                  />
                  <span className="text-xs font-medium flex-1">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground ml-3.5 mt-0.5">{n.desc}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-xs text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 px-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">JM</span>
              </div>
              <span className="hidden md:inline text-sm font-medium">John Mwangi</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-medium">John Mwangi</p>
              <p className="text-xs text-muted-foreground">john@company.co.ke</p>
            </div>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
