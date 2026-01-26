import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    req.cookies.set({ name, value, ...options });
                    res.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: any) {
                    req.cookies.set({ name, value: "", ...options });
                    res.cookies.set({ name, value: "", ...options });
                },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Protect admin routes (conceptually - for this demo we might check email or custom claim)
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // Ideally checking for admin role here
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
