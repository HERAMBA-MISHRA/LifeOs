import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  createRoot(document.getElementById('root')).render(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '2rem', textAlign: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
      <h1 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Missing Clerk Publishable Key</h1>
      <p style={{ maxWidth: '600px', lineHeight: 1.6 }}>
        To use the authentication features, you need to provide your Clerk Publishable Key.
        <br /><br />
        Create a file named <code>.env.local</code> in your `c:\LifeOS` folder and add:<br />
        <code style={{ background: 'var(--card-bg)', padding: '0.5rem', display: 'block', marginTop: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code>
      </p>
    </div>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}


