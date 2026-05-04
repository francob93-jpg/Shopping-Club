# Handoff: Club de Beneficios — Paseo de la Ribera

## Overview
Mobile app de loyalty/benefits para los empleados y/o socios del shopping **Paseo de la Ribera** (Río Cuarto, Córdoba, Argentina). La app permite al usuario: ver su credencial digital, explorar y canjear beneficios de los locales del shopping, girar una ruleta diaria para ganar premios, leer novedades del shopping y gestionar su perfil.

Contiene 5 secciones principales conectadas por un bottom navigation:
1. **Inicio** — home con credencial, beneficio destacado y accesos rápidos
2. **Beneficios** — listado + detalle + flujo de canje por QR
3. **Ruleta diaria** — 1 giro por día, con estados girando / ganaste / ya usada
4. **Novedades** — feed social de posts del shopping
5. **Perfil / Credencial** — credencial digital estilo Wallet + datos + historial

## About the Design Files
Los archivos HTML incluidos en este bundle son **referencias de diseño creadas en HTML** — prototipos que muestran la apariencia y comportamiento deseados, **no son código de producción para copiar y pegar directamente**.

La tarea es **recrear estos diseños HTML en el entorno existente del codebase destino** (React + TailwindCSS según lo acordado) usando los patrones, componentes y librerías ya establecidas del proyecto. Si el proyecto todavía no tiene un sistema de componentes armado, usar el stack React + TailwindCSS + un set de íconos consistente (recomendado: `lucide-react` por su trazo coherente con el que se usó en el prototipo).

## Fidelity
**High-fidelity (hifi).** Los mockups finales tienen colores definitivos, tipografía final, espaciados y estados de interacción. El dev debe recrear la UI lo más fielmente posible, respetando colores exactos, escalas tipográficas y radios de esquina listados en "Design Tokens".

Hay también un set de wireframes low-fi previo (`Club de Beneficios - Wireframes.html`) que muestra las variantes que se exploraron — sirve como referencia del espacio de diseño explorado, pero no es la entrega final.

## Screens / Views

### 1. Home (Inicio) — `hifi-home.jsx` · componente `HFHome`
**Propósito:** entrada principal de la app. El usuario ve su credencial, lo más destacado de hoy y accede rápidamente a beneficios, ruleta y novedades.

**Layout:**
- Hero superior con fondo degradado rojo (`linear-gradient(160deg, #c8102e 0%, #8e0a1f 60%, #4c0513 100%)`), esquinas inferiores redondeadas 32px, padding 14px 20px 40px.
- Dentro del hero: logo + ícono de notificación, saludo "Hola, María Fernández", y tarjeta de credencial glass (fondo `rgba(255,255,255,0.08)`, border `rgba(255,255,255,0.15)`, radius 18px).
- Cuerpo scrolleable que arranca con margen negativo `-20px` para solapar el hero.
- Card de beneficio destacado (imagen 140px con gradiente categoría + caption sobre la imagen).
- Grid 3 columnas de accesos rápidos (Beneficios, Ruleta, Novedades).
- Sección "Para vos hoy" con chips de filtro horizontal y lista vertical de cards de beneficios (thumbnail 60x60 + título + subtítulo + fecha de vencimiento + chevron).
- Bottom navigation sticky.

**Componentes:**
- Bottom nav: 5 tabs (Inicio, Beneficios, Ruleta, Novedades, Perfil). Active state color `#c8102e`. Inactivos `#8a8194`.
- Credencial mini: número en monospace "SL-2024-00142", badge "Nivel Oro" en dorado.
- Cards de beneficios: radius 18px, shadow suave `0 4px 12px rgba(26, 20, 35, 0.08)`.

### 2. Beneficios — Lista · `hifi-benefits.jsx` · `HFBenList`
**Propósito:** buscar y filtrar beneficios de locales.

**Layout:**
- Header con título "Beneficios" (Fraunces 28px) + botón filtros.
- Searchbar en card blanca con ícono de lupa y placeholder "Buscar beneficio, local…".
- Chips de categorías (Todos, Gastro, Moda, Entretenim., Salud, Hogar, Servicios) en scroll horizontal.
- Lista vertical de cards: thumbnail cuadrado 76x76 con % o "2x1" centrado en Fraunces, categoría en rojo 9px, título, local, fecha de vencimiento con ícono de reloj, y botón "Canjear" (primary rojo).
- Bottom nav.

### 3. Beneficios — Detalle · `HFBenDetail`
**Propósito:** ver info completa y canjear.

**Layout:**
- Hero superior con imagen del local 220px de alto, botón back + iconos favorito/compartir flotantes, y chip con logo+nombre del local en la esquina inferior.
- Padding 20px: label categoría, título Fraunces 28px (ej "30% OFF en toda la carta de cafetería"), descripción.
- Grid 3 columnas de stats (Vence, Uso, Válido) en cards blancas.
- Bloque "Términos y condiciones" con `<ul>` de bullets.
- CTA sticky abajo `hf-btn primary full` con shadow rojo `0 8px 20px rgba(200, 16, 46, 0.35)`.

### 4. Beneficios — Canje QR · `HFBenRedeem`
**Propósito:** mostrar QR al vendedor en el local.

**Layout:**
- Header con botón back + título del beneficio.
- Centrado vertical: título "Mostrá este código", subtítulo, QR blanco 220x220 con shadow, código alfanumérico en monospace (`RB · 0421 · 8F2K`).
- Card dorada con timer visual (barra de progreso 72%, "Válido por 9:42 min").
- Botón ghost "Cancelar canje".
- **Implementación real:** usar una librería de QR (ej `qrcode.react`) con el código del beneficio como payload.

### 5. Ruleta — Estado "girar" · `hifi-wheel.jsx` · `HFWheelA`
**Layout:**
- Header con título "Ruleta diaria".
- Chip "1 GIRO DISPONIBLE HOY" (rojo claro sobre rojo oscuro).
- Ruleta SVG circular 290px con 8 sectores alternando colores rojo/dorado/crema, aro dorado externo y centro con monograma "Pr". Flecha dorada triangular arriba.
- Botón "GIRAR RULETA" primary full-width con shadow roja grande.
- Chips "premios posibles" abajo.

**Animación:** al tocar "GIRAR", rotar el SVG a un ángulo final `810 + (offset del sector ganador)` con transición `transform 3.5s cubic-bezier(0.17, 0.67, 0.3, 0.99)`. Al terminar, mostrar modal de "Ganaste".

### 6. Ruleta — Estado "ganaste" · `HFWheelB`
**Layout:**
- Ruleta de fondo blureada y opacity 0.4.
- Modal centrado (card blanca, padding 24px, radius 24px) con:
  - Confetti SVG arriba (círculos de colores).
  - Kicker "¡FELICITACIONES!" en rojo con letter-spacing 0.14em.
  - Título Fraunces "Ganaste" 40px + premio "20% OFF" 48px en rojo.
  - "en tu próxima compra en Grimoldi · Local 08".
  - Código dorado con border dashed y botón de copiar.
  - Dos botones: "Después" (ghost) y "Ver en beneficios" (primary).

### 7. Ruleta — Estado "ya usada" · `HFWheelC`
**Layout:**
- Ruleta desaturada y semitransparente.
- Card con countdown a las 00:00 del día siguiente, 3 cajas rojas con hs/min/seg en monospace.
- Card del último premio ganado (thumbnail + título + fecha).
- Grid 3 stats: giros mes, premios ganados, ahorrado.

### 8. Novedades · `hifi-other.jsx` · `HFNews`
**Propósito:** feed tipo Instagram/Facebook con posts del shopping.

**Layout:**
- Header "Novedades" + ícono de calendario.
- Feed de cards con:
  - Avatar del shopping (monograma "Pr") + nombre + checkmark rojo + timestamp + tag (NUEVO LOCAL / EVENTO / HORARIO).
  - Imagen 180px (cuando el post la tiene).
  - Título Fraunces 18px + body.
  - Íconos de like / comentario / compartir con contadores.

### 9. Credencial / Perfil · `HFProfile`
**Propósito:** credencial digital protagonista + datos + historial.

**Layout:**
- Header "Credencial" + ícono settings.
- Credencial Wallet: card 18px padding con gradient `linear-gradient(135deg, #4c0513 0%, #8e0a1f 45%, #c8102e 100%)`, radius 22px, shadow grande. Contiene: logo + nombre shopping + badge "NIVEL ORO" dorado, nombre titular en Fraunces 24px, número de credencial en monospace, QR cuadrado 52x52 en la esquina.
- Nota "Mostrá tu credencial en el ingreso y locales".
- Grid 3 stats (Canjes, Ahorrado, Giros).
- Lista "Datos personales": DNI, Email, Teléfono — cada fila con ícono contenedor rojo claro, label gris, valor negro y chevron.
- Lista "Historial de canjes": thumbnail + título + fecha + monto ahorrado en verde.
- Botón ghost "Cerrar sesión".

## Interactions & Behavior

### Navegación
- Bottom nav: tocar un tab → navega. Active state con color primary.
- Home → tocar card destacada → Beneficios detalle.
- Home → tocar acceso rápido → sección correspondiente.
- Beneficios lista → tocar card → Beneficios detalle → tocar "Canjear beneficio" → Canje QR.
- Ruleta → tocar "GIRAR" → animación 3.5s → modal "Ganaste" → botón "Ver en beneficios" navega a Beneficios con el nuevo beneficio al inicio.

### Ruleta — lógica
- 1 giro por día por usuario (resetea a las 00:00 local AR). Persistir `lastSpin` y `wonPrize` en backend.
- Los premios tienen probabilidades configurables desde el admin.
- Premios ganados se agregan al listado de beneficios del usuario con un código generado.

### Canje
- Al tocar "Canjear" → genera código único de 1 uso con expiración 10min → backend marca el beneficio como "en canje".
- Timer visual decrece en tiempo real. Si expira sin ser validado, vuelve al estado "disponible".
- El local escanea el QR con su propia app/panel → valida → beneficio pasa a "usado" y aparece en el historial.

### Estados de carga / error (a definir con el equipo)
- Loading: skeleton cards del mismo tamaño que las finales, animación de shimmer.
- Error de red: banner rojo con botón "Reintentar".
- Estado vacío de beneficios: ilustración + "No hay beneficios disponibles por ahora".

## State Management
Para React, se recomienda:
- **Auth / usuario:** contexto global (`AuthContext`) con datos de usuario, credencial, token.
- **Beneficios:** fetch desde endpoint, cachear con React Query / SWR. Invalidar cache tras canje.
- **Ruleta:** endpoint `/api/wheel/spin` POST (devuelve premio), endpoint GET que indica si tiene giro disponible y countdown.
- **Novedades:** paginar o infinite scroll desde `/api/news`.
- **Canje:** modal / pantalla controlada por estado local. El código se genera al abrir el canje.

## Design Tokens

### Colores
```css
--hf-bg: #f7f4ef;            /* fondo crema principal */
--hf-surface: #ffffff;        /* superficies (cards) */
--hf-ink: #1a1423;            /* texto principal */
--hf-ink-2: #3d3449;          /* texto secundario */
--hf-muted: #8a8194;          /* texto tenue */
--hf-line: #e9e3dc;           /* separadores */
--hf-primary: #c8102e;        /* rojo Paseo de la Ribera */
--hf-primary-2: #8e0a1f;      /* rojo oscuro */
--hf-primary-soft: #fbe6ea;   /* rojo muy claro (backgrounds de chips/icon containers) */
--hf-gold: #b8863a;           /* dorado acento */
--hf-gold-soft: #f3e6cc;      /* dorado claro */
--hf-danger: #c2410c;
--hf-ok: #1f7a4a;             /* verde (ahorros en historial) */
```

### Gradientes
- Hero home: `linear-gradient(160deg, #c8102e 0%, #8e0a1f 60%, #4c0513 100%)`
- Credencial Wallet: `linear-gradient(135deg, #4c0513 0%, #8e0a1f 45%, #c8102e 100%)`
- Imágenes por categoría: ver `hifi-styles.css` clases `.hf-img.gastro`, `.moda`, `.cine`, `.salud`, `.hogar`, `.servicios`.

### Tipografía
- **Títulos / hero / números grandes:** `Fraunces` (Google Fonts) weight 400/500/600/700, letter-spacing -0.01em.
- **UI / body / labels:** `Plus Jakarta Sans` weight 400/500/600/700/800.
- **Códigos / números técnicos (credencial, QR code, contador):** `JetBrains Mono` weight 400/500.

Escala de tamaños:
- Título hero / pantalla: 28px (Fraunces 600)
- Card title: 18px (Fraunces 600)
- Body grande: 14px
- Body: 13px
- Label / caption: 11-12px
- Micro (tags, uppercase): 9-10px con letter-spacing 0.06-0.14em.

### Spacing
- Padding pantalla: 20px horizontal.
- Gap entre cards: 10-14px.
- Padding interno card: 10-16px.

### Radios
- Cards: 14-22px (la credencial Wallet es 22px, cards de lista 18px, chips 999px).
- Inputs / botones: 12-16px.
- Thumbnails: 10-12px.

### Sombras
```css
--hf-shadow:    0 4px 12px  rgba(26, 20, 35, 0.08);
--hf-shadow-lg: 0 10px 30px rgba(26, 20, 35, 0.12);
```
Botón primary: `0 10px 25px rgba(200, 16, 46, 0.35)`.
Credencial Wallet: `0 20px 40px rgba(76, 5, 19, 0.4)`.

## Assets

### Logo
El prototipo usa un **logo recreado** — monograma "Pr" en un círculo rojo con el wordmark "Paseo de la Ribera · Club de Beneficios" al lado. **No es el logo oficial del shopping**; reemplazar con el PNG/SVG oficial cuando esté disponible (ver `https://www.paseodelaribera.com.ar/img/logo.png` y `logo-dark.png`).

### Fotos de beneficios / locales
Todas las imágenes de beneficios son **gradientes por categoría** a modo de placeholder. Reemplazar con fotos reales de cada local / beneficio. Categorías usadas: gastro, moda, cine, salud, hogar, servicios.

### Íconos
En el prototipo los íconos están dibujados inline como SVGs de trazo 2px. En la implementación real, usar `lucide-react` (son visualmente compatibles) — íconos usados: `Home, Ticket, Circle/Gauge, Newspaper, User, Search, SlidersHorizontal, Bell, Clock, ChevronRight, ChevronLeft, Heart, Share2, Copy, MapPin, Mail, Phone, Calendar, Settings, LogOut`.

## Files
Archivos HTML/JSX/CSS de referencia incluidos en este handoff:

- `Club de Beneficios - Hi-Fi.html` — canvas con las 7 pantallas hi-fi ensambladas (abre esto para ver el diseño final)
- `Club de Beneficios - Wireframes.html` — wireframes low-fi con todas las variantes exploradas
- `hifi-styles.css` — tokens, utilidades y estilos de componentes hi-fi
- `hifi-shared.jsx` — `HFPhone`, `HFStatusBar`, `HFNav`, `HFLogo`, `HFLogoMark`
- `hifi-home.jsx` — `HFHome`
- `hifi-benefits.jsx` — `HFBenList`, `HFBenDetail`, `HFBenRedeem`
- `hifi-wheel.jsx` — `HFWheelA` (girar), `HFWheelB` (ganaste), `HFWheelC` (ya usada), `HFWheelSVG`
- `hifi-other.jsx` — `HFNews`, `HFProfile`
- `design-canvas.jsx` — contenedor para presentar los artboards (no se porta al código productivo)

## Copy / textos (en español rioplatense)
Textos literales a usar (el cliente pidió explícitamente **nunca decir "cupones", siempre "beneficios"**):
- Título app: "Club de Beneficios"
- CTA canje: "Canjear beneficio"
- Ruleta estados: "1 GIRO DISPONIBLE HOY" / "Ya giraste hoy 🎉" / "Próximo giro en"
- Modal ganaste: "¡FELICITACIONES!" / "Ganaste" / "en tu próxima compra en"
- Profile: "Mostrá tu credencial en el ingreso y locales" / "Cerrar sesión"
- Nivel de socio: "NIVEL ORO" (implica sistema de niveles a definir)
