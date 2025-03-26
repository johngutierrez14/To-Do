const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Activity extends Model {}

Activity.init({
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue: 'Pending',
    },
}, { sequelize, modelName: 'activity' });

module.exports = Activity;