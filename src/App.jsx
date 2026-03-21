import { useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

import Sidebar from './components/Sidebar'
import Toast from './components/Toast'

import Overview from './components/Overview'
import Journal from './components/Journal'
import Todos from './components/Todos'
import Habits from './components/Habits'
import Goals from './components/Goals'
import Analytics from './components/Analytics'
import WeeklyReview from './components/WeeklyReview'
import AICoach from './components/AICoach'

import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <div className="section active">Loading auth...</div>
  if (!isSignedIn) return <Navigate to="/login" replace />
  return children
}

function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <>
      <Sidebar activeSection={activeSection} onNav={setActiveSection} />
      
      <main className="main" id="main">
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'journal' && <Journal />}
        {activeSection === 'todos' && <Todos />}
        {activeSection === 'habits' && <Habits />}
        {activeSection === 'goals' && <Goals />}
        {activeSection === 'analytics' && <Analytics />}
        {activeSection === 'weekly' && <WeeklyReview />}
        {activeSection === 'ai' && <AICoach />}
      </main>
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <>
      <div className="bg"><div className="orb o1"></div><div className="orb o2"></div><div className="orb o3"></div></div>
      
      <div id="app">
        <Routes>
          <Route path="/login/*" element={<SignInPage />} />
          <Route path="/signup/*" element={<SignUpPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  )
}

