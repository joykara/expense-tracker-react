import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Source Sans 3', 'Arial', 'Helvetica', 'sans-serif'],
                heading: ['Slabo 27px', 'IBM Plex Sans', 'sans-serif'],
                serif: ['Slabo 27px', 'serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            // backgroundImage: {
            //     'light-theme': 'radial-gradient(at 20% 30%, #fef3c7 0px, transparent 50%), radial-gradient(at 80% 20%, #e0f2fe 0px, transparent 50%), radial-gradient(at 50% 80%, #fbcfe8 0px, transparent 50%), #ffffff',
            //     'dark-theme': 'radial-gradient(at 56% 69%, #030637 0px, transparent 50%), radial-gradient(at 10% 26%, #3c0753 0px, transparent 50%), radial-gradient(at 18% 11%, #720455 0px, transparent 50%), radial-gradient(at 46% 92%, #910a67 0px, transparent 50%), #030637',
            // },
            colors: {
                background: {
                    DEFAULT: "#ffffff",
                    dark: "#11001C", // dark purple
                },
                foreground: {
                    DEFAULT: "#11001C", // dark-purple
                    dark: "#f9fafb",   // near-white
                },

                primary: {
                    DEFAULT: "#2563eb", // blue-600
                    dark: "#3b82f6",    // blue-500
                    foreground: "#f9fafb",
                },

                secondary: {
                    DEFAULT: "#f1f5f9", // slate-100
                    dark: "#290025",    // purple
                    foreground: "#11001C",
                },

                muted: {
                    DEFAULT: "#f1f5f9", // slate-100
                    dark: "#290025",    // purple
                    foreground: "#64748b", // slate-500
                },

                destructive: {
                    DEFAULT: "#ef4444", // red-500
                    dark: "#7f1d1d",    // darker red
                    foreground: "#f9fafb",
                },

                border: {
                    DEFAULT: "#e2e8f0", // slate-200
                    dark: "#290025",
                },

                accent: {
                    DEFAULT: "#059669", // emerald-600
                    dark: "#10b981",    // emerald-500
                    foreground: "#11001C",
                },

                bright: {
                    DEFAULT: "#facc15", // yellow-400
                    dark: "#fde047",    // yellow-300 (lighter for dark mode)
                    foreground: "#11001C",
                },

                input: 'var(--color-input)',
                ring: 'var(--color-ring)',
            },
        },
    },
    plugins: [],
}
export default config
