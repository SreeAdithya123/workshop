"use client";

import { Trash2, Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { deleteUser, removeRegistration, addUserRegistration } from "@/app/actions/admin";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

export function UserActions({ userId, isAdmin, availableWorkshops }: { userId: string, isAdmin: boolean, availableWorkshops?: any[] }) {
    const [loading, setLoading] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState("");

    const handleDelete = async () => {
        if (isAdmin) {
            alert("Cannot delete the main admin account.");
            return;
        }

        if (!confirm("Are you sure you want to delete this user? This will also remove all their workshop registrations.")) {
            return;
        }

        setLoading(true);
        const res = await deleteUser(userId);
        if (!res.success) alert(res.message);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!selectedWorkshop) return;
        setLoading(true);
        const res = await addUserRegistration(userId, selectedWorkshop);
        setLoading(false);
        setIsAddOpen(false);
        if (!res.success) alert(res.message);
    };

    return (
        <>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setIsAddOpen(true)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                    title="Add to Workshop"
                >
                    <PlusCircle size={16} />
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading || isAdmin}
                    className={`p-2 rounded-xl transition-all ${isAdmin ? 'opacity-20 cursor-not-allowed' : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'}`}
                    title={isAdmin ? "Main Admin cannot be deleted" : "Delete User"}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={16} />}
                </button>
            </div>

            <Dialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add User to Workshop">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select a workshop to manually enroll this user. This will bypass payment.</p>
                    <select
                        value={selectedWorkshop}
                        onChange={(e) => setSelectedWorkshop(e.target.value)}
                        className="w-full p-2 bg-background border border-muted rounded-lg"
                    >
                        <option value="">Select a workshop...</option>
                        {availableWorkshops?.map((w) => (
                            <option key={w.id} value={w.id}>{w.title}</option>
                        ))}
                    </select>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button onClick={handleAdd} disabled={!selectedWorkshop || loading}>
                            {loading ? "Adding..." : "Add User"}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export function RegistrationActions({ registrationId }: { registrationId: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Remove this student from the workshop?")) {
            return;
        }

        setLoading(true);
        const res = await removeRegistration(registrationId);
        if (!res.success) alert(res.message);
        setLoading(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Remove Registration"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 size={12} />}
        </button>
    );
}
