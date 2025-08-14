const manager = new TaskManager();
const renderer = new Renderer(manager);

document.getElementById("add-task").addEventListener("click", () => {
    const input = document.getElementById("new-task");
    if (input.value.trim()) {
        manager.addTask(input.value.trim());
        input.value = "";
        renderer.render();
    }
});

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        renderer.render(btn.dataset.filter);
    });
});

renderer.render();