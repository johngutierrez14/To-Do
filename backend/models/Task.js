const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Task extends Model {}

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        defaultValue: 'Medium',
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue: 'Pending',
    },
}, { sequelize, modelName: 'task' });

module.exports = Task;