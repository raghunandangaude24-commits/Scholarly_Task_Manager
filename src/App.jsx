import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Toolbar from './components/Toolbar.jsx'
import TaskBoard from './components/TaskBoard.jsx'
import TaskModal from './components/TaskModal.jsx'
import RightPanel from './components/RightPanel.jsx'
import { seedTasks, notifications as seedNotifications } from './data/tasks.js'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(seedTasks)
  const [notifications] = useState(seedNotifications)
  const [query, setQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks.filter((t) => {
      const matchesQuery = !q || t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q)
      const matchesSubject = subjectFilter === 'all' || t.subject === subjectFilter
      return matchesQuery && matchesSubject
    })
  }, [tasks, query, subjectFilter])

  const selectedTask = tasks.find((t) => t.id === selectedId) || null

  const createTask = (data) => {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1
    setTasks((prev) => [...prev, { id, ...data, comments: [] }])
    setModalOpen(false)
  }

  const addComment = (taskId, text) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, comments: [...t.comments, { id: Date.now(), author: 'Ananya Rao', text, time: 'just now' }] }
          : t,
      ),
    )
  }

  return (
    <div className="app">
      <Sidebar
        active="report"
        onSelect={() => setSidebarOpen(false)}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSignOut={() => {}}
      />

      <main className="main">
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          onOpenMenu={() => setSidebarOpen(true)}
          subjectFilter={subjectFilter}
          onSelectSubject={setSubjectFilter}
          onAdd={() => setModalOpen(true)}
        />

        <TaskBoard tasks={filtered} selectedId={selectedId} onSelect={setSelectedId} />
      </main>

      <RightPanel task={selectedTask} notifications={notifications} onAddComment={addComment} />

      {modalOpen && (
        <TaskModal
          defaultSubject={subjectFilter === 'all' ? undefined : subjectFilter}
          onClose={() => setModalOpen(false)}
          onCreate={createTask}
        />
      )}
    </div>
  )
}

export default App
