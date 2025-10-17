import { useEffect, useState, useMemo } from "react";
import ExpenseForm from '../../components/AddExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import { Navbar } from '../../components/shared/Navbar';
import { X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import BudgetOverview from "../../components/BudgetOverview";
import { useBudgets, useCategories, useExpenses } from "../../hooks/useExpenses";
import { mockCategories, mockExpenses } from "../../lib/utils";
import ExpensesAreaChart from "../../components/ExpensesChart";
import SpendingChart from "../../components/SpendingChart";

interface ChartData {
    name: string;
    amount: number;
    color: string;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [budgeted, setBudgeted] = useState(0);
    const [spent, setSpent] = useState(0);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const { data: expenses } = useExpenses();
    const { data: actualCategories } = useCategories();
    const { data: budgets } = useBudgets();
    // console.log('Budgets data:', budgets);

    const expensesData = useMemo(() => {
        if (user) {
            return expenses && expenses.length > 0 ? expenses : [];
        }
        return mockExpenses;
    }, [user, expenses]);

    const categories = useMemo(() => {
        if (user) {
            return actualCategories && actualCategories.length > 0 ? actualCategories : [];
        }
        return mockCategories;
    }, [user, actualCategories]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const fetchData = async () => {
            const totalBudget = Number(budgets?.[0]?.total ?? 10000);
            setBudgeted(totalBudget);

            const totalSpent = expensesData.reduce((sum, e) => sum + Number(e.amount), 0);
            setSpent(totalSpent);

            // Group expenses by category_id
            const grouped = expensesData.reduce((acc: ChartData[], exp) => {
                const existing = acc.find((c) => c.name === exp.category_id);
                if (existing) {
                    existing.amount += Number(exp.amount);
                } else {
                    acc.push({
                        name: exp.category_id,
                        amount: Number(exp.amount),
                        color: "#8884d8", // fallback color
                    });
                }
                return acc;
            }, []);

            // Merge category name + color
            console.log('Categories:', categories, 'Grouped Data:', grouped);
            const merged = grouped.map((g) => {
                const category = categories?.find((c) => c.id === g.name);
                return {
                    ...g,
                    name: category?.name || "Unknown",
                    color: category?.color || g.color,
                };
            });

            setChartData(merged);
        };

        fetchData();
    }, [user, categories, expensesData, budgets]);

    return (
        <div className="flex flex-col min-h-screen text-foreground">
            <Navbar />
            <div className='w-full flex items-center justify-between py-2 px-6 md:px-8 my-4'>
                {user
                    ? <h1 className="text-base">Welcome, {user.email}</h1>
                    : <div className="flex flex-col gap-3 sm:flex-row items-center">
                        <h1 className="text-base">Welcome to Expense Tracker</h1>
                        <span className="text-xs text-ring italic">(Kindly note this includes mock data)</span>
                    </div>

                }
                <div className='sm:mr-8 flex gap-4 h-auto'>
                    <button
                        onClick={toggleModal}
                        className="bg-dark-primary dark:bg-light-primary border rounded-md text-white p-2 h-auto text-sm 2xl:text-base"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between gap-6 px-4 md:px-8 mb-8'>
                <BudgetOverview budgeted={budgeted} spent={spent} />
                <ExpensesAreaChart expenses={expensesData} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-4 md:px-8 mb-6'>
                <ExpenseList expenses={expensesData} categories={categories} />
                <SpendingChart data={chartData} />
            </div>

            {isOpen &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-background p-8 rounded-md shadow-lg w-11/12 max-w-md">
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-6 hover:text-destructive"
                        ><X className='w-4 h-4' /></button>
                        <ExpenseForm />
                    </div>
                </div>
            }
        </div>
    )
}
