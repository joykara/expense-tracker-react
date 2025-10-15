import googleIcon from '../../assets/google-icon.svg'
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import GrainOverlay from '../../components/shared/grainOverly';
import { MailCheckIcon } from '../../components/ui/mail-check';

export default function LoginPage() {
    const { signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const signInAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { error } = await supabase.auth.signInWithPassword(data)

        if (error) {
            toast.error(error.message)
            navigate('/login')
        }
        toast.success('Welcome back!')
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Glass effect */}
            {/* <div className='relative w-full max-w-md rounded-xl bg-purple-300 dark:bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 p-8 md:px-12 py-20 flex flex-col'> */}
            <div className='relative w-full max-w-md rounded-xl p-8 md:px-12 py-20 flex flex-col gap-2'>
                <GrainOverlay />
                <h1 className="font-mono text-2xl font-bold text-center">Welcome to <span className='text-dark-primary'>Expense Tracker</span></h1>
                <p className='text-center'>Sign in to your account</p>
                <form onSubmit={signInAction} className="flex flex-col gap-4 mt-8">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="px-4 py-2 rounded-md bg-primary-foreground border border-secondary-foreground/10"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="px-4 py-2 rounded-md bg-primary-foreground border border-secondary-foreground/10"
                    />
                    <button type="submit" className="bg-primary text-background px-4 py-2 rounded flex gap-2 justify-center items-center">
                        <MailCheckIcon />
                        Sign in with Email
                    </button>
                </form>

                <p className='text-center'>or</p>
                <button
                    onClick={signInWithGoogle}
                    className="bg-foreground text-background px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                    <img
                        src={googleIcon}
                        fetchPriority="high"
                        alt="Google Icon"
                        className="w-4 h-4"
                    />
                    Continue with Google
                </button>
                    <p className='text-center text-sm mt-0.5'>
                        Create account?{' '}
                        <a href="/signup" className="hover:text-light-primary text-dark-primary hover:underline">
                            Sign up
                        </a>
                    </p>
            </div>

            {/* <form action={signInWithGoogle}>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    Sign in with Google
                </button>
            </form> */}
        </div>
    )
}