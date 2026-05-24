import { AppShell } from "@/components/layout/app-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SalesByCategory } from "@/components/dashboard/sales-by-category";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Welcome back, John. Here's what's happening today."
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KpiCard
          title="Total Revenue"
          value="4.1M"
          prefix="KES "
          change={18.2}
          icon={DollarSign}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <KpiCard
          title="Orders Today"
          value="142"
          change={8.4}
          icon={ShoppingCart}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <KpiCard
          title="Active Customers"
          value="2,847"
          change={4.1}
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <KpiCard
          title="Stock Items"
          value="1,294"
          change={-2.3}
          icon={Package}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <KpiCard
          title="Gross Profit"
          value="2.45M"
          prefix="KES "
          change={22.1}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <KpiCard
          title="Low Stock Alerts"
          value="23"
          change={-5}
          changePeriod="items need reorder"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <SalesByCategory />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <ActivityFeed />
      </div>
    </AppShell>
  );
}
