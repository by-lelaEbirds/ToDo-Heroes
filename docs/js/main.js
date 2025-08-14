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

// === Efeitos de fundo por tema ===

// Cria canvas para efeitos
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

// ===== Hacker - chuva de caracteres =====
const hackerLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
const fontSize = 16;
let hackerColumns = Math.floor(canvas.width / fontSize);
let hackerDrops = [];

function initHackerDrops() {
    if (document.body.className !== 'hacker') return;
    hackerColumns = Math.floor(canvas.width / fontSize);
    hackerDrops = [];
    for (let x = 0; x < hackerColumns; x++) {
        hackerDrops[x] = Math.random() * canvas.height;
    }
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

// ===== Aero - ondas líquidas =====
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

// ===== Dark - partículas suaves =====
function drawDark() {
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
        ctx.fillRect(x, y, 2, 2);
    }
}

// ===== FAE - efeito amarelo suave =====
let faeOffset = 0;
function drawFAE() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(255,215,0,0.3)');
    gradient.addColorStop(0.5, 'rgba(255,255,150,0.2)');
    gradient.addColorStop(1, 'rgba(255,215,0,0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255,255,150,0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 15) {
            ctx.lineTo(x, i + Math.sin((x + faeOffset) * 0.03) * 15);
        }
        ctx.stroke();
    }
    faeOffset += 1.5;
}

// ===== Atualização do canvas =====
function updateCanvas() {
    const theme = document.body.className;
    if (theme === 'hacker') drawHacker();
    else if (theme === 'aero') drawAero();
    else if (theme === 'dark') drawDark();
    else if (theme === 'fae') drawFAE();
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(updateCanvas);
}
updateCanvas();
initHackerDrops();

// ===== Alterar temas =====
themeSelect.addEventListener("change", () => {
    document.body.className = "";
    const theme = themeSelect.value;
    document.body.classList.add(theme);
    if (theme === 'hacker') initHackerDrops();
});

// ===== Ajusta canvas ao redimensionar =====
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    aeroOffset = 0;
    faeOffset = 0;
    initHackerDrops();
});

// ===== Ajustar botão de temas e adicionar placa indicativa =====
themeSelect.style.marginTop = '2rem';

// Placa "Clique aqui" com seta
const tooltip = document.createElement('div');
tooltip.innerHTML = 'Clique aqui &#8595;'; // seta para baixo
tooltip.style.position = 'absolute';
tooltip.style.top = (themeSelect.offsetTop - 40) + 'px';
tooltip.style.left = (themeSelect.offsetLeft + themeSelect.offsetWidth / 2 - 40) + 'px';
tooltip.style.background = 'rgba(255, 215, 0, 0.8)';
tooltip.style.color = '#000';
tooltip.style.padding = '6px 12px';
tooltip.style.borderRadius = '8px';
tooltip.style.fontWeight = 'bold';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '1000';
tooltip.style.textAlign = 'center';
tooltip.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
document.body.appendChild(tooltip);
