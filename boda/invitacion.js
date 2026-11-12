// Mariana & Diego · todo lo que cambia de una boda a otra está aquí.
// La lógica (pase, sobre, cuenta regresiva, calendario, confirmación) está en ../comun.js.
window.EVENTO = {
  titulo: 'Boda de Mariana & Diego',
  firma: 'Mariana & Diego',
  whatsapp: '520000000000', // a quién le llegan las confirmaciones
  inicio: '2027-04-17T17:00:00-06:00', // hora de la ceremonia (centro de México)
  fin: '2027-04-18T03:00:00-06:00',
  lugar: 'Parroquia de San Pedro Apóstol, Tlaquepaque, Jalisco',
  archivo: 'boda-mariana-y-diego.ics',
  pasesPorDefecto: 2,
  maxPases: 10,
  introMs: 2500,
  efectos: {
    reveal: '.section .eyebrow, .section .h2, .section .lead, .ticket, .story-text p, .place, .note, .gift, .rsvp, .hashtag',
    stagger: '.story-photos, .timeline, .swatches, .gallery',
  },
};
