const users = [];

// buscar usuário por email
export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

// buscar usuário por id
export function findUserById(id) {
  return users.find(user => user.id === id);
}

// criar usuário
export function createUser(user) {
  users.push(user);
  return user;
}
