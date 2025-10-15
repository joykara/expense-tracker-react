import { supabase } from '../../supabaseClient';
import type { FormEvent } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";
import GrainOverlay from '../../components/shared/grainOverly';
import { MailCheckIcon } from '../../components/ui/mail-check';

export default function SignUpPage() {
    const navigate = useNavigate()

    const signUpAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const fullName = formData.get('full_name') as string;

        const { data: authData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: 'http://localhost:5173/auth/callback'
            },
        });

        if (error) {
            toast.error(error.message);
            return; // Don't continue
        }

        // Show notice if user needs to verify email
        if (authData?.user && !authData.session) {
            toast.success(`Verification email sent to ${email}. Please confirm to continue.`);
            return;
        }

        if (authData?.user && authData.session) {
            await supabase.from('profiles').insert({
                id: authData.user.id,
                full_name: fullName,
            });

            toast.success('Account created and logged in!');
            navigate('/');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* <div className="absolute top-10 left-6 blur-xl rounded-full h-30 w-30 bg-orange-300 dark:bg-orange-500"></div> */}
            <div className='relative w-full max-w-md rounded-xl p-8 md:px-12 py-20 flex flex-col'>
                <GrainOverlay />
                <h1 className="font-mono text-2xl font-bold text-center">Signup to <span className='text-dark-primary'>Expense Tracker</span></h1>
                <p className='text-center text-ring'>Create your account</p>

                <form onSubmit={signUpAction} className="flex flex-col gap-4 mt-8">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Enter full name"
                        className="px-4 py-2 rounded-md border border-secondary-foreground/10"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="px-4 py-2 rounded-md border border-secondary-foreground/10"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="px-4 py-2 rounded-md border border-secondary-foreground/10"
                    />
                    <button type="submit" className="bg-foreground text-background px-4 py-2 mt-2 rounded-md flex items-center justify-center gap-2">
                        <MailCheckIcon />
                        Sign Up
                    </button>
                    {/* Already have account */}
                    <p className='text-center text-sm'>
                        Already have an account?{' '}
                        <a href="/login" className="hover:text-light-primary text-dark-primary hover:underline">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}