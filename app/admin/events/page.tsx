import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";

export default function ManageEventsPage() {
    // Mock Data
    const events = [
        { id: 1, title: "AI Fundamentals", date: "Feb 15, 2026", registrations: 120, status: "Published" },
        { id: 2, title: "No-Code Apps", date: "Feb 22, 2026", registrations: 85, status: "Published" },
        { id: 3, title: "AI Filmmaking", date: "Mar 01, 2026", registrations: 40, status: "Draft" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manage Events</h1>
                    <p className="text-muted-foreground">Create and manage your workshops.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={18} /> Add New Event
                </Button>
            </div>

            <div className="bg-card rounded-xl border border-muted/20 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/5 border-b border-muted/20 text-left text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-4">Event Title</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Registrations</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/10">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-muted/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{event.title}</td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} /> {event.date}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-foreground">{event.registrations}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${event.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
