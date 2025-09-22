import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import toast from 'react-hot-toast'

export default function AuthCallbackPage() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const handleRedirect = async () => {
            const params = new URLSearchParams(window.location.search);
            const authCode = params.get('code');
            const { error } = await supabase.auth.exchangeCodeForSession(authCode ?? '');

            if (error) {
                toast.error('Email verification failed. Try logging in manually.');
                navigate('/login');
            } else {
                toast.success('Email verified and logged in!');
                navigate('/');
            }

            setLoading(false);
        }

        handleRedirect()
    }, [navigate])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">{loading ? 'Verifying your email...' : 'Redirecting...'}</p>
        </div>
    )
}
