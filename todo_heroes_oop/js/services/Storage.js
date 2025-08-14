class Storage {
    static getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    static saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}