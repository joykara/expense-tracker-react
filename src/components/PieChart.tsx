import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import { useCategories, useExpenses } from '../hooks/useExpenses'
import { mockCategories, mockExpenses } from '../lib/utils'
import { useMemo } from 'react'

ChartJS.register(Tooltip, Legend, ArcElement)

export const BarChart = () => {
    const { data: actualCategories } = useCategories()
    const { data: actualExpenses } = useExpenses()
    console.log(actualCategories, actualExpenses)
    const expenses = actualExpenses && actualExpenses?.length > 0 ? actualExpenses : mockExpenses
    const categories = actualCategories && actualCategories?.length > 0 ? actualCategories : mockCategories

    // Sum expenses by category
    const expenseTotalsByCategory = useMemo(() =>
        categories.map((category) => {
            const total = expenses
                .filter(exp => exp.category_id === category.id)
                .reduce((sum, exp) => sum + exp.amount, 0);
            return {
                ...category,
                total,
            };
        }).filter(cat => cat.total > 0) // remove unused categories
        , [categories, expenses]);

    const data = useMemo(() => ({
        labels: expenseTotalsByCategory.map(cat => cat.name),
        datasets: [
            {
                data: expenseTotalsByCategory.map(cat => cat.total),
                backgroundColor: expenseTotalsByCategory.map(cat => cat.color),
            }
        ]
    }), [expenseTotalsByCategory])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <Pie options={options} data={data} />
        </div>
    )
}
