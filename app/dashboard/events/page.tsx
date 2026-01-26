import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";

export default async function EventsListPage() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    // Fetch the single most recent workshop
    const { data: workshop } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
    // In this "Single Workshop" model, these "events" are effectively the agenda items/sessions
    const events = workshop?.agenda || [];
    const workshopId = workshop?.id;
    const price = workshop?.fee || 1400;

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{workshop?.title || "Upcoming Workshop"}</h1>
                    <p className="text-muted-foreground max-w-xl">{workshop?.description || "Join us for an immersive AI learning experience."}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium">
                        <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full border border-muted/20"><Calendar size={14} /> 3 Days</span>
                        <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full border border-muted/20"><Clock size={14} /> 15+ Hours</span>
                        <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full border border-muted/20"><DollarSign size={14} /> ₹{price}</span>
                        <span className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full border border-muted/20"><Users size={14} /> 500+ Community</span>
                    </div>
                </div>
                {workshopId && (
                    <Link href="/register">
                        <Button className="w-full md:w-auto font-bold rounded-full h-11 px-8 shadow-lg shadow-primary/20">
                            Register Now - ₹{price}
                        </Button>
                    </Link>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Workshop Agenda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(events) && events.map((event: any) => (
                        <Card3D key={event.id} depth={5}>
                            <div className="bg-card rounded-xl border border-muted/20 overflow-hidden shadow-sm h-full flex flex-col">
                                <div className={`h-40 ${event.image} flex items-center justify-center`}>
                                    <Calendar className="text-foreground/20 w-16 h-16" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg text-foreground mb-2">{event.title}</h3>
                                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{event.description}</p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar size={14} /> {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock size={14} /> {event.time}
                                        </div>
                                    </div>

                                    {/* Link to specific session details or global details */}
                                    <Link href={`/dashboard/events`} className="mt-auto">
                                        <button className="w-full py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Card3D>
                    ))}

                    {(!events || events.length === 0) && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No agenda items found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
