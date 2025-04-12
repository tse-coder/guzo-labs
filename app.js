const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const membersRouter = require('./routes/members');
app.use('/members', membersRouter);

// Home route
app.get('/', (req, res) => {
    res.render('dashboard', { page: 'dashboard' });
});

// Other routes
app.get('/rewards', (req, res) => {
    res.render('rewards', { page: 'rewards' });
});

app.get('/data-visualizer', (req, res) => {
    res.render('data-visualizer', { page: 'data-visualizer' });
});

app.get('/settings', (req, res) => {
    res.render('settings', { page: 'settings' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 