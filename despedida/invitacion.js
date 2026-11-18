// Despedida de soltera de Vale. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Despedida de soltera de Vale',
  firma: 'Sofía',
  saludo: 'Hola Sofía, te confirmo para la despedida de Vale:',
  whatsapp: '520000000000',
  inicio: '2027-03-27T13:00:00-06:00',
  fin: '2027-03-28T03:00:00-06:00',
  lugar: 'Café Paloma, Roma Norte, Ciudad de México',
  archivo: 'despedida-de-vale.ics',
  pasesPorDefecto: 1,
  maxPases: 4,
  introMs: 1100,
  comidaTxt: 'Talla de playera',
  efectos: {
    reveal: '.intro-text, .squad, .section .eyebrow, .section .h2, .section .lead, .dress, .bank, .quiz, .rsvp, .footer-title',
    stagger: '.plan',
  },
};

(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Burbujas y confeti dorado al descorchar (solo decoración)
  document.querySelector('[data-abrir]').addEventListener('click', () => {
    if (calm) return;
    const caja = document.querySelector('.bubbles');
    const colores = ['#d4af37', '#f7c6d0', '#ffffff', '#e0457b'];
    for (let i = 0; i < 60; i++) {
      const b = document.createElement('i');
      const x = (Math.random() - 0.5) * 360;
      const s = 6 + Math.random() * 12;
      b.style.cssText = `--x:${x}px;--y:${-200 - Math.random() * 420}px;width:${s}px;height:${s}px;`
        + `background:${i % 3 ? 'transparent' : colores[i % 4]};border-color:${colores[i % 4]};animation-delay:${0.15 + Math.random() * 0.3}s`;
      caja.appendChild(b);
    }
    setTimeout(() => caja.replaceChildren(), 2400);
  });

  // ¿Qué tanto conoces a Vale?
  const quiz = document.querySelector('[data-quiz]');
  const preguntas = [...quiz.querySelectorAll('.q')];
  const marcador = quiz.querySelector('[data-score]');
  const frases = ['Mmm… ¿segura que la conoces? 😅', 'Vas bien, pero te falta estudiar 📚', '¡Casi perfecta! 💅', '¡Eres de la squad de verdad! 👑'];
  preguntas.forEach(q => q.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    if (q.dataset.respuesta) return;
    q.dataset.respuesta = b.dataset.r;
    q.querySelectorAll('button').forEach(o => {
      o.disabled = true;
      if (o.dataset.r === q.dataset.ok) o.classList.add('is-ok');
    });
    if (b.dataset.r !== q.dataset.ok) b.classList.add('is-bad');
    const hechas = preguntas.filter(p => p.dataset.respuesta);
    if (hechas.length === preguntas.length) {
      const bien = preguntas.filter(p => p.dataset.respuesta === p.dataset.ok).length;
      marcador.textContent = `${bien} de ${preguntas.length}. ${frases[bien]}`;
      marcador.classList.add('is-done');
    } else marcador.textContent = `Llevas ${hechas.length} de ${preguntas.length}…`;
  })));
})();
