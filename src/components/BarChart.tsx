import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)

export const BarChart = () => {
    const options = {
        responsive: true,
        plugins: {}
    }
    return (
        <Pie options={options} data={} />
    )
}
