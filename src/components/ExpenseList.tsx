import { useNavigate } from "react-router";
import { useCategories, useExpenses } from "../hooks/useExpenses";
import type { Category, Expense } from "../lib/types";
import { mockCategories, mockExpenses } from "../lib/utils";

function groupByDate(expenses: Expense[]) {
    return expenses.reduce((acc, exp) => {
        (acc[exp.date] = acc[exp.date] || []).push(exp);
        return acc;
    }, {} as Record<string, Expense[]>);
}

function formatDate(dateStr: string) {
    // Date and day format helper
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
}

export default function ExpenseList() {
    const navigate = useNavigate();
    const { data: actualCategories } = useCategories();
    const { data: actualExpenses } = useExpenses();

    const expenses = actualExpenses && actualExpenses.length > 0 ? actualExpenses : mockExpenses;
    const categories = actualCategories && actualCategories.length > 0 ? actualCategories : mockCategories;
    const getCategoryById = (id: string | null) => categories?.find((cat: Category) => cat.id === id);

    if (!expenses || expenses.length === 0) {
        return <p>Track your first expense</p>;
    }

    const grouped = groupByDate(expenses);
    console.log('grouped', grouped);

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <h2 className="lg:text-lg font-medium">Recent Expenses</h2>
                <button className="text-sm text-primary hover:underline" onClick={() => navigate('/expenses')}>
                    View All
                </button>
            </div>
            <div className="space-y-8">
                {Object.entries(grouped).slice(0,4).map(([date, dayExpenses]) => (
                    <div key={date}>
                        <div className="bg-muted px-4 py-2 rounded font-semibold text-sm mb-2">{formatDate(date)}</div>
                        <div className="space-y-2 bg-primary-foreground border-l-2 border-bright/50 ml-4">
                            {dayExpenses.map((exp) => {
                                const category = getCategoryById(exp.category_id);
                                return (
                                    <div key={exp.id} className="flex items-center gap-4 p-3 pl-4 hover:bg-bright/10 rounded-r cursor-pointer">
                                        <span
                                            className="inline-block rounded px-2 py-1 text-sm"
                                            style={{ color: category?.color, border: `1px solid ${category?.color}`, borderRadius: '6px' }}
                                        >
                                            {category?.name}
                                        </span>
                                        <span className="flex-1">{exp.description}</span>
                                        <span className="font-bold text-primary">KES {exp.amount}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
