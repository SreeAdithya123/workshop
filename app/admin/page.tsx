import { Card3D } from "@/components/ui/Card3D";
import { Users, Calendar, DollarSign, Activity } from "lucide-react";

export default function AdminDashboardPage() {
    // Mock Data for Admin
    const stats = [
        { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-600 bg-blue-100" },
        { label: "Total Events", value: "8", icon: Calendar, color: "text-purple-600 bg-purple-100" },
        { label: "Total Revenue", value: "₹4.2L", icon: DollarSign, color: "text-green-600 bg-green-100" },
        { label: "Active Registrations", value: "312", icon: Activity, color: "text-orange-600 bg-orange-100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Overview</h1>
                <p className="text-muted-foreground">Platform performance and key metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card3D key={i} depth={5}>
                        <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    </Card3D>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Registrations Table (Mock) */}
                <div className="bg-card rounded-xl border border-muted/20 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-foreground mb-4">Recent Registrations</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-muted-foreground border-b border-muted/20">
                                <tr>
                                    <th className="pb-3 pl-2">User</th>
                                    <th className="pb-3">Event</th>
                                    <th className="pb-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-muted/10">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="group hover:bg-muted/5 transition-colors">
                                        <td className="py-3 pl-2">
                                            <div className="font-medium">User {i}</div>
                                            <div className="text-xs text-muted-foreground">user{i}@example.com</div>
                                        </td>
                                        <td className="py-3">AI Workshop Day {i}</td>
                                        <td className="py-3 text-right">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Paid</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Events Chart/List */}
                <div className="bg-card rounded-xl border border-muted/20 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-foreground mb-4">Popular Events</h3>
                    <div className="space-y-4">
                        {[
                            { name: "AI Fundamentals", count: 120, percent: "80%" },
                            { name: "No-Code Apps", count: 95, percent: "65%" },
                            { name: "AI Filmmaking", count: 88, percent: "55%" },
                        ].map((event, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-foreground">{event.name}</span>
                                    <span className="text-muted-foreground">{event.count} users</span>
                                </div>
                                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: event.percent }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
