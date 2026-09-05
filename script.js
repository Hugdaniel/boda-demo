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
  if (scrollPosition > 30) {
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

// Observer para la animación al scroll de la sección de historia
const storySection = document.getElementById('historia');

if (storySection) {
  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        storySection.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  storyObserver.observe(storySection);
}

// ==========================================
// CONTADOR REGRESIVO (BODA: 12 DE OCTUBRE DE 2026, 17:00 HS)
// ==========================================
const weddingDate = new Date('2026-10-12T17:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  } else {
    // Cuando llega la fecha
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
    const title = document.querySelector('.countdown-wrapper .section-title');
    if (title) title.textContent = '¡Hoy es el gran día!';
  }
}

// Ejecución inicial y recurrente cada 1 segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Observer para la animación al scroll de la sección de evento
const eventSection = document.getElementById('evento');

if (eventSection) {
  const eventObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        eventSection.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  eventObserver.observe(eventSection);
}