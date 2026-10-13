import { useState } from 'react'
import { SUBJECTS } from '../data/tasks.js'
import { CloseIcon } from './Icons.jsx'

export default function TaskModal({ defaultStatus, defaultSubject, onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(defaultSubject || SUBJECTS[0].id)
  const [status, setStatus] = useState(defaultStatus || 'todo')
  const [priority, setPriority] = useState('medium')
  const [due, setDue] = useState('')
  const [assignee, setAssignee] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({
      title: title.trim(),
      subject,
      status,
      priority,
      due: due ? new Date(due).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'No due date',
      assignee: assignee.trim() || 'Unassigned',
      description: description.trim() || 'No description added yet.',
    })
  }

  return (
    <div className="modal-scrim" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <header className="modal__head">
          <h3>Add new task</h3>
          <button type="button" onClick={onClose} aria-label="Close"><CloseIcon size={18} /></button>
        </header>

        <label className="field">
          <span>Task title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Trigonometry practice set" autoFocus />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Subject</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="review">Under Review</option>
              <option value="done">Completed</option>
            </select>
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Priority</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="field">
            <span>Due date</span>
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </label>
        </div>

        <label className="field">
          <span>Assign to</span>
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Student name" />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short details about this task…" />
        </label>

        <footer className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Create task</button>
        </footer>
      </form>
    </div>
  )
}
