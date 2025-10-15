
export type Category = {
    id: string;
    name: string;
    color: string;
};

export type Expense = {
    id: string;
    date: string;
    category_id: string;
    description: string;
    amount: number;
};