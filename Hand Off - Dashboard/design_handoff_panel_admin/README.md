# Handoff: Panel de Administración · Club de Beneficios

## Overview
Panel web de administración para un SaaS multi-tenant de clubes de beneficios de shoppings. Cada shopping gestiona su club desde este panel: beneficios visibles en la app, premios de la ruleta semanal, usuarios registrados, historial de canjes y métricas.

**Cliente piloto:** Shopping Paseo de la Ribera (rojo `#c8102e`, dorado `#b8863a`).
**Usuario:** administrador del shopping desde computadora de escritorio.
**Stack objetivo:** React + Vite + TailwindCSS.

## About the Design Files
Los archivos en este bundle son **referencias de diseño creadas en HTML** — prototipos que muestran el look-and-feel y comportamiento deseado, **no código de producción para copiar tal cual**. La tarea es **recrear estos diseños en el codebase target** (React + Vite + Tailwind) usando los patrones y librerías ya establecidos del proyecto. La grilla, los componentes y la composición de páginas son la fuente de verdad; la implementación interna (CSS-in-JS, clases inline, etc.) puede adaptarse al stack.

## Fidelity
**High-fidelity (hifi).** Mocks pixel-perfect con colores finales, tipografía, spacing e interacciones definidas. El developer debe replicar el UI fielmente usando Tailwind + componentes del codebase. Los íconos son recreaciones estilo Lucide — usar `lucide-react` directamente en la implementación.

## Screens / Views

Las 6 pantallas viven dentro del shell común (sidebar 244px + main con topbar 60px). Layout base: grid `244px 1fr`, alto mínimo 100vh, sidebar sticky.

### 1. Dashboard
**Purpose:** vista de inicio con métricas clave del club.
**Layout:**
- Page head con título "Dashboard", subtítulo "Hola Marina · Resumen…", segmented control (7d / 30d / 90d) y botón "Exportar"
- **Row 1** — 4 stat cards en grid de 4 columnas (gap 14px):
  - Usuarios activos: `2.847` · `+12.4%` (up) · "vs. mes anterior" · sparkline rojo
  - Canjes del mes: `1.412` · `+8.1%` (up) · "47 hoy" · sparkline dorado
  - Giros de ruleta: `987` · `−2.3%` (down) · "34 hoy" · sparkline azul
  - Beneficios activos: `24` · `+3` (up) · "de 31 totales" · sparkline verde
- **Row 2** — grid `1.6fr 1fr`:
  - Card "Canjes diarios" — bar chart de 30 barras, última en dorado, líneas guía horizontales, eje X con fechas
  - Card "Top beneficios" — lista rankeada con barra de progreso por beneficio
- **Row 3** — grid `1.6fr 1fr`:
  - Card "Actividad reciente" — tabla últimos 5 canjes (usuario+avatar, beneficio, credencial mono, "hace X min")
  - Card "Ruleta del mes" — premio top destacado + lista distribución con dots de color por segmento

### 2. Beneficios
**Purpose:** CRUD de beneficios visibles en la app.
**Layout:**
- Page head: "Beneficios" + sub "Gestioná los beneficios visibles en la app del club" + botones "Exportar" y **"Nuevo beneficio"** (primario, abre modal)
- Tabs: Todos · Activos · Pausados · Por vencer (con counts)
- Filter bar: chips de Categoría / Local / Vencimiento + counter a la derecha
- Tabla con columnas:
  - Checkbox de selección
  - Beneficio (badge de descuento `-30%` en rojo soft + título)
  - Local (nombre + nº local en muted)
  - Categoría (pill)
  - Vencimiento (fecha + ícono calendar + días disponibles abajo en muted)
  - Canjes (numérico mono, alineado derecha)
  - Estado (toggle activo/pausado con label)
  - Acciones (íconos editar / más)
- Footer: paginación

### 3. Nuevo beneficio (modal)
**Purpose:** crear/editar un beneficio.
**Layout:** modal centrado, max-width 560px, fondo backdrop blur.
- Head: "Nuevo beneficio" + sub + close
- Body:
  - Grid 2 col: Título (flex) | Badge (140px)
  - Grid 2 col: Local (select) | Categoría (select)
  - Descripción (textarea)
  - Grid 2 col: Fecha de vencimiento (con ícono calendar) | Cupo total (number)
  - Días disponibles: 7 botones segmented (Lun…Dom) con estado activo en rojo soft
  - Bloque "Publicar como activo" con toggle
- Foot: Cancelar · Guardar como borrador · **Crear beneficio** (primario)

### 4. Premios de Ruleta
**Purpose:** configurar los 8 segmentos de la ruleta semanal.
**Layout:** grid `380px 1fr`.
- **Card izquierda — Vista previa:** ruleta SVG renderizada (260×260) con los 8 segmentos coloreados, hub central dorado con texto "GIRAR", flecha indicadora arriba, halo blur conic-gradient. Abajo: bloque "Frecuencia de giro · 1 vez por semana" con botón "Cambiar".
- **Card derecha — Segmentos:** grid 2 col de 8 tiles editables. Cada tile:
  - Header: chip numerado (1-8) con color del segmento + label "Segmento N" + swatch para cambiar color
  - Label editable (click → input + save con Enter)
  - Footer 2 col: Probabilidad `%` + Entregados (count + porcentaje)
  - Footer del card: validación de probabilidades suma 100%

**Datos por segmento:** id, label, color (hex), odds (%), entregados (int).

### 5. Usuarios
**Purpose:** lista de socios registrados.
**Layout:**
- Page head: "Usuarios" + sub "2.847 socios registrados · 312 nuevos este mes" + "Enviar campaña" + "Exportar"
- 4 mini stat cards: Total / Activos / Nivel Oro / Nuevos (30d)
- Search bar + filtros (Estado, Nivel) + counter
- Tabla:
  - Usuario (avatar gradient + nombre)
  - DNI (mono)
  - Credencial (mono, formato `SL-2024-00142`)
  - Registrado (fecha)
  - Nivel (badge: Oro dorado / Plata gris / Bronce dorado-soft)
  - Canjes (numérico)
  - Estado (badge: Activo verde / Pendiente warn / Inactivo gris)
  - Acciones
- Paginación con "Página X de N"

### 6. Canjes
**Purpose:** historial completo de canjes.
**Layout:**
- Page head: "Canjes" + segmented (Hoy / Semana / Mes / Personalizado) + "Exportar CSV"
- 4 mini stats: Hoy / Esta semana / Este mes / Tasa de cancelación
- Search + filtros (Beneficio, Local, Categoría)
- Tabla: Usuario · Credencial · Beneficio · Local · Categoría · Fecha y hora · Estado (Completado / Cancelado)

## Interactions & Behavior

- **Sidebar nav** — click cambia ruta; el item activo tiene una barra vertical roja de 2px a la izquierda, fondo `surface-2`, ícono e indicador en rojo
- **Toggles** — fondo `surface-3` cuando off, verde `--ad-ok` cuando on, transición 150ms del knob
- **Modal beneficio** — abre con backdrop blur 4px; click fuera o close button cierra; Esc cierra
- **Edición inline ruleta** — click en label entra en modo edit con input autoFocus; Enter guarda, Esc cancela
- **Tabs Beneficios** — filtran la tabla en cliente
- **Hover de filas** — fondo `surface-2`, transición 80ms
- **Botón primario** — hover sube luminosidad a `#d61a39`, conserva glow rojo
- **Sparklines** — area con gradiente vertical (color a transparente) + stroke top
- **Búsqueda** — atajo `⌘K` (mostrar visualmente el kbd hint)
- **Tablas** — paginación cliente o servidor según endpoint

## State Management
- **Beneficios:** lista de items + filtro activo (todos/activos/pausados/venciendo) + modal abierto/cerrado + toggles activo por id
- **Ruleta:** segments[] (8 fijos) + segmento en edición + draft del label
- **Form modal:** título, badge, local, categoría, descripción, fecha vencimiento, cupo, días {L,M,X,J,V,S,D}, activo
- **Sidebar:** active route (derived de router)

## Design Tokens

### Colors
| Token | Valor | Uso |
|---|---|---|
| `--ad-bg` | `#0a0a0a` | fondo app |
| `--ad-surface` | `#131313` | cards, sidebar |
| `--ad-surface-2` | `#1a1a1a` | hover de filas, headers de tabla, inputs |
| `--ad-surface-3` | `#222222` | chips, badge off, segment knob |
| `--ad-line` | `#262626` | bordes de cards y separadores |
| `--ad-line-2` | `#2e2e2e` | bordes secundarios |
| `--ad-ink` | `#f5f5f5` | texto principal |
| `--ad-ink-2` | `#d4d4d4` | texto secundario |
| `--ad-muted` | `#737373` | labels, placeholders |
| `--ad-muted-2` | `#525252` | kbd hints, texto deshabilitado |
| `--ad-primary` | `#c8102e` | rojo Ribera (botones, indicador activo, badges) |
| `--ad-primary-soft` | `rgba(200, 16, 46, 0.12)` | fondos soft, badges |
| `--ad-primary-glow` | `rgba(200, 16, 46, 0.35)` | glow del botón primario |
| `--ad-gold` | `#b8863a` | dorado Ribera (badge Oro, ruleta, hoy en chart) |
| `--ad-gold-soft` | `rgba(184, 134, 58, 0.14)` | badge Oro fondo |
| `--ad-ok` | `#10b981` | success / Activo |
| `--ad-warn` | `#f59e0b` | Pendiente |
| `--ad-danger` | `#ef4444` | Cancelado, errores |
| `--ad-info` | `#3b82f6` | indicadores info |

### Typography
- **Familia primaria:** `Plus Jakarta Sans` (400, 500, 600, 700, 800)
- **Mono:** `JetBrains Mono` (400, 500) — credenciales, DNI, números de tabla, kbd
- **Letter spacing global:** `-0.005em`
- **Font feature settings:** `'cv11', 'ss01'`

| Uso | Tamaño | Peso | Letter-spacing |
|---|---|---|---|
| Page title (h1) | 24px | 700 | -0.02em |
| Card title (h3) | 14px | 600 | — |
| Stat value | 28px | 700 | -0.025em |
| Body | 13.5px | 400-500 | — |
| Small / muted | 12px | 500 | — |
| Tiny / labels | 11px | 600 | 0.06em uppercase |
| Mono tabular | 13px | 500 | tabular-nums |

### Spacing
- Page padding: `28px`
- Card padding: `14px 18px` (head) · `18px` (body)
- Stat card padding: `18px`
- Modal padding: `18-22px`
- Grid gap entre cards: `14px` (stats), `18px` (rows)
- Sidebar padding: `18px 14px`
- Topbar height: `60px`
- Sidebar width: `244px`

### Border radius
- Cards: `12px`
- Modal: `14px`
- Stat tiles: `12px`
- Buttons: `8px`
- Inputs: `8px`
- Chips/badges: `5-7px`
- Avatar / round dots: `50%`

### Shadows / glows
- Botón primario: `0 1px 0 rgba(255,255,255,0.1) inset, 0 0 0 1px rgba(255,255,255,0.04) inset, 0 6px 16px var(--ad-primary-glow)`
- Modal: `0 30px 80px rgba(0,0,0,0.5)`
- Logo mark sidebar: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 4px 14px var(--ad-primary-glow)`

## Assets
- **Logo Paseo de la Ribera:** monograma "Pr" en cuadrado redondeado rojo (32×32, radius 9px, peso 700, tamaño 13px, letter-spacing -0.02em). Coherente con el lado consumer.
- **Íconos:** estilo Lucide. Reemplazar por `lucide-react` en implementación. Mapping:
  - Home → `Home`
  - Tag → `Tag`
  - Wheel → `CircleDot` o `PieChart`
  - Users → `Users`
  - Receipt → `Receipt`
  - Settings → `Settings`
  - Bell, Search, Plus, Filter, Download, MoreHorizontal, Edit, Trash2, Eye, X, Calendar, TrendingUp, TrendingDown, ChevronDown, ChevronRight, Check, Sparkles, Award, CreditCard, Gift, LogOut, Mail, Building2, HelpCircle, RefreshCw

- **Avatares de usuario:** generados con gradient determinístico por hash del nombre. Paleta de pares (a, b) en `Avatar` component (admin-shared.jsx).

## Files

Archivos de diseño incluidos en este bundle:
- `Panel Admin - Hi-Fi.html` — entrada principal, monta el design canvas con los 6 artboards
- `admin-styles.css` — todos los design tokens y clases base (`.ad-*`)
- `admin-shared.jsx` — Sidebar, Topbar, PageHead, Avatar, Sparkline, set de íconos
- `admin-dashboard.jsx` — pantalla 1
- `admin-beneficios.jsx` — pantalla 2 + modal (pantalla 3)
- `admin-pages.jsx` — pantallas 4 (Ruleta), 5 (Usuarios), 6 (Canjes)
- `design-canvas.jsx` — host del canvas (no se implementa en producción, solo presentación)

Para correr el mock: abrir `Panel Admin - Hi-Fi.html` en un navegador moderno. No requiere build.

## Notas para el implementador
- Todos los datos en los archivos son **mock**. Reemplazar por queries reales (REST/GraphQL/Supabase/etc.).
- Las tablas son client-side; en producción usar paginación + filtros server-side.
- El gráfico de barras del dashboard es DOM puro; en producción usar `recharts` o `visx` para responsive + tooltips.
- La ruleta SVG sí puede reusarse — está parametrizada por el array de segments.
- Validar que las probabilidades de la ruleta sumen 100% antes de guardar.
- El brand del shopping (rojo + dorado + nombre + logo) debe ser configurable por tenant (multi-tenant).
