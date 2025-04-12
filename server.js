import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import indexRoutes from './routes/index.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Input validation middleware
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.is('application/json') && !req.is('application/x-www-form-urlencoded')) {
            return res.status(400).json({ error: 'Invalid content type' });
        }
    }
    next();
});

// Middleware to pass users to tasks page
app.use('/tasks', async (req, res, next) => {
    res.locals.users = await User.find();
    next();
});

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Set default error status and message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    
    // If the request expects JSON, send JSON response
    if (req.accepts('json')) {
        return res.status(status).json({ 
            error: message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }
    
    // Otherwise render the error page
    res.status(status).render('error', { 
        message: message,
        error: process.env.NODE_ENV === 'development' ? err : {},
        page: 'error',
        title: 'Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        message: 'Page not found',
        error: {},
        page: 'error',
        title: '404 Not Found'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));