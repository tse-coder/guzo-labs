import User from '../models/User.js';

export const getUsers = async (req, res, options = {}) => {
    try {
        const users = await User.find().populate('tasks.taskId', 'name points');
        res.render('users', { users, title: options.title || 'Users', page: options.page || 'users' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};