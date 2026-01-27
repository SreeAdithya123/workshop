import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: January 27, 2026</p>

                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-6">
                        <p>
                            At AI Workshop, accessible from our website, one of our main priorities is the privacy of our visitors.
                            This Privacy Policy document contains types of information that is collected and recorded by AI Workshop and how we use it.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
                        <p>
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it,
                            will be made clear to you at the point we ask you to provide your personal information.
                        </p>
                        <p>
                            When you register for our workshop, we may ask for your contact information, including items such as name,
                            email address, and telephone number. We also collect payment information via our secure payment gateway (Razorpay).
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide, operate, and maintain our website and workshop services</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                            <li>Send you emails</li>
                            <li>Find and prevent fraud</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Payment Processing</h2>
                        <p>
                            We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers.
                            The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment.
                            Your purchase transaction data is only used as long as is necessary to complete your purchase transaction.
                            After that is complete, your purchase transaction information is not saved.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
                        <p>
                            Like any other website, AI Workshop uses 'cookies'. These cookies are used to store information
                            including visitors' preferences, and the pages on the website that the visitor accessed or visited.
                            The information is used to optimize the users' experience by customizing our web page content based on
                            visitors' browser type and/or other information.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
                        <p>
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
