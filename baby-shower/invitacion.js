// Baby shower de Ana y Luis (Emilia). Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Baby shower de Emilia',
  firma: 'Ana y Luis',
  whatsapp: '520000000000',
  inicio: '2027-03-13T12:00:00-06:00',
  fin: '2027-03-13T16:00:00-06:00',
  lugar: 'Jardín Las Palmas, Calle 60 #312, Col. Alcalá Martín, Mérida',
  archivo: 'baby-shower-emilia.ics',
  pasesPorDefecto: 2,
  maxPases: 8,
  introMs: 700,
  comidaTxt: 'Mi apuesta',
  efectos: {
    reveal: '.intro-text, .band, .section .eyebrow, .section .h2, .section .lead, .talla, .tallas, .gift, .where, .rsvp, .footer-title',
    stagger: '.ficha',
  },
};

(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);

  // ---------- Raspadita ----------
  const canvas = $('[data-raspa]');
  const ctx = canvas.getContext('2d');
  const boton = $('.scratch-go');
  const hint = $('[data-raspa-hint]');
  let listo = false;

  const pintar = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#d9c6a5'); g.addColorStop(0.5, '#efe3cc'); g.addColorStop(1, '#cbb48d');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = 'rgba(120, 96, 60, 0.35)';
    ctx.font = '600 15px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    for (let y = 22; y < r.height; y += 30) {
      for (let x = (y / 30) % 2 ? 40 : 90; x < r.width; x += 110) ctx.fillText('raspa ♥', x, y);
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 38;
  };

  const corazones = () => {
    if (calm) return;
    const caja = $('.hearts');
    const colores = ['#f4a7a0', '#8fae9a', '#e8c37a', '#f7d3cd'];
    for (let i = 0; i < 40; i++) {
      const h = document.createElement('i');
      h.textContent = '♥';
      const ang = Math.random() * Math.PI * 2;
      const d = 100 + Math.random() * 220;
      h.style.cssText = `--x:${Math.cos(ang) * d}px;--y:${Math.sin(ang) * d - 80}px;color:${colores[i % 4]};font-size:${14 + Math.random() * 18}px;animation-delay:${Math.random() * 0.15}s`;
      caja.appendChild(h);
    }
    setTimeout(() => caja.replaceChildren(), 2200);
  };

  const revelar = () => {
    if (listo) return;
    listo = true;
    canvas.classList.add('is-clear');
    hint.textContent = '¡Es Emilia! 💕';
    $('[data-revelar]').hidden = true;
    boton.hidden = false;
    boton.focus({ preventScroll: true });
    corazones();
  };

  // Cuánto se ha raspado (se mide en una cuadrícula para que sea rápido)
  const raspado = () => {
    const { width: w, height: h } = canvas;
    const datos = ctx.getImageData(0, 0, w, h).data;
    let vacio = 0, total = 0;
    for (let y = 0; y < h; y += 8) for (let x = 0; x < w; x += 8) { total++; if (datos[(y * w + x) * 4 + 3] < 40) vacio++; }
    return vacio / total;
  };

  let antes = null, trazos = 0;
  const punto = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  canvas.addEventListener('pointerdown', e => { antes = punto(e); try { canvas.setPointerCapture(e.pointerId); } catch {} });
  canvas.addEventListener('pointermove', e => {
    if (!antes || listo) return;
    const p = punto(e);
    ctx.beginPath(); ctx.moveTo(...antes); ctx.lineTo(...p); ctx.stroke();
    antes = p;
    if (++trazos % 12 === 0 && raspado() > 0.5) revelar();
  });
  const soltar = () => { antes = null; if (!listo && trazos && raspado() > 0.5) revelar(); };
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);
  $('[data-revelar]').addEventListener('click', revelar);

  document.fonts.ready.then(pintar);
  pintar();
  setTimeout(() => $('[data-revelar]').focus({ preventScroll: true, focusVisible: false })); // después de comun.js

  // ---------- ¿Qué talla llevo? ----------
  const tallaDe = apellido => {
    const l = apellido.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().charAt(0).toUpperCase();
    if (!/[A-ZÑ]/.test(l)) return null;
    if (l <= 'F') return 'Etapa 1';
    if (l <= 'M') return 'Etapa 2';
    if (l <= 'S' || l === 'Ñ') return 'Etapa 3';
    return 'Etapa 4';
  };
  const salida = $('[data-talla]');
  $('[data-apellido]').addEventListener('input', e => {
    const t = tallaDe(e.target.value);
    salida.textContent = t ? `Te toca: pañales ${t} 🍼` : 'Escríbelo y te digo 👶';
    salida.classList.toggle('is-on', !!t);
  });

  // ---------- Apuesta: se junta en un solo campo para el mensaje ----------
  const form = $('#rsvp-form');
  const dia = $('[data-apuesta-dia]');
  const peso = $('[data-apuesta-peso]');
  const juntar = () => {
    const partes = [];
    if (dia.value) {
      const [y, m, d] = dia.value.split('-').map(Number);
      partes.push(new Date(y, m - 1, d).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' }));
    }
    if (peso.value) partes.push(peso.value);
    form.elements.comida.value = partes.join(', ');
  };
  dia.addEventListener('change', juntar);
  peso.addEventListener('change', juntar);
})();
