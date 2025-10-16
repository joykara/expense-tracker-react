import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { Navigate } from "react-router";

type BudgetForm = {
    month: string;
    total: number;
};

export default function CreateBudgetModal() {
    const [open, setOpen] = useState(false);
    const [existingBudget, setExistingBudget] = useState<number | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm<BudgetForm>();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        const fetchBudget = async () => {
            const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
            const { data } = await supabase
                .from("budgets")
                .select("*")
                .eq("user_id", user.id)
                .eq("month", currentMonth)
                .single();

            if (data) {
                setExistingBudget(Number(data.total));
                setValue("month", data.month);
                setValue("total", Number(data.total));
            } else {
                setExistingBudget(null);
                setValue("month", currentMonth);
            }
        };
        fetchBudget();
    }, [user, setValue]);

    const onSubmit = async (data: BudgetForm) => {
        if (!user) return toast.error("You must be logged in.");

        try {
            const { data: existing } = await supabase
                .from("budgets")
                .select("*")
                .eq("user_id", user.id)
                .eq("month", data.month)
                .maybeSingle();

            if (existing) {
                await supabase
                    .from("budgets")
                    .update({ total: data.total })
                    .eq("id", existing.id);
                toast.success("Budget updated successfully!");
            } else {
                await supabase.from("budgets").insert([
                    { user_id: user.id, month: data.month, total: data.total },
                ]);
                toast.success("Budget created successfully!");
            }

            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error saving budget.");
        }
    };

    if (open && !user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-background w-full">
                    {existingBudget ? "Edit Budget" : "Create Budget"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{existingBudget ? "Edit Budget" : "Create New Budget"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label>Month</label>
                        <input
                            className="w-full p-2 border rounded"
                            type="month" {...register("month", { required: true })} />
                    </div>

                    <div>
                        <label>Total Budget (KES)</label>
                        <input
                            className="w-full p-2 border rounded"
                            type="number"
                            step="0.01"
                            {...register("total", { required: true, valueAsNumber: true })}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        {existingBudget ? "Update Budget" : "Create Budget"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
