declare const Deno: any;
// razorpay-order/index.ts
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

// Environment / secrets
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET")!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables");
}
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("Missing Razorpay secrets");
    // Return error to client to debug
    // In production, don't expose this, but for this workshop debugging it's helpful
}
if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET");
}

// Validation middleware
const checkSecrets = () => {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        return new Response(JSON.stringify({ error: "Server Configuration Error: Razorpay Secrets Missing" }), { status: 500 });
    }
    return null;
};

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});

// Helpers
const razorpayBasicAuth = () =>
    "Basic " +
    btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

function verifyRazorpaySignature(payload: string, expectedSignature: string, secret: string) {
    const h = crypto.createHmac("sha256", secret);
    h.update(payload);
    const digest = h.digest("hex");
    // Constant-time compare
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(expectedSignature));
}

async function createOrderHandler(req: Request) {
    const errorRes = checkSecrets();
    if (errorRes) return errorRes;

    // Expected body: { amount: number (in rupees or smallest currency unit?), currency?: string, receipt?: string, notes?: object, workshop_id?: string, user_id?: string }
    // Razorpay expects amount in paise (INR) or smallest currency unit.
    const body = await req.json().catch(() => ({}));
    if (!body.amount) {
        return new Response(JSON.stringify({ error: "amount is required" }), { status: 400 });
    }
    const currency = body.currency ?? "INR";
    // If user provided amount in rupees, you may want to multiply by 100. Expect amount in smallest unit.
    const amount = body.amount; // ensure client sends amount in paisa (e.g., 50000 for ₹500)

    const payload: Record<string, any> = {
        amount,
        currency,
        receipt: body.receipt ?? `rcpt_${Date.now().toString().slice(-8)}`,
        payment_capture: body.payment_capture ?? 1, // 1 = auto-capture; set 0 for manual capture
        notes: body.notes ?? {},
    };

    const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
            Authorization: razorpayBasicAuth(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Razorpay order creation failed", details: data }), { status: res.status });
    }

    // Optionally persist order to DB (not done here). Client will use data.id in Checkout.
    return new Response(JSON.stringify({ order: data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function verifyPaymentHandler(req: Request) {
    // Expected body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id?, workshop_id? }
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = body;
    let { user_id, workshop_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const valid = verifyRazorpaySignature(payload, razorpay_signature, RAZORPAY_KEY_SECRET);

    if (!valid) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }

    // Optionally, fetch payment details from Razorpay to confirm status/amount
    const r = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
        method: "GET",
        headers: { Authorization: razorpayBasicAuth() },
    });
    const paymentDetails = await r.json();

    // Optionally insert a registration record or update DB
    if (user_id && workshop_id) {
        const insert = {
            user_id,
            workshop_id,
            payment_id: razorpay_payment_id,
            payment_status: paymentDetails.status ?? "unknown",
            amount: amount ?? paymentDetails.amount ?? null,
            created_at: new Date().toISOString(),
        };
        const { error } = await supabase.from("registrations").insert([insert]);
        if (error) {
            console.error("DB insert error:", error);
            // still return success of signature verification but warn
            return new Response(JSON.stringify({ verified: true, warning: "DB insert failed", dbError: error }), { status: 200 });
        }
    }

    return new Response(JSON.stringify({ verified: true, payment: paymentDetails }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function webhookHandler(req: Request) {
    // Razorpay sends raw body and X-Razorpay-Signature header
    const signature = req.headers.get("x-razorpay-signature") ?? "";
    const rawBody = await req.text(); // capture raw text for HMAC verification

    // Verify webhook signature
    const valid = verifyRazorpaySignature(rawBody, signature, WEBHOOK_SECRET);
    if (!valid) {
        return new Response(JSON.stringify({ error: "Invalid webhook signature" }), { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    try {
        if (eventType === "payment.captured" || eventType === "payment.failed") {
            // payload path: event.payload.payment.entity
            const payment = event.payload?.payment?.entity;
            if (!payment) {
                return new Response(JSON.stringify({ error: "No payment entity in payload" }), { status: 400 });
            }

            // We'll expect that receipt or notes include user_id and workshop_id.
            // Common approach: when creating order, include notes: { user_id, workshop_id } so that webhook can map.
            const notes = payment.notes ?? {};
            let user_id = notes.user_id ?? null;
            let workshop_id = notes.workshop_id ?? null;
            const payment_id = payment.id;
            const payment_status = payment.status;
            const amount = payment.amount; // in smallest currency unit
            const ts = new Date().toISOString();

            if (!user_id || !workshop_id) {
                // If you can't find user/workshop ids in notes, try matching by receipt or order_id
                // e.g., payment.order_id -> fetch order and check notes on order
                if (payment.order_id) {
                    // fetch order to read notes
                    const ordRes = await fetch(`https://api.razorpay.com/v1/orders/${payment.order_id}`, {
                        headers: { Authorization: razorpayBasicAuth() },
                    });
                    if (ordRes.ok) {
                        const ord = await ordRes.json();
                        if (ord?.notes) {
                            user_id = user_id ?? ord.notes.user_id;
                            workshop_id = workshop_id ?? ord.notes.workshop_id;
                        }
                    }
                }
            }

            if (!user_id || !workshop_id) {
                console.warn("Webhook missing user_id or workshop_id in notes; skipping DB update");
                return new Response(JSON.stringify({ ok: true, warning: "missing user/workshop mapping" }), { status: 200 });
            }

            // Upsert into registrations: if a row for user+workshop exists, update, else insert.
            // Adjust unique constraint as necessary. Here we upsert on (user_id, workshop_id).
            const upsertRow = {
                user_id,
                workshop_id,
                payment_id,
                payment_status,
                amount,
                created_at: ts,
            };

            // Use RPC or upsert via ON CONFLICT requires unique constraint in DB. We'll use upsert assuming
            // registrations has unique (user_id, workshop_id). If not, adjust accordingly.
            const { error } = await supabase
                .from("registrations")
                .upsert([upsertRow], { onConflict: "user_id,workshop_id" });

            if (error) {
                console.error("DB upsert error:", error);
                return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
            }

            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }

        // For other events, just ack
        return new Response(JSON.stringify({ ok: true, event: eventType }), { status: 200 });
    } catch (err) {
        console.error("Webhook handler error:", err);
        return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
    }
}

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/$/, ""); // trim trailing slash

    // Route: POST /razorpay/create-order
    if (req.method === "POST" && path.endsWith("/razorpay/create-order")) {
        return await createOrderHandler(req);
    }

    // Route: POST /razorpay/verify
    if (req.method === "POST" && path.endsWith("/razorpay/verify")) {
        return await verifyPaymentHandler(req);
    }

    // Route: POST /razorpay/webhook
    if (req.method === "POST" && path.endsWith("/razorpay/webhook")) {
        return await webhookHandler(req);
    }

    return new Response("Not Found", { status: 404 });
});
