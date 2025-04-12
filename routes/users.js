import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.render('dashboard', { title: 'Dashboard', page: 'dashboard' }));
router.get('/dashboard', (req, res) => res.render('dashboard', { title: 'Dashboard', page: 'dashboard' }));
router.get('/rewards', (req, res) => res.render('rewards', { title: 'Rewards', page: 'rewards' }));
router.get('/data-visualizer', (req, res) => res.render('data-visualizer', { title: 'Data Visualizer', page: 'data-visualizer' }));

export default router;