// Capturamos las referencias del loader y el botón por sus ID
const loader = document.getElementById('loader');
const btnRevelar = document.getElementById('btn-revelar');

// Evento al hacer clic para iniciar la transición a la invitación
btnRevelar.addEventListener('click', () => {
  loader.classList.add('loader-hidden');
});

// Capturamos las imágenes laterales y el indicador
const groomPhoto = document.getElementById('groom-photo');
const bridePhoto = document.getElementById('bride-photo');
const scrollIndicator = document.getElementById('scroll-indicator');

// Escuchamos el scroll de la página
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // Al deslizar más de 40px, los novios entran desde los lados
  if (scrollPosition > 40) {
    groomPhoto.classList.add('visible');
    bridePhoto.classList.add('visible');
    scrollIndicator.classList.add('scroll-hidden');
  } else {
    // Al volver arriba, regresan hacia los extremos
    groomPhoto.classList.remove('visible');
    bridePhoto.classList.remove('visible');
    scrollIndicator.classList.remove('scroll-hidden');
  }
});