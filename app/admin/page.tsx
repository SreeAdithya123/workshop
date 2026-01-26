import { LiveAdminDashboard } from "@/components/admin/LiveAdminDashboard";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Users, Calendar, DollarSign, Activity } from "lucide-react";

export default async function AdminDashboardPage() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    // Verify Admin Status
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

    if (!profile?.is_admin) redirect("/dashboard");

    // Fetch Initial Stats
    const { count: totalUsers } = await supabase.from("profiles").select("*", { count: 'exact', head: true });
    const { count: totalEvents } = await supabase.from("workshops").select("*", { count: 'exact', head: true });
    const { data: registrations } = await supabase
        .from("registrations")
        .select("*")
        .order('registered_at', { ascending: false });

    const totalRevenue = registrations?.reduce((sum, reg) => sum + (Number(reg.amount) || 0), 0) || 0;
    const activeRegistrations = registrations?.length || 0;

    const initialStats = [
        { label: "Total Users", value: totalUsers?.toString() || "0", iconType: "users", color: "text-blue-600 bg-blue-100" },
        { label: "Total Events", value: totalEvents?.toString() || "0", iconType: "calendar", color: "text-purple-600 bg-purple-100" },
        { label: "Total Revenue", value: `₹${(totalRevenue / 100000).toFixed(2)}L`, iconType: "dollar", color: "text-green-600 bg-green-100" },
        { label: "Active Registrations", value: activeRegistrations.toString(), iconType: "activity", color: "text-orange-600 bg-orange-100" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Admin Overview</h1>
                    <p className="text-muted-foreground">Monitor platform growth and user engagement live.</p>
                </div>
                <div className="text-right text-xs font-medium px-4 py-2 bg-muted/20 border border-muted/30 rounded-xl">
                    Admin: <span className="font-bold text-primary">{session.user.email}</span>
                </div>
            </div>

            <LiveAdminDashboard initialStats={initialStats} initialRegistrations={registrations || []} />
        </div>
    );
}
