import Task from '../models/Task.js';
import User from '../models/User.js';

export const getTasks = async (req, res, options = {}) => {
    try {
        const tasks = await Task.find();
        const users = await User.find().populate('tasks.taskId', 'name points');
        res.render('tasks', { tasks, users, title: options.title || 'Tasks', page: options.page || 'tasks' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const addTask = async (req, res) => {
    try {
        const { name, description, points, status } = req.body;
        const task = new Task({ name, description, points, status });
        await task.save();
        await User.updateMany({}, { $push: { tasks: { taskId: task._id, status: 'not-started' } } });
        res.redirect('/tasks');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { status, userId } = req.body;
        const taskId = req.params.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        await user.updateTaskStatus(taskId, status);
        if (status === 'completed') {
            const task = await Task.findById(taskId);
            user.addPoints(task.points);
            user.currentTier.name = updateTier(user.points);
            user.currentTier.achievedAt = user.currentTier.achievedAt || new Date();
        } else if (status === 'redeemed') {
            const task = await Task.findById(taskId);
            if (!user.redeemPoints(task.points)) {
                return res.status(400).send('Insufficient points');
            }
        }
        await user.save();
        res.redirect('/tasks');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const updateTier = (points) => {
    if (points > 500) return 'Gold';
    if (points > 200) return 'Silver';
    return 'Bronze';
};