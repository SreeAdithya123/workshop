import { Card3D } from "@/components/ui/Card3D";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function MyEventsPage() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    // Fetch registrations for the user
    let registeredEvents: any[] = [];
    if (session) {
        const { data } = await supabase
            .from('registrations')
            .select('*, workshops(*)')
            .eq('user_id', session.user.id);

        if (data) {
            registeredEvents = data.map((reg) => ({
                id: reg.id,
                title: reg.workshops.title,
                date: new Date(reg.workshops.date).toLocaleDateString(),
                time: "10:00 AM Onwards", // This could be improved if start_time was in DB
                status: reg.payment_status === 'captured' ? 'Confirmed' : 'Pending',
                image: "bg-blue-100", // Generic image or from workshop
                workshopId: reg.workshop_id
            }));
        }
    }

    if (registeredEvents.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="text-muted-foreground w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">No Registrations Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-sm">You haven't signed up for any workshops yet. Explore our catalog to get started.</p>
                <Link href="/dashboard/events">
                    <Button>Browse Workshops</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">My Registrations</h1>
                <p className="text-muted-foreground">Track your upcoming and past workshops.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {registeredEvents.map((event: any) => (
                    <Card3D key={event.id} depth={5}>
                        <div className="bg-card rounded-xl border border-muted/20 overflow-hidden shadow-sm flex flex-col md:flex-row">
                            <div className={`md:w-32 h-32 md:h-auto ${event.image} flex items-center justify-center flex-shrink-0`}>
                                <Calendar className="text-foreground/20 w-10 h-10" />
                            </div>
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${event.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        <CheckCircle size={10} /> {event.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                                </div>

                                <div className="flex gap-3">
                                    <Button size="sm" variant="outline">View Resources</Button>
                                    <Button size="sm">Join Session</Button>
                                </div>
                            </div>
                        </div>
                    </Card3D>
                ))}
            </div>
        </div>
    );
}
