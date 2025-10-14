// import { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import toast from "react-hot-toast";
// import { eq, and } from "drizzle-orm";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../lib/db";
// import { budgets } from "../lib/db/schema";
// import { Button } from "./ui/button";
// import { useForm } from "react-hook-form";

// type BudgetForm = {
//     month: string;
//     total: number;
// };

// export default function CreateBudgetModal() {
//     const [open, setOpen] = useState(false);
//     const [existingBudget, setExistingBudget] = useState<number | null>(null);
//     const { register, handleSubmit, reset, setValue } = useForm<BudgetForm>();
//     const { user } = useAuth();

//     useEffect(() => {
//         if (!user) return;
//         const fetchBudget = async () => {
//             const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
//             const data = await db
//                 .select()
//                 .from(budgets)
//                 .where(and(eq(budgets.user_id, user.id), eq(budgets.month, currentMonth)));

//             if (data[0]) {
//                 setExistingBudget(Number(data[0].total));
//                 setValue("month", data[0].month);
//                 setValue("total", Number(data[0].total));
//             } else {
//                 setExistingBudget(null);
//                 setValue("month", currentMonth);
//             }
//         };
//         fetchBudget();
//     }, [user, setValue]);

//     const onSubmit = async (data: BudgetForm) => {
//         if (!user) return toast.error("You must be logged in.");

//         try {
//             const existing = await db
//                 .select()
//                 .from(budgets)
//                 .where(and(eq(budgets.user_id, user.id), eq(budgets.month, data.month)));

//             if (existing.length > 0) {
//                 await db
//                     .update(budgets)
//                     .set({ total: data.total })
//                     .where(eq(budgets.id, existing[0].id));
//                 toast.success("Budget updated successfully!");
//             } else {
//                 await db.insert(budgets).values({
//                     user_id: user.id,
//                     month: data.month,
//                     total: data.total,
//                 });
//                 toast.success("Budget created successfully!");
//             }

//             setOpen(false);
//             reset();
//         } catch (err) {
//             console.error(err);
//             toast.error("Error saving budget.");
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <Button className="bg-primary text-white">
//                     {existingBudget ? "Edit Budget" : "Create Budget"}
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>{existingBudget ? "Edit Budget" : "Create New Budget"}</DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <label>Month</label>
//                         <input type="month" {...register("month", { required: true })} />
//                     </div>

//                     <div>
//                         <label>Total Budget ($)</label>
//                         <input
//                             type="number"
//                             step="0.01"
//                             {...register("total", { required: true, valueAsNumber: true })}
//                         />
//                     </div>

//                     <Button type="submit" className="w-full">
//                         {existingBudget ? "Update Budget" : "Create Budget"}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }
