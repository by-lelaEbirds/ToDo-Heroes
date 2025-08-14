// Inicialização do TaskManager e Renderer
const manager = new TaskManager();
const renderer = new Renderer(manager);

// Adicionar tarefa
document.getElementById("add-task").addEventListener("click", () => {
    const input = document.getElementById("new-task");
    if (input.value.trim()) {
        manager.addTask(input.value.trim());
        input.value = "";
        renderer.render();
    }
});

// Adicionar tarefa com Enter
document.getElementById("new-task").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("add-task").click();
    }
});

// Filtros de tarefas
document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active de todos
        document.querySelectorAll(".filters button").forEach(b => b.classList.remove('active'));
        // Adiciona active no clicado
        btn.classList.add('active');
        // Renderiza filtro
        renderer.render(btn.dataset.filter);
    });
});

// Renderização inicial
renderer.render();
