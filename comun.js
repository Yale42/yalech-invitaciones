// Funciones que comparten todas las invitaciones. Cada invitación define antes un objeto EVENTO
// (en su propio invitacion.js) con sus datos; aquí no hay nada que cambiar de un evento a otro.
//
// EVENTO = {
//   titulo: 'Boda de Mariana & Diego',      // para el calendario
//   firma: 'Mariana & Diego',               // a quién se dirige la confirmación
//   saludo: 'Hola Valentina, te confirmo:', // opcional; por defecto «Hola {firma}, les confirmo:»
//   whatsapp: '520000000000',               // a quién le llegan las confirmaciones
//   inicio: '2027-04-17T17:00:00-06:00', fin: '…',
//   lugar: 'Dirección para el calendario',
//   archivo: 'boda-mariana-y-diego.ics',
//   pasesPorDefecto: 2, maxPases: 10,
//   introMs: 2500,                          // cuánto dura la animación de entrada
//   comidaTxt: 'Llevo',                     // opcional; cómo se llama el campo «comida» en el mensaje
//   efectos: { reveal: '.selector', stagger: '.selector' },
// }
//
// La página puede tener (todo es opcional):
//   [data-intro]  pantalla de entrada · [data-abrir] botón que la abre
//   [data-invitado] [data-pases] [data-pases-txt]  datos del pase (?n=Nombre&p=4)
//   [data-clock] con [data-u="d|h|m|s"], .clock-done  cuenta regresiva
//   [data-gcal] [data-ics]  agregar al calendario · [data-copy="texto"]  botón de copiar
//   #rsvp-form (nombre, asiste, lugares, comida, mensaje)  confirmación por WhatsApp
(() => {
  const E = window.EVENTO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Pase personal: ?n=Familia%20López&p=4 ----------
  // El nombre solo se escribe como texto (nunca como HTML) y los lugares se limitan de 1 a maxPases.
  const params = new URLSearchParams(location.search);
  const invitado = (params.get('n') || '').trim().slice(0, 60);
  const pedidos = parseInt(params.get('p'), 10);
  const pases = pedidos >= 1 && pedidos <= E.maxPases ? pedidos : E.pasesPorDefecto;
  const plural = n => (n === 1 ? 'lugar' : 'lugares');

  if (invitado) {
    $$('[data-invitado]').forEach(el => { el.textContent = invitado; });
    document.title = `${invitado}: estás invitado · ${E.firma}`;
  }
  $$('[data-pases]').forEach(el => { el.textContent = pases; });
  $$('[data-pases-txt]').forEach(el => { el.textContent = plural(pases); });

  // ---------- Pantalla de entrada ----------
  const intro = $('[data-intro]');
  const liberar = () => {
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-open-page');
  };
  if (intro) {
    const abrir = () => {
      if (intro.classList.contains('is-open')) return;
      intro.classList.add('is-open');
      liberar();
      setTimeout(() => intro.classList.add('is-gone'), calm ? 50 : E.introMs || 2500);
    };
    $$('[data-abrir]').forEach(el => el.addEventListener('click', abrir));
    // Si alguien entra directo a una sección (ej. #confirmar), no le mostramos la entrada
    if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
      intro.classList.add('is-open', 'is-gone');
      liberar();
    } else $('button[data-abrir]')?.focus({ preventScroll: true, focusVisible: false });
  } else liberar();

  // ---------- Cuenta regresiva ----------
  const reloj = $('[data-clock]');
  if (reloj) {
    const meta = new Date(E.inicio).getTime();
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      const ms = meta - Date.now();
      if (ms <= 0) {
        reloj.hidden = true;
        const fin = $('.clock-done');
        if (fin) {
          fin.hidden = false;
          if (Date.now() > new Date(E.fin).getTime()) fin.textContent = '¡Gracias por acompañarnos!';
        }
        $$('[data-clock-label]').forEach(el => { el.hidden = true; });
        return false;
      }
      const s = Math.floor(ms / 1000);
      $('[data-u="d"]', reloj).textContent = Math.floor(s / 86400);
      $('[data-u="h"]', reloj).textContent = pad(Math.floor(s / 3600) % 24);
      $('[data-u="m"]', reloj).textContent = pad(Math.floor(s / 60) % 60);
      $('[data-u="s"]', reloj).textContent = pad(s % 60);
      return true;
    };
    if (tick()) setInterval(tick, 1000);
  }

  // ---------- Agregar al calendario ----------
  const utc = iso => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  $$('[data-gcal]').forEach(a => {
    a.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + `&text=${encodeURIComponent(E.titulo)}&dates=${utc(E.inicio)}/${utc(E.fin)}`
      + `&location=${encodeURIComponent(E.lugar)}&details=${encodeURIComponent(location.href.split('#')[0])}`;
  });
  $$('[data-ics]').forEach(btn => btn.addEventListener('click', () => {
    const esc = t => t.replace(/[,;]/g, m => '\\' + m);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//yalech//invitacion//ES', 'BEGIN:VEVENT',
      `UID:${utc(E.inicio)}-${E.archivo}@invitacion`, `DTSTAMP:${utc(new Date().toISOString())}`,
      `DTSTART:${utc(E.inicio)}`, `DTEND:${utc(E.fin)}`,
      `SUMMARY:${esc(E.titulo)}`, `LOCATION:${esc(E.lugar)}`,
      'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:Mañana: ${esc(E.titulo)}`, 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = E.archivo;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }));

  // ---------- Botones de copiar (mesa de regalos, CLABE…) ----------
  const copiar = async texto => {
    try { await navigator.clipboard.writeText(texto); return true; } catch {}
    // Respaldo para navegadores sin permiso de portapapeles
    const t = Object.assign(document.createElement('textarea'), { value: texto });
    t.setAttribute('readonly', '');
    t.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(t);
    t.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch {}
    t.remove();
    return ok;
  };
  $$('[data-copy]').forEach(btn => {
    const original = btn.innerHTML;
    btn.addEventListener('click', async () => {
      const ok = await copiar(btn.dataset.copy);
      btn.classList.toggle('is-done', ok);
      btn.innerHTML = ok ? '<i class="fa-solid fa-check"></i> Copiado' : 'Mantén presionado para copiar';
      setTimeout(() => { btn.innerHTML = original; btn.classList.remove('is-done'); }, 2200);
    });
  });

  // ---------- Confirmación por WhatsApp ----------
  const form = $('#rsvp-form');
  if (form) {
    const lugares = form.elements.lugares;
    if (lugares) {
      lugares.innerHTML = Array.from({ length: pases }, (_, i) => `<option value="${i + 1}">${i + 1} ${i ? 'personas' : 'persona'}</option>`).join('');
      lugares.value = pases;
    }
    if (invitado) form.elements.nombre.value = invitado;

    const soloSi = () => {
      const si = $('[name="asiste"]:checked', form).value === 'si';
      $$('[data-solo-si]', form).forEach(el => { el.hidden = !si; });
    };
    form.addEventListener('change', soloSi);
    soloSi();

    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const error = $('.form-error', form);
      const nombre = (d.nombre || '').trim();
      if (!nombre) {
        error.textContent = 'Escribe tu nombre, por favor.';
        error.hidden = false;
        form.elements.nombre.focus();
        return;
      }
      error.hidden = true;
      const viene = d.asiste === 'si';
      const lineas = [
        E.saludo || `Hola ${E.firma}, les confirmo:`,
        '',
        viene ? `✅ ¡Sí asistiré! Somos ${d.lugares || 1} de ${pases} ${plural(pases)}.` : '❌ Lamentablemente no podré asistir.',
        `Nombre: ${nombre}`,
      ];
      if (invitado && invitado !== nombre) lineas.push(`Pase: ${invitado}`);
      if (viene && d.comida?.trim()) lineas.push(`${E.comidaTxt || 'Comida'}: ${d.comida.trim()}`);
      if (d.mensaje?.trim()) lineas.push('', `💌 ${d.mensaje.trim()}`);
      window.open(`https://wa.me/${E.whatsapp}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
      $('.form-ok', form).hidden = false;
    });
  }

  // ---------- Efectos al bajar ----------
  if (window.motion && E.efectos) {
    if (E.efectos.reveal) motion.reveal(E.efectos.reveal);
    if (E.efectos.stagger) motion.stagger(E.efectos.stagger);
  }
})();
