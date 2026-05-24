import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#1048", customer: "Wanjiku Enterprises", amount: "KES 84,200", status: "completed", items: 12, date: "Today, 10:42" },
  { id: "#1047", customer: "Nairobi Tech Hub", amount: "KES 156,800", status: "processing", items: 7, date: "Today, 09:15" },
  { id: "#1046", customer: "Mombasa Traders Ltd", amount: "KES 32,500", status: "completed", items: 4, date: "Yesterday" },
  { id: "#1045", customer: "Kampala Supplies Co", amount: "KES 218,000", status: "pending", items: 23, date: "Yesterday" },
  { id: "#1044", customer: "Kisumu Fresh Mart", amount: "KES 61,300", status: "cancelled", items: 8, date: "2 days ago" },
  { id: "#1043", customer: "Nakuru Hardware", amount: "KES 97,400", status: "completed", items: 15, date: "3 days ago" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-200" },
  processing: { label: "Processing", className: "bg-blue-50 text-blue-700 border-blue-200" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 border-red-200" },
};

export function RecentOrders() {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest 6 transactions</p>
        </div>
        <button className="text-xs text-primary hover:underline font-medium">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Order ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Customer</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-3 py-3">Amount</th>
              <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Items</th>
              <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5 text-xs font-mono font-medium text-primary">{order.id}</td>
                  <td className="px-3 py-3.5 text-xs text-foreground">{order.customer}</td>
                  <td className="px-3 py-3.5 text-xs font-semibold text-foreground text-right tabular-nums">{order.amount}</td>
                  <td className="px-3 py-3.5 text-xs text-muted-foreground text-center">{order.items}</td>
                  <td className="px-3 py-3.5 text-center">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] px-2 py-0.5 h-5 font-medium border", status.className)}
                    >
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground text-right whitespace-nowrap">{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
