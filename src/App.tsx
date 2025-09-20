import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import LoginPage from './pages/(auth)/login/page'
import DashboardPage from './pages/dashboard/page'

const supabase = createClient('https://<project>.supabase.co', '<sb_publishable_... or anon key>')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<DashboardPage />} />
      </Routes>
    )
  }
}