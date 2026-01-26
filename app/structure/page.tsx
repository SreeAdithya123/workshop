import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Brain, Code, Video } from "lucide-react";
import Link from "next/link";

export default function StructurePage() {
    const days = [
        {
            day: "Day 1",
            title: "AI Fundamentals & Prompt Engineering",
            icon: Brain,
            color: "bg-primary/10 text-primary",
            topics: [
                "What is AI really? Demystifying the hype",
                "Anatomy of perfect prompts",
                "Few-shot prompting techniques",
                "Hands-on practice with ChatGPT/Claude"
            ],
            deliverable: "Personal Prompt Playbook"
        },
        {
            day: "Day 2",
            title: "Build Apps with No-Code AI",
            icon: Code,
            color: "bg-primary/10 text-primary",
            topics: [
                "No-code platforms overview",
                "Designing app architecture",
                "Connecting to AI APIs",
                "One-click deployment to live URL"
            ],
            deliverable: "Live AI Web Application"
        },
        {
            day: "Day 3",
            title: "AI Filmmaking & Ad Creation",
            icon: Video,
            color: "bg-primary/20 text-primary",
            topics: [
                "Script & concept generation",
                "AI voice-over & audio",
                "Video generation tools (Runway/Pika)",
                "Editing & export for social media"
            ],
            deliverable: "AI-Generated Video Ad"
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-16 bg-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-sm font-medium text-primary mb-4">Home &gt; Workshop Structure</p>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                        Your 3-Day Learning Roadmap
                    </h1>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                        From AI fundamentals to deployed projects—here's exactly what happens each day.
                    </p>
                </div>
            </section>

            <section className="pb-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {days.map((day, index) => (
                            <Card3D key={index} className="h-full" depth={10}>
                                <div className="bg-card rounded-2xl border border-muted/20 shadow-xl overflow-hidden h-full flex flex-col hover:border-primary/20 transition-colors">
                                    <div className={`p-6 ${day.color} border-b border-muted/10`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-bold uppercase tracking-wider text-xs opacity-70">{day.day}</span>
                                            <day.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight">{day.title}</h3>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {day.topics.map((topic, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-muted/10 rounded-lg p-4 border border-muted/20">
                                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Deliverable</p>
                                            <p className="font-semibold text-foreground">{day.deliverable}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card3D>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="px-12 text-lg h-14 rounded-full shadow-xl shadow-secondary/20 hover:scale-105 transition-transform">
                                Enroll Now & Start Building
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
