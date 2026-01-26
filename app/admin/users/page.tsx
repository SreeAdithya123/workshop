import { Search, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function UsersPage() {
    // Mock Data
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", joined: "Jan 10, 2026", role: "User" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "Jan 12, 2026", role: "User" },
        { id: 3, name: "Admin User", email: "admin@aiworkshop.com", joined: "Jan 01, 2026", role: "Admin" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground">View and manage registered users.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Export CSV</Button>
                    <Button>Invite User</Button>
                </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-muted rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="bg-card rounded-xl border border-muted/20 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/5 border-b border-muted/20 text-left text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/10">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                                <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                                    <Mail size={14} /> {user.email}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === "Admin"
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
