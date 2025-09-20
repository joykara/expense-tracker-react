'use client'
import { signInAction, signInWithGoogle } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import googleIcon from '@/public/google-icon.svg'
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${location.origin}/auth/callback`
            },
        })
    }

    // const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    //     const { error } = await supabase.auth.signInWithOtp({ email })
    //     if (!error) alert('Check your email for the login link!')
    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* <div className="absolute top-10 left-6 blur-xl rounded-full h-30 w-30 bg-orange-300 dark:bg-orange-500"></div> */}
            <div className='w-full max-w-md rounded-xl bg-indigo-50 dark:bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 p-8 md:px-12 py-20 flex flex-col'>
                <h1 className="font-mono text-2xl font-bold text-center">Welcome to Expense Tracker</h1>
                <p className='text-center'>Sign in to your account</p>
                <form action={signInAction} className="flex flex-col gap-4 mt-8">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="px-4 py-2 rounded-md bg-secondary-foreground/10"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="px-4 py-2 rounded-md bg-secondary-foreground/10"
                    />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                        Sign in with Email
                    </button>
                </form>

                <p className='text-center'>or</p>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-foreground text-background px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                    <Image
                        src={googleIcon}
                        priority
                        fetchPriority="high"
                        alt="Payd Logo"
                        className="w-4 h-4"
                    />
                    Continue with Google
                </button>
            </div>

            {/* <form action={signInWithGoogle}>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    Sign in with Google
                </button>
            </form> */}
        </div>
    )
}