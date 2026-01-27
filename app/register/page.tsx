"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Check, Shield, Clock, CreditCard, Tag } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createRazorpayOrder, verifyRazorpayPayment } from "../actions/razorpay";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
    const [promoCode, setPromoCode] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [workshopId, setWorkshopId] = useState<string | null>(null);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login?redirect=/register");
                return;
            }
            setUserId(session.user.id);
            setEmail(session.user.email || "");

            // Fetch workshop ID
            const { data: workshop } = await supabase
                .from('workshops')
                .select('id')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (workshop) setWorkshopId(workshop.id);

            const fullName = session.user.user_metadata?.full_name || "";
            if (fullName) {
                const parts = fullName.split(" ");
                setFirstName(parts[0] || "");
                setLastName(parts.slice(1).join(" ") || "");
            }
        };
        checkUser();
    }, [supabase, router]);

    const VALID_CODES = ["SASI_2026", "BALAJI_2026", "SREE_2026"];

    const isDiscountApplied = useMemo(() => {
        return VALID_CODES.includes(promoCode.trim().toUpperCase());
    }, [promoCode]);

    const basePrice = 1400;
    const finalPrice = isDiscountApplied ? 199 : 1400;
    const discountAmount = isDiscountApplied ? (basePrice - 199) : 0;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setStatus(null);

        if (!userId || !workshopId) {
            setStatus({ success: false, message: "Session expired. Please refresh and try again." });
            setIsSubmitting(false);
            return;
        }

        // 1. Validate Form Data locally before initializing payment
        const userData = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            promoCode: isDiscountApplied ? promoCode.toUpperCase() : undefined
        };

        if (!userData.firstName || !userData.lastName || !userData.email) {
            setStatus({ success: false, message: "Please fill in all required fields." });
            setIsSubmitting(false);
            return;
        }

        // 2. Initialize Razorpay Order
        try {
            const { success, orderId, keyId, message: orderMessage } = await createRazorpayOrder(finalPrice, workshopId);

            if (!success || !orderId) {
                setStatus({ success: false, message: orderMessage || "Failed to initialize payment" });
                setIsSubmitting(false);
                return;
            }

            // 3. Open Razorpay Checkout
            const options = {
                key: keyId,
                amount: finalPrice * 100,
                currency: "INR",
                name: "AI Workshop",
                description: "Workshop Registration Fee",
                order_id: orderId,
                handler: async function (response: any) {
                    setStatus({ success: true, message: "Payment successful! Finalizing registration..." });

                    // 4. Verify Payment AND Register User in one step
                    const verifyRes = await verifyRazorpayPayment(
                        response.razorpay_order_id,
                        response.razorpay_payment_id,
                        response.razorpay_signature,
                        workshopId,
                        finalPrice,
                        userData
                    );

                    if (verifyRes.success) {
                        setStatus({ success: true, message: "Success! You are now enrolled in the workshop." });
                        setTimeout(() => router.push("/register/success"), 2000);
                    } else {
                        setStatus({ success: false, message: verifyRes.message || "Payment verification failed." });
                        setIsSubmitting(false);
                    }
                },
                prefill: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                },
                theme: {
                    color: "#3b82f6",
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            setStatus({ success: false, message: "An unexpected error occurred." });
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
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
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            placeholder="+91 7013271894"
                                        />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-4 text-foreground">Discount Code</h2>
                                <div className="mb-8 p-4 bg-muted/20 rounded-xl border border-muted/30">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground uppercase placeholder:text-muted-foreground/50 transition-all font-mono"
                                                placeholder="ENTER CODE"
                                            />
                                        </div>
                                    </div>
                                    {promoCode && (
                                        <div className="mt-2 text-xs font-medium">
                                            {isDiscountApplied ? (
                                                <span className="text-green-500 flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                                                    <Check size={12} /> Code applied! You save ₹{discountAmount}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground/60 italic">Invalid discount code</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold mb-6 text-foreground uppercase tracking-tight">Payment Method</h2>
                                <input type="hidden" name="paymentMethod" value="card" />

                                <div className="space-y-4 mb-8">
                                    <div className="border border-primary bg-primary/5 p-4 rounded-xl flex items-center justify-between cursor-pointer ring-1 ring-primary shadow-sm shadow-primary/10">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="text-primary" />
                                            <span className="font-semibold text-foreground">Razorpay / Card / UPI</span>
                                        </div>
                                        <div className="w-4 h-4 rounded-full border-4 border-primary bg-background shadow-inner"></div>
                                    </div>
                                </div>

                                {status && (
                                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium animate-in zoom-in-95 ${status.success ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                                        {status.message}
                                    </div>
                                )}

                                <Button size="lg" className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20" disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : `Complete Registration & Pay ₹${finalPrice}`}
                                </Button>

                                <p className="text-center text-[10px] text-muted-foreground mt-4 flex items-center justify-center gap-2 font-medium opacity-60">
                                    <Shield size={10} /> SECURE TRANSACTION | 256-BIT SSL ENCRYPTION
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card3D depth={5}>
                                <div className="bg-card rounded-3xl shadow-2xl border border-muted/20 p-8 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                                    <h3 className="font-bold text-xl mb-2 text-foreground">Order Summary</h3>
                                    <p className="text-sm text-muted-foreground mb-8">Future-Proof AI Workshop</p>

                                    <div className="space-y-4 mb-8 pb-8 border-b border-muted/20">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/70">Workshop Fee</span>
                                            <span className="text-foreground font-medium">₹1,400</span>
                                        </div>
                                        {isDiscountApplied && (
                                            <div className="flex justify-between text-sm animate-in slide-in-from-top-2">
                                                <span className="text-green-500 font-medium">Promo: {promoCode.toUpperCase()}</span>
                                                <span className="text-green-500 font-medium">-₹{discountAmount}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/70">Taxes & Fees</span>
                                            <span className="text-foreground/50">Incl.</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-8">
                                        <span className="font-bold text-foreground text-lg">Amount to Pay</span>
                                        <span className="font-bold text-3xl text-primary drop-shadow-sm transition-all">₹{finalPrice}</span>
                                    </div>

                                    <div className="bg-secondary/10 text-secondary-foreground text-[11px] font-bold p-3 rounded-xl flex items-center gap-2 mb-8 border border-secondary/20">
                                        <Clock size={16} />
                                        EARLY BIRD OFFER EXPIRES SOON
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            "3 Live Mastery Sessions",
                                            "Lifetime Recording Access",
                                            "Verified AI Certificate",
                                            "Project Source Files"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-xs text-foreground/70 font-medium">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Check size={12} />
                                                </div>
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
