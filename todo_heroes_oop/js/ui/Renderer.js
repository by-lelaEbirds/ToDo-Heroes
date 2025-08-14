class Renderer {
    constructor(manager) {
        this.manager = manager;
        this.listElement = document.getElementById("task-list");
    }

    render(filter = "all") {
        this.listElement.innerHTML = "";
        const tasks = this.manager.getTasks(filter);
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            
            const text = document.createElement("span");
            text.textContent = task.text;
            text.addEventListener("click", () => {
                this.manager.toggleTask(task.id);
                this.render(filter);
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "Editar";
            editBtn.addEventListener("click", () => {
                const newText = prompt("Novo texto:", task.text);
                if (newText) {
                    this.manager.editTask(task.id, newText);
                    this.render(filter);
                }
            });

            const delBtn = document.createElement("button");
            delBtn.textContent = "Excluir";
            delBtn.addEventListener("click", () => {
                this.manager.deleteTask(task.id);
                this.render(filter);
            });

            li.appendChild(text);
            li.appendChild(editBtn);
            li.appendChild(delBtn);
            this.listElement.appendChild(li);
        });
    }
}