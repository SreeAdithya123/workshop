"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Calendar, BookOpen, LogOut, UserCircle, Users } from "lucide-react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Events & Workshops", href: "/dashboard/events", icon: Calendar },
        { name: "My Registrations", href: "/dashboard/my-events", icon: BookOpen },
        { name: "Community", href: "/dashboard/community", icon: Users },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-muted/20 hidden md:flex flex-col">
                <div className="p-6 border-b border-muted/20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            AI
                        </div>
                        <span className="font-heading font-bold text-xl text-foreground">Workshop</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted/10 hover:text-foreground"
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-muted/20">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-card border-b border-muted/20 md:hidden flex items-center justify-between px-4">
                    <span className="font-bold text-lg">Dashboard</span>
                    {/* Simplified mobile menu trigger for now */}
                    <UserCircle size={24} />
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}
