'use client'
import { signUpAction } from '@/app/actions/auth';

export default function SignUpPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Signup to Expense Tracker</h1>

            <form action={signUpAction} className="flex flex-col gap-2 mb-4">
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