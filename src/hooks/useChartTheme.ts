'use client'

import { useTheme } from 'next-themes'

export function useChartTheme() {
    const { theme } = useTheme()

    // Tailwind tokens
    const light = {
        text: 'hsl(222.2 47.4% 11.2%)',   // slate-900
        grid: 'hsl(214.3 31.8% 91.4%)',   // gray-200
        primary: 'hsl(220 90% 56%)',      // blue-600
        accent: 'hsl(142 76% 36%)',       // emerald-600
        destructive: 'hsl(0 84.2% 60.2%)' // red-500
    }

    const dark = {
        text: 'hsl(210 40% 98%)',         // white
        grid: 'hsl(217.2 32.6% 17.5%)',   // gray-800
        primary: 'hsl(220 90% 66%)',      // lighter blue
        accent: 'hsl(142 71% 45%)',       // emerald-500
        destructive: 'hsl(0 62.8% 30.6%)' // dark red
    }

    return theme === 'dark' ? dark : light
}
