import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <SunMedium className="w-5 h-5 text-yellow-400" />
            ) : (
                <MoonStar className="w-5 h-5 text-gray-800" />
            )}
        </button>
    )
}
