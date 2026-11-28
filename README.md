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

## Al usar un ejemplo con un cliente real

1. Copia la carpeta del ejemplo a un repositorio nuevo, junto con lo que use de `assets/`.
2. Borra lo que solo sirve para mostrar el ejemplo (la barra y el script traen un comentario que lo indica):
   - el bloque `<div class="mu-barra">` del inicio del `<body>` (barra «Ejemplo ficticio · ← Más ejemplos · Quiero uno así»);
   - la línea `<script src="…/assets/muestra.js…">` y el `<link>` a `muestra.css` del `<head>`. Sin ellas, los botones de
     WhatsApp, llamar y correo vuelven a abrir de verdad.
3. Deja `assets/errores.js`: hace que los errores de los formularios se vean igual en todos lados (el campo se marca en
   rojo, el cursor salta a él, los lectores de pantalla anuncian el aviso y se quita en cuanto la persona lo corrige).
4. Cambia los datos del negocio: WhatsApp, teléfonos, correo, dirección y horario. Las etiquetas `og:` de la vista previa
   necesitan la dirección completa del sitio (`https://…/assets/og.jpg`).
5. Si agregas íconos o tipografías, corre los programas de `assets/iconos/` y `assets/fuentes/` (abajo).

## Archivos compartidos (iguales en los 7 repos)

- `assets/muestra.js` y `muestra.css` — modo muestra: en vez de abrir WhatsApp, llamar o mandar correo al número de prueba,
  enseña lo que pasaría de verdad y ofrece «Quiero uno así». También acomoda los encabezados fijos debajo de la barra de
  ejemplo. Se configura en la etiqueta `<script>` de cada ejemplo (`data-servicio`, `data-ejemplo`, `data-para`).
- `assets/errores.js` — mismo comportamiento de errores en todos los formularios (ver el paso 3).
- `assets/iconos/actualizar.py` — recorta Font Awesome a los íconos que usa este repo (de unos 400 KB a menos de 15 KB).
  Córrelo si agregas un ícono y sale un cuadrito vacío; las instrucciones están al inicio del archivo.
- `assets/fuentes/actualizar.py` — sirve las tipografías de Google desde este mismo sitio y precarga las del texto, para que
  la página no brinque al cambiar de letra. Córrelo si una página nueva trae un `<link>` a `fonts.googleapis.com`.

## Otros archivos

- `index.html` y `estilos.css` — portada con los ejemplos (mismo estilo que el catálogo principal).
- `assets/cotizar.js` / `cotizar.css` — cotizador en 1 minuto (tu número de WhatsApp está al inicio de `cotizar.js`).
- `assets/carrusel.js` / `carrusel.css` — flechas, puntitos y una «probadita» para que se note que los ejemplos se deslizan.
- `assets/plantillas/` — capturas que usa la portada (si cambias una invitación, vuelve a tomar la suya).
- `404.html` — página de error. `_headers` — encabezados de seguridad (Netlify o Cloudflare Pages).

El catálogo completo y el link en bio están en el repositorio `yalech-web-link-in-bio`. Los enlaces hacia allá son
relativos (`../yalech-web-link-in-bio/`): funcionan igual en tu compu y en GitHub Pages mientras todos los repos vivan bajo
la misma dirección. Solo `404.html` usa la dirección completa, porque se muestra desde cualquier ruta.

Hecho a mano: HTML, CSS y JavaScript, sin herramientas de compilación. Para verlo, sirve la carpeta con
`python3 -m http.server` y abre `http://localhost:8000`.
