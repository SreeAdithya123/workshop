"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card3D } from "@/components/ui/Card3D";
import { motion } from "framer-motion";

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
            alert("Account created! Please check your email for confirmation.");
            router.push("/login");
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <Navbar />

            <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card3D depth={15}>
                        <div className="bg-card/50 backdrop-blur-xl w-full p-8 rounded-3xl shadow-2xl border border-muted/20">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 mb-4 border border-secondary/20">
                                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Create Account</h1>
                                <p className="text-muted-foreground">Start your AI transformation today</p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/80 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-3 bg-background/50 border border-muted/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/80 ml-1">Choose Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-3 bg-background/50 border border-muted/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <p className="text-[10px] text-muted-foreground ml-1">Must be at least 6 characters long</p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-secondary/20 bg-secondary hover:bg-secondary/90 text-white" disabled={loading}>
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Creating...</span>
                                        </div>
                                    ) : (
                                        "Sign Up Now"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-8 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-secondary hover:text-secondary/80 transition-colors font-bold underline underline-offset-4">
                                    Sign in here
                                </Link>
                            </div>
                        </div>
                    </Card3D>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
