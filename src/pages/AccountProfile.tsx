import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Layout from "@/components/layout/Layout";
import { Loader2, LogOut, User, Mail, Phone, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AccountProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/account"); // Redirect to login if no session
                return;
            }
            setUser(session.user);
            setLoading(false);
        };

        fetchUser();
    }, [navigate]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success("Signed out successfully");
        navigate("/account");
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-serif text-foreground mb-8 text-center uppercase tracking-wider">
                        My Account
                    </h1>

                    <div className="bg-white border border-border/50 shadow-sm p-8 rounded-lg">
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/10">
                            <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-medium mb-1">
                                    {user?.user_metadata?.first_name || "Welcome"} {user?.user_metadata?.last_name || ""}
                                </h2>
                                <p className="text-muted-foreground text-sm">{user?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Email</label>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Mail className="w-4 h-4 text-primary" />
                                        {user?.email}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Phone</label>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Phone className="w-4 h-4 text-primary" />
                                        {user?.user_metadata?.phone || "Not provided"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Joined On</label>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {new Date(user?.created_at || "").toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border/10 flex justify-end">
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors uppercase text-xs tracking-luxury font-medium"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AccountProfile;
