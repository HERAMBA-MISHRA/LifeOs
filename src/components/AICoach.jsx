import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store'
import { calcJournalStreak, calcStreak } from '../utils'

export default function AICoach() {
  const { todos, habits, goals, journal, chatHist, addChatMsg } = useStore()
  
  const [chatIn, setChatIn] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHist, loading])

  const buildContext = () => {
    const todosDone = todos.filter(t => t.done).length
    const habitsData = habits.map(h => ({ name: h.name, streak: calcStreak(h) }))
    const goalsData = goals.map(g => ({ title: g.title, pct: g.target > 0 ? Math.round((g.current / g.target) * 100) : 0 }))
    const jCount = Object.keys(journal).length
    return `User's LifeOS data: ${todosDone}/${todos.length} todos completed. Habits: ${JSON.stringify(habitsData)}. Goals: ${JSON.stringify(goalsData)}. Journal entries: ${jCount}. Journal streak: ${calcJournalStreak(journal)} days.`
  }

  const handleSend = async (textOverride) => {
    const v = textOverride !== undefined ? textOverride.trim() : chatIn.trim()
    if (!v) return
    
    setChatIn('')
    addChatMsg({ role: 'user', content: v })
    setLoading(true)

    const contextStr = buildContext()

    try {
      // Simulate API call and fallback safely
      setTimeout(() => {
        const responses = [
          "That's a great question! Based on your progress so far, you're doing well.",
          "Consider breaking that down into smaller, actionable steps. You've been very consistent this week!",
          "I suggest focusing on your top priority task today.",
          "Reflecting on your journey, what's been your biggest win?",
          "Stay consistent! The small steps are what matter most."
        ]
        const reply = responses[Math.floor(Math.random() * responses.length)]
        
        addChatMsg({ role: 'ai', content: reply })
        setLoading(false)
      }, 700)
    } catch (e) {
      addChatMsg({ role: 'ai', content: 'Connection error — please try again.' })
      setLoading(false)
    }
  }

  const quickPrompt = (msg) => {
    handleSend(msg)
  }

  return (
    <div className="section active" id="sec-ai">
      <div className="ph">
        <h1>🤖 AI Life Coach</h1>
        <p>Your personal coach — ask anything about goals, habits, or mindset</p>
      </div>

      <div className="card">
        <div className="ct">Quick Prompts</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button className="btn-ghost" onClick={() => quickPrompt('How am I doing overall with my goals and habits?')}>📈 Progress check</button>
          <button className="btn-ghost" onClick={() => quickPrompt('What should I focus on this week?')}>🎯 Weekly focus</button>
          <button className="btn-ghost" onClick={() => quickPrompt('Give me a motivational message for today.')}>💪 Motivate me</button>
          <button className="btn-ghost" onClick={() => quickPrompt('Help me break down my biggest goal into steps.')}>🪜 Break down a goal</button>
        </div>

        <div className="chat-window">
          <div className="msg ai">
            Hey! I'm your LifeOS AI Coach 🌟 I can see your goals, habits and journal — tell me what's on your mind, or pick a quick prompt above.
          </div>
          
          {chatHist.map((msg, i) => (
            <div key={i} className={`msg ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="msg ai loading"></div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-row" style={{ marginTop: '12px' }}>
          <input
            className="chat-in"
            value={chatIn}
            onChange={(e) => setChatIn(e.target.value)}
            placeholder="Ask your AI coach anything…"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          />
          <button className="btn" onClick={() => handleSend()}>Send →</button>
        </div>
      </div>
    </div>
  )
}
