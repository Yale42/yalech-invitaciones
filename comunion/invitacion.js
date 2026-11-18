// Primera Comunión de Santiago. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Primera Comunión de Santiago',
  firma: 'familia de Santiago',
  saludo: 'Hola, les confirmo para la Primera Comunión de Santiago:',
  whatsapp: '520000000000',
  inicio: '2027-05-15T11:00:00-06:00',
  fin: '2027-05-15T18:00:00-06:00',
  lugar: 'Parroquia de San Miguel Arcángel, Jardín Principal, Centro, San Miguel de Allende',
  archivo: 'primera-comunion-santiago.ics',
  pasesPorDefecto: 2,
  maxPases: 8,
  introMs: 1700,
  comidaTxt: 'Alergias',
  efectos: {
    reveal: '.intro-text, .card, .section .eyebrow, .section .h2, .section .lead, .people, .rsvp, .footer-title',
    stagger: '.stops',
  },
};
