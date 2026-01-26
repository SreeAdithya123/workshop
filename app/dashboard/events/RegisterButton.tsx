"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createRazorpayOrder } from "@/app/actions/razorpay";
import { useRouter } from "next/navigation";

// Declare Razorpay on window
declare global {
    interface Window {
        Razorpay: any;
    }
}

export function RegisterButton({ workshopId, price, title }: { workshopId: string, price: number, title: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePayment = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const { success, orderId, keyId, message } = await createRazorpayOrder(price, workshopId);

            if (!success || !orderId) {
                alert(message || "Failed to create order");
                setLoading(false);
                return;
            }

            // 2. Open Razorpay
            const options = {
                key: keyId,
                amount: price * 100,
                currency: "INR",
                name: "AI Workshop",
                description: `Payment for ${title}`,
                order_id: orderId,
                handler: async function (response: any) {
                    // 3. Verify Payment (call edge function or nextjs api)
                    const verifyRes = await fetch("/razorpay/verify", { // Assuming this route proxies to the Edge Function or I can use the edge function URL directly if configured
                        // Actually, simpler to just start with standard alert or redirect for now as verifying requires backend route
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            // We might need to pass user_id/workshop_id here if verify endpoint needs it, 
                            // but Edge Function implementation extracted it from body or notes.
                        })
                    });

                    if (verifyRes.ok) {
                        alert("Payment Successful!");
                        router.refresh();
                        router.push("/dashboard/my-events");
                    } else {
                        alert("Payment Verification Failed");
                    }
                },
                prefill: {
                    // name: user.name, // Can pass this if we have user context
                    // email: user.email 
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response: any) {
                alert(response.error.description);
            });
            rzp1.open();

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed to initialize");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handlePayment} disabled={loading} className="w-full md:w-auto">
            {loading ? "Processing..." : `Register Now - ₹${price}`}
        </Button>
    );
}
