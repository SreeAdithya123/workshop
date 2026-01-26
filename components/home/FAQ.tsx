"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQ() {
    const faqs = [
        {
            q: "What if I can't attend the live sessions?",
            a: "Don't worry! All sessions are recorded and you'll get lifetime access. However, we highly recommend attending live for the interactive experience and real-time doubt clearing.",
        },
        {
            q: "Is this suitable for complete beginners?",
            a: "Absolutely! This workshop is specifically designed for beginners with zero AI or coding experience. We start from the basics and guide you step-by-step.",
        },
        {
            q: "Will I really be able to build projects?",
            a: "Yes! Unlike passive courses, this is a build-along workshop. You'll create projects in real-time during the sessions with instructor guidance.",
        },
        {
            q: "What tools/software do I need?",
            a: "Just a laptop/computer with stable internet connection and a web browser. All tools we use are free or have free tiers—no paid software required.",
        },
        {
            q: "Will I get a certificate?",
            a: "Yes! You'll receive a certificate of completion that you can share on LinkedIn, resume, and GitHub.",
        },
        {
            q: "What is your refund policy?",
            a: "We offer a 7-day money-back guarantee. If you're not satisfied after attending, email us within 7 days for a full refund.",
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground">
                        Everything you need to know about the workshop.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-card border border-muted/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-semibold text-lg transition-colors ${activeIndex === index ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.q}
                                </span>
                                {activeIndex === index ? (
                                    <Minus className="text-primary flex-shrink-0" />
                                ) : (
                                    <Plus className="text-muted-foreground flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-foreground/70 leading-relaxed border-t border-muted/10">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
