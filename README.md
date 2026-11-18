# yalech · invitaciones digitales

Muestrario de invitaciones digitales de Yael González (@yalech). Cada ejemplo es un evento ficticio, vive en su
carpeta y se puede abrir en vivo. Para un cliente real, copia la carpeta de la invitación que eligió junto con
`comun.js` y `assets/motion.js`, y cambia sus datos en `invitacion.js`.

| Carpeta | Evento | Entrada | Lo especial |
| --- | --- | --- | --- |
| `boda/` | Boda | Sobre con sello | Generador de pases (`boda/pases.html`), mesa de regalos |
| `xv/` | XV años | Pase VIP que gira | Padres y padrinos, vals |
| `despedida/` | Despedida de soltera | Botella que se descorcha | Quiz «¿qué tanto conoces a la novia?», cooperación con CLABE, talla de playera |
| `aniversario/` | Bodas de oro | Disco que sale de su funda | Historia por años, piden canción al confirmar |
| `graduacion/` | Graduación | Diploma que se desenrolla | Ceremonia y fiesta, eligen a cuál van |
| `posada/` | Posada navideña | Piñata de 3 golpes | Eligen qué llevar, intercambio |
| `revelacion/` | Revelación de género | Votan «niño» o «niña» | El pase toma el color de su equipo; el voto llega en la confirmación |
| `baby-shower/` | Baby shower | Raspadita con el nombre | Talla de pañales por apellido, apuestas de fecha y peso |
| `bautizo/` | Bautizo | Telón con paloma | Padrinos, misa y comida |
| `comunion/` | Primera comunión | Vitral que se abre | Estampita como pase, misa y comida, alergias de los niños |
| `cumple/` | Cumpleaños infantil | Globo con confeti | Boleto de abordaje, ilustrada |

## Cómo funciona

- **Pase personal:** cada invitado recibe su propio enlace, por ejemplo `boda/?n=Familia%20López&p=4`. El nombre
  se escribe solo como texto y los lugares se limitan de 1 al máximo que pongas.
- **`comun.js`:** la lógica compartida (pase, entrada, cuenta regresiva, Google Calendar y archivo para
  iPhone/Outlook, botones de copiar y confirmación por WhatsApp). Cada invitación define antes su objeto
  `EVENTO` en `invitacion.js`; al inicio de `comun.js` está la lista de opciones.
- **WhatsApp:** las confirmaciones llegan al número de `EVENTO.whatsapp` (en los ejemplos es `520000000000`).

## Otros archivos

- `index.html` y `estilos.css` — portada con los ejemplos (mismo estilo que el catálogo principal).
- `assets/cotizar.js` / `cotizar.css` — cotizador en 1 minuto (tu número de WhatsApp está al inicio de `cotizar.js`).
- `assets/carrusel.js` / `carrusel.css` — flechas, puntitos y una «probadita» para que se note que los ejemplos se deslizan.
- `assets/plantillas/` — capturas que usa la portada (si cambias una invitación, vuelve a tomar la suya).
- `404.html` — página de error. `_headers` — encabezados de seguridad (Netlify o Cloudflare Pages).

El catálogo completo y el link en bio están en el repositorio `yalech-web-link-in-bio`. Los enlaces hacia allá usan
`https://yale42.github.io/yalech-web-link-in-bio/`: cámbialos por tu dominio cuando lo tengas.

Hecho a mano: HTML, CSS y JavaScript, sin herramientas de compilación. Para verlo, sirve la carpeta con
`python3 -m http.server` y abre `http://localhost:8000`.
