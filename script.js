
const temaBTN = document.getElementById('tema-btn');
const iconeEscuro = document.getElementById('tema-icon-escuro');
const iconeClaro = document.getElementById('tema-icon-claro');

function aplicarTema(claro){
    if(claro){
        document.documentElement.classList.add('tema-claro');
        iconeEscuro.style.display = 'none';
        iconeClaro.style.display = 'inline';
        document.getElementById('avatar').src = 'assets/bruce.jpg';
    } else {
    document.documentElement.classList.remove('tema-claro');
    iconeEscuro.style.display = 'inline';
    iconeClaro.style.display = 'none';
    document.getElementById('avatar').src = 'assets/avatar.jpg';
  }
}
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'claro') {
  aplicarTema(true);
} else if (temaSalvo === 'escuro') {
  aplicarTema(false);
} else {

  const prefereClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
  aplicarTema(prefereClaro);
}
temaBTN.addEventListener('click', () => {
  const estaClaro = document.documentElement.classList.contains('tema-claro');
  aplicarTema(!estaClaro);
  localStorage.setItem('tema', !estaClaro ? 'claro' : 'escuro');

});

// ===== Copiar Email =====
const copiarBtn = document.getElementById('copiar-email');

copiarBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('bepaolucci@gmail.com');
  copiarBtn.textContent = '✓ Copiado!';
  setTimeout(() => {
    copiarBtn.textContent = 'Copiar email';
  }, 2000);
});

// ===== Animação de Entrada =====
const secoes = document.querySelectorAll('section');

secoes.forEach(secao => {
  secao.classList.add('secao-escondida');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('secao-visivel');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

secoes.forEach(secao => {
  observer.observe(secao);
});


const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('menu-aberto');
});


document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && e.target !== menuBtn) {
    menu.classList.remove('menu-aberto');
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('menu-aberto');
  }
});

// ===== Bat Caverna =====
const caverna = document.getElementById('batcaverna');
const cav = caverna.getContext('2d');

caverna.width = window.innerWidth;
caverna.height = window.innerHeight;

window.addEventListener('resize', () => {
  caverna.width = window.innerWidth;
  caverna.height = window.innerHeight;
});
// ===== Chuva de Gotham =====
const gotas = [];

for (let i = 0; i < 150; i++) {
  gotas.push({
    x: Math.random() * caverna.width,
    y: Math.random() * caverna.height,
    comprimento: Math.random() * 20 + 10,
    velocidade: Math.random() * 6 + 8,
    opacidade: Math.random() * 0.2 + 0.1
  });
}

function desenharChuva() {
  const temaClaro = document.documentElement.classList.contains('tema-claro');
  if (temaClaro) return;

  gotas.forEach(g => {
    cav.beginPath();
    cav.moveTo(g.x, g.y);
    cav.lineTo(g.x - 2, g.y + g.comprimento);
    cav.strokeStyle = `rgba(180, 200, 255, ${g.opacidade})`;
    cav.lineWidth = 1;
    cav.stroke();

    g.y += g.velocidade;

    if (g.y > caverna.height) {
      g.y = -g.comprimento;
      g.x = Math.random() * caverna.width;
    }
  });
}

let brilhoFlash = 0; 

function desenharRaio() {
  if (brilhoFlash <= 0) return;

  const gradiente = cav.createLinearGradient(0, 0, 0, caverna.height * 0.2);
  gradiente.addColorStop(0, `rgba(255, 255, 255, ${brilhoFlash})`);
  gradiente.addColorStop(1, 'rgba(255, 255, 255, 0)');

  cav.fillStyle = gradiente;
  cav.fillRect(0, 0, caverna.width, caverna.height);
}
function atualizarRaio() {
  if (brilhoFlash > 0) {
    brilhoFlash -= 0.03; 
    if (brilhoFlash < 0) brilhoFlash = 0;
  }
}
function umEstalo() {
  brilhoFlash = Math.random() * 0.4 + 0.5; 
}

function dispararRaio() {
  const piscadas = Math.floor(Math.random() * 3) + 1; 
  for (let i = 0; i < piscadas; i++) {
    setTimeout(umEstalo, i * 150); // um estalo a cada 150ms
  }
}

function agendarRaio() {
  const espera = Math.random() * 7000 + 4000; // entre 4s e 11s
  setTimeout(() => {
    const temaClaro = document.documentElement.classList.contains('tema-claro');
    if (!temaClaro) dispararRaio();
    agendarRaio(); // reagenda o próximo
  }, espera);
}

agendarRaio();

const morcegos = [];

function criarMorcegos() {
  for (let i = 0; i < 100; i++) {
    morcegos.push({
      x: Math.random() * caverna.width,
      y: caverna.height + Math.random() * 200,
      velocidade: Math.random() * 4 + 8,
      velocidadeX: Math.random() * 3 - 1.5,
      tamanho: Math.random() * 15 + 15,
      faseAsa: Math.random() * Math.PI * 2,
      velocidadeAsa: Math.random() * 1 + 0.5
    });
  }
}

function desenharMorcego(m) {
  const balanco = Math.sin(m.faseAsa) * m.tamanho * 0.5;

  cav.fillStyle = 'rgba(0, 0, 0, 0.85)';
  cav.beginPath();

  // asa esquerda
  cav.moveTo(m.x, m.y);
  cav.quadraticCurveTo(m.x - m.tamanho, m.y + balanco, m.x - m.tamanho * 1.5, m.y);
  cav.quadraticCurveTo(m.x - m.tamanho, m.y + m.tamanho * 0.4, m.x, m.y);

  // asa direita
  cav.moveTo(m.x, m.y);
  cav.quadraticCurveTo(m.x + m.tamanho, m.y + balanco, m.x + m.tamanho * 1.5, m.y);
  cav.quadraticCurveTo(m.x + m.tamanho, m.y + m.tamanho * 0.4, m.x, m.y);

  cav.fill();

  cav.beginPath();
  cav.ellipse(m.x, m.y, m.tamanho * 0.18, m.tamanho * 0.4, 0, 0, Math.PI * 2);
  cav.fill();
}
function atualizarMorcego(m) {
  m.y -= m.velocidade;
  m.x += m.velocidadeX + Math.sin(m.faseAsa) * 0.5;
  m.faseAsa += m.velocidadeAsa;
}
function desenharMorcegos(){
  morcegos.forEach(m => {
    atualizarMorcego(m);
    desenharMorcego(m);
  });
   for (let i = morcegos.length - 1; i >= 0; i--) {
    const m = morcegos[i];
    if (m.y < -100 || m.x < -100 || m.x > caverna.width + 100) {
      morcegos.splice(i, 1);
    }
  }
}
function desenharRelampago() {
  let x = Math.random() * caverna.width; // ponto de partida no topo
  let y = 0;

  cav.beginPath();
  cav.moveTo(x, y);

  while (y < caverna.height) {
    x += Math.random() * 60 - 30; // desloca de -30 a +30 nos lados
    y += Math.random() * 40 + 20; // desce de 20 a 60
    cav.lineTo(x, y);
  }

  cav.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  cav.lineWidth = 3;
  cav.stroke();
}


const relampagos = [];

function criarRelampago() {
  const pontos = [];
  let x = Math.random() * caverna.width;
  let y = 0;
  pontos.push({ x, y });

  while (y < caverna.height) {
    x += Math.random() * 60 - 30;
    y += Math.random() * 40 + 20;
    pontos.push({ x, y });
  }

  relampagos.push({ pontos: pontos, vida: 12 });
}

function desenharRelampagos() {
  relampagos.forEach(r => {
    cav.beginPath();
    cav.moveTo(r.pontos[0].x, r.pontos[0].y);

    for (let i = 1; i < r.pontos.length; i++) {
      cav.lineTo(r.pontos[i].x, r.pontos[i].y);
    }

    cav.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    cav.lineWidth = 3;
    cav.stroke();

    r.vida--;
  });

  
  for (let i = relampagos.length - 1; i >= 0; i--) {
    if (relampagos[i].vida <= 0) {
      relampagos.splice(i, 1);
    }
  }
}

function dispararRaioForte() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      brilhoFlash = Math.random() * 0.3 + 0.7; 
    }, i * 120);
  }
}
function animar() {
  cav.clearRect(0, 0, caverna.width, caverna.height);
  desenharChuva();
  atualizarRaio();
  desenharRaio();
  desenharRelampagos();
  desenharMorcegos();
   requestAnimationFrame(animar);
}

animar();

// ===== Easter Egg — Coringa + Morcegos + Raios =====
const avatar = document.getElementById('avatar');
let cliques = 0;

avatar.addEventListener('click', () => {
  cliques++;

  if (cliques === 7) {
    cliques = 0;

  
    const temaClaro = document.documentElement.classList.contains('tema-claro');
    if(temaClaro) return;

    
    const coringa = document.createElement('img');
    coringa.src = 'assets/coringa.jpg';
    coringa.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      z-index: 9999;
      border-radius: 100%;
      cursor: pointer;
    `;
    document.body.appendChild(coringa);
    setTimeout(() => coringa.remove(), 2000);

    
   
      criarMorcegos();        
      dispararRaioForte();    
      
      for (let i = 0; i < 5; i++) {
        setTimeout(criarRelampago, i * 200);
      }
    }
  
});