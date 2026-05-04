import { useState } from 'react'
import { ChevronLeft, Heart, Share2, Clock, SlidersHorizontal, Search } from 'lucide-react'

const CAT_GRADIENT = {
  gastro:    'linear-gradient(135deg, #c8102e 0%, #8e0a1f 100%)',
  moda:      'linear-gradient(135deg, #1a1423 0%, #3d3449 100%)',
  cine:      'linear-gradient(135deg, #0f4c81 0%, #1a6cb3 100%)',
  salud:     'linear-gradient(135deg, #1f7a4a 0%, #2ea868 100%)',
  hogar:     'linear-gradient(135deg, #b8863a 0%, #d4a855 100%)',
  servicios: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
}

const BENEFITS = [
  {
    id: 1, cat: 'gastro', catLabel: 'GASTRONOMÍA', badge: '-30%',
    title: '30% OFF en cafetería', store: 'Café Martínez', location: 'Local 12',
    expires: '30 abr', usage: '1×día', validDays: 'Lun-Vie',
    description: 'Descuento en cafetería, pastelería y tostados. Válido de lunes a viernes hasta las 18hs. No acumulable con otras promociones.',
    terms: ['Exclusivo para socios del Club con credencial vigente.', 'No acumulable con otras promociones.', 'Presentar QR o credencial en caja antes de pagar.', 'Beneficio sujeto a disponibilidad del local.'],
  },
  {
    id: 2, cat: 'cine', catLabel: 'ENTRETENIMIENTO', badge: '2x1',
    title: '2x1 entradas de cine', store: 'Showcase', location: '3er piso',
    expires: '28 abr', usage: '1×sem', validDays: 'Mié',
    description: 'Comprá una entrada y llevate la segunda gratis. Válido para todas las salas excepto 3D premium.',
    terms: ['Válido solo los días miércoles.', 'No aplica a estrenos en salas premium.', 'Canjeable una vez por semana por usuario.', 'Sujeto a disponibilidad de funciones.'],
  },
  {
    id: 3, cat: 'moda', catLabel: 'MODA', badge: '-20%',
    title: '20% OFF en zapatillas', store: 'Grimoldi', location: 'Local 08',
    expires: '15 may', usage: '1 vez', validDays: 'Todos',
    description: 'Descuento en toda la línea de zapatillas y calzado deportivo de la nueva temporada.',
    terms: ['Válido en calzado de la nueva colección.', 'No aplica sobre precios de liquidación.', 'Un solo uso por usuario.', 'Sujeto a stock disponible.'],
  },
  {
    id: 4, cat: 'servicios', catLabel: 'SERVICIOS', badge: '2 HS',
    title: 'Estacionamiento 2hs gratis', store: 'Playa Ribera', location: 'PB',
    expires: 'hoy', usage: '1×día', validDays: 'Todos',
    description: 'Obtené 2 horas de estacionamiento gratuito presentando tu credencial en la cabina de acceso.',
    terms: ['Válido presentando credencial digital o física.', 'Máximo 2 horas por día por vehículo.', 'No acumulable con otros descuentos.', 'Sujeto a disponibilidad de espacios.'],
  },
  {
    id: 5, cat: 'salud', catLabel: 'SALUD', badge: '-15%',
    title: '15% OFF productos', store: 'Farmacity', location: 'Local 22',
    expires: '05 may', usage: '1×día', validDays: 'Todos',
    description: 'Descuento del 15% en medicamentos de venta libre, cosmética y cuidado personal.',
    terms: ['No aplica sobre medicamentos bajo receta.', 'Acumulable con descuentos bancarios.', 'Válido en todos los productos excepto exclusiones.', 'Límite de compra $50.000.'],
  },
]

const CHIPS = ['Todos', 'Gastro', 'Moda', 'Entretenim.', 'Salud', 'Hogar', 'Servicios']

function QRGrid() {
  const grid = Array.from({ length: 25 }).map((_, y) =>
    Array.from({ length: 25 }).map((_, x) => {
      const corner = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17)
      if (corner) {
        const inCorner = (a, b) => x < a + 7 && x >= a && y < b + 7 && y >= b
        const ul = inCorner(0, 0), ur = inCorner(18, 0), dl = inCorner(0, 18)
        if (ul || ur || dl) {
          const lx = ul ? x : ur ? x - 18 : x
          const ly = ul ? y : ur ? y : y - 18
          if (lx === 0 || lx === 6 || ly === 0 || ly === 6) return 1
          if (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4) return 1
          return 0
        }
      }
      return ((x * 7 + y * 13 + x * y) % 5) < 2 ? 1 : 0
    })
  )
  return (
    <svg width="220" height="220" viewBox="0 0 25 25" shapeRendering="crispEdges">
      {grid.flatMap((row, y) =>
        row.map((v, x) => v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1a1423" /> : null)
      )}
    </svg>
  )
}

// ── LISTA ──
function BenList({ onSelect }) {
  const [activeChip, setActiveChip] = useState('Todos')

  return (
    <div>
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Club de Beneficios
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1, marginTop: 2 }}>
              Beneficios
            </div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
            <SlidersHorizontal size={18} color="var(--ink)" strokeWidth={2} />
          </div>
        </div>

        <div style={{ marginTop: 12, background: '#fff', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow)' }}>
          <Search size={18} color="var(--muted)" strokeWidth={2} />
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>Buscar beneficio, local…</span>
        </div>
      </div>

      <div className="scrollbar-hide" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 12px' }}>
        {CHIPS.map((chip) => (
          <span
            key={chip}
            onClick={() => setActiveChip(chip)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              background: activeChip === chip ? 'var(--primary)' : '#fff',
              color:      activeChip === chip ? '#fff' : 'var(--muted)',
              border:     activeChip === chip ? 'none' : '1px solid var(--line)',
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BENEFITS.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelect(b)}
            style={{ background: '#fff', borderRadius: 18, padding: 10, display: 'flex', gap: 12, alignItems: 'center', boxShadow: 'var(--shadow)', cursor: 'pointer' }}
          >
            <div style={{
              width: 76, height: 76, borderRadius: 12, flexShrink: 0,
              background: CAT_GRADIENT[b.cat],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 15,
            }}>
              {b.badge}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.08em' }}>{b.catLabel}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, lineHeight: 1.2, color: 'var(--ink)' }}>{b.title}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{b.store} · {b.location}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <Clock size={10} strokeWidth={2.5} /> vence {b.expires}
                </span>
                <button style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Canjear
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── DETALLE ──
function BenDetail({ benefit, onBack, onRedeem }) {
  return (
    <div>
      <div style={{ height: 220, position: 'relative', background: CAT_GRADIENT[benefit.cat] }}>
        <div style={{ position: 'absolute', top: 10, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 1 }}>
          <div onClick={onBack} style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.9)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={18} color="var(--ink)" strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[Heart, Share2].map((Icon, i) => (
              <div key={i} style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.9)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon size={18} color="var(--ink)" strokeWidth={2} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 20, color: '#fff', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.95)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 13 }}>
            {benefit.store.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{benefit.store}</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>{benefit.location} · Planta baja</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 14px' }}>
        <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}>{benefit.catLabel}</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1, marginTop: 6 }}>{benefit.title}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5 }}>{benefit.description}</div>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[{ val: benefit.expires, lbl: 'Vence' }, { val: benefit.usage, lbl: 'Uso' }, { val: benefit.validDays, lbl: 'Válido' }].map((s) => (
          <div key={s.lbl} style={{ background: '#fff', borderRadius: 14, padding: '10px 8px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{s.val}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px', marginBottom: 100 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          Términos y condiciones
        </div>
        <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.6 }}>
          {benefit.terms.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>

      {/* CTA sticky */}
      <div style={{ position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '0 20px', zIndex: 40 }}>
        <button
          onClick={onRedeem}
          style={{ width: '100%', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 16, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(200,16,46,0.35)' }}
        >
          Canjear beneficio
        </button>
      </div>
    </div>
  )
}

// ── QR CANJE ──
function BenRedeem({ benefit, onBack }) {
  return (
    <div>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div onClick={onBack} style={{ width: 36, height: 36, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)', cursor: 'pointer' }}>
          <ChevronLeft size={16} color="var(--ink)" strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Canjeando</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {benefit.store} · {benefit.badge}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 20px', gap: 14 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, textAlign: 'center' }}>
          Mostrá este código
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: -8, textAlign: 'center' }}>
          El local lo escanea para validar
        </div>

        <div style={{ background: '#fff', padding: 16, borderRadius: 20, boxShadow: 'var(--shadow-lg)' }}>
          <QRGrid />
        </div>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink-2)', letterSpacing: 2, fontWeight: 500 }}>
          RB · 0421 · 8F2K
        </div>

        <div style={{ background: 'var(--gold-soft)', border: '1px solid rgba(184,134,58,0.4)', borderRadius: 14, padding: '10px 14px', width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock size={18} color="var(--gold)" strokeWidth={2.5} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7a5f1e' }}>Válido por 9:42 min</div>
            <div style={{ height: 3, background: 'rgba(184,134,58,0.25)', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '72%', background: 'var(--gold)', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          style={{ width: '100%', background: 'transparent', color: 'var(--primary)', border: '1.5px solid var(--primary)', borderRadius: 16, padding: 13, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Cancelar canje
        </button>
      </div>
    </div>
  )
}

// ── MAIN ──
export default function Beneficios() {
  const [view, setView] = useState('list')
  const [selected, setSelected] = useState(null)

  if (view === 'detail' && selected) {
    return <BenDetail benefit={selected} onBack={() => setView('list')} onRedeem={() => setView('redeem')} />
  }
  if (view === 'redeem' && selected) {
    return <BenRedeem benefit={selected} onBack={() => setView('detail')} />
  }
  return <BenList onSelect={(b) => { setSelected(b); setView('detail') }} />
}
