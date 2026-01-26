import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Check, X, Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Card3D } from "@/components/ui/Card3D";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-background border-b border-muted/20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-sm font-medium text-primary mb-4">Home &gt; About This Workshop</p>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                        Why This Workshop Will <br />
                        <span className="text-primary">
                            Transform Your AI Journey
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        Most AI courses overwhelm you with theory or assume you're already technical. We take a different approach: hands-on building from day one, guided step-by-step.
                    </p>
                </div>
            </section>

            {/* Problem vs Solution */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Traditional Courses */}
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-muted/20">
                            <h3 className="text-xl font-bold text-foreground mb-6">Traditional AI Courses</h3>
                            <ul className="space-y-4">
                                {[
                                    "Heavy math and theory first",
                                    "Watch recorded videos alone",
                                    "Generic assignments",
                                    "One-time access",
                                    "Coding-heavy barrier"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0"><X size={14} /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* This Workshop */}
                        <Card3D depth={5}>
                            <div className="bg-card p-8 rounded-2xl shadow-lg border border-primary/20 h-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                                <h3 className="text-xl font-bold text-foreground mb-6">This Workshop</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Practical skills from day 1",
                                        "Live, interactive build-along",
                                        "Custom projects for your portfolio",
                                        "Lifetime recordings + community",
                                        "No-code friendly approach"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0"><Check size={14} /></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card3D>
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                        <div className="w-full md:w-1/3">
                            <Card3D depth={10}>
                                <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden relative shadow-xl border border-muted/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    {/* Placeholder for Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                        Instructor Image
                                    </div>
                                    <div className="absolute bottom-6 left-6 z-20 text-white">
                                        <h3 className="text-xl font-bold">K Sree Adithya</h3>
                                        <p className="text-white/80 text-sm">AI Engineer & Mentor</p>
                                    </div>
                                </div>
                            </Card3D>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Meet Your Instructor</h2>
                            <p className="text-foreground/80 leading-relaxed mb-6">
                                "I'm a computer science student just like you, passionate about AI and building projects. I've led workshops for 200+ students, organized IEEE tech events, and built multiple AI-powered applications. My goal is to make AI accessible to everyone."
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-foreground font-medium">IEEE Student Chapter Leader</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-foreground font-medium">Published AI Research Papers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-foreground font-medium">Built 10+ AI Projects</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10 hover:text-primary"><Linkedin size={20} /></Button>
                                <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10 hover:text-primary"><Github size={20} /></Button>
                                <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10 hover:text-primary"><Twitter size={20} /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
