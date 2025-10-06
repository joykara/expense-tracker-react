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

interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
}

export function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null)

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
        <header className="flex items-center justify-between px-6 py-4 shadow-sm border-b/70">
            {/* Left side */}
            <div className="text-xl font-serif font-semibold">Expense Tracker</div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {/* Theme switcher */}
                <ModeToggle />

                {/* User avatar + dropdown */}
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
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        {user ?(<DropdownMenuItem onClick={signOut}>
                            Logout
                        </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={()=> navigate('/login')}>
                                Login
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
