/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { eachDayOfInterval, startOfMonth, endOfMonth, getWeek, getMonth } from "date-fns";
import type { Expense } from "../lib/types";
import GrainOverlay from "./shared/grainOverly";
import { useState } from "react";

interface Props {
    expenses: Expense[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getAllWeeksInMonth(year: number, month: number) {
    const firstDay = startOfMonth(new Date(year, month));
    const lastDay = endOfMonth(new Date(year, month));
    const weeks = new Set<number>();
    eachDayOfInterval({ start: firstDay, end: lastDay }).forEach(date => {
        weeks.add(getWeek(date, { weekStartsOn: 1 }));
    });
    return Array.from(weeks);
}

export default function ExpensesAreaChart({ expenses }: Props) {
    const [trend, setTrend] = useState<"daily" | "weekly" | "monthly">("monthly");

    // Find the range of dates in expenses
    const dates = expenses.map(e => new Date(e.date));
    const maxDate = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date();

    let chartData: { date: string; amount: number }[] = [];

    if (trend === "monthly") {
        // Jan-Dec
        chartData = MONTHS.map((month, idx) => {
            const year = maxDate.getFullYear();
            const monthExpenses = expenses.filter(e => getMonth(new Date(e.date)) === idx && new Date(e.date).getFullYear() === year);
            const total = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
            return { date: month, amount: total };
        });
    } else if (trend === "daily") {
        // Mon-Sun
        chartData = DAYS.map((day, idx) => {
            const dayExpenses = expenses.filter(e => {
                const d = new Date(e.date);
                // getDay: 0 (Sun) - 6 (Sat), so shift to 0 (Mon) - 6 (Sun)
                const jsDay = d.getDay() === 0 ? 6 : d.getDay() - 1;
                return jsDay === idx;
            });
            const total = dayExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
            return { date: day, amount: total };
        });
    } else if (trend === "weekly") {
        // weeks in the current month
        const year = maxDate.getFullYear();
        const month = maxDate.getMonth();
        const weeks = getAllWeeksInMonth(year, month);
        chartData = weeks.map(weekNum => {
            const weekExpenses = expenses.filter(e => {
                const d = new Date(e.date);
                return getWeek(d, { weekStartsOn: 1 }) === weekNum && d.getMonth() === month && d.getFullYear() === year;
            });
            const total = weekExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
            return { date: `Week ${weekNum}`, amount: total };
        });
    }

    return (
        <div className="relative w-full">
            <GrainOverlay />
            <Card className="w-full border-0 shadow-none">
                <CardHeader>
                    <CardTitle>Expenses Overview</CardTitle>
                    <div className="flex justify-between items-center w-full">
                        <CardDescription>
                            {trend.charAt(0).toUpperCase() + trend.slice(1)} data visualization
                        </CardDescription>
                        <div className="flex items-center gap-2">
                            <label htmlFor="trend" className="text-sm font-medium">Trend:</label>
                            <select
                                id="trend"
                                value={trend}
                                onChange={e => setTrend(e.target.value as "daily" | "weekly" | "monthly")}
                                className="border rounded px-2 py-1 text-sm bg-background"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9966FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        color: "#000",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                    formatter={(value, props: any) => [
                                        `KES ${value}`,
                                        props.payload.name, // category name
                                    ]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#60a5fa"
                                    fillOpacity={1}
                                    fill="url(#colorSpending)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}