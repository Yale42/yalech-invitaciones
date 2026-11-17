// Posada de la familia Herrera. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Posada de la familia Herrera',
  firma: 'familia Herrera',
  saludo: 'Hola, les confirmo para la posada:',
  whatsapp: '520000000000',
  inicio: '2026-12-19T19:00:00-06:00',
  fin: '2026-12-20T00:00:00-06:00',
  lugar: 'Calle 5 de Mayo 418, Barrio de Analco, Puebla',
  archivo: 'posada-herrera.ics',
  pasesPorDefecto: 2,
  maxPases: 10,
  introMs: 900,
  comidaTxt: 'Llevo',
  efectos: {
    reveal: '.intro-text, .loteria, .section .eyebrow, .section .h2, .section .lead, .regalo, .where, .rsvp, .footer-title',
    stagger: '.programa, .llevar',
  },
};

(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.querySelector('.pin');
  const pinata = intro.querySelector('[data-golpe]');
  const texto = intro.querySelector('[data-golpe-txt]');
  const marcas = [...intro.querySelectorAll('.golpes li')];
  const abrir = intro.querySelector('[data-abrir]');
  const frases = ['¡Dale tres golpes!', '¡Dale, dale, dale!', '¡No pierdas el tino!', '¡Ya se rompe!'];
  let golpes = 0;

  // Dulces que caen al romperla (solo decoración)
  const dulces = () => {
    if (calm) return;
    const caja = document.querySelector('.dulces');
    const tipos = ['🍬', '🍭', '🍊', '🥜', '⭐', '🍫'];
    for (let i = 0; i < 46; i++) {
      const d = document.createElement('i');
      d.textContent = tipos[i % tipos.length];
      const x = (Math.random() - 0.5) * 520;
      d.style.cssText = `--x:${x}px;--up:${-80 - Math.random() * 160}px;--r:${Math.random() * 540 - 270}deg;animation-delay:${Math.random() * 0.15}s`;
      caja.appendChild(d);
    }
    setTimeout(() => caja.replaceChildren(), 2600);
  };

  pinata.addEventListener('click', () => {
    if (golpes >= 3) return;
    golpes++;
    marcas.forEach((m, i) => m.classList.toggle('is-on', i < golpes));
    intro.dataset.golpes = golpes;
    texto.textContent = frases[golpes];
    pinata.classList.remove('is-hit');
    void pinata.offsetWidth; // reinicia la sacudida
    pinata.classList.add('is-hit');
    if (golpes === 3) {
      intro.classList.add('is-broken');
      dulces();
      setTimeout(() => abrir.click(), calm ? 0 : 650);
    }
  });
  setTimeout(() => pinata.focus({ preventScroll: true, focusVisible: false })); // después de comun.js

  // «¿Qué traes tú?»: aparta la opción en el formulario y baja a confirmar
  const select = document.querySelector('#rsvp-form [name="comida"]');
  document.querySelectorAll('[data-llevo]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-llevo]').forEach(b => b.setAttribute('aria-pressed', b === btn));
    select.value = btn.dataset.llevo;
    document.getElementById('confirmar').scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
  }));
  document.querySelectorAll('[data-llevo]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  select.addEventListener('change', () => {
    document.querySelectorAll('[data-llevo]').forEach(b => b.setAttribute('aria-pressed', b.dataset.llevo === select.value));
  });
})();
