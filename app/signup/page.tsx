"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card3D } from "@/components/ui/Card3D";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Check if user is created (for email confirmation flow) or redirect
            // For simplicity in workshop, often we disable email confirm for dev or check state
            alert("Account created! Please sign in.");
            router.push("/login");
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="flex items-center justify-center pt-32 pb-20 px-4">
                <Card3D depth={10}>
                    <div className="bg-card w-full max-w-md p-8 rounded-2xl shadow-xl border border-muted/20">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                            <p className="text-muted-foreground">Join the platform today</p>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                            <Button className="w-full h-12 text-lg" disabled={loading}>
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </Card3D>
            </div>
            <Footer />
        </main>
    );
}
