import { Users, Star, GraduationCap, Infinity as InfinityIcon } from "lucide-react";

export function SocialProof({ studentCount = "500+" }: { studentCount?: string }) {
    const stats = [
        { icon: Users, label: "Students Enrolled", value: studentCount },
        { icon: Star, label: "Average Rating", value: "4.9/5" },
        { icon: GraduationCap, label: "Certificate Included", value: "Yes" },
        { icon: InfinityIcon, label: "Lifetime Access", value: "Guaranteed" },
    ];

    return (
        <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-8">
            <div className="bg-card shadow-lg rounded-xl border border-muted/20 py-8 px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center space-y-2 group">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                <stat.icon size={24} />
                            </div>
                            <h4 className="font-bold text-xl text-foreground">{stat.value}</h4>
                            <p className="text-sm text-foreground/70 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
