"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings, LogOut, ShieldCheck } from "lucide-react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        { name: "Admin Stats", href: "/admin", icon: LayoutDashboard },
        { name: "Manage Events", href: "/admin/events", icon: Calendar },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-black/5 dark:bg-white/5 border-r border-muted/20 hidden md:flex flex-col">
                <div className="p-6 border-b border-muted/20">
                    <Link href="/admin" className="flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-secondary" />
                        <span className="font-heading font-bold text-xl text-foreground">Admin</span>
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
                                    ? "bg-secondary/10 text-secondary-foreground"
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

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
                {children}
            </main>
        </div>
    );
}
