"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitRegistration(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string; // Optional if you want to capture phone
    const paymentMethod = formData.get("paymentMethod") as string;

    if (!firstName || !lastName || !email) {
        return { success: false, message: "Missing required fields" };
    }

    try {
        const { error } = await supabase.from("registrations").insert({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            payment_method: paymentMethod,
            created_at: new Date().toISOString(),
        });

        if (error) {
            console.error("Supabase Error:", error);
            return { success: false, message: "Failed to save registration. Please try again." };
        }

        revalidatePath("/register");
        return { success: true, message: "Registration successful!" };
    } catch (e) {
        console.error("Server Error:", e);
        return { success: false, message: "Internal Server Error" };
    }
}
