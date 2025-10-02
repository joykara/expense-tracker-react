import { useState } from 'react';
import ExpenseForm from '../../components/AddExpenseForm';
import { BarChart } from '../../components/BarChart';
import ExpenseList from '../../components/ExpenseList';
import { Navbar } from '../../components/shared/Navbar';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='w-full flex items-center justify-between py-2 px-4 my-4'>
                {user && <h1 className="text-base">Welcome, {user.email}</h1>}
                <div className='mr-8 flex gap-4'>
                    <button
                        onClick={toggleModal}
                        className="text-destructive border rounded-md hover:text-white hover:bg-destructive p-2"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4'>
                <ExpenseList />
                <BarChart />
            </div>

            {isOpen &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-background p-8 rounded-md shadow-lg w-11/12 max-w-md">
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-6 hover:text-destructive"
                        ><X className='w-4 h-4'/></button>
                        <ExpenseForm />
                    </div>
                </div>
            }
        </div>
    )
}
