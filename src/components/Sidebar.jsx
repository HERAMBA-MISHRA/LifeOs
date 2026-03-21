import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import { calcStreak } from '../utils'
import { exportDataToFile, importDataFromFile } from '../db'

export default function Sidebar({ activeSection, onNav }) {
  const habits = useStore(s => s.habits)
  const maxHStreak = habits.reduce((m, h) => Math.max(m, calcStreak(h)), 0)

  const { user } = useUser()
  const navigate = useNavigate()

  const fileInputRef = useRef(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      await importDataFromFile(file)
      window.location.reload()
    } catch (err) {
      alert('Failed to import data: Invalid file format.')
    }
  }

  const navItems = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'journal', icon: '📔', label: 'Journal' },
    { id: 'todos', icon: '✅', label: 'To-Do List' },
    { id: 'habits', icon: '🔁', label: 'Habits' },
    { id: 'goals', icon: '🎯', label: 'Goals' }
  ]

  const insightItems = [
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'weekly', icon: '🗓️', label: 'Weekly Review' },
    { id: 'ai', icon: '🤖', label: 'AI Coach' }
  ]

  return (
    <aside className="sb">
      <div className="logo">LifeOS</div>

      <div className="sb-section">Main</div>
      {navItems.map(item => (
        <div key={item.id} className={`nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => onNav(item.id)}>
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="sb-section">Insights</div>
      {insightItems.map(item => (
        <div key={item.id} className={`nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => onNav(item.id)}>
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="sb-footer">
        <div className="sb-user" onClick={() => navigate('/profile')}>
          {user ? (
            <img src={user.imageUrl} alt="Avatar" className="avatar" style={{ padding: 0, objectFit: 'cover' }} />
          ) : (
            <div className="avatar" id="av">JS</div>
          )}
          <div className="sb-user-info">
            <div className="sb-user-name">{user ? (user.fullName || user.firstName || user.username || 'User') : 'User'}</div>
            <div className="sb-user-sub">Best streak: {maxHStreak} days</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', padding: '0 0.5rem', marginTop: '0.5rem' }}>
          <button className="btn-ghost" style={{ flex: 1, padding: '6px 0', fontSize: '.75rem' }} onClick={exportDataToFile}>Export</button>
          <button className="btn-ghost" style={{ flex: 1, padding: '6px 0', fontSize: '.75rem' }} onClick={handleImportClick}>Import</button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".json" />
        </div>
      </div>
    </aside>
  )
}

