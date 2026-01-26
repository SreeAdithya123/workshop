"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Clock, Globe, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-background text-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-primary/10 border border-primary/20">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary font-semibold text-xs tracking-wide uppercase">
                                Live Online Workshop
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
                            Future-Proof Your Career <br />
                            <span className="text-primary">With AI Mastery</span>
                        </h1>

                        <p className="text-lg text-foreground/80 mb-8 max-w-xl leading-relaxed">
                            Join 500+ professionals building real AI agents and workflows.
                            No coding experience required. Just 3 days to transform your skillset.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg font-semibold shadow-xl shadow-secondary/20 hover:scale-105 transition-transform">
                                    Join The Challenge - ₹1,499
                                </Button>
                            </Link>
                            <Link href="/structure">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg border-primary text-primary hover:bg-primary/10">
                                    View Syllabus
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex items-center gap-6 text-sm text-foreground/70 font-medium">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-primary" />
                                <span>500+ Alumni</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                <span>Feb 15-17, 2026</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual/Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-card rounded-3xl shadow-2xl p-8 border border-muted/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Globe size={120} className="text-primary" />
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">Workshop Highlights</h3>
                                    <p className="text-foreground/60">Everything you need to succeed</p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        "Build an AI Travel Agent",
                                        "Create Video Marketing Assets",
                                        "Automate Daily Workflows",
                                        "Certificate of Completion"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-muted/50">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <ArrowRight size={16} />
                                            </div>
                                            <span className="font-medium text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
