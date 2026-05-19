
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
function desenharFundo() {
  const temaClaro = document.documentElement.classList.contains('tema-claro');
  
  const gradiente = cav.createLinearGradient(0, 0, 0, caverna.height);
  
  if (temaClaro) {
    gradiente.addColorStop(0, '#f0e6d3');
    gradiente.addColorStop(0.6, '#e8d5b7');
    gradiente.addColorStop(1, '#ddd0b8');
  } else {
    gradiente.addColorStop(0, '#0a0a0f');
    gradiente.addColorStop(0.6, '#111118');
    gradiente.addColorStop(1, '#1a1a2e');
  }

  cav.fillStyle = gradiente;
  cav.fillRect(0, 0, caverna.width, caverna.height);
}
function animar() {
  desenharFundo();
  requestAnimationFrame(animar);
}

animar();
// ===== Easter Egg — Coringa =====
const avatar = document.getElementById('avatar');
let cliques = 0;

avatar.addEventListener('click', () => {
  cliques++;

  if (cliques === 7) {
    cliques = 0;

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

    setTimeout(() => {
      coringa.remove();
    }, 2000);
  }
});