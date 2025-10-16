import { ArrowLeft } from "lucide-react";
import { Navbar } from "../../components/shared/Navbar";
import { useCategories, useExpenses } from "../../hooks/useExpenses";
import type { Category, Expense } from "../../lib/types";
import { mockCategories, mockExpenses } from "../../lib/utils";
import { useState } from "react";

function groupByDate(expenses: Expense[]) {
    return expenses.reduce((acc, exp) => {
        (acc[exp.date] = acc[exp.date] || []).push(exp);
        return acc;
    }, {} as Record<string, Expense[]>);
}

// Date format helper
function formatDate(dateStr: string) {
    // Date and day format helper
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
}

export default function ExpensesPage() {
    const { data: actualCategories } = useCategories();
    const { data: actualExpenses } = useExpenses();
    const expenses = actualExpenses && actualExpenses.length > 0 ? actualExpenses : mockExpenses;
    const categories = actualCategories && actualCategories.length > 0 ? actualCategories : mockCategories;
    const getCategoryById = (id: string | null) => categories?.find((cat: Category) => cat.id === id);

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10;
    const totalPages = Math.ceil(expenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentExpenses = expenses.slice(startIndex, endIndex);

    const grouped = groupByDate(currentExpenses);

    if (!expenses || expenses.length === 0) {
        return <p>Track your first expense</p>;
    }

    return (
        <div className="flex flex-col min-h-screen text-foreground">
            <Navbar />
            <div className="flex items-center gap-3 px-6 md:px-8 mt-2 text-sm hover:text-light-primary cursor-pointer" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </div>
            <div className="space-y-8 p-6">
                {Object.entries(grouped).map(([date, dayExpenses]) => (
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
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    className="px-3 py-1 rounded bg-muted text-foreground disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="px-3 py-1 rounded bg-muted text-foreground disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
