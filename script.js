
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