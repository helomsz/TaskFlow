import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import '../styles/dashboard.css'
import { LayoutDashboard, CheckCircle, Settings, LogOut, ArrowRight, Trash2 } from 'lucide-react'

const STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
}

export default function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function loadTasks() {
        const response = await api.get('/tasks')
        setTasks(response.data)
        setLoading(false)
    }

    async function handleCreateTask(e) {
        e.preventDefault()

        const response = await api.post('/tasks', { title, description })
        setTasks(prev => [...prev, response.data])

        setTitle('')
        setDescription('')
    }

    async function updateStatus(taskId, status) {
        const response = await api.put(`/tasks/${taskId}`, { status })
        setTasks(prev =>
            prev.map(t => (t.id === taskId ? response.data : t))
        )
    }

    async function deleteTask(id) {
        await api.delete(`/tasks/${id}`)
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    function handleLogout() {
        localStorage.removeItem('token')
        sessionStorage.clear()

        navigate('/login')
    }


    useEffect(() => {
        loadTasks()
    }, [])

    function renderColumn(status, title) {
        return (
            <div className="kanbanColumn glass">
                <h3>{title}</h3>

                {tasks
                    .filter(task => task.status === status)
                    .map(task => (
                        <div key={task.id} className="kanbanCard">
                            <strong>{task.title}</strong>
                            {task.description && <p>{task.description}</p>}

                            <div className="cardActions">
                                {status !== STATUS.DONE && (
                                    <button
                                        className="advanceBtn"
                                        onClick={() =>
                                            updateStatus(
                                                task.id,
                                                status === STATUS.TODO
                                                    ? STATUS.IN_PROGRESS
                                                    : STATUS.DONE
                                            )
                                        }
                                    >
                                        <ArrowRight size={16} />
                                        Avançar
                                    </button>
                                )}

                                <button
                                    className="delete"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }

    return (
        <div className="dashboardWrapper">
            <aside className="sidebar glass">
                <h2>TaskFlow</h2>

                <nav>
                    <button className="active">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button>
                        <CheckCircle size={18} />
                        Concluídas
                    </button>

                    <button>
                        <Settings size={18} />
                        Configurações
                    </button>
                </nav>

                <button className="logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    Sair
                </button>
            </aside>

            <main className="dashboardLayout">
                <header className="dashboardHeader glass">
                    <LayoutDashboard size={20} />
                    <h1>Dashboard</h1>
                </header>

                <form className="taskForm glass" onSubmit={handleCreateTask}>
                    <input
                        placeholder="Nova tarefa"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button type="submit">Adicionar</button>
                </form>

                {loading ? (
                    <p className="loading">Carregando...</p>
                ) : (
                    <section className="kanbanBoard">
                        {renderColumn(STATUS.TODO, 'To do')}
                        {renderColumn(STATUS.IN_PROGRESS, 'Em progresso')}
                        {renderColumn(STATUS.DONE, 'Concluídas')}
                    </section>
                )}
            </main>
            <aside className="infoPanel">
                <div className="infoCard todo glass">
                    <span>To do</span>
                    <strong>{tasks.filter(t => t.status === STATUS.TODO).length}</strong>
                </div>

                <div className="infoCard progress glass">
                    <span>Em progresso</span>
                    <strong>
                        {tasks.filter(t => t.status === STATUS.IN_PROGRESS).length}
                    </strong>
                </div>

                <div className="infoCard done glass">
                    <span>Concluídas</span>
                    <strong>{tasks.filter(t => t.status === STATUS.DONE).length}</strong>
                </div>
            </aside>

        </div>
    )
}