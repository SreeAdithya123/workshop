"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteUser, removeRegistration } from "@/app/actions/admin";

export function UserActions({ userId, isAdmin }: { userId: string, isAdmin: boolean }) {
    const [loading, setLoading] = useState(false);

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

    return (
        <button
            onClick={handleDelete}
            disabled={loading || isAdmin}
            className={`p-2 rounded-xl transition-all ${isAdmin ? 'opacity-20 cursor-not-allowed' : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'}`}
            title={isAdmin ? "Main Admin cannot be deleted" : "Delete User"}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={16} />}
        </button>
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
