import './index.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { type JSX } from 'react'
import LoginPage from './pages/login/page'
import DashboardPage from './pages/dashboard/page'
import SignUpPage from './pages/signup/page'
import { useAuth } from './context/AuthContext'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}