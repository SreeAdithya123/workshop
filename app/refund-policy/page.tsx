import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Refund and Cancellation Policy</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: January 27, 2026</p>

                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-6">
                        <p>
                            Thank you for enrolling in the AI Workshop. We want to ensure you have a rewarding learning experience.
                            As with any online purchase experience, there are terms and conditions that govern the Refund Policy.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Cancellation by You</h2>
                        <p>
                            We offer a massive discount for early birds and students. Because of the limited seating for our live workshops,
                            we have the following cancellation policy:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>7+ days before event:</strong> If you cancel your registration at least 7 days before the event start date,
                                you are eligible for a 100% refund.
                            </li>
                            <li>
                                <strong>3-6 days before event:</strong> Cancellations made between 3 to 6 days prior to the event will receive a 50% refund.
                            </li>
                            <li>
                                <strong>Less than 48 hours:</strong> Unfortunately, we cannot offer refunds for cancellations made less than 48 hours before the event,
                                as your spot has been reserved and cannot be filled by another student at such short notice.
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Cancellation by Us</h2>
                        <p>
                            In the unlikely event that we have to cancel the workshop due to unforeseen circumstances (instructor illness, technical failure, etc.),
                            you will receive a full 100% refund of your registration fee. We are not responsible for any other expenses you may have incurred.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Refund Process</h2>
                        <p>
                            Refunds will be processed to the original payment method (Credit Card/Debit Card/UPI) provided during the purchase.
                        </p>
                        <p>
                            Once your refund request is approved, please allow 5-7 business days for the amount to reflect in your bank account,
                            depending on your bank's processing time.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">How to Request a Refund</h2>
                        <p>
                            To request a refund, please email us at <a href="mailto:ai.workshop.3days@gmail.com" className="text-primary hover:underline">ai.workshop.3days@gmail.com</a> with
                            your Order ID and registered email address.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
