const tasks = [];
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const addTask = (task) => {
    tasks.push(task);
    renderTasks();
};
const editTask = (index) => {
    const task = tasks[index];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskStatus').value = task.status;

    taskForm.onsubmit = (e) => {
        e.preventDefault();
        tasks[index] = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            status: document.getElementById('taskStatus').value
        };
        resetForm();
        renderTasks();
    };
};

const deleteTask = (index) => {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
        alert('Task successfully deleted.');
    }
};

const renderTasks = () => {
    taskList.innerHTML = tasks.map((task, index) => `
        <li>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div>${task.description}</div>
                <div>Status: ${task.status}</div>
            </div>
            <div class="task-actions">
                ${task.status === 'completed' ? '<span>Task Completed</span>' : `
                    <button onclick="editTask(${index})" id="update">Update</button>
                    <button onclick="deleteTask(${index})" id="delete">Delete</button>
                `}
            </div>
        </li>
    `).join('');
};

const resetForm = () => {
    taskForm.reset();
    taskForm.onsubmit = handleFormSubmit;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const task = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        status: document.getElementById('taskStatus').value
    };
    addTask(task);
    resetForm();
};

taskForm.onsubmit = handleFormSubmit;