// Generador de pases: arma el enlace personal de cada invitado (index.html?n=Nombre&p=Lugares).
const MAX = 10;
const CLAVE = 'boda-pases';
const $ = (s, el = document) => el.querySelector(s);

const form = $('#pase-form');
const lista = $('[data-lista]');
form.lugares.innerHTML = Array.from({ length: MAX }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
form.lugares.value = 2;

// La lista vive solo en este navegador. Si viene alterada, se ignora lo que no tenga forma de pase.
let pases = [];
try { pases = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch {}
if (!Array.isArray(pases)) pases = [];
pases = pases.filter(p => p && typeof p.n === 'string' && p.n.trim() && Number.isInteger(p.p) && p.p >= 1 && p.p <= MAX)
  .map(p => ({ n: p.n.trim().slice(0, 60), p: p.p }));
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(pases)); } catch {} };

const enlace = p => {
  const url = new URL(location.protocol === 'file:' ? 'index.html' : './', location.href);
  url.search = new URLSearchParams({ n: p.n, p: p.p }).toString();
  return url.href;
};
const mensaje = p => `Hola ${p.n} 💛\n\nCon mucho cariño les compartimos nuestra invitación. Tienen ${p.p} ${p.p === 1 ? 'lugar reservado' : 'lugares reservados'}.\n\n${enlace(p)}\n\nMariana & Diego`;

// Se arma con nodos (no con HTML) porque el nombre lo escribe una persona
const pintar = () => {
  lista.replaceChildren(...pases.map((p, i) => {
    const li = document.createElement('li');
    li.className = 'pass';
    const info = document.createElement('div');
    const nombre = document.createElement('strong');
    nombre.textContent = p.n;
    const lugares = document.createElement('small');
    lugares.textContent = `${p.p} ${p.p === 1 ? 'lugar' : 'lugares'}`;
    info.append(nombre, lugares);

    const acciones = document.createElement('div');
    acciones.className = 'pass-actions';
    const wa = document.createElement('a');
    wa.className = 'copy';
    wa.href = `https://wa.me/?text=${encodeURIComponent(mensaje(p))}`;
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Enviar';
    const copiar = document.createElement('button');
    copiar.type = 'button';
    copiar.className = 'copy';
    copiar.innerHTML = '<i class="fa-regular fa-copy"></i> Enlace';
    copiar.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(enlace(p)); copiar.innerHTML = '<i class="fa-solid fa-check"></i> Copiado'; copiar.classList.add('is-done'); }
      catch { prompt('Copia el enlace:', enlace(p)); }
      setTimeout(() => { copiar.innerHTML = '<i class="fa-regular fa-copy"></i> Enlace'; copiar.classList.remove('is-done'); }, 2000);
    });
    const ver = document.createElement('a');
    ver.className = 'copy';
    ver.href = enlace(p);
    ver.target = '_blank';
    ver.rel = 'noopener';
    ver.setAttribute('aria-label', `Ver el pase de ${p.n}`);
    ver.innerHTML = '<i class="fa-regular fa-eye"></i>';
    const borrar = document.createElement('button');
    borrar.type = 'button';
    borrar.className = 'copy copy--x';
    borrar.setAttribute('aria-label', `Borrar el pase de ${p.n}`);
    borrar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    borrar.addEventListener('click', () => { pases.splice(i, 1); guardar(); pintar(); });
    acciones.append(wa, copiar, ver, borrar);

    li.append(info, acciones);
    return li;
  }));
  const total = pases.reduce((s, p) => s + p.p, 0);
  $('.passes-head').hidden = !pases.length;
  $('[data-total]').textContent = `${pases.length} ${pases.length === 1 ? 'pase' : 'pases'} · ${total} ${total === 1 ? 'lugar' : 'lugares'}`;
};

form.addEventListener('submit', ev => {
  ev.preventDefault();
  const n = form.nombre.value.trim().slice(0, 60);
  const p = parseInt(form.lugares.value, 10);
  const error = $('.form-error', form);
  if (!n) { error.textContent = 'Escribe el nombre del invitado.'; error.hidden = false; form.nombre.focus(); return; }
  error.hidden = true;
  pases.unshift({ n, p });
  guardar();
  pintar();
  form.nombre.value = '';
  form.nombre.focus();
});

pintar();
