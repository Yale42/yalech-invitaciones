// Mariana & Diego · todo lo que cambia de una boda a otra está aquí arriba.
const BODA = {
  novios: 'Mariana & Diego',
  whatsapp: '520000000000', // a quién le llegan las confirmaciones
  inicio: '2027-04-17T17:00:00-06:00', // hora de la ceremonia (centro de México)
  fin: '2027-04-18T03:00:00-06:00',
  lugar: 'Parroquia de San Pedro Apóstol, Tlaquepaque, Jalisco',
  pasesPorDefecto: 2,
  maxPases: 10,
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Pase personal: ?n=Familia%20López&p=4 ----------
// El nombre solo se escribe como texto (nunca como HTML) y los lugares se limitan de 1 a 10.
const params = new URLSearchParams(location.search);
const invitado = (params.get('n') || '').trim().slice(0, 60);
const pedidos = parseInt(params.get('p'), 10);
const pases = pedidos >= 1 && pedidos <= BODA.maxPases ? pedidos : BODA.pasesPorDefecto;

if (invitado) $$('[data-invitado]').forEach(el => { el.textContent = invitado; });
$$('[data-pases]').forEach(el => { el.textContent = pases; });
$$('[data-pases-txt]').forEach(el => { el.textContent = pases === 1 ? 'lugar' : 'lugares'; });
if (invitado) document.title = `${invitado}: estás invitado · ${BODA.novios}`;

// ---------- Sobre ----------
const sobre = $('.sobre');
const abrir = () => {
  if (sobre.classList.contains('is-open')) return;
  sobre.classList.add('is-open');
  document.body.classList.remove('is-locked');
  document.body.classList.add('is-open-page');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => sobre.classList.add('is-gone'), calm ? 50 : 2500);
};
$('[data-abrir]').addEventListener('click', abrir);
$('.env').addEventListener('click', abrir);
// Si alguien entra directo a una sección (ej. #confirmar), no le mostramos el sobre
if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
  sobre.classList.add('is-open', 'is-gone');
  document.body.classList.remove('is-locked');
  document.body.classList.add('is-open-page');
}
else $('[data-abrir]').focus({ preventScroll: true });

// ---------- Cuenta regresiva ----------
const meta = new Date(BODA.inicio).getTime();
const pad = (n, l = 2) => String(n).padStart(l, '0');
const tick = () => {
  const ms = meta - Date.now();
  if (ms <= 0) {
    $('[data-clock]').hidden = true;
    $('.clock-done').hidden = false;
    if (Date.now() > new Date(BODA.fin).getTime()) $('.clock-done').textContent = '¡Gracias por acompañarnos!';
    $('.countdown .eyebrow').hidden = true;
    return false;
  }
  const s = Math.floor(ms / 1000);
  $('[data-u="d"]').textContent = Math.floor(s / 86400);
  $('[data-u="h"]').textContent = pad(Math.floor(s / 3600) % 24);
  $('[data-u="m"]').textContent = pad(Math.floor(s / 60) % 60);
  $('[data-u="s"]').textContent = pad(s % 60);
  return true;
};
if (tick()) setInterval(tick, 1000);

// ---------- Agregar al calendario ----------
const utc = iso => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
const titulo = `Boda de ${BODA.novios}`;
$('[data-gcal]').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  + `&text=${encodeURIComponent(titulo)}&dates=${utc(BODA.inicio)}/${utc(BODA.fin)}`
  + `&location=${encodeURIComponent(BODA.lugar)}&details=${encodeURIComponent(location.href.split('#')[0])}`;
$('[data-ics]').addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//yalech//invitacion//ES', 'BEGIN:VEVENT',
    `UID:${utc(BODA.inicio)}-boda@invitacion`, `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(BODA.inicio)}`, `DTEND:${utc(BODA.fin)}`,
    `SUMMARY:${titulo}`, `LOCATION:${BODA.lugar.replace(/,/g, '\\,')}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:Mañana es la boda de ${BODA.novios}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'boda-mariana-y-diego.ics';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
});

// ---------- Copiar número de mesa / CLABE ----------
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
const lugares = $('[name="lugares"]', form);
lugares.innerHTML = Array.from({ length: pases }, (_, i) => `<option value="${i + 1}">${i + 1} ${i ? 'personas' : 'persona'}</option>`).join('');
lugares.value = pases;
if (invitado) $('[name="nombre"]', form).value = invitado;

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
    $('[name="nombre"]', form).focus();
    return;
  }
  error.hidden = true;
  const viene = d.asiste === 'si';
  const lineas = [
    `Hola ${BODA.novios}, les confirmo:`,
    '',
    viene ? `✅ ¡Sí asistiré! Somos ${d.lugares} de ${pases} ${pases === 1 ? 'lugar' : 'lugares'}.` : '❌ Lamentablemente no podré asistir.',
    `Nombre: ${nombre}`,
  ];
  if (invitado && invitado !== nombre) lineas.push(`Pase: ${invitado}`);
  if (viene && d.comida.trim()) lineas.push(`Comida: ${d.comida.trim()}`);
  if (d.mensaje.trim()) lineas.push('', `💌 ${d.mensaje.trim()}`);
  window.open(`https://wa.me/${BODA.whatsapp}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
  $('.form-ok', form).hidden = false;
});

// ---------- Efectos al bajar ----------
motion.reveal('.section .eyebrow, .section .h2, .section .lead, .ticket, .story-text p, .place, .note, .gift, .rsvp, .hashtag');
motion.stagger('.story-photos, .timeline, .swatches, .gallery');
