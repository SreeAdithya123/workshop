import { Card3D } from "@/components/ui/Card3D";
import { UserCircle, Trophy, MessageSquare, Award } from "lucide-react";

export default function CommunityPage() {
    // Mock Leaderboard Data
    const leaderboard = [
        { rank: 1, name: "Arjun Mehta", points: 2450, badges: 5 },
        { rank: 2, name: "Priya Sharma", points: 2100, badges: 4 },
        { rank: 3, name: "Rahul Verma", points: 1950, badges: 3 },
        { rank: 4, name: "Sneha Gupta", points: 1800, badges: 3 },
        { rank: 5, name: "Vikram Singh", points: 1650, badges: 2 },
    ];

    // Mock Community Interactions
    const interactions = [
        { user: "Arjun Mehta", action: "shared a project", context: "AI Movie Generator", time: "2h ago" },
        { user: "Priya Sharma", action: "completed", context: "Prompt Engineering Module", time: "4h ago" },
        { user: "Rahul Verma", action: "earned badge", context: "Agent Builder", time: "1d ago" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
                <p className="text-muted-foreground">Connect, compete, and grow with fellow AI enthusiasts.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leaderboard Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Trophy className="text-yellow-500" /> Leaderboard
                    </h2>
                    <Card3D depth={5}>
                        <div className="bg-card rounded-xl border border-muted/20 overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/10 text-muted-foreground font-medium border-b border-muted/20">
                                    <tr>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Points</th>
                                        <th className="px-6 py-4">Badges</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-muted/10">
                                    {leaderboard.map((user) => (
                                        <tr key={user.rank} className="hover:bg-muted/5 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground flex items-center gap-2">
                                                {user.rank === 1 && <Trophy size={16} className="text-yellow-500" />}
                                                {user.rank === 2 && <Trophy size={16} className="text-gray-400" />}
                                                {user.rank === 3 && <Trophy size={16} className="text-amber-700" />}
                                                #{user.rank}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-foreground">
                                                <div className="flex items-center gap-2">
                                                    <UserCircle className="text-muted-foreground" size={24} />
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-primary font-bold">{user.points}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{user.badges} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card3D>
                </div>

                {/* Community Feed / Interactions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="text-primary" /> Live Updates
                    </h2>
                    <div className="space-y-4">
                        {interactions.map((item, i) => (
                            <div key={i} className="bg-card p-4 rounded-xl border border-muted/20 shadow-sm flex items-start gap-4">
                                <div className="mt-1">
                                    {item.action.includes("badge") ? (
                                        <Award className="text-yellow-500" size={20} />
                                    ) : item.action.includes("shared") ? (
                                        <MessageSquare className="text-blue-500" size={20} />
                                    ) : (
                                        <Trophy className="text-green-500" size={20} />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        <span className="font-bold">{item.user}</span> {item.action}{" "}
                                        <span className="font-medium text-primary">{item.context}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
