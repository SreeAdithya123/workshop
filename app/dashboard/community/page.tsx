import { Card3D } from "@/components/ui/Card3D";
import { UserCircle, Trophy, MessageSquare, Award } from "lucide-react";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function CommunityPage() {
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

    // Fetch real users and their registration counts
    const { data: usersData } = await supabase
        .from('profiles')
        .select(`
            email,
            registrations!left (count)
        `)
        .order('updated_at', { ascending: false })
        .limit(10);

    const leaderboard = usersData?.map((user, index) => ({
        rank: index + 1,
        name: user.email?.split('@')[0] || 'Member',
        email: user.email,
        points: (user.registrations?.[0]?.count || 0) * 100, // Mock points based on registrations
        badges: user.registrations?.[0]?.count || 0
    })) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Community Hub</h1>
                <p className="text-muted-foreground">Connect and grow with fellow AI builders in the workshop.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leaderboard Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Trophy className="text-yellow-500" size={20} />
                        </div>
                        Student Leaderboard
                    </h2>
                    <Card3D depth={5}>
                        <div className="bg-card rounded-2xl border border-muted/20 overflow-hidden shadow-xl">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/10 text-muted-foreground font-semibold border-b border-muted/20 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-5">Rank</th>
                                        <th className="px-6 py-5">Student</th>
                                        <th className="px-6 py-5">XP Points</th>
                                        <th className="px-6 py-5">Workshops</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-muted/10">
                                    {leaderboard.map((user) => (
                                        <tr key={user.rank} className="hover:bg-muted/5 transition-all group">
                                            <td className="px-6 py-4 font-black text-foreground/40 group-hover:text-primary transition-colors">
                                                <div className="flex items-center gap-3">
                                                    {user.rank <= 3 && <Trophy size={16} className={
                                                        user.rank === 1 ? "text-yellow-500" :
                                                            user.rank === 2 ? "text-gray-400" : "text-amber-700"
                                                    } />}
                                                    #{user.rank}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                                                        {user.name[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-foreground capitalize">{user.name}</div>
                                                        <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-black text-foreground group-hover:scale-110 transition-transform origin-left">{user.points} XP</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-muted/30 px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
                                                    {user.badges} Enrolled
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {leaderboard.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                                                No members ranked yet. Join a workshop to appear here!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card3D>
                </div>

                {/* Community Feed */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <MessageSquare className="text-primary" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                    </div>
                    <div className="space-y-4">
                        {usersData?.slice(0, 5).map((user, i) => (
                            <div key={i} className="bg-card p-4 rounded-xl border border-muted/20 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-all group">
                                <div className="mt-1">
                                    <Award className="text-primary group-hover:scale-110 transition-transform" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        <span className="font-bold text-primary capitalize">{user.email?.split('@')[0]}</span> joined the AI community.
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                        <Award size={10} /> Certified Builder Profile
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
