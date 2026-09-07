// Capturamos las referencias del loader y el botón por sus ID
const loader = document.getElementById('loader');
const btnRevelar = document.getElementById('btn-revelar');

// Evento al hacer clic para iniciar la transición a la invitación
btnRevelar.addEventListener('click', () => {
  loader.classList.add('loader-hidden');
  // Mostrar inmediatamente a los novios y ocultar el indicador de scroll
  groomPhoto.classList.add('visible');
  bridePhoto.classList.add('visible');
  scrollIndicator.classList.add('scroll-hidden');
});

// Capturamos las imágenes laterales y el indicador
const groomPhoto = document.getElementById('groom-photo');
const bridePhoto = document.getElementById('bride-photo');
const scrollIndicator = document.getElementById('scroll-indicator');

// Escuchamos el scroll de la página
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // Al deslizar de forma intencional (> 50px), los novios entran manteniéndose centrados
  if (scrollPosition > 80) {
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

// ==========================================
// SECCIÓN DE CONFIRMACIÓN (R.S.V.P.) Y WHATSAPP
// ==========================================

// Configurá acá el número de WhatsApp de los novios (código de país y área sin + ni espacios)
const WHATSAPP_NUMBER = '5491112345678'; // Reemplazá con el número real de Javier o Erica

const btnOpenRsvp = document.getElementById('btn-open-rsvp');
const btnCloseRsvp = document.getElementById('btn-close-rsvp');
const rsvpModal = document.getElementById('rsvp-modal');
const rsvpForm = document.getElementById('rsvp-form');
const attendanceSelect = document.getElementById('rsvp-attendance');
const groupGuests = document.getElementById('group-guests');
const groupDiet = document.getElementById('group-diet');

// Abrir modal
if (btnOpenRsvp && rsvpModal) {
  btnOpenRsvp.addEventListener('click', () => {
    rsvpModal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  });
}

// Cerrar modal
function closeRsvpModal() {
  if (rsvpModal) {
    rsvpModal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

if (btnCloseRsvp) {
  btnCloseRsvp.addEventListener('click', closeRsvpModal);
}

// Cerrar al hacer clic fuera de la tarjeta
if (rsvpModal) {
  rsvpModal.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      closeRsvpModal();
    }
  });
}

// Cerrar con tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && rsvpModal && rsvpModal.classList.contains('modal-active')) {
    closeRsvpModal();
  }
});

// Ocultar/mostrar campos si responde que no asiste
if (attendanceSelect) {
  attendanceSelect.addEventListener('change', () => {
    const isAttending = !attendanceSelect.value.includes('Lamentablemente');
    if (groupGuests) groupGuests.style.display = isAttending ? 'flex' : 'none';
    if (groupDiet) groupDiet.style.display = isAttending ? 'flex' : 'none';
  });
}

// Envío de confirmación por WhatsApp
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const attendance = attendanceSelect ? attendanceSelect.value : '';
    const isAttending = !attendance.includes('Lamentablemente');
    const guests = isAttending ? document.getElementById('rsvp-guests').value : '0';
    const diet = isAttending ? document.getElementById('rsvp-diet').value : 'No aplica';
    const message = document.getElementById('rsvp-message').value.trim();

    let text = `¡Hola Javier y Erica! 👋💍\n\n`;
    text += `Confirmo mi respuesta para su boda:\n\n`;
    text += `• *Nombre:* ${name}\n`;
    text += `• *Asistencia:* ${attendance}\n`;

    if (isAttending) {
      text += `• *Cantidad:* ${guests}\n`;
      text += `• *Menú / Cuidados:* ${diet}\n`;
    }

    if (message) {
      text += `• *Mensaje:* "${message}"\n`;
    }

    text += `\n¡Un abrazo grande! ✨`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    closeRsvpModal();
  });
}

// Observer para la animación al scroll de la sección de confirmación
const rsvpSection = document.getElementById('confirmacion');

if (rsvpSection) {
  const rsvpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rsvpSection.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  rsvpObserver.observe(rsvpSection);
}