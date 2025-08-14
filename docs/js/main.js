const manager = new TaskManager();
const renderer = new Renderer(manager);

const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-task");
const themeSelect = document.getElementById("theme-select");
const filterButtons = document.querySelectorAll(".filters button");

// Adicionar tarefa
addBtn.addEventListener("click", () => {
    if (input.value.trim()) {
        manager.addTask(input.value.trim());
        input.value = "";
        renderer.render();
    }
});

// Adicionar com Enter
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
        manager.addTask(input.value.trim());
        input.value = "";
        renderer.render();
    }
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
    document.body.className = themeSelect.value;
});

// Render inicial
renderer.render();
