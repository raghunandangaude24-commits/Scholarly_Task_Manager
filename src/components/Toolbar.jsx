import { SearchIcon, MenuIcon, PlusIcon } from './Icons.jsx'
import { SUBJECTS } from '../data/tasks.js'

const TABS = [
  { id: 'all', label: 'All', color: 'var(--accent)' },
  ...SUBJECTS.map((s) => ({ id: s.id, label: s.name, color: s.color })),
]

export default function Toolbar({ query, onQueryChange, onOpenMenu, subjectFilter, onSelectSubject, onAdd }) {
  return (
    <header className="toolbar">
      <div className="toolbar__top">
        <button className="toolbar__menu-btn" onClick={onOpenMenu} aria-label="Open menu">
          <MenuIcon size={20} />
        </button>
        <h1 className="toolbar__title">Task Report</h1>
        <button className="btn-add" onClick={onAdd}>
          <PlusIcon size={15} /> Add new task
        </button>
      </div>

      <div className="searchbar">
        <SearchIcon size={16} />
        <input
          type="search"
          placeholder="Search tasks…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={subjectFilter === t.id ? 'is-active' : ''}
            style={{ '--tab-color': t.color }}
            onClick={() => onSelectSubject(t.id)}
          >
            <i className="tabs__dot" />
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
