import ExpenseForm from '../../components/AddExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
    const { user, signOut } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <div className='w-full flex items-center justify-between py-2 px-4 mb-4'>
                <h1 className="text-2xl">Dashboard</h1>
                <div className='mr-8 flex gap-4'>
                    <button
                        onClick={signOut}
                        className="text-destructive hover:text-white hover:bg-destructive p-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {user && <p>Welcome, {user.email}</p>}
            <ExpenseList />
            <ExpenseForm />
        </div>
    )
}
