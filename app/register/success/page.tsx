import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card3D } from "@/components/ui/Card3D";

export default function RegistrationSuccessPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <Card3D depth={10}>
                    <div className="max-w-md w-full bg-card rounded-2xl border border-muted/20 shadow-2xl p-8 text-center relative overflow-hidden">
                        {/* Success Animation/Icon */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-foreground mb-4">Congratulations!</h1>

                        <p className="text-foreground/80 mb-6 leading-relaxed">
                            Your registration for the event is completed.
                        </p>

                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-8">
                            <p className="text-sm text-muted-foreground">
                                Our team will send you an email shortly with all the workshop details and joining instructions.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link href="/dashboard/my-events">
                                <Button className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20">
                                    Go to My Dashboard <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full">
                                    Return Home
                                </Button>
                            </Link>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-primary"></div>
                    </div>
                </Card3D>
            </div>
            <Footer />
        </div>
    );
}
