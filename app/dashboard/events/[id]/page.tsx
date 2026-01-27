import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Clock, DollarSign, Users, CheckCircle, Smartphone, Globe, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EventDetailsPage({ params }: { params: { id: string } }) {
    // Mock Data - in real app fetch by params.id
    const event = {
        id: params.id,
        title: "AI Fundamentals & Prompt Engineering",
        description: "Master the art of communicating with LLMs and understand the core principles of AI. This comprehensive workshop takes you from zero to hero in prompt engineering.",
        longDescription: `
            In this intensive 4-hour workshop, you will learn the secrets behind effective prompt engineering.
            We will cover:
            - The architecture of Large Language Models (LLMs)
            - Zero-shot, One-shot, and Few-shot prompting
            - Chain-of-Thought reasoning
            - Advanced techniques for code generation and creative writing
        `,
        date: "Jan 31, 2026",
        time: "7:00 PM - 10:00 PM",
        fee: "₹499",
        participants: 120,
        image: "bg-blue-100",
        syllabus: [
            "Introduction to LLMs and Transformers",
            "Anatomy of a Perfect Prompt",
            "Context Windows and Token Limits",
            "Hands-on: Building a Personal Assistant",
        ],
        mentor: "K Sree Adithya",
        mentorRole: "AI Engineer & Mentor",
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Back to Events
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Workshop</span>
                        <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
                        <p className="text-lg text-foreground/80 leading-relaxed">{event.description}</p>
                    </div>

                    <Card3D depth={5}>
                        <div className="bg-card rounded-xl border border-muted/20 p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-6">What You'll Learn</h2>
                            <ul className="space-y-4">
                                {event.syllabus.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                                        <CheckCircle className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card3D>

                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-4">About the Session</h2>
                        <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
                            {event.longDescription}
                        </p>
                    </div>
                </div>

                {/* Sidebar Card */}
                <div>
                    <div className="sticky top-8">
                        <Card3D depth={10}>
                            <div className="bg-card rounded-xl border border-muted/20 overflow-hidden shadow-xl">
                                <div className={`h-32 ${event.image} flex items-center justify-center`}>
                                    <Calendar className="text-foreground/20 w-12 h-12" />
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="space-y-4 pb-6 border-b border-muted/20">
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Calendar className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Clock className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Video className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">Live Online (Zoom)</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Registration Fee</span>
                                        <span className="text-2xl font-bold text-foreground">{event.fee}</span>
                                    </div>

                                    <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/25">
                                        Register Now
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground pt-2">
                                        Limited spots available. Secure yours today.
                                    </p>
                                </div>
                            </div>
                        </Card3D>
                    </div>
                </div>
            </div>
        </div>
    );
}
