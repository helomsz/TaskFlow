const tasks = [];

// criar tarefa
export function createTask(task) {
  tasks.push(task);
  return task;
}

// listar tarefas por usuário
export function findTasksByUser(userId) {
  return tasks.filter(task => task.userId === userId);
}

// buscar tarefa por id e usuário
export function findTaskByIdAndUser(id, userId) {
  return tasks.find(task => task.id === id && task.userId === userId);
}

// deletar tarefa
export function deleteTaskByIdAndUser(id, userId) {
  const index = tasks.findIndex(
    task => task.id === id && task.userId === userId
  );

  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
