"use server";

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Helper to get Function URL
function getFunctionUrl(path: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // Ensure we point to the deployed function 'razorpay-order' and append the specific route path
    // Format: https://project.supabase.co/functions/v1/razorpay-order/razorpay/create-order 
    return `${supabaseUrl}/functions/v1/razorpay-order${path}`;
}

export async function createRazorpayOrder(amount: number, workshopId: string) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value; },
                set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }); },
                remove(name: string, options: any) { cookieStore.set({ name, value: "", ...options }); },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return { success: false, message: "Please log in to register." };
    }

    try {
        const response = await fetch(getFunctionUrl("/razorpay/create-order"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Convert to Paise
                receipt: `rcpt_${Date.now().toString().slice(-8)}`,
                notes: {
                    user_id: session.user.id,
                    workshop_id: workshopId
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Edge Function Error:", data);
            return { success: false, message: data.error || "Failed to create order" };
        }

        return {
            success: true,
            orderId: data.order.id,
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
        };
    } catch (error) {
        console.error("Order Creation Error:", error);
        return { success: false, message: "Failed to communicate with payment service." };
    }
}

export async function verifyRazorpayPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    workshopId: string,
    amount: number,
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        promoCode?: string;
    }
) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value; },
                set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }); },
                remove(name: string, options: any) { cookieStore.set({ name, value: "", ...options }); },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { success: false, message: "Unauthorized" };

    try {
        // 1. Call Edge Function to verify signature
        const response = await fetch(getFunctionUrl("/razorpay/verify"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                user_id: session.user.id,
                workshop_id: workshopId,
                amount: amount
            })
        });

        const data = await response.json();

        if (!response.ok || !data.verified) {
            console.error("Verification Failed:", data);
            return { success: false, message: data.error || "Payment verification failed" };
        }

        // 2. Payment is VERIFIED. Now, and only now, register the user in the database.
        const { error } = await supabase.from("registrations").insert({
            user_id: session.user.id,
            workshop_id: workshopId || null,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            phone: userData.phone || null,
            payment_method: "razorpay",
            payment_status: "paid",
            payment_id: razorpay_payment_id,
            amount: amount,
            promo_code: userData.promoCode || null,
            registered_at: new Date().toISOString(),
        });

        if (error) {
            console.error("DB Registration Error:", error);
            // Even if DB insert fails, the payment WAS successful. 
            // In a production app, you'd want a reconciliation cron or better error handling here.
            return { success: false, message: "Payment verified but failed to save registration. Please contact support with Payment ID: " + razorpay_payment_id };
        }

        return { success: true };

    } catch (error) {
        console.error("Verification Error:", error);
        return { success: false, message: "Verification service unavailable" };
    }
}
