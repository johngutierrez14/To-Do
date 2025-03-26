import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} fetchTasks={fetchTasks} />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.description} - {task.priority} - {task.status}
                        <Button onClick={() => handleEdit(task)}>Edit</Button>
                        <Button onClick={() => handleDelete(task.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;