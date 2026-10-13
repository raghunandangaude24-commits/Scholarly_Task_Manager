import { SUBJECTS, PRIORITY } from '../data/tasks.js'
import { MessageIcon } from './Icons.jsx'

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'var(--todo)', soft: 'var(--todo-soft)' },
  { id: 'progress', label: 'In Progress', color: 'var(--progress)', soft: 'var(--progress-soft)' },
  { id: 'review', label: 'Under Review', color: 'var(--review)', soft: 'var(--review-soft)' },
  { id: 'done', label: 'Completed', color: 'var(--done)', soft: 'var(--done-soft)' },
]

function TaskCard({ task, selected, onSelect }) {
  const subject = SUBJECTS.find((s) => s.id === task.subject)
  const prio = PRIORITY[task.priority] || PRIORITY.medium

  return (
    <button
      className={`task-card ${selected ? 'is-selected' : ''}`}
      style={{ '--card-accent': subject.color }}
      onClick={() => onSelect(task.id)}
    >
      <span className="task-card__top">
        <span className="task-card__prio" style={{ '--prio': prio.color }}>
          {prio.label}
        </span>
        <span className="task-card__due">{task.due}</span>
      </span>
      <span className="task-card__title">{task.title}</span>
      <span className="task-card__meta">
        <span className="task-card__subject">
          <i style={{ background: subject.color }} />
          {subject.name}
        </span>
      </span>
      <span className="task-card__foot">
        <span className="task-card__avatar" style={{ background: `${subject.color}1f`, color: subject.color }}>
          {task.assignee.charAt(0)}
        </span>
        <span className="task-card__assignee">{task.assignee}</span>
        {task.comments.length > 0 && (
          <span className="task-card__comments">
            <MessageIcon size={12} /> {task.comments.length}
          </span>
        )}
      </span>
    </button>
  )
}

export default function TaskBoard({ tasks, selectedId, onSelect }) {
  return (
    <div className="board">
      {COLUMNS.map((col) => {
        const list = tasks.filter((t) => t.status === col.id)
        return (
          <section key={col.id} className="column" style={{ '--col': col.color, '--col-soft': col.soft }}>
            <header className="column__head">
              <h3>
                <i className="column__dot" />
                {col.label}
              </h3>
              <span>{list.length}</span>
            </header>

            {list.length === 0 ? (
              <p className="column__empty">No tasks</p>
            ) : (
              <div className="column__list">
                {list.map((task) => (
                  <TaskCard key={task.id} task={task} selected={task.id === selectedId} onSelect={onSelect} />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
