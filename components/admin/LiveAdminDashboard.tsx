"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Card3D } from "@/components/ui/Card3D";
import { Users, Calendar, DollarSign, Activity, CheckCircle, Clock } from "lucide-react";
import { RegistrationActions } from "./AdminActions";

export function LiveAdminDashboard({
    initialStats,
    initialRegistrations
}: {
    initialStats: any[],
    initialRegistrations: any[]
}) {
    const [stats, setStats] = useState(initialStats);
    const [registrations, setRegistrations] = useState(initialRegistrations);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const channel = supabase
            .channel('realtime-registrations')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'registrations' },
                async () => {
                    // Re-fetch all registration-related data
                    const { data: newRegs } = await supabase
                        .from("registrations")
                        .select("*")
                        .order('registered_at', { ascending: false });

                    if (newRegs) {
                        setRegistrations(newRegs);

                        // Update stats
                        const totalRevenue = newRegs.reduce((sum, reg) => sum + (Number(reg.amount) || 0), 0);
                        const { count: userCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true });
                        const { count: eventCount } = await supabase.from("workshops").select("*", { count: 'exact', head: true });

                        setStats([
                            { label: "Total Users", value: userCount?.toString() || "0", iconType: "users", color: "text-blue-600 bg-blue-100" },
                            { label: "Total Events", value: eventCount?.toString() || "0", iconType: "calendar", color: "text-purple-600 bg-purple-100" },
                            { label: "Total Revenue", value: `₹${(totalRevenue / 100000).toFixed(2)}L`, iconType: "dollar", color: "text-green-600 bg-green-100" },
                            { label: "Active Registrations", value: newRegs.length.toString(), iconType: "activity", color: "text-orange-600 bg-orange-100" },
                        ]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const getIcon = (type: string) => {
        switch (type) {
            case "users": return Users;
            case "calendar": return Calendar;
            case "dollar": return DollarSign;
            case "activity": return Activity;
            default: return Activity;
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = getIcon(stat.iconType);
                    return (
                        <Card3D key={i} depth={5}>
                            <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </Card3D>
                    );
                })}
            </div>

            <div className="bg-card rounded-2xl border border-muted/20 p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-foreground">Recent Registrations</h3>
                    <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        LIVE DATA
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left text-muted-foreground border-b border-muted/20">
                            <tr>
                                <th className="pb-3 pl-2">User</th>
                                <th className="pb-3">Payment</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3 px-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/10">
                            {registrations.slice(0, 10).map((reg, i) => (
                                <tr key={i} className="group hover:bg-muted/5 transition-all">
                                    <td className="py-4 pl-2">
                                        <div className="font-bold text-foreground">{reg.first_name} {reg.last_name}</div>
                                        <div className="text-xs text-muted-foreground">{reg.email}</div>
                                    </td>
                                    <td className="py-4">
                                        <div className="font-bold text-secondary">₹{reg.amount}</div>
                                    </td>
                                    <td className="py-4 text-muted-foreground" suppressHydrationWarning={true}>
                                        {new Date(reg.registered_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reg.payment_status === 'paid' || reg.payment_status === 'completed' || !reg.payment_status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-700"
                                            }`}>
                                            {reg.payment_status || 'Success'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <RegistrationActions registrationId={reg.id} />
                                    </td>
                                </tr>
                            ))}
                            {registrations.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-muted-foreground italic">
                                        Waiting for new registrations...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
