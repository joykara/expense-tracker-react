import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
    const { user, signOut } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            {user && <p>Welcome, {user.email}</p>}
            <button
                onClick={signOut}
                className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
            >
                Logout
            </button>
        </div>
    )
}
