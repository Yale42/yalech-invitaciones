// Graduación de Andrea Ruiz. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Graduación de Andrea Ruiz',
  firma: 'Andrea',
  saludo: 'Hola Andrea, te confirmo para tu graduación:',
  whatsapp: '520000000000',
  inicio: '2027-07-03T10:00:00-06:00',
  fin: '2027-07-04T02:00:00-06:00',
  lugar: 'Auditorio Principal, Universidad del Norte, Av. Constitución 1500, Centro, Monterrey',
  archivo: 'graduacion-andrea.ics',
  pasesPorDefecto: 2,
  maxPases: 6,
  introMs: 2000,
  comidaTxt: 'Voy a',
  efectos: {
    reveal: '.intro-text, .honor, .section .eyebrow, .section .h2, .section .lead, .dress, .rsvp, .footer-title',
    stagger: '.moments, .path',
  },
};
