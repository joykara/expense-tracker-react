import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

type TexturePattern = "dots" | "grid" | "noise" | "diagonal"

interface TexturedBackgroundProps {
    children: ReactNode
    pattern?: TexturePattern
    className?: string
    opacity?: number
}

export function TexturedBackground({ children, pattern = "dots", className, opacity = 0.4 }: TexturedBackgroundProps) {
    const patternId = `texture-${pattern}`

    const renderPattern = () => {
        switch (pattern) {
            case "dots":
                return (
                    <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" opacity={opacity} />
                    </pattern>
                )
            case "grid":
                return (
                    <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity={opacity} />
                    </pattern>
                )
            case "noise":
                return (
                    <pattern id={patternId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="currentColor" opacity={opacity * 0.05} />
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity={opacity} />
                        <circle cx="45" cy="25" r="1" fill="currentColor" opacity={opacity} />
                        <circle cx="75" cy="15" r="1.2" fill="currentColor" opacity={opacity} />
                        <circle cx="30" cy="50" r="1.3" fill="currentColor" opacity={opacity} />
                        <circle cx="85" cy="45" r="1" fill="currentColor" opacity={opacity} />
                        <circle cx="20" cy="80" r="1.4" fill="currentColor" opacity={opacity} />
                        <circle cx="60" cy="70" r="1.1" fill="currentColor" opacity={opacity} />
                        <circle cx="90" cy="85" r="1.2" fill="currentColor" opacity={opacity} />
                    </pattern>
                )
            case "diagonal":
                return (
                    <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="currentColor" strokeWidth="1" opacity={opacity} />
                    </pattern>
                )
        }
    }

    return (
        <div className={cn("relative", className)}>
            <svg className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
                <defs>{renderPattern()}</defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
            <div className="relative">{children}</div>
        </div>
    )
}