const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

const DATA_FILE = './data.json';
const readTasks = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const writeTasks = (tasks) => fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));

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

// Update a task
app.put('/tasks/:index', (req, res) => {
    const tasks = readTasks();
    console.log(`Before update: ${JSON.stringify(tasks)}`);
    tasks[req.params.index] = req.body.task;
    writeTasks(tasks);
    console.log(`After update: ${JSON.stringify(tasks)}`);
    res.status(200).send();
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
