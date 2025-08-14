// ===================== Inicialização =====================
const manager = new TaskManager();
const renderer = new Renderer(manager);

// ===================== Elementos do DOM =====================
const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-task");
const themeSelect = document.getElementById("theme-select");
const filterButtons = document.querySelectorAll(".filters button");

// ===================== Função para adicionar tarefa =====================
function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        manager.addTask(taskText);
        input.value = "";
        renderer.render();
    }
}

// ===================== Eventos =====================
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });

// Alternar filtros
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderer.render(btn.dataset.filter);
    });
});

// ===================== Canvas para efeitos =====================
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = -1;
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===================== Tema Hacker - Chuva de caracteres =====================
const hackerLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
const fontSize = 16;
let hackerColumns = Math.floor(canvas.width / fontSize);
let hackerDrops = [];

function initHackerDrops() {
    if (document.body.className !== 'hacker') return;
    hackerColumns = Math.floor(canvas.width / fontSize);
    hackerDrops = [];
    for (let x = 0; x < hackerColumns; x++) hackerDrops[x] = Math.random() * canvas.height;
}

function drawHacker() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF00';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < hackerDrops.length; i++) {
        const text = hackerLetters[Math.floor(Math.random() * hackerLetters.length)];
        ctx.fillText(text, i * fontSize, hackerDrops[i] * fontSize);
        if (hackerDrops[i] * fontSize > canvas.height && Math.random() > 0.975) hackerDrops[i] = 0;
        hackerDrops[i]++;
    }
}

// ===================== Tema Aero - Ondas líquidas =====================
let aeroOffset = 0;
function drawAero() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(74,144,226,0.6)');
    gradient.addColorStop(0.5, 'rgba(174,221,255,0.4)');
    gradient.addColorStop(1, 'rgba(74,144,226,0.6)');

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
            ctx.lineTo(x, i + Math.sin((x + aeroOffset) * 0.02) * 20);
        }
        ctx.stroke();
    }
    aeroOffset += 2;
}

// ===================== Tema Dark - Fundo preto com partículas =====================
function drawDark() {
    // Fundo preto sólido
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Partículas brancas suaves
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
        ctx.fillRect(x, y, 2, 2);
    }
}

// ===================== Atualização do canvas =====================
function updateCanvas() {
    const theme = document.body.className;
    if (theme === 'hacker') drawHacker();
    else if (theme === 'aero') drawAero();
    else if (theme === 'dark') drawDark();
    else ctx.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(updateCanvas);
}

// ===================== Inicializações =====================
updateCanvas();
initHackerDrops();

// ===================== Alterar temas =====================
themeSelect.addEventListener("change", () => {
    document.body.className = "";
    const theme = themeSelect.value;
    document.body.classList.add(theme);
    if (theme === 'hacker') initHackerDrops();
});

// ===================== Ajuste do canvas ao redimensionar =====================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    aeroOffset = 0;
    initHackerDrops();
});

// ===================== Renderização inicial =====================
renderer.render();
