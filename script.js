
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
    console.log("Clique")
  const estaClaro = document.documentElement.classList.contains('tema-claro');
  aplicarTema(!estaClaro);
  localStorage.setItem('tema', !estaClaro ? 'claro' : 'escuro');

});

