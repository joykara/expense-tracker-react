import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import ModeToggle from "../mode-toggle" // your theme switcher
import { supabase } from "../../supabaseClient"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"

interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
}

export function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null)
    const queryClient = useQueryClient()

    useEffect(() => {
        const getProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("id, full_name, avatar_url")
                    .eq("id", user.id)
                    .single()

                if (!error && data) setProfile(data)
            }
        }

        getProfile()
    }, [])

    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-primary-foreground/40 dark:border-white border-b/70">
            <div className="text-xl font-serif font-semibold">Expense Tracker</div>

            <div className="flex items-center gap-4">
                {/* Theme switcher */}
                <ModeToggle />

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={profile?.avatar_url || ""} />
                            <AvatarFallback>
                                {profile?.full_name?.[0] || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            {profile?.full_name || user?.email || "Anonymous"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/expenses')}>Expenses</DropdownMenuItem>
                        {user ? (
                            <DropdownMenuItem onClick={async () => {
                                queryClient.clear();
                                await signOut();
                                navigate("/login");
                            }}>
                                Logout
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => navigate('/login')}>
                                Login
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
