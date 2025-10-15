import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from 'next-themes'
import TanstackProvider from './QueryProvider.tsx'
import { TexturedBackground } from './components/shared/textured-background.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TanstackProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TexturedBackground pattern="grid" opacity={0.1} className="rounded-lg">
            <App />
          </TexturedBackground>
        </ThemeProvider>
      </TanstackProvider>
    </AuthProvider>
  </StrictMode>,
)
