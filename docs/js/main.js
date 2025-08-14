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

// ===================== Tema FAE - Fundo amarelo com partículas =====================
function drawFAE() {
    ctx.fillStyle = 'rgba(255, 223, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(255, 223, 0, ${Math.random() * 0.15})`;
        ctx.fillRect(x, y, 3, 3);
    }
}

// ===================== Tema Dark - Fundo preto com partículas =====================
function drawDark() {
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    if (theme === 'hacker') {
        drawHacker();
        document.body.style.cursor = 'crosshair';
    }
    else if (theme === 'aero') {
        drawAero();
        document.body.style.cursor = 'default';
    }
    else if (theme === 'dark') {
        drawDark();
        document.body.style.cursor = 'default';
    }
    else if (theme === 'fae') {
        drawFAE();
        document.body.style.cursor = 'default';
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.body.style.cursor = 'default';
    }

    requestAnimationFrame(updateCanvas);
}

// ===================== Inicializações =====================
document.body.classList.add('fae'); // <<< tema FAE inicial
themeSelect.value = 'fae';          // seleciona no dropdown
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

// ===================== Abaixar botão de temas e adicionar plaquinha acima =====================
const themeContainer = document.querySelector('.theme-selector');
if (themeContainer) {
    themeContainer.style.marginTop = '3rem';
    themeContainer.style.position = 'relative';
    themeContainer.style.display = 'inline-block';

    const plaque = document.createElement('div');
    plaque.style.position = 'absolute';
    plaque.style.bottom = '100%';
    plaque.style.left = '50%';
    plaque.style.transform = 'translateX(-50%)';
    plaque.style.marginBottom = '0.5rem';
    plaque.style.padding = '0.5rem 1rem';
    plaque.style.background = 'rgba(255, 223, 0, 0.8)';
    plaque.style.color = '#333';
    plaque.style.borderRadius = '8px';
    plaque.style.fontWeight = 'bold';
    plaque.style.whiteSpace = 'nowrap';
    plaque.style.zIndex = 10;
    plaque.textContent = 'Alterne para um tema aqui ↓';
    themeContainer.appendChild(plaque);
}

// ===================== Gif seguindo o cursor =====================
const cursorGif = document.createElement('img');
cursorGif.src = 'https://media1.tenor.com/m/Nxo9h7sUnRIAAAAC/spongebob-patrick.gif';
cursorGif.style.width = '40px';
cursorGif.style.height = '40px';
cursorGif.style.position = 'fixed';
cursorGif.style.pointerEvents = 'none';
cursorGif.style.zIndex = 9999;
cursorGif.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(cursorGif);

document.addEventListener('mousemove', (e) => {
    cursorGif.style.left = `${e.clientX}px`;
    cursorGif.style.top = `${e.clientY}px`;
});

// ===================== Renderização inicial =====================
renderer.render();
