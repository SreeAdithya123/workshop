import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/30 text-foreground py-16 border-t border-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                AI
                            </div>
                            <span className="font-heading font-bold text-xl text-foreground">Workshop</span>
                        </div>
                        <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                            Empowering students and creators to build real-world applications with AI. Join the revolution today.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="text-foreground/60 hover:text-primary transition-colors"><Youtube size={20} /></Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About Workshop</Link></li>
                            <li><Link href="/structure" className="text-foreground/70 hover:text-primary transition-colors">Structure</Link></li>
                            <li><Link href="/#pricing" className="text-foreground/70 hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/#faq" className="text-foreground/70 hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="font-bold text-foreground mb-4">Legal & Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/contact-us" className="text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms-and-conditions" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="text-foreground/70 hover:text-primary transition-colors">Refund Policy</Link></li>
                            <li><Link href="/shipping-policy" className="text-foreground/70 hover:text-primary transition-colors">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="font-bold text-foreground mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-foreground/70">
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-primary" /> ai.workshop.3days@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-primary" /> +91-7013271894
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-primary" /> ai.workshop.3days@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-muted/20 pt-8 text-xs text-center text-foreground/70">
                    <p>
                        Owned & operated by Vyoman Interviewer
                        <br />
                        Merchant: KANDIKONDA DINAMANI PRABHAKARA SREE ADITHYA
                    </p>

                    <div className="flex gap-6 mt-4 justify-center flex-wrap">
                        <Link href="/terms-and-conditions" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
                        <Link href="/shipping-policy" className="hover:text-foreground">Shipping Policy</Link>
                        <Link href="/contact-us" className="hover:text-foreground md:hidden">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}