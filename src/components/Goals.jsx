import { useState } from 'react'
import { useStore } from '../store'

export default function Goals() {
  const { goals, addGoal, updateGoalProgress, deleteGoal, showToast } = useStore()
  
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [unit, setUnit] = useState('')
  const [inputs, setInputs] = useState({}) // track individual goal inputs

  const handleAdd = () => {
    const t = title.trim()
    const tgt = parseFloat(target) || 100
    const u = unit.trim() || ''
    if (!t) return
    
    addGoal({
      id: Date.now(),
      title: t,
      target: tgt,
      current: 0,
      unit: u
    })
    setTitle('')
    setTarget('')
    setUnit('')
    showToast('Goal added ✓')
  }

  const handleUpdate = (index, currentVal) => {
    const val = parseFloat(inputs[index] ?? currentVal)
    if (isNaN(val)) return
    
    updateGoalProgress(index, Math.min(val, goals[index].target * 2))
    showToast('Goal updated ✓')
  }

  return (
    <div className="section active" id="sec-goals">
      <div className="ph">
        <h1>🎯 Goal Tracker</h1>
        <p>Set ambitious goals and track your progress</p>
      </div>

      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="ct">Add New Goal</div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <input className="gi" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Goal title" style={{ minWidth: '180px' }} />
          <input className="gi" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target (e.g. 100)" type="number" style={{ maxWidth: '120px' }} />
          <input className="gi" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit (e.g. pages, km)" style={{ maxWidth: '130px' }} />
          <button className="btn" onClick={handleAdd}>Add Goal</button>
        </div>
      </div>

      <div id="goalList">
        {goals.length ? goals.map((g, i) => {
          const pct = g.target > 0 ? Math.min(100, Math.round((g.current / g.target) * 100)) : 0
          const done = pct >= 100
          
          return (
            <div key={g.id || i} className="goal-card">
              <div className="goal-top">
                <div>
                  <div className="goal-title">{g.title} {done ? '🎉' : ''}</div>
                  <div className="goal-meta">{g.current} / {g.target} {g.unit}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="goal-pct" style={{ color: done ? 'var(--gb)' : 'var(--ga)' }}>{pct}%</div>
                  <button className="del" onClick={() => deleteGoal(i)}>✕</button>
                </div>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${pct}%`, background: done ? 'linear-gradient(90deg,var(--gb),#059669)' : '' }}></div>
              </div>
              <div className="goal-update">
                <label>Update progress:</label>
                <input
                  className="num-in"
                  type="number"
                  value={inputs[i] ?? g.current}
                  onChange={(e) => setInputs({ ...inputs, [i]: e.target.value })}
                  step="1"
                />
                <button className="btn btn-g" onClick={() => handleUpdate(i, g.current)} style={{ padding: '6px 14px', fontSize: '.8rem' }}>Update</button>
              </div>
            </div>
          )
        }) : (
          <div className="card"><div className="empty">No goals yet — add your first goal above!</div></div>
        )}
      </div>
    </div>
  )
}
