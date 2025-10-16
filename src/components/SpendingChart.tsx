import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SpendingChartProps {
    data: { name: string; amount: number; color: string }[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
    return (
        <div className="w-full h-80" >
            <h2 className="lg:text-lg font-medium mb-2 text-center"> Spending by Category </h2>
            <ResponsiveContainer >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={index} fill={entry.color || "#8884d8"} />
                            ))
                        }
                    </Pie>
                    < Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
