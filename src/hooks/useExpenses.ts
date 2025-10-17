import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from("categories").select("*");
            console.log(data, error);
            if (error) throw error;
            return data
        },
        gcTime: Infinity,
        staleTime: 1000 * 60 * 5
    })
}

export function useExpenses() {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("expenses")
                .select(`
                  id,
                  amount,
                  description,
                  date,
                  category_id
                `)
                .order("date", { ascending: false });
            if (error) throw error;
            return data
        },
        gcTime: Infinity,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: true
    })
}

// budgets
export function useBudgets() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("budgets")
                .select("*")
                .eq("user_id", user?.id)
                .order("month", { ascending: false });
            if (error) throw error;
            return data
        },
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
        gcTime: Infinity,
    })
}