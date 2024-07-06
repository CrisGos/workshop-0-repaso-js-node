class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
        this.id = undefined;
    }

    addTask(description) {
        if (this.id == undefined) {
            const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
            const task = new Task(id, description);
            this.tasks.push(task);
        } else {
            this.updateTask(description)
        }
        this.saveTasks();
        this.renderTasks();
        
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    showTaskInfo(id, description) {
        this.id = id;
        const preTask = document.getElementById("new-task");
        preTask.value = description;
    }

    updateTask(taskModified) {
        const taksFound = this.tasks.findIndex(task => task.id == this.id);
        console.log(taksFound); // prueba;
        this.tasks[taksFound].description = taskModified;
        this.id = undefined;
        this.saveTasks();
        this.renderTasks();
    }


    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const taskIntance = new Task(task.id, task.description, task.completed);
            taskIntance.toggleComplete();
            this.tasks = this.tasks.map(taskTog => (taskTog.id === id ? taskIntance : taskTog));
            this.saveTasks();
            this.renderTasks();
        } else {
            alert("Tarea no encontrada")
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Editar';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.showTaskInfo(task.id, task.description);
            });

            item.appendChild(updateButton);
            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});