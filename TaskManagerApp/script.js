let currentEditIndex = null;  

async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task} 
            <button onclick="editTask(${index}, '${task}')">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function addOrUpdateTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        if (currentEditIndex !== null) {
            // Update existing task
            await updateTask(currentEditIndex, task);
            currentEditIndex = null;  
            document.getElementById('addButton').textContent = 'Add Task'; 
        } else {
            // Add new task
            await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });
        }
        taskInput.value = '';  
        fetchTasks();  
    }
}

async function editTask(index, task) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task; 
    currentEditIndex = index;  
    document.getElementById('addButton').textContent = 'Save Task';
}

async function updateTask(index, updatedTask) {
    await fetch(`/tasks/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: updatedTask }) 
    });
}

async function deleteTask(index) {
    await fetch(`/tasks/${index}`, { method: 'DELETE' });
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);
