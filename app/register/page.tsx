"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Check, Shield, Clock, CreditCard } from "lucide-react";
import { useState } from "react";
import { submitRegistration } from "../actions";

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setStatus(null);

        const result = await submitRegistration(formData);

        if (result.success) {
            setStatus({ success: true, message: result.message });
            // Optional: Redirect or clear form
        } else {
            setStatus({ success: false, message: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-16 container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Secure Your Spot</h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-foreground/80">
                        <span className="flex items-center gap-1"><Shield size={14} className="text-primary" /> Secure Payment</span>
                        <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> 7-Day Refund</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-2xl shadow-sm border border-muted/20 p-8">
                            <h2 className="text-xl font-bold mb-6 text-foreground">Personal Information</h2>
                            <form action={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">Last Name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">Phone (Optional)</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-6 mt-10 text-foreground">Payment Method</h2>
                                <input type="hidden" name="paymentMethod" value="card" />

                                <div className="space-y-4 mb-8">
                                    <div className="border border-primary bg-primary/5 p-4 rounded-xl flex items-center justify-between cursor-pointer ring-1 ring-primary">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="text-primary" />
                                            <span className="font-semibold text-foreground">Credit / Debit Card</span>
                                        </div>
                                        <div className="w-4 h-4 rounded-full border-4 border-primary bg-background"></div>
                                    </div>
                                </div>

                                {status && (
                                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.success ? "bg-green-100/50 text-green-700 border border-green-200" : "bg-red-100/50 text-red-700 border border-red-200"}`}>
                                        {status.message}
                                    </div>
                                )}

                                <Button size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : "Complete Registration & Pay ₹1,499"}
                                </Button>

                                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                                    <Shield size={12} /> Secured by Razorpay | 256-bit SSL Encryption
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card3D depth={5}>
                                <div className="bg-card rounded-2xl shadow-xl border border-muted/20 p-6 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />

                                    <h3 className="font-bold text-lg mb-2 text-foreground">Order Summary</h3>
                                    <p className="text-sm text-muted-foreground mb-6">Learn AI in 3 Days Workshop</p>

                                    <div className="space-y-4 mb-6 pb-6 border-b border-muted/20">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/70">Workshop Fee</span>
                                            <span className="text-foreground/50 line-through">₹2,999</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-primary font-medium">Early Bird Discount</span>
                                            <span className="text-primary font-medium">-₹1,500</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-bold text-foreground">Total</span>
                                        <span className="font-bold text-2xl text-secondary">₹1,499</span>
                                    </div>

                                    <div className="bg-secondary/10 text-secondary-foreground text-xs font-bold p-3 rounded-lg flex items-center gap-2 mb-6">
                                        <Clock size={14} />
                                        Offer expires in: 1 day 23 hours
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            "3 Live Interactive Sessions",
                                            "Lifetime Recording Access",
                                            "Certificate of Completion",
                                            "3 Portfolio Projects"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                                                <Check size={12} className="text-primary" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card3D>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
