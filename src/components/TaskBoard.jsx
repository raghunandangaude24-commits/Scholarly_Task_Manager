import { SUBJECTS } from '../data/tasks.js'
import { MessageIcon } from './Icons.jsx'

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'review', label: 'Under Review' },
  { id: 'done', label: 'Completed' },
]

function TaskCard({ task, selected, onSelect }) {
  const subject = SUBJECTS.find((s) => s.id === task.subject)

  return (
    <button className={`task-card ${selected ? 'is-selected' : ''}`} onClick={() => onSelect(task.id)}>
      <span className="task-card__title">{task.title}</span>
      <span className="task-card__meta">
        <span className="task-card__subject">
          <i style={{ background: subject.color }} />
          {subject.name}
        </span>
        <span className="task-card__due">{task.due}</span>
      </span>
      <span className="task-card__foot">
        <span className="task-card__avatar">{task.assignee.charAt(0)}</span>
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
          <section key={col.id} className="column">
            <header className="column__head">
              <h3>{col.label}</h3>
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
