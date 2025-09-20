'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="absolute top-4 right-4 rounded px-3 py-2"
        >
            {theme === 'dark' ? <SunMedium className='text-bright' /> : <MoonStar />}
        </button>
    )
}
