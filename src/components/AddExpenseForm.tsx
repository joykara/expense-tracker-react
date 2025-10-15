import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCategories } from "../hooks/useExpenses";
import { Navigate } from "react-router";

export default function ExpenseForm() {
    // const [creatingCategory, setCreatingCategory] = useState(false);
    const { user } = useAuth()
    const { data: categories, isLoading } = useCategories()

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
        }
    };

    // const handleCreateCategory = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget as HTMLFormElement);

    //     const { error } = await supabase.from("categories").insert([
    //         {
    //             name: formData.get("name"),
    //             color: formData.get("color"),
    //         },
    //     ]);

    //     if (error) console.error(error);
    //     else {
    //         toast.success("Category created!");
    //         (e.target as HTMLFormElement).reset();
    //         setCreatingCategory(false);
    //     }
    // };

    if (isLoading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;
    return (
        <div className="w-full">
            {/* {categories && categories.length === 0 || creatingCategory ? (
                <form
                    onSubmit={handleCreateCategory}
                    className="flex flex-col gap-4"
                >
                    <h2 className="font-bold">Create a Category</h2>
                    <input
                        name="name"
                        type="text"
                        placeholder="Category name"
                        required
                        className="px-4 py-2 border rounded"
                    />
                    <input
                        name="color"
                        type="color"
                        defaultValue="#cccccc"
                        className="w-16 h-10 border rounded"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded"
                    >
                        Save Category
                    </button>
                    {categories && categories.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setCreatingCategory(false)}
                            className="text-sm underline mt-2"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            ) : ( */}
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
                    {/* <button
                        type="button"
                        onClick={() => setCreatingCategory(true)}
                        className="text-sm underline mt-2"
                    >
                        + Create new category
                    </button> */}
                </form>
            {/* )} */}
        </div>
    );
}
