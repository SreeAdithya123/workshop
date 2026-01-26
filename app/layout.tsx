import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Learn AI in 3 Days - Build Real Projects | AI Workshop",
    description: "Join 500+ students building AI apps, chatbots, and videos in our live 3-day workshop.",
};

import Script from "next/script";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.variable, poppins.variable, "font-sans antialiased bg-background text-foreground min-h-screen flex flex-col")}>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
                {children}
            </body>
        </html>
    );
}
