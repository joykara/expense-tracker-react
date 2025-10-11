import { useCategories, useExpenses } from "../hooks/useExpenses";
import { mockCategories, mockExpenses } from "../lib/utils";

type Category = {
    id: string;
    name: string;
    color: string;
};

type Expense = {
    id: string;
    date: string;
    category_id: string;
    description: string;
    amount: number;
};

function groupByDate(expenses: Expense[]) {
    return expenses.reduce((acc, exp) => {
        (acc[exp.date] = acc[exp.date] || []).push(exp);
        return acc;
    }, {} as Record<string, Expense[]>);
}

export default function ExpenseList() {
    const { data: actualCategories } = useCategories();
    const { data: actualExpenses } = useExpenses();

    const expenses = actualExpenses && actualExpenses.length > 0 ? actualExpenses : mockExpenses;
    const categories = actualCategories && actualCategories.length > 0 ? actualCategories : mockCategories;
    const getCategoryById = (id: string | null) => categories?.find((cat: Category) => cat.id === id);

    if (!expenses || expenses.length === 0) {
        return <p>Track your first expense</p>;
    }

    const grouped = groupByDate(expenses);

    return (
        <div className="space-y-8">
            {Object.entries(grouped).map(([date, dayExpenses]) => (
                <div key={date}>
                    <div className="bg-muted px-4 py-2 rounded font-semibold text-lg mb-2">{date}</div>
                    <div className="space-y-2">
                        {dayExpenses.map((exp) => {
                            const category = getCategoryById(exp.category_id);
                            return (
                                <div key={exp.id} className="flex items-center gap-4 bg-background border rounded-lg shadow p-3">
                                    <span
                                        className="inline-block rounded px-2 py-1 text-sm"
                                        style={{ color: category?.color, border: `1px solid ${category?.color}`, borderRadius: '6px' }}
                                    >
                                        {category?.name}
                                    </span>
                                    <span className="flex-1 text-muted-foreground">{exp.description}</span>
                                    <span className="font-bold text-primary">KES {exp.amount}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
