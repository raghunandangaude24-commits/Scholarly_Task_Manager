import {
  DashboardIcon,
  StudentsIcon,
  AttendanceIcon,
  ReportIcon,
  MegaphoneIcon,
  HelpIcon,
  SettingsIcon,
  SignOutIcon,
  BookIcon,
  CloseIcon,
} from './Icons.jsx'

const MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'students', label: 'Students', icon: StudentsIcon },
  { id: 'attendance', label: 'Attendance', icon: AttendanceIcon },
  { id: 'report', label: 'Report', icon: ReportIcon },
  { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon },
]

const FOOTER = [
  { id: 'help', label: 'Help Center', icon: HelpIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function Sidebar({ active, onSelect, open, onClose, onSignOut }) {
  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">
            <BookIcon size={20} />
          </span>
          <div>
            <strong>Scholarly</strong>
            <small>Task Manager</small>
          </div>
          <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <CloseIcon size={18} />
          </button>
        </div>

        <p className="sidebar__label">Main Menu</p>
        <nav className="sidebar__nav">
          {MENU.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar__item ${active === id ? 'is-active' : ''}`}
              onClick={() => onSelect(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          {FOOTER.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar__item ${active === id ? 'is-active' : ''}`}
              onClick={() => onSelect(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
          <button className="sidebar__item sidebar__item--danger" onClick={onSignOut}>
            <SignOutIcon size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
