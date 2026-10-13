-- Scholarly Task Manager — MySQL schema
-- Run once:  mysql -u root -p < backend/sql/schema.sql

CREATE DATABASE IF NOT EXISTS scholarly_task_manager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE scholarly_task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  subject     ENUM('maths', 'science', 'english') NOT NULL DEFAULT 'maths',
  status      ENUM('todo', 'progress', 'review', 'done') NOT NULL DEFAULT 'todo',
  priority    ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'medium',
  due         VARCHAR(32)   NOT NULL DEFAULT 'No due date',
  assignee    VARCHAR(120)  NOT NULL DEFAULT 'Unassigned',
  description TEXT          NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  task_id    INT           NOT NULL,
  author     VARCHAR(120)  NOT NULL DEFAULT 'Ananya Rao',
  text       TEXT          NOT NULL,
  time       VARCHAR(32)   NOT NULL DEFAULT 'just now',
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_task FOREIGN KEY (task_id)
    REFERENCES tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB;
