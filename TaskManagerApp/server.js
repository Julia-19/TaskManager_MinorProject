const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

const DATA_FILE = './data.json';

// Helper function to read tasks
const readTasks = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Helper function to write tasks
const writeTasks = (tasks) => fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(readTasks());
});

// Add a new task
app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    tasks.push(req.body.task);
    writeTasks(tasks);
    res.status(201).send();
});

// Delete a task
app.delete('/tasks/:index', (req, res) => {
    const tasks = readTasks();
    tasks.splice(req.params.index, 1);
    writeTasks(tasks);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
