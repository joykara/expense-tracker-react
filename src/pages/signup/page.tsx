import { supabase } from '../../supabaseClient';
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function SignUpPage() {
    const navigate = useNavigate()

    const signUpAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const { data: authData, error } = await supabase.auth.signUp({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            options: {
                data: {
                    full_name: formData.get('full_name') as string,
                }
            }
        })

        if (!error && authData?.user) {
            await supabase.from('profiles').insert({
                id: authData.user.id, // same as user.id
                full_name: formData.get('full_name') as string,
            })
        }

        if (error) {
            alert(error)
            navigate('/login')
        }
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* <div className="absolute top-10 left-6 blur-xl rounded-full h-30 w-30 bg-orange-300 dark:bg-orange-500"></div> */}
            <div className='w-full max-w-md rounded-xl bg-purple-300 dark:bg-gray-500/10 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 p-8 md:px-12 py-20 flex flex-col'>
                <h1 className="font-mono text-2xl font-bold text-center">Signup to Expense Tracker</h1>
                <p className='text-center'>Create your account</p>

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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}