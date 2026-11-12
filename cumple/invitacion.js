// Leo cumple 6 · fiesta espacial. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Fiesta de cumpleaños de Leo',
  firma: 'papás de Leo',
  saludo: 'Hola, les confirmo para la fiesta de Leo:',
  whatsapp: '520000000000',
  inicio: '2027-02-20T16:00:00-06:00',
  fin: '2027-02-20T20:00:00-06:00',
  lugar: 'Salón Galaxia Kids, Av. Gonzalitos 920, Mitras Centro, Monterrey',
  archivo: 'cumple-leo.ics',
  pasesPorDefecto: 3,
  maxPases: 10,
  introMs: 900,
  efectos: {
    reveal: '.intro-text, .boarding, .section .eyebrow, .section .h2, .section .lead, .where, .rsvp, .footer-title',
    stagger: '.fun',
  },
};

// Confeti al reventar el globo (solo decoración; si el teléfono pide menos movimiento, no sale)
document.querySelectorAll('[data-abrir]').forEach(el => el.addEventListener('click', () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const caja = document.querySelector('.confetti');
  if (caja.childElementCount) return;
  const colores = ['#ffd23f', '#3ddbd9', '#ff5fa2', '#ff8a3d', '#8f7bff', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    const c = document.createElement('i');
    const ang = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 320;
    c.style.cssText = `--x:${Math.cos(ang) * dist}px;--y:${Math.sin(ang) * dist - 120}px;--r:${Math.random() * 720 - 360}deg;`
      + `background:${colores[i % colores.length]};animation-delay:${Math.random() * 0.12}s;`
      + (i % 3 ? '' : 'border-radius:50%;');
    caja.appendChild(c);
  }
  setTimeout(() => caja.replaceChildren(), 2200);
}));
