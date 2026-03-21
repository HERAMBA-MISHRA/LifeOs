import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  )
}
