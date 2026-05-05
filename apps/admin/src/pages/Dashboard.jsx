import { Users, Tag, CircleDot, Receipt, TrendingUp, TrendingDown, Download, RefreshCw, Award } from 'lucide-react'
import Sparkline from '../components/Sparkline'
import Avatar from '../components/Avatar'

const STATS = [
  {
    lbl: 'Usuarios activos',
    val: '2.847',
    delta: '+12.4%',
    dir: 'up',
    hint: 'vs. mes anterior',
    icon: Users,
    spark: [12, 14, 11, 16, 18, 17, 21, 22, 20, 24, 26, 28],
    color: 'var(--ad-primary)',
  },
  {
    lbl: 'Canjes del mes',
    val: '1.412',
    delta: '+8.1%',
    dir: 'up',
    hint: '47 hoy',
    icon: Receipt,
    spark: [40, 38, 42, 45, 48, 46, 52, 55, 53, 58, 60, 62],
    color: 'var(--ad-gold)',
  },
  {
    lbl: 'Giros de ruleta',
    val: '987',
    delta: '−2.3%',
    dir: 'down',
    hint: '34 hoy',
    icon: CircleDot,
    spark: [55, 52, 58, 54, 50, 52, 48, 50, 46, 48, 44, 42],
    color: 'var(--ad-info)',
  },
  {
    lbl: 'Beneficios activos',
    val: '24',
    delta: '+3',
    dir: 'up',
    hint: 'de 31 totales',
    icon: Tag,
    spark: [18, 18, 19, 19, 20, 21, 21, 22, 22, 23, 23, 24],
    color: 'var(--ad-ok)',
  },
]

const CANJES_DAILY = [22, 28, 31, 26, 34, 42, 38, 29, 33, 37, 41, 45, 39, 48, 52, 44, 38, 42, 49, 55, 47, 51, 58, 53, 46, 50, 57, 62, 58, 64]

const TOP_BENEFITS = [
  { rank: 1, t: '30% OFF en cafetería', local: 'Café Martínez · L12', cat: 'Gastro', n: 312, pct: 100 },
  { rank: 2, t: '2x1 en combos', local: 'Mostaza · L203', cat: 'Gastro', n: 248, pct: 79 },
  { rank: 3, t: 'Hasta 40% OFF', local: 'Grimoldi · L08', cat: 'Moda', n: 187, pct: 60 },
  { rank: 4, t: 'Entrada + combo', local: 'Showcase · 3er piso', cat: 'Cine', n: 142, pct: 45 },
  { rank: 5, t: '15% OFF productos', local: 'Farmacity · PB', cat: 'Salud', n: 98, pct: 31 },
]

const RECENT = [
  { user: 'María Fernández', cred: 'PR-2024-00142', ben: '30% OFF en cafetería', ago: 'hace 4 min' },
  { user: 'Diego Sosa', cred: 'PR-2024-01893', ben: '2x1 en combos', ago: 'hace 12 min' },
  { user: 'Laura Mendoza', cred: 'PR-2024-00471', ben: 'Hasta 40% OFF', ago: 'hace 28 min' },
  { user: 'Federico Paz', cred: 'PR-2024-02104', ben: 'Entrada + combo', ago: 'hace 41 min' },
  { user: 'Camila Ríos', cred: 'PR-2024-00908', ben: '15% OFF productos', ago: 'hace 1 h' },
]

const WHEEL_DIST = [
  { l: 'Café gratis', n: 412, c: '#c8102e' },
  { l: '10% OFF', n: 198, c: '#b8863a' },
  { l: '5% OFF', n: 156, c: '#3b82f6' },
  { l: 'Sin premio', n: 142, c: '#525252' },
  { l: '2x1 cine', n: 79, c: '#10b981' },
]

const maxCanjes = Math.max(...CANJES_DAILY)

export default function Dashboard() {
  return (
    <div className="ad-content">
      {/* Page head */}
      <div className="ad-page-head">
        <div>
          <h1>Inicio</h1>
          <p>Hola Marina · Resumen de actividad del club</p>
        </div>
        <div className="ad-page-actions">
          <div className="ad-seg">
            <button>7 días</button>
            <button className="on">30 días</button>
            <button>90 días</button>
          </div>
          <button className="ad-btn ghost">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      {/* Stat cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {STATS.map((s, i) => {
          const IconComp = s.icon
          return (
            <div key={i} className="ad-stat">
              <div className="lbl">
                <span className="lbl-ico" style={{ color: s.color }}>
                  <IconComp size={14} />
                </span>
                {s.lbl}
              </div>
              <div className="val">{s.val}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <span className={`delta ${s.dir}`}>
                  {s.dir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {s.delta}
                </span>
                <span style={{ fontSize: 12, color: 'var(--ad-muted)' }}>{s.hint}</span>
              </div>
              <div style={{ marginTop: 14, marginLeft: -2, marginRight: -2 }}>
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 18 }}>
        {/* Bar chart */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Canjes diarios</h3>
              <div className="sub">Últimos 30 días · 1.412 canjes totales</div>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ad-muted)' }}>
                <span className="ad-dot" style={{ background: 'var(--ad-primary)' }} />
                Canjes
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ad-muted)' }}>
                <span className="ad-dot" style={{ background: 'var(--ad-gold)' }} />
                Hoy
              </span>
            </div>
          </div>
          <div style={{ padding: '22px 18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 200, position: 'relative' }}>
              {/* Grid lines */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ height: 1, background: 'var(--ad-line)', opacity: i === 3 ? 0 : 0.5 }} />
                ))}
              </div>
              {CANJES_DAILY.map((v, i) => {
                const h = (v / maxCanjes) * 100
                const isToday = i === CANJES_DAILY.length - 1
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', position: 'relative' }}
                  >
                    <div
                      style={{
                        height: `${h}%`,
                        background: isToday
                          ? 'linear-gradient(to top, var(--ad-gold), rgba(184,134,58,0.6))'
                          : 'linear-gradient(to top, var(--ad-primary), rgba(200,16,46,0.5))',
                        borderRadius: '3px 3px 0 0',
                        minHeight: 4,
                      }}
                    />
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ad-muted)', marginTop: 10, fontVariantNumeric: 'tabular-nums' }}>
              <span>1 abr</span>
              <span>8 abr</span>
              <span>15 abr</span>
              <span>22 abr</span>
              <span>30 abr</span>
            </div>
          </div>
        </div>

        {/* Top benefits */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Top beneficios</h3>
              <div className="sub">Por canjes este mes</div>
            </div>
            <button className="ad-btn subtle sm">Ver todos →</button>
          </div>
          <div style={{ padding: '10px 6px' }}>
            {TOP_BENEFITS.map((b) => (
              <div key={b.rank} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: b.rank === 1 ? 'var(--ad-gold-soft)' : 'var(--ad-surface-3)',
                    color: b.rank === 1 ? 'var(--ad-gold)' : 'var(--ad-muted)',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {b.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--ad-ink)' }}>
                    {b.t}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ad-muted)', marginTop: 2 }}>{b.local}</div>
                  <div className="ad-progress" style={{ marginTop: 6 }}>
                    <div style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ad-ink)' }}>
                    {b.n}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ad-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    canjes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        {/* Recent activity */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Actividad reciente</h3>
              <div className="sub">Últimos canjes en tiempo real</div>
            </div>
            <button className="ad-btn subtle sm">
              <RefreshCw size={12} />
              Actualizar
            </button>
          </div>
          <table className="ad-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Beneficio</th>
                <th>Credencial</th>
                <th style={{ textAlign: 'right' }}>Cuándo</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.user} />
                      <span className="cell-strong">{r.user}</span>
                    </div>
                  </td>
                  <td>{r.ben}</td>
                  <td>
                    <span className="mono cell-muted" style={{ fontSize: 12 }}>
                      {r.cred}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }} className="cell-muted">
                    {r.ago}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wheel summary */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Ruleta del mes</h3>
              <div className="sub">987 giros · premio más entregado</div>
            </div>
          </div>
          <div style={{ padding: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 14px',
                background: 'var(--ad-surface-2)',
                borderRadius: 10,
                border: '1px solid var(--ad-line)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, var(--ad-gold), var(--ad-primary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <Award size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ad-ink)' }}>Café gratis</div>
                <div style={{ fontSize: 11.5, color: 'var(--ad-muted)', marginTop: 2 }}>
                  Entregado 412 veces · 41.7%
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--ad-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 10,
                }}
              >
                Distribución
              </div>
              {WHEEL_DIST.map((s, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}
                >
                  <span className="ad-dot" style={{ background: s.c }} />
                  <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ad-ink-2)' }}>{s.l}</span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--ad-muted)' }}>
                    {s.n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
