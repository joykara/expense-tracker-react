import './index.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { type JSX } from 'react'
import LoginPage from './pages/login/page'
import DashboardPage from './pages/dashboard/page'
import SignUpPage from './pages/signup/page'
import { useAuth } from './context/AuthContext'
import ThemeToggle from './components/ThemeToggle'
import { Toaster } from 'react-hot-toast'
import AuthCallbackPage from './pages/callback/page'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <ThemeToggle />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}