/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export default function DashboardPage() {
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data, error } = await supabase.auth.getUser()
            if (error || !data?.user) {
                redirect('/login')
            } else {
                setUser(data.user)
            }
        }
        getUser()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            {user && <p>Welcome, {user.email}</p>}
            <button
                onClick={handleLogout}
                className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
            >
                Logout
            </button>
        </div>
    )
}
