import express from 'express';
import { getTasks, addTask, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    await getTasks(req, res, { title: 'Tasks', page: 'tasks' });
});
router.post('/add', addTask);
router.post('/update/:id', updateTaskStatus);

export default router;