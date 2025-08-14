class Task {
    constructor(text, completed = false) {
        this.id = Date.now();
        this.text = text;
        this.completed = completed;
    }
}