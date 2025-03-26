const Task = require('../models/Task');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({ title, description, priority, dueDate, userId: req.user.id });
    res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.status(204).send();
};