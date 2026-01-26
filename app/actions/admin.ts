"use server";

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAdminClient() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value; },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Unauthorized");

    // Double check email for safety
    if (session.user.email !== 'adithya.kandikonda@sasi.ac.in') {
        throw new Error("Unauthorized: Admin access required");
    }

    return supabase;
}

export async function deleteUser(userId: string) {
    try {
        const supabase = await getAdminClient();

        // Delete profile and registrations (cascading if set up, but let's be explicit)
        await supabase.from("registrations").delete().eq("user_id", userId);
        const { error } = await supabase.from("profiles").delete().eq("id", userId);

        if (error) throw error;

        revalidatePath("/admin/users");
        return { success: true, message: "User deleted successfully" };
    } catch (error: any) {
        console.error("Delete User Error:", error);
        return { success: false, message: error.message || "Failed to delete user" };
    }
}

export async function removeRegistration(registrationId: string) {
    try {
        const supabase = await getAdminClient();

        const { error } = await supabase.from("registrations").delete().eq("id", registrationId);

        if (error) throw error;

        revalidatePath("/admin/events");
        revalidatePath("/admin/users");
        return { success: true, message: "Registration removed successfully" };
    } catch (error: any) {
        console.error("Remove Registration Error:", error);
        return { success: false, message: error.message || "Failed to remove registration" };
    }
}
