-- Sample rows matching the frontend seed data.
-- Run after schema.sql:  mysql -u root -p scholarly_task_manager < backend/sql/seed.sql

USE scholarly_task_manager;

INSERT INTO tasks (title, subject, status, priority, due, assignee, description) VALUES
('Algebra problem set 4',          'maths',   'todo',     'high',   'Oct 18', 'Ananya R.', 'Complete exercises 4.1 to 4.6 covering linear equations.'),
('Geometry proofs worksheet',      'maths',   'todo',     'medium', 'Oct 21', 'Rohan K.',  'Triangle congruence proofs, 12 questions.'),
('Trigonometry revision notes',    'maths',   'progress', 'medium', 'Oct 16', 'Sneha P.',  'Summarise identities and prepare a one-page cheat sheet.'),
('Statistics project — survey data','maths',  'review',   'high',   'Oct 14', 'Vikram S.', 'Mean, median, mode analysis of the class survey results.'),
('Calculus weekly quiz prep',      'maths',   'done',     'low',    'Oct 10', 'Ananya R.', 'Limits and continuity practice test completed.'),
('Chemistry lab report — titration','science','todo',     'high',   'Oct 17', 'Kabir M.',  'Write aim, apparatus, observations and conclusion.'),
('Physics: Newton’s laws assignment','science','progress','medium', 'Oct 19', 'Diya N.',   'Solve numericals on force and momentum.'),
('Biology diagram: human heart',   'science',  'review',   'low',    'Oct 15', 'Ishaan V.', 'Labelled diagram with a short explanation of blood flow.'),
('Science fair model documentation','science','done',     'medium', 'Oct 08', 'Kabir M.',  'Final write-up submitted for the water-filter model.'),
('Essay: Importance of clean rivers','english','todo',     'medium', 'Oct 20', 'Meera J.',  '800 words, include at least two references.'),
('Shakespeare — act 3 reading log','english',  'progress', 'low',    'Oct 16', 'Arjun T.',  'Summarise scenes 1–5 with key quotes.'),
('Poetry analysis: The Road Not Taken','english','review', 'medium', 'Oct 13', 'Meera J.',  'Themes, imagery and personal response.'),
('Vocabulary test corrections',    'english',  'done',     'low',    'Oct 09', 'Arjun T.',  'Revised spellings submitted.');

INSERT INTO comments (task_id, author, text, time) VALUES
(1, 'Prof. Mehta', 'Please show full working for Q3.', '2h ago'),
(3, 'Sneha P.',    'Halfway through the identities section.', '1h ago'),
(3, 'Ananya R.',   'I can add the graph diagrams.', '30m ago'),
(4, 'Prof. Mehta', 'Charts look good. Recheck Q7 rounding.', '20m ago'),
(7, 'Diya N.',     'Stuck on the incline plane problem.', '45m ago'),
(9, 'Prof. Iyer',  'Excellent work, full marks.', '1d ago'),
(12,'Prof. Rao',   'Add a paragraph on the extended metaphor.', '3h ago');
