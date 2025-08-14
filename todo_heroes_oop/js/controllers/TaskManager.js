class TaskManager {
    constructor() {
        this.tasks = Storage.getTasks();
    }

    addTask(text) {
        const task = new Task(text);
        this.tasks.push(task);
        Storage.saveTasks(this.tasks);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        Storage.saveTasks(this.tasks);
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });
        Storage.saveTasks(this.tasks);
    }

    editTask(id, newText) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) task.text = newText;
            return task;
        });
        Storage.saveTasks(this.tasks);
    }

    getTasks(filter = "all") {
        if (filter === "completed") return this.tasks.filter(t => t.completed);
        if (filter === "pending") return this.tasks.filter(t => !t.completed);
        return this.tasks;
    }
}