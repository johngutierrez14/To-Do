const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUser  = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User  not found' });
    res.json(user);
};

exports.updateUser  = async (req, res) => {
    const { username, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User  not found' });
    user.username = username;
    user.role = role;
    await user.save();
    res.json(user);
};

exports.deleteUser  = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User  not found' });
    await user.destroy();
    res.status(204).send();
};