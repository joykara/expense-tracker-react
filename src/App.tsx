import './index.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { type JSX } from 'react'
import LoginPage from './pages/login/page'
import DashboardPage from './pages/dashboard/page'
import SignUpPage from './pages/signup/page'
import { Toaster } from 'react-hot-toast'
import AuthCallbackPage from './pages/callback/page'
import ExpensesPage from './pages/expenses/page'

function PrivateRoute({ children }: { children: JSX.Element }) {
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
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
          <Route path='/expenses'
            element={<ExpensesPage />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}