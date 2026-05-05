import { useState } from 'react'
import { Eye, Check, Sparkles, HelpCircle, Edit } from 'lucide-react'

const INIT_SEGMENTS = [
  { id: 1, label: 'Café gratis', color: '#c8102e', odds: 18, entregados: 412 },
  { id: 2, label: '10% OFF', color: '#b8863a', odds: 16, entregados: 198 },
  { id: 3, label: '5% OFF', color: '#3b82f6', odds: 20, entregados: 156 },
  { id: 4, label: 'Sin premio', color: '#525252', odds: 14, entregados: 142 },
  { id: 5, label: '2x1 cine', color: '#10b981', odds: 8, entregados: 79 },
  { id: 6, label: 'Postre gratis', color: '#a855f7', odds: 10, entregados: 43 },
  { id: 7, label: 'Estacionam. 2h', color: '#f59e0b', odds: 10, entregados: 31 },
  { id: 8, label: '¡Premio mayor!', color: '#8e0a1f', odds: 4, entregados: 8 },
]

function WheelPreview({ segs }) {
  const W = 260
  const cx = W / 2
  const cy = W / 2
  const R = W / 2 - 8
  const segAngle = 360 / segs.length

  const polarToXY = (centerX, centerY, r, deg) => {
    const rad = ((deg - 90) * Math.PI) / 180
    return [centerX + r * Math.cos(rad), centerY + r * Math.sin(rad)]
  }

  return (
    <div style={{ position: 'relative', width: W, height: W }}>
      {/* Halo glow */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #b8863a, #c8102e, #b8863a, #c8102e, #b8863a)',
          filter: 'blur(2px)',
          opacity: 0.6,
        }}
      />
      <svg
        viewBox={`0 0 ${W} ${W}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
        }}
      >
        {segs.map((s, i) => {
          const start = i * segAngle
          const end = (i + 1) * segAngle
          const [x1, y1] = polarToXY(cx, cy, R, start)
          const [x2, y2] = polarToXY(cx, cy, R, end)
          const large = segAngle > 180 ? 1 : 0
          const path = `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} Z`
          const [tx, ty] = polarToXY(cx, cy, R * 0.62, start + segAngle / 2)
          const rotate = start + segAngle / 2

          return (
            <g key={s.id}>
              <path d={path} fill={s.color} stroke="#0a0a0a" strokeWidth="1.5" />
              <text
                x={tx}
                y={ty}
                fill="#fff"
                fontSize="9"
                fontWeight="700"
                fontFamily="Plus Jakarta Sans, system-ui"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${rotate}, ${tx}, ${ty})`}
              >
                {s.label.length > 14 ? s.label.slice(0, 12) + '…' : s.label}
              </text>
            </g>
          )
        })}
        {/* Hub */}
        <circle cx={cx} cy={cy} r={28} fill="#0f0f0f" stroke="#b8863a" strokeWidth="2" />
        <text
          x={cx}
          y={cy}
          fill="#b8863a"
          fontSize="9"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, system-ui"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="1"
        >
          GIRAR
        </text>
      </svg>
      {/* Pointer */}
      <div
        style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '18px solid var(--ad-gold)',
        }}
      />
    </div>
  )
}

export default function Ruleta() {
  const [segs, setSegs] = useState(INIT_SEGMENTS)
  const [editing, setEditing] = useState(null)
  const [draftLabel, setDraftLabel] = useState('')

  const startEdit = (id, label) => {
    setEditing(id)
    setDraftLabel(label)
  }

  const saveEdit = () => {
    setSegs(segs.map((s) => (s.id === editing ? { ...s, label: draftLabel || s.label } : s)))
    setEditing(null)
  }

  const totalOdds = segs.reduce((a, s) => a + s.odds, 0)
  const totalEnt = segs.reduce((a, s) => a + s.entregados, 0)
  const oddsOk = totalOdds === 100

  return (
    <div className="ad-content">
      {/* Page head */}
      <div className="ad-page-head">
        <div>
          <h1>Premios de Ruleta</h1>
          <p>Configurá los 8 segmentos de la ruleta semanal del club</p>
        </div>
        <div className="ad-page-actions">
          <button className="ad-btn ghost">
            <Eye size={14} />
            Vista previa
          </button>
          <button className="ad-btn primary">
            <Check size={14} />
            Guardar cambios
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 18 }}>
        {/* Left: wheel preview */}
        <div
          className="ad-card"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="ad-card-head"
            style={{ borderBottom: 0, padding: 0, width: '100%', marginBottom: 18 }}
          >
            <div>
              <h3>Vista previa</h3>
              <div className="sub">Como se ve en la app</div>
            </div>
            <span
              className="ad-badge gold plain"
              style={{ background: 'var(--ad-gold-soft)', color: 'var(--ad-gold)' }}
            >
              8 segmentos
            </span>
          </div>

          <WheelPreview segs={segs} />

          <div
            style={{
              marginTop: 20,
              width: '100%',
              padding: '12px 14px',
              background: 'var(--ad-surface-2)',
              borderRadius: 8,
              border: '1px solid var(--ad-line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Sparkles size={16} style={{ color: 'var(--ad-gold)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ad-ink)' }}>
                  Frecuencia de giro
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ad-muted)', marginTop: 2 }}>
                  Cada socio puede girar 1 vez por semana
                </div>
              </div>
              <button className="ad-btn subtle sm">Cambiar</button>
            </div>
          </div>
        </div>

        {/* Right: segments grid */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Segmentos</h3>
              <div className="sub">Tocá un segmento para editar el label</div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--ad-muted)' }}>987 giros este mes</span>
          </div>

          <div
            style={{
              padding: 18,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
            }}
          >
            {segs.map((s, i) => {
              const isEditing = editing === s.id
              const pct = ((s.entregados / totalEnt) * 100).toFixed(0)

              return (
                <div
                  key={s.id}
                  style={{
                    background: 'var(--ad-surface-2)',
                    border: `1px solid ${isEditing ? s.color : 'var(--ad-line)'}`,
                    borderRadius: 10,
                    padding: 14,
                    transition: 'border-color 0.12s',
                  }}
                >
                  {/* Segment header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: s.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                        boxShadow: `0 0 0 1px rgba(0,0,0,0.3) inset, 0 4px 12px ${s.color}55`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--ad-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                        }}
                      >
                        Segmento {i + 1}
                      </div>
                    </div>
                    <button
                      className="ad-icon-btn"
                      style={{ width: 26, height: 26, border: 0 }}
                      title="Cambiar color"
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 4,
                          background: s.color,
                          border: '1px solid rgba(255,255,255,0.2)',
                          display: 'block',
                        }}
                      />
                    </button>
                  </div>

                  {/* Label editable */}
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        className="ad-input"
                        autoFocus
                        value={draftLabel}
                        onChange={(e) => setDraftLabel(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') setEditing(null)
                        }}
                        style={{ padding: '6px 10px', fontSize: 13 }}
                      />
                      <button className="ad-btn primary sm" onClick={saveEdit}>
                        <Check size={12} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => startEdit(s.id, s.label)}
                      style={{
                        padding: '7px 10px',
                        background: 'var(--ad-surface)',
                        border: '1px solid var(--ad-line)',
                        borderRadius: 7,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        color: 'var(--ad-ink)',
                        transition: 'border-color 0.12s',
                      }}
                    >
                      <span>{s.label}</span>
                      <Edit size={12} style={{ color: 'var(--ad-muted)', flexShrink: 0 }} />
                    </div>
                  )}

                  {/* Stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 10,
                      marginTop: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--ad-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                        }}
                      >
                        Probabilidad
                      </div>
                      <div className="mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: 'var(--ad-ink)' }}>
                        {s.odds}%
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--ad-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                        }}
                      >
                        Entregados
                      </div>
                      <div className="mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: 'var(--ad-ink)' }}>
                        {s.entregados}{' '}
                        <span style={{ fontSize: 11, color: 'var(--ad-muted)', fontWeight: 500 }}>
                          · {pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer validation */}
          <div
            style={{
              padding: '12px 18px',
              borderTop: '1px solid var(--ad-line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--ad-surface-2)',
              borderRadius: '0 0 12px 12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: 'var(--ad-muted)',
              }}
            >
              <HelpCircle size={14} />
              <span>
                Las probabilidades deben sumar 100%. Total actual:{' '}
                <b style={{ color: oddsOk ? 'var(--ad-ok)' : 'var(--ad-danger)' }}>
                  {totalOdds}%
                </b>
              </span>
            </div>
            <button className="ad-btn ghost sm">Ajustar probabilidades</button>
          </div>
        </div>
      </div>
    </div>
  )
}
