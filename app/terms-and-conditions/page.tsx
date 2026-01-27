import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: January 27, 2026</p>

                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-6">
                        <p>
                            Welcome to AI Workshop! These terms and conditions outline the rules and regulations for the use of AI Workshop's Website.
                        </p>
                        <p>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use AI Workshop
                            if you do not agree to take all of the terms and conditions stated on this page.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">License</h2>
                        <p>
                            Unless otherwise stated, AI Workshop and/or its licensors own the intellectual property rights for all material on AI Workshop.
                            All intellectual property rights are reserved. You may access this from AI Workshop for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                        <p>You must not:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Republish material from AI Workshop</li>
                            <li>Sell, rent or sub-license material from AI Workshop</li>
                            <li>Reproduce, duplicate or copy material from AI Workshop</li>
                            <li>Redistribute content from AI Workshop</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Educational Content</h2>
                        <p>
                            The materials provided in the workshops are for educational purposes only. While we aim for accuracy,
                            technology changes rapidly, and we do not guarantee that all information is completely up-to-date at all times.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">User Accounts</h2>
                        <p>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times.
                            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p>
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Payment and Refunds</h2>
                        <p>
                            Payments are processed securely via Razorpay. By purchasing a workshop slot, you agree to our Refund Policy.
                            We reserve the right to refuse service to anyone for any reason at any time.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
                        <p>
                            In no event shall AI Workshop, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
                            AI Workshop including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
