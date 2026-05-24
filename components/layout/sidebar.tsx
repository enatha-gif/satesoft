"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Building2,
  GraduationCap,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Boxes,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Point of Sale",
    href: "/pos",
    icon: ShoppingCart,
    badge: "Live",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    children: [
      { title: "Products", href: "/inventory/products" },
      { title: "Categories", href: "/inventory/categories" },
      { title: "Suppliers", href: "/inventory/suppliers" },
      { title: "Stock Alerts", href: "/inventory/alerts" },
    ],
  },
  {
    title: "CRM",
    href: "/crm",
    icon: Users,
    children: [
      { title: "Customers", href: "/crm/customers" },
      { title: "Leads", href: "/crm/leads" },
      { title: "Deals", href: "/crm/deals" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "ERP",
    href: "/erp",
    icon: Boxes,
    children: [
      { title: "Finance", href: "/erp/finance" },
      { title: "HR", href: "/erp/hr" },
      { title: "Procurement", href: "/erp/procurement" },
    ],
  },
  {
    title: "SACCO",
    href: "/sacco",
    icon: Landmark,
  },
  {
    title: "School Mgmt",
    href: "/school",
    icon: GraduationCap,
  },
  {
    title: "SME Platform",
    href: "/sme",
    icon: Building2,
  },
];

const bottomItems: NavItem[] = [
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
        "border-r",
        collapsed ? "w-16" : "w-64",
        "sidebar-bg"
      )}
      style={{ borderColor: "hsl(var(--sidebar-border))" }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 px-4 border-b shrink-0"
        style={{ borderColor: "hsl(var(--sidebar-border))" }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-white text-sm leading-none">Satesoft</p>
              <p className="text-xs mt-0.5" style={{ color: "hsl(var(--sidebar-foreground))", opacity: 0.6 }}>
                Business Platform
              </p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
          style={{ color: "hsl(var(--sidebar-foreground))" }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin px-2">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus.includes(item.title);

            return (
              <div key={item.title}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                      active
                        ? "bg-primary/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={16} className="shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.title}</span>
                        {item.badge && (
                          <Badge className="bg-primary/30 text-primary-foreground text-[10px] px-1.5 py-0 h-4">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronDown
                          size={12}
                          className={cn("transition-transform duration-200 shrink-0", isOpen && "rotate-180")}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                      active
                        ? "bg-primary/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={16} className="shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0 h-4 border-0">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )}

                {/* Sub-items */}
                {hasChildren && isOpen && !collapsed && (
                  <div className="mt-0.5 ml-6 pl-3 border-l space-y-0.5" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-xs transition-all duration-150",
                          pathname === child.href
                            ? "text-white bg-white/10"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-4 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }} />

        <div className="space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/55 hover:bg-white/10 hover:text-white transition-all duration-150"
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div
        className="p-3 border-t shrink-0"
        style={{ borderColor: "hsl(var(--sidebar-border))" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">JM</span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium text-white truncate">John Mwangi</p>
              <p className="text-[10px]" style={{ color: "hsl(var(--sidebar-foreground))", opacity: 0.5 }}>
                Administrator
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <LogOut size={13} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
