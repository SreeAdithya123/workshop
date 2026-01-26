"use client";

import { Card3D } from "@/components/ui/Card3D";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Rocket, Clapperboard } from "lucide-react";
import Link from "next/link";

export function WhatYouBuild() {
    const projects = [
        {
            day: "Day 1",
            title: "Prompt Engineering Playbook",
            desc: "Your personal collection of battle-tested AI prompts for learning, productivity, and creativity—ready to use immediately.",
            icon: FileText,
            color: "bg-primary/10 text-primary",
        },
        {
            day: "Day 2",
            title: "Live AI Web Application",
            desc: "A fully deployed, no-code AI-powered app (like a study assistant or content generator) with a public URL you can share.",
            icon: Rocket,
            color: "bg-secondary/10 text-secondary-foreground",
        },
        {
            day: "Day 3",
            title: "AI-Generated Video Ad",
            desc: "A professional 20-30 second video ad or short film, optimized for Instagram Reels, YouTube Shorts, or LinkedIn.",
            icon: Clapperboard,
            color: "bg-primary/20 text-primary",
        },
    ];

    return (
        <section className="py-24 bg-background text-center">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        What You'll Build <span className="text-primary">(Not Just Watch)</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Walk away with 3 real projects you can showcase on LinkedIn, GitHub, and your resume.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {projects.map((project, index) => (
                        <Card3D key={index} className="h-full" depth={15}>
                            <div className="bg-card rounded-2xl p-8 border border-muted/20 shadow-xl h-full flex flex-col items-center text-center hover:border-primary/20 transition-all duration-300 group">
                                <div className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    <project.icon size={32} />
                                </div>
                                <div className="inline-block px-3 py-1 bg-muted/40 rounded-full text-xs font-bold text-muted-foreground mb-4 tracking-wide uppercase">
                                    {project.day} DELIVERABLE
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground leading-relaxed mb-6">{project.desc}</p>
                                {/* Visual Placeholder for Mockup */}
                                <div className="mt-auto w-full h-32 bg-muted/10 rounded-lg border-2 border-dashed border-muted/30 flex items-center justify-center text-muted-foreground text-sm">
                                    Project Mockup Preview
                                </div>
                            </div>
                        </Card3D>
                    ))}
                </div>

                <Link href="/structure">
                    <Button size="lg" className="group">
                        Start Building Your Portfolio <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
