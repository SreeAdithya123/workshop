import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h1>
                    <p className="text-lg text-muted-foreground mb-12">
                        Have questions about the workshop? Need support? We're here to help.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                    <p className="text-muted-foreground mb-1">For general inquiries and support:</p>
                                    <a href="mailto:ai.workshop.3days@gmail.com" className="text-primary hover:underline font-medium">ai.workshop.3days@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                    <p className="text-muted-foreground mb-1">Mon-Fri from 9am to 6pm IST:</p>
                                    <a href="tel:+917013271894" className="text-primary hover:underline font-medium">+91 7013271894</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Office Address</h3>
                                    <p className="text-muted-foreground">
                                        AI Workshop <br />
                                        Technology Park, Sector 4<br />
                                        Hyderabad, Telangana 500081<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-muted/20 p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-2 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-primary outline-none" required></textarea>
                                </div>
                                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
