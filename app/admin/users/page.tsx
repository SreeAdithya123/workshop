import { Button } from "@/components/ui/Button";
import { User, Mail, Shield, Trash2, Search, Calendar } from "lucide-react";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserActions, RegistrationActions } from "@/components/admin/AdminActions";

export default async function ManageUsersPage() {
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

    // Fetch Users with their Registrations
    const { data: users } = await supabase
        .from("profiles")
        .select(`
            *,
            registrations (
                id,
                workshop_id,
                workshops (title)
            )
        `)
        .order('updated_at', { ascending: false });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground">Monitor and manage access for all users.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-muted/20 border border-muted/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                    />
                </div>
            </div>

            <div className="bg-card rounded-2xl border border-muted/20 shadow-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/5 border-b border-muted/20 text-left text-muted-foreground font-semibold">
                        <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Registrations</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/10">
                        {users?.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold border border-primary/20">
                                            {user.email?.[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{user.email?.split('@')[0]}</div>
                                            <div className="text-[10px] text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {user.registrations?.map((reg: any) => (
                                            <div key={reg.id} className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-lg text-[10px] font-medium w-fit">
                                                <Calendar size={10} className="text-primary" />
                                                <span className="truncate max-w-[120px]">{reg.workshops?.title || "AI Workshop"}</span>
                                                <RegistrationActions registrationId={reg.id} />
                                            </div>
                                        ))}
                                        {(!user.registrations || user.registrations.length === 0) && (
                                            <span className="text-[10px] text-muted-foreground italic">No Active Events</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_admin ? (
                                        <div className="flex items-center gap-1.5 text-secondary font-bold text-[10px] uppercase tracking-wider">
                                            <Shield size={12} /> Admin
                                        </div>
                                    ) : (
                                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium">Student</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-[11px]" suppressHydrationWarning={true}>
                                    {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UserActions userId={user.id} isAdmin={user.email === 'adithya.kandikonda@sasi.ac.in'} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
