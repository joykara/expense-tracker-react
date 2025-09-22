import { useCategories, useExpenses } from "../hooks/useExpenses";

type Category = {
    id: string;
    name: string;
    color: string;
};


export default function ExpenseList() {
    const { data: categories } = useCategories()
    const { data: expenses } = useExpenses()
    const getCategoryById = (id: string | null) => categories?.find((cat: Category) => cat.id === id);

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="p-2">Date</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Amount</th>
                </tr>
            </thead>
            <tbody>
                {expenses ? (
                    expenses.map((exp) => {
                        const category = getCategoryById(exp.category_id)
                        return (
                            <tr key={exp.id} className="border-b hover:bg-muted/30">
                                <td className="p-2">{exp.date}</td>
                                <td className="p-2">
                                    <span
                                        className="inline-block rounded px-2 py-1 text-sm"
                                        style={{ backgroundColor: category?.color || "#ccc" }}
                                    >
                                        {category?.name}
                                    </span>
                                </td>
                                <td className="p-2">{exp.description}</td>
                                <td className="p-2 font-bold">${exp.amount}</td>
                            </tr>
                        )
                    })
                ) : (
                    <p>Track your first expense</p>
                )}
            </tbody>
        </table>
    );
}
