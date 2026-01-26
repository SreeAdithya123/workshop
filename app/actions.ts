"use server";

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// This file is now primarily for shared non-admin actions if needed.
// Registration logic has been moved to verifyRazorpayPayment to ensure
// enrollment only happens after a successful transaction.
