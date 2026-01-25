import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import {findUserByEmail,createUser} from '../repositories/user.repository.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios'
    });
  }

  const userExists = findUserByEmail(email);
  if (userExists) {
    return res.status(409).json({
      message: 'Usuário já cadastrado'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword
  };

  createUser(newUser);

  const token = jwt.sign(
    { id: newUser.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  return res.status(201).json({
    message: 'Usuário criado com sucesso',
    token
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: 'Email ou senha inválidos'
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: 'Email ou senha inválidos'
    });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  return res.json({
    message: 'Login realizado com sucesso',
    token
  });
}
