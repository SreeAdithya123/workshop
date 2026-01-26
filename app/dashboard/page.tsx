import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
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

    // Fetch session
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {session?.user?.email?.split('@')[0] || 'User'}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Events & Workshops */}
                <Link href="/dashboard/events">
                    <Card3D depth={5} className="h-full">
                        <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm h-full hover:border-primary/50 transition-colors flex flex-col items-center text-center justify-center gap-4 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Calendar className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Events & Workshops</h2>
                                <p className="text-sm text-muted-foreground mt-1">Browse upcoming AI sessions</p>
                            </div>
                        </div>
                    </Card3D>
                </Link>

                {/* My Registrations */}
                <Link href="/dashboard/my-events">
                    <Card3D depth={5} className="h-full">
                        <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm h-full hover:border-primary/50 transition-colors flex flex-col items-center text-center justify-center gap-4 group">
                            <div className="w-16 h-16 bg-green-100/10 rounded-full flex items-center justify-center group-hover:bg-green-100/20 transition-colors">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">My Registrations</h2>
                                <p className="text-sm text-muted-foreground mt-1">View your enrolled workshops</p>
                            </div>
                        </div>
                    </Card3D>
                </Link>

                {/* Community */}
                <Link href="/dashboard/community">
                    <Card3D depth={5} className="h-full">
                        <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm h-full hover:border-primary/50 transition-colors flex flex-col items-center text-center justify-center gap-4 group">
                            <div className="w-16 h-16 bg-purple-100/10 rounded-full flex items-center justify-center group-hover:bg-purple-100/20 transition-colors">
                                <Users className="w-8 h-8 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Community</h2>
                                <p className="text-sm text-muted-foreground mt-1">Connect & Compete</p>
                            </div>
                        </div>
                    </Card3D>
                </Link>

                {/* Certificates */}
                <Card3D depth={5} className="h-full">
                    <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm h-full flex flex-col items-center text-center justify-center gap-4 opacity-70">
                        <div className="w-16 h-16 bg-yellow-100/10 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Certificates</h2>
                            <p className="text-sm text-muted-foreground mt-1">Earned credentials (Coming Soon)</p>
                        </div>
                    </div>
                </Card3D>

                {/* Badges */}
                <Card3D depth={5} className="h-full">
                    <div className="bg-card p-6 rounded-xl border border-muted/20 shadow-sm h-full flex flex-col items-center text-center justify-center gap-4 opacity-70">
                        <div className="w-16 h-16 bg-red-100/10 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Badges</h2>
                            <p className="text-sm text-muted-foreground mt-1">Your achievements (Coming Soon)</p>
                        </div>
                    </div>
                </Card3D>
            </div>

            {/* Quick Summary Section (Optional, could be removed if sitemap is strict on bubbles) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-xl border border-muted/20">
                    <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                    <p className="text-muted-foreground text-sm">No recent activity.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-muted/20">
                    <h3 className="font-bold text-lg mb-4">Recommended for You</h3>
                    <p className="text-muted-foreground text-sm">Check out the upcoming events!</p>
                </div>
            </div>
        </div>
    );
}
