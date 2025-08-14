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

            // Texto da tarefa - clique para concluir
            const text = document.createElement("span");
            text.textContent = task.text;
            text.style.flex = "1";
            text.addEventListener("click", () => {
                this.manager.toggleTask(task.id);
                this.render(filter);
            });

            // Botão Editar
            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.innerHTML = '<i class="fas fa-pen"></i>Editar';
            editBtn.addEventListener("click", () => {
                const newText = prompt("Novo texto:", task.text);
                if (newText) {
                    this.manager.editTask(task.id, newText);
                    this.render(filter);
                }
            });

            // Botão Excluir
            const delBtn = document.createElement("button");
            delBtn.className = "delete-btn";
            delBtn.innerHTML = '<i class="fas fa-trash"></i>Excluir';
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
