import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from("categories").select("*");
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
        staleTime: 1000 * 60 * 5
    })
}
