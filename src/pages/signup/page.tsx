import { supabase } from '../../supabaseClient';
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function SignUpPage() {
    const navigate = useNavigate()

    const signUpAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // type-casting here for convenience
        // in practice, you should validate your inputs
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { error } = await supabase.auth.signUp(data)

        if (error) {
            alert(error)
            navigate('/login')
        }
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Signup to Expense Tracker</h1>

            <form onSubmit={signUpAction} className="flex flex-col gap-2 mb-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    )
}