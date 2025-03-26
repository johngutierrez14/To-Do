exports.getActivities = async (req, res) => {
    const activities = await Activity.findAll({ where: { taskId: req.params.taskId } });
    res.json(activities);
};

exports.updateActivity = async (req, res) => {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    Object.assign(activity, req.body);
    await activity.save();
    res.json(activity);
};

exports.deleteActivity = async (req, res) => {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    await activity.destroy();
    res.status(204).send();
};