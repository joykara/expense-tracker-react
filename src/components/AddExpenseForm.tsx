import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCategories } from "../hooks/useExpenses";
import { Navigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function ExpenseForm() {
    const { user } = useAuth()
    const { data: categories, isLoading } = useCategories()
    const queryClient = useQueryClient();

    const handleSubmitExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const { error } = await supabase.from("expenses").insert([
            {
                user_id: user?.id,
                amount: parseFloat(formData.get("amount") as string),
                description: formData.get("description"),
                category_id: formData.get("category_id"),
            },
        ]);

        if (error) console.error(error);
        else {
            toast.success("Expense added!");
            (e.target as HTMLFormElement).reset();
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        }
    };

    if (isLoading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;
    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmitExpense}
                className="flex flex-col gap-4"
            >
                <h2 className="font-bold">Add Expense</h2>
                <select name="category_id" required className="px-4 py-2 border rounded">
                    <option value="">Select Category</option>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    required
                    className="px-4 py-2 border rounded"
                />
                <input
                    name="description"
                    type="text"
                    placeholder="Description"
                    className="px-4 py-2 border rounded"
                />
                <input
                    name="date"
                    type="date"
                    placeholder="09/10/2025"
                    required
                    className="px-4 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
}
