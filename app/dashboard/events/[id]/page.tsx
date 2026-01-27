import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Clock, DollarSign, Users, CheckCircle, Smartphone, Globe, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value; },
            },
        }
    );

    // Fetch the workshop which contains the agenda
    const { data: workshop } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!workshop) {
        return <div>Workshop not found</div>;
    }

    // Find the specific session/day in the agenda
    // Note: params.id comes as a string, agenda item id is mostly number/string. Coerce for comparison.
    const event = workshop.agenda?.find((item: any) => String(item.id) === params.id);

    if (!event) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Session not found</h1>
                <Link href="/dashboard/events" className="text-primary hover:underline mt-4 inline-block">Back to Events</Link>
            </div>
        );
    }

    // Use workshop syllabus if specific event syllabus is missing, or generic fallback
    const syllabus = event.syllabus || [
        "Interactive Session",
        "Live Q&A",
        "Practical Examples",
        "Networking Opportunity"
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Back to Events
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Day {event.id} Session</span>
                        <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
                        <p className="text-lg text-foreground/80 leading-relaxed">{event.description}</p>
                    </div>

                    <Card3D depth={5}>
                        <div className="bg-card rounded-xl border border-muted/20 p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-6">What We'll Cover</h2>
                            <ul className="space-y-4">
                                {syllabus.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                                        <CheckCircle className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card3D>

                    {event.longDescription && (
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-4">About the Session</h2>
                            <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
                                {event.longDescription}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar Card */}
                <div>
                    <div className="sticky top-8">
                        <Card3D depth={10}>
                            <div className="bg-card rounded-xl border border-muted/20 overflow-hidden shadow-xl">
                                <div className={`h-32 ${event.image || 'bg-primary/10'} flex items-center justify-center`}>
                                    <Calendar className="text-foreground/20 w-12 h-12" />
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="space-y-4 pb-6 border-b border-muted/20">
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Calendar className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Clock className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-foreground/80">
                                            <Video className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">Live Online (Zoom)</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Session Fee</span>
                                        <span className="text-2xl font-bold text-foreground">Included</span>
                                    </div>

                                    <Link href="/register">
                                        <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/25">
                                            Register for Workshop
                                        </Button>
                                    </Link>

                                    <p className="text-center text-xs text-muted-foreground pt-2">
                                        Access to all 3 days included.
                                    </p>
                                </div>
                            </div>
                        </Card3D>
                    </div>
                </div>
            </div>
        </div>
    );
}
