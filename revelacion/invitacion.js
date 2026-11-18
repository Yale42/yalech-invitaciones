// Revelación de género de Mariana y Óscar. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Revelación de género: ¿niño o niña?',
  firma: 'Mariana y Óscar',
  whatsapp: '520000000000',
  inicio: '2027-01-23T14:00:00-06:00',
  fin: '2027-01-23T18:00:00-06:00',
  lugar: 'Terraza Los Arcos, Av. Zaragoza 210, Col. Centro, Querétaro',
  archivo: 'revelacion-mariana-y-oscar.ics',
  pasesPorDefecto: 2,
  maxPases: 8,
  introMs: 800,
  comidaTxt: 'Mi voto',
  efectos: {
    reveal: '.intro-text, .team, .section .eyebrow, .section .h2, .section .lead, .where, .dress, .rsvp, .footer-title',
    stagger: '.clues',
  },
};

// El voto: pinta el pase del color del equipo y lo marca en la confirmación
(() => {
  const radios = [...document.querySelectorAll('#rsvp-form [name="comida"]')];
  const texto = document.querySelector('[data-team-txt]');
  const votar = equipo => {
    if (equipo !== 'Niño' && equipo !== 'Niña') return;
    document.body.dataset.equipo = equipo === 'Niño' ? 'boy' : 'girl';
    texto.textContent = `Team ${equipo}`;
    radios.forEach(r => { r.checked = r.value === equipo; });
  };
  document.querySelectorAll('[data-equipo]').forEach(b => b.addEventListener('click', () => votar(b.dataset.equipo)));
  radios.forEach(r => r.addEventListener('change', () => votar(r.value)));
})();
