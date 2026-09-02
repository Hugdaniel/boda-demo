// Capturamos las referencias del loader y el botón por sus ID
const loader = document.getElementById('loader');
const btnRevelar = document.getElementById('btn-revelar');

// Evento al hacer clic para iniciar la transición a la invitación
btnRevelar.addEventListener('click', () => {
  loader.classList.add('loader-hidden');
});