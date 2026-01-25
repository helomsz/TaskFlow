import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/dashboard.css';

const TASK_STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    async function loadTasks() {
        const response = await api.get('/tasks');
        setTasks(response.data);
        setLoading(false);
    }

    async function handleCreateTask(e) {
        e.preventDefault();

        const response = await api.post('/tasks', {
            title,
            description
        });

        setTasks(prev => [...prev, response.data]);
        setTitle('');
        setDescription('');
    }

    async function handleDeleteTask(id) {
        await api.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    async function handleUpdateStatus(taskId, newStatus) {
        const response = await api.put(`/tasks/${taskId}`, {
            status: newStatus
        });

        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? response.data : task
            )
        );
    }


    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className="dashboardContainer">
            <header className="dashboardHeader glass">
                <h1>TaskFlow</h1>
            </header>

            <main className="dashboardContent">
                <form className="taskForm glass" onSubmit={handleCreateTask}>
                    <input
                        type="text"
                        placeholder="Nova tarefa"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Descrição (opcional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button type="submit">Adicionar</button>
                </form>

                {loading ? (
                    <p className="loading">Carregando tarefas...</p>
                ) : (
                    <ul className="taskList">
                        {tasks.map(task => (
                            <li key={task.id} className={`taskCard glass ${task.status}`}>
                                <div className="taskInfo">
                                    <strong>{task.title}</strong>
                                    <span>{task.description}</span>
                                </div>

                                <div className="taskActions">
                                    <select
                                        value={task.status}
                                        onChange={e =>
                                            handleUpdateStatus(task.id, e.target.value)
                                        }
                                    >
                                        <option value="TODO">To do</option>
                                        <option value="IN_PROGRESS">Em progresso</option>
                                        <option value="DONE">Concluída</option>
                                    </select>

                                    <button
                                        className="delete"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </li>

                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
