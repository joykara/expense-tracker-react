import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Source Sans 3',
    				'Arial',
    				'Helvetica',
    				'sans-serif'
    			],
    			heading: [
    				'Slabo 27px',
    				'IBM Plex Sans',
    				'sans-serif'
    			],
    			serif: [
    				'Slabo 27px',
    				'serif'
    			],
    			mono: [
    				'ui-monospace',
    				'SFMono-Regular',
    				'monospace'
    			]
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				dark: '#3b82f6',
    				foreground: 'hsl(var(--primary-foreground))'
				},
				'light-primary': '#631A86',
				'dark-primary': '#8f49ff',
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				dark: '#290025',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				dark: '#290025',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				dark: '#7f1d1d',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				dark: '#10b981',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			bright: {
    				DEFAULT: '#facc15',
    				dark: '#fde047',
    				foreground: '#11001C'
    			},
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
  plugins: [animate],
}
export default config
