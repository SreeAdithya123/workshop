"use client";

import { Button } from "@/components/ui/Button";
import { Save, Shield, Bell, Lock } from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Global Settings</h1>
                <p className="text-muted-foreground">Manage platform-wide configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Security Settings */}
                <div className="bg-card rounded-2xl border border-muted/20 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Security & Access</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">Maintenance Mode</p>
                                <p className="text-xs text-muted-foreground">Restrict access to everyone except admins</p>
                            </div>
                            <input type="checkbox" className="w-10 h-5 bg-muted rounded-full appearance-none checked:bg-primary transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">New User Registration</p>
                                <p className="text-xs text-muted-foreground">Allow new students to sign up</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-10 h-5 bg-muted rounded-full appearance-none checked:bg-primary transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-card rounded-2xl border border-muted/20 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Bell size={20} />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Communication</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">Email Notifications</p>
                                <p className="text-xs text-muted-foreground">Send registration confirmation emails</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-10 h-5 bg-muted rounded-full appearance-none checked:bg-primary transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">Payment Alerts</p>
                                <p className="text-xs text-muted-foreground">Notify admin on successful payments</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-10 h-5 bg-muted rounded-full appearance-none checked:bg-primary transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <Button variant="outline" className="rounded-full px-8">Discard Changes</Button>
                <Button className="rounded-full px-8 flex items-center gap-2 shadow-lg shadow-primary/20">
                    <Save size={18} /> Save Configurations
                </Button>
            </div>
        </div>
    );
}
