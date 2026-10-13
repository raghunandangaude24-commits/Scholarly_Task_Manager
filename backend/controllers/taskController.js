const { query } = require('../config/db')

const STATUSES = ['todo', 'progress', 'review', 'done']
const PRIORITIES = ['high', 'medium', 'low']
const SUBJECTS = ['maths', 'science', 'english']

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const taskWithComments = async (where, params) => {
  const rows = await query(
    `SELECT id, title, subject, status, priority, due, assignee, description
       FROM tasks WHERE ${where} LIMIT 1`,
    params,
  )
  if (rows.length === 0) return null

  const comments = await query(
    'SELECT id, author, text, time FROM comments WHERE task_id = ? ORDER BY id ASC',
    [rows[0].id],
  )
  return { ...rows[0], comments }
}

const validate = (body, { partial = false } = {}) => {
  const out = {}

  if (!partial || body.title !== undefined) {
    const title = String(body.title || '').trim()
    if (!title) return { error: 'Title is required' }
    out.title = title
  }
  if (body.subject !== undefined) {
    if (!SUBJECTS.includes(body.subject)) return { error: `Subject must be one of: ${SUBJECTS.join(', ')}` }
    out.subject = body.subject
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return { error: `Status must be one of: ${STATUSES.join(', ')}` }
    out.status = body.status
  }
  if (body.priority !== undefined) {
    if (!PRIORITIES.includes(body.priority)) return { error: `Priority must be one of: ${PRIORITIES.join(', ')}` }
    out.priority = body.priority
  }
  if (body.due !== undefined) out.due = body.due || 'No due date'
  if (body.assignee !== undefined) out.assignee = String(body.assignee || '').trim() || 'Unassigned'
  if (body.description !== undefined) out.description = String(body.description || '').trim()

  return { value: out }
}

// GET /api/tasks?subject=maths&status=todo&q=search
const listTasks = wrap(async (req, res) => {
  const { subject, status, q } = req.query
  const where = []
  const params = []

  if (subject && subject !== 'all') {
    where.push('subject = ?')
    params.push(subject)
  }
  if (status && status !== 'all') {
    where.push('status = ?')
    params.push(status)
  }
  if (q) {
    where.push('(title LIKE ? OR assignee LIKE ? OR description LIKE ?)')
    const like = `%${q}%`
    params.push(like, like, like)
  }

  const rows = await query(
    `SELECT id, title, subject, status, priority, due, assignee, description
       FROM tasks
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY FIELD(status, 'todo', 'progress', 'review', 'done'), id ASC`,
    params,
  )

  const ids = rows.map((t) => t.id)
  const comments = ids.length
    ? await query('SELECT id, task_id, author, text, time FROM comments WHERE task_id IN (?) ORDER BY id ASC', [ids])
    : []

  const byTask = new Map(ids.map((id) => [id, []]))
  comments.forEach((c) => byTask.get(c.task_id)?.push({ id: c.id, author: c.author, text: c.text, time: c.time }))

  res.json(rows.map((t) => ({ ...t, comments: byTask.get(t.id) })))
})

// GET /api/tasks/:id
const getTask = wrap(async (req, res) => {
  const task = await taskWithComments('id = ?', [req.params.id])
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
})

// POST /api/tasks
const createTask = wrap(async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) return res.status(400).json({ error })

  const task = {
    title: value.title,
    subject: value.subject || 'maths',
    status: value.status || 'todo',
    priority: value.priority || 'medium',
    due: value.due || 'No due date',
    assignee: value.assignee || 'Unassigned',
    description: value.description || '',
  }

  const result = await query(
    `INSERT INTO tasks (title, subject, status, priority, due, assignee, description)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [task.title, task.subject, task.status, task.priority, task.due, task.assignee, task.description],
  )

  res.status(201).json({ id: result.insertId, ...task, comments: [] })
})

// PUT/PATCH /api/tasks/:id
const updateTask = wrap(async (req, res) => {
  const existing = await taskWithComments('id = ?', [req.params.id])
  if (!existing) return res.status(404).json({ error: 'Task not found' })

  const { error, value } = validate(req.body, { partial: true })
  if (error) return res.status(400).json({ error })

  const merged = { ...existing, ...value }
  const { comments, ...fields } = merged

  await query(
    `UPDATE tasks
        SET title = ?, subject = ?, status = ?, priority = ?, due = ?, assignee = ?, description = ?
      WHERE id = ?`,
    [
      fields.title,
      fields.subject,
      fields.status,
      fields.priority,
      fields.due,
      fields.assignee,
      fields.description,
      req.params.id,
    ],
  )

  res.json({ ...fields, comments })
})

// DELETE /api/tasks/:id
const deleteTask = wrap(async (req, res) => {
  const result = await query('DELETE FROM tasks WHERE id = ?', [req.params.id])
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' })
  res.json({ id: Number(req.params.id), deleted: true })
})

// POST /api/tasks/:id/comments
const addComment = wrap(async (req, res) => {
  const text = String(req.body?.text || '').trim()
  if (!text) return res.status(400).json({ error: 'Comment text is required' })

  const exists = await query('SELECT id FROM tasks WHERE id = ? LIMIT 1', [req.params.id])
  if (exists.length === 0) return res.status(404).json({ error: 'Task not found' })

  const author = String(req.body?.author || '').trim() || 'Ananya Rao'
  const result = await query('INSERT INTO comments (task_id, author, text, time) VALUES (?, ?, ?, ?)', [
    req.params.id,
    author,
    text,
    'just now',
  ])

  res.status(201).json({ id: result.insertId, task_id: Number(req.params.id), author, text, time: 'just now' })
})

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addComment,
}
