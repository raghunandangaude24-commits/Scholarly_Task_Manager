import { useState } from 'react'
import { SUBJECTS } from '../data/tasks.js'
import { SendIcon } from './Icons.jsx'

const AVATAR_COLORS = [
  { bg: 'rgba(99, 102, 241, 0.14)', fg: '#6366f1' },
  { bg: 'rgba(16, 185, 129, 0.16)', fg: '#10b981' },
  { bg: 'rgba(245, 158, 11, 0.18)', fg: '#d97706' },
  { bg: 'rgba(236, 72, 153, 0.14)', fg: '#ec4899' },
  { bg: 'rgba(14, 165, 233, 0.16)', fg: '#0284c7' },
]

const avatarStyle = (name) => {
  const c = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  return { '--avatar-bg': c.bg, '--avatar-fg': c.fg }
}

export default function RightPanel({ task, notifications, onAddComment }) {
  const [draft, setDraft] = useState('')
  const subject = task ? SUBJECTS.find((s) => s.id === task.subject) : null

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim() || !task) return
    onAddComment(task.id, draft.trim())
    setDraft('')
  }

  return (
    <aside className="rightbar">
      <section className="panel">
        <header className="panel__head">
          <h3>Notifications</h3>
        </header>
        <ul className="notif-list">
          {notifications.map((n) => (
            <li key={n.id} className="notif">
              <p>{n.text}</p>
              <small>{n.time}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <header className="panel__head">
          <h3>Profile</h3>
        </header>
        <div className="profile">
          <span className="profile__avatar">AR</span>
          <span>
            <strong>Ananya Rao</strong>
            <small>Class 10 · Batch A</small>
          </span>
        </div>
      </section>

      <section className="panel panel--comments">
        <header className="panel__head">
          <h3>Comments</h3>
        </header>

        {!task ? (
          <p className="panel__empty">Select a task to view its comments.</p>
        ) : (
          <>
            <p className="comments__task">
              <i style={{ background: subject.color }} />
              {task.title}
            </p>

            <ul className="comments">
              {task.comments.length === 0 && <li className="comments__empty">No comments yet.</li>}
              {task.comments.map((c) => (
                <li key={c.id} className="comment">
                  <span className="comment__avatar" style={avatarStyle(c.author)}>
                    {c.author.charAt(0)}
                  </span>
                  <div>
                    <strong>{c.author}</strong>
                    <p>{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <form className="comments__form" onSubmit={send}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a comment…"
                aria-label="Write a comment"
              />
              <button type="submit" aria-label="Send"><SendIcon size={15} /></button>
            </form>
          </>
        )}
      </section>
    </aside>
  )
}
