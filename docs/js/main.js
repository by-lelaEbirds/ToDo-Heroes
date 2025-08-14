// Inicialização do TaskManager e Renderer
const manager = new TaskManager();
const renderer = new Renderer(manager);

// Elementos do DOM
const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-task");
const themeSelect = document.getElementById("theme-select");
const filterButtons = document.querySelectorAll(".filters button");

// Função para adicionar tarefa
function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        manager.addTask(taskText);
        input.value = "";
        renderer.render();
    }
}

// Eventos
addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Alternar filtros
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderer.render(btn.dataset.filter);
    });
});

// Alternar temas
themeSelect.addEventListener("change", () => {
    // Remove todas as classes de tema existentes
    document.body.className = "";
    // Adiciona a classe do tema selecionado
    document.body.classList.add(themeSelect.value);
});

// Renderização inicial
renderer.render();
