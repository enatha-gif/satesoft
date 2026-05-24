import { cn } from "@/lib/utils";
import { ShoppingCart, Package, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    iconClass: "text-green-600 bg-green-50",
    title: "Order #1048 completed",
    desc: "Wanjiku Enterprises paid KES 84,200",
    time: "2 min ago",
  },
  {
    icon: AlertTriangle,
    iconClass: "text-amber-600 bg-amber-50",
    title: "Low stock alert",
    desc: "Printer Paper A4 — only 5 units remain",
    time: "14 min ago",
  },
  {
    icon: Users,
    iconClass: "text-blue-600 bg-blue-50",
    title: "New customer registered",
    desc: "Nakuru Fresh Foods added to CRM",
    time: "38 min ago",
  },
  {
    icon: Package,
    iconClass: "text-primary bg-primary/10",
    title: "Stock replenishment",
    desc: "500 units of Office Chairs received",
    time: "1h ago",
  },
  {
    icon: ShoppingCart,
    iconClass: "text-green-600 bg-green-50",
    title: "POS Sale completed",
    desc: "Counter 2 — KES 4,800 cash",
    time: "1h 22min ago",
  },
  {
    icon: Clock,
    iconClass: "text-muted-foreground bg-muted",
    title: "Report generated",
    desc: "Monthly sales report for October 2025",
    time: "2h ago",
  },
];

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Activity Feed</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time system events</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-green-600">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>
      <div className="divide-y divide-border/50">
        {activities.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5", item.iconClass)}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
