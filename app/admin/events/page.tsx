import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageEventsPage() {
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

    // Fetch Workshops and Participant Counts
    const { data: workshops } = await supabase
        .from("workshops")
        .select(`
            *,
            registrations!left (count)
        `)
        .order('date', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manage Events</h1>
                    <p className="text-muted-foreground">Create and manage your AI workshops.</p>
                </div>
                <Button className="flex items-center gap-2 rounded-full px-6">
                    <Plus size={18} /> Add New Event
                </Button>
            </div>

            <div className="bg-card rounded-2xl border border-muted/20 shadow-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/5 border-b border-muted/20 text-left text-muted-foreground font-semibold">
                        <tr>
                            <th className="px-6 py-4">Event Title</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Participants</th>
                            <th className="px-6 py-4">Fee</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/10">
                        {workshops?.map((workshop) => (
                            <tr key={workshop.id} className="hover:bg-muted/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">{workshop.title}</div>
                                    <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{workshop.description}</div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground" suppressHydrationWarning={true}>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-primary" />
                                        {new Date(workshop.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Users size={14} className="text-muted-foreground" />
                                        {workshop.registrations?.[0]?.count || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-secondary">₹{workshop.fee}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button title="Edit" className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button title="Delete" className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!workshops || workshops.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                    No workshops found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
