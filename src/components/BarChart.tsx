import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)

export const BarChart = () => {
    const mockCategories = [
        { id: '1', name: 'Food & Dining', color: '#FF6384' },
        { id: '2', name: 'Transportation', color: '#36A2EB' },
        { id: '3', name: 'Housing & Utilities', color: '#FFCE56' },
        { id: '4', name: 'Health & Fitness', color: '#4BC0C0' },
        { id: '5', name: 'Entertainment', color: '#9966FF' },
        { id: '6', name: 'Shopping', color: '#FF9F40' },
        { id: '7', name: 'Travel', color: '#8AC926' },
    ]

    const mockExpenses = [
        { id: 'e1', amount: 45.99, category_id: '1', description: 'Lunch at cafe', date: '2025-09-28' },
        { id: 'e2', amount: 60.00, category_id: '2', description: 'Bus pass', date: '2025-09-29' },
        { id: 'e3', amount: 700.00, category_id: '3', description: 'Monthly rent', date: '2025-09-01' },
        { id: 'e4', amount: 25.00, category_id: '4', description: 'Yoga class', date: '2025-09-15' },
        { id: 'e5', amount: 15.00, category_id: '1', description: 'Dinner', date: '2025-09-26' },
        { id: 'e6', amount: 80.00, category_id: '5', description: 'Movie night', date: '2025-09-10' },
        { id: 'e7', amount: 200.00, category_id: '6', description: 'Clothing haul', date: '2025-09-22' },
        { id: 'e8', amount: 150.00, category_id: '7', description: 'Weekend getaway', date: '2025-09-20' },
    ]

    // Sum expenses by category
    const expenseTotalsByCategory = mockCategories.map((category) => {
        const total = mockExpenses
            .filter(exp => exp.category_id === category.id)
            .reduce((sum, exp) => sum + exp.amount, 0);
        return {
            ...category,
            total,
        };
    }).filter(cat => cat.total > 0); // remove unused categories

    const data = {
        labels: expenseTotalsByCategory.map(cat => cat.name),
        datasets: [
            {
                data: expenseTotalsByCategory.map(cat => cat.total),
                backgroundColor: expenseTotalsByCategory.map(cat => cat.color),
            }
        ]
    }

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
