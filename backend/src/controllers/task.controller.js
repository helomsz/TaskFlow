import crypto from 'crypto';

import {
  createTask as createTaskRepository,findTasksByUser,findTaskByIdAndUser,deleteTaskByIdAndUser} from '../repositories/task.repository.js';

export function createTask(req, res) {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      message: 'Título é obrigatório'
    });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description: description || '',
    status: 'TODO',
    createdAt: new Date(),
    userId: req.userId
  };

  createTaskRepository(newTask);

  return res.status(201).json(newTask);
}

export function listTasks(req, res) {
  const tasks = findTasksByUser(req.userId);
  return res.json(tasks);
}

export function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = findTaskByIdAndUser(id, req.userId);

  if (!task) {
    return res.status(404).json({
      message: 'Tarefa não encontrada'
    });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  return res.json(task);
}

export function deleteTask(req, res) {
  const { id } = req.params;

  const deleted = deleteTaskByIdAndUser(id, req.userId);

  if (!deleted) {
    return res.status(404).json({
      message: 'Tarefa não encontrada'
    });
  }

  return res.status(204).send();
}
