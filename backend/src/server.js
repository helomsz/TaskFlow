import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import taskRoutes from './routes/task.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('TaskFlow API rodando')
})

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333')
})
