// Mateo · bautizo. Todo lo que cambia de un evento a otro está aquí.
// La lógica (pase, entrada, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Bautizo de Mateo',
  firma: 'Daniela y Andrés',
  whatsapp: '520000000000',
  inicio: '2027-03-13T12:00:00-06:00', // ceremonia (centro de México)
  fin: '2027-03-13T19:00:00-06:00',
  lugar: 'Templo de San Francisco, Av. Madero 2, Centro, Querétaro',
  archivo: 'bautizo-mateo.ics',
  pasesPorDefecto: 2,
  maxPases: 10,
  introMs: 1400,
  efectos: {
    reveal: '.verse, .verse-ref, .pass, .section .eyebrow, .section .h2, .section .lead, .family-card, .family-img, .place, .rsvp, .footer-name',
    stagger: '.details',
  },
};
