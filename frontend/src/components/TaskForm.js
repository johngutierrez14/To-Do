import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ currentTask, setCurrentTask, fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setPriority(currentTask.priority);
            setStatus(currentTask.status);
        } else {
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setStatus('Pending');
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await axios.put(`/api/tasks/${currentTask.id}`, { title, description, priority, status });
        } else {
            await axios.post('/api/tasks', { title, description, priority, status });
        }
        setCurrentTask(null);
        fetchTasks();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <TextField
                label="Priority"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                select
                SelectProps={{
                    native: true,
                }}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </TextField>
            <TextField
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                select
                SelectProps={{
                    native: true,
                }}
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </TextField>
            <Button type="submit" variant="contained">{currentTask ? 'Update Task' : 'Add Task'}</Button>
        </form>
    );
};

export default TaskForm;