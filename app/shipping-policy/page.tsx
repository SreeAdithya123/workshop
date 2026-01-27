import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ShippingPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Shipping and Delivery Policy</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: January 27, 2026</p>

                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-6">
                        <h2 className="text-xl font-semibold mt-6 mb-3">Confirmation of Registration</h2>
                        <p>
                            Upon successful payment for the AI Workshop, you will receive an immediate confirmation email
                            to the email address provided during checkout. This email serves as your receipt and confirmation of your slot booking.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Delivery of Course Content</h2>
                        <p>
                            As this is an online educational workshop, there is <strong>no physical shipping</strong> of any goods or materials.
                        </p>
                        <p>
                            All workshop materials, resources, and joining links will be delivered digitally:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Workshop Access:</strong> Links to join the live Zoom/online sessions will be sent via email
                                24-48 hours before the workshop begins.
                            </li>
                            <li>
                                <strong>Dashboard Access:</strong> You will get instant access to your Student Dashboard where you can view
                                the schedule, syllabus, and preparatory materials immediately after registration.
                            </li>
                            <li>
                                <strong>Digital Resources:</strong> Any PDF guides, code templates, or digital assets will be available
                                for download from the Student Dashboard.
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Support</h2>
                        <p>
                            If you do not receive the confirmation email within 15 minutes of payment, please check your spam/junk folder.
                            If you still haven't received it, please contact our support team at <a href="mailto:ai.workshop.3days@gmail.com" className="text-primary hover:underline">ai.workshop.3days@gmail.com</a> or
                            call us at +91 7013271894.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
