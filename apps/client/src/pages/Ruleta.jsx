import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const SEGMENT_STYLES = [
  { color: '#c8102e', textDark: false, isReal: true  },
  { color: '#b8863a', textDark: false, isReal: true  },
  { color: '#8e0a1f', textDark: false, isReal: true  },
  { color: '#fbe6ea', textDark: true,  isReal: true  },
  { color: '#4c0513', textDark: false, isReal: true  },
  { color: '#f3e6cc', textDark: true,  isReal: false },
  { color: '#e15566', textDark: false, isReal: true  },
  { color: '#b8863a', textDark: false, isReal: true  },
]

// DEBE coincidir exactamente con Totem.jsx para que el label matching funcione
const DEMO_PRIZES = [
  { id: 0, label: '20% OFF',          color: '#c8102e', textDark: false, prob: 15, isReal: true  },
  { id: 1, label: 'Café gratis',      color: '#b8863a', textDark: false, prob: 8,  isReal: true  },
  { id: 2, label: '10% OFF',          color: '#8e0a1f', textDark: false, prob: 10, isReal: true  },
  { id: 3, label: '2x1',              color: '#fbe6ea', textDark: true,  prob: 7,  isReal: true  },
  { id: 4, label: 'Premio especial',  color: '#4c0513', textDark: false, prob: 5,  isReal: true  },
  { id: 5, label: 'Seguí intentando', color: '#f3e6cc', textDark: true,  prob: 40, isReal: false },
  { id: 6, label: '30% OFF',          color: '#e15566', textDark: false, prob: 8,  isReal: true  },
  { id: 7, label: 'Postre gratis',    color: '#b8863a', textDark: false, prob: 7,  isReal: true  },
]

function mergePrizes(dbPrizes) {
  return dbPrizes.map(p => ({
    id: p.segment_index,
    label: p.label,
    ...(SEGMENT_STYLES[p.segment_index] || { color: '#c8102e', textDark: false, isReal: true }),
  }))
}

const isDemoUser = (id) => typeof id === 'string' && id.startsWith('demo-')

// Ruleta decorativa (no interactiva)
function WheelSVG({ prizes, size = 200 }) {
  const N = prizes.length, r = size / 2
  if (N === 0) return null
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {prizes.map((p, i) => {
        const a0 = (i / N) * Math.PI * 2 - Math.PI / 2
        const a1 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2
        const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0)
        const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1)
        const large = (a1 - a0) > Math.PI ? 1 : 0
        const tx = r + r * 0.65 * Math.cos((a0 + a1) / 2)
        const ty = r + r * 0.65 * Math.sin((a0 + a1) / 2)
        const angle = ((i + 0.5) / N) * 360
        const fs = 10
        return (
          <g key={i}>
            <path d={`M${r},${r} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`} fill={p.color} stroke="#fff" strokeWidth="1.5"/>
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
              fontFamily="Plus Jakarta Sans, sans-serif" fontSize={fs} fontWeight="700"
              fill={p.textDark ? '#1a1423' : '#fff'}
              transform={`rotate(${angle} ${tx} ${ty})`}>
              {p.label}
            </text>
          </g>
        )
      })}
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="#b8863a" strokeWidth="2"/>
      <circle cx={r} cy={r} r="17" fill="#fff" stroke="#b8863a" strokeWidth="1.5"/>
      <circle cx={r} cy={r} r="11" fill="#c8102e"/>
    </svg>
  )
}

function Confetti() {
  const colors = ['#b8863a', '#c8102e', '#f3b8c1', '#2e7a52', '#f3e6cc']
  return (
    <svg width="100%" height="70" viewBox="0 0 300 70" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      {Array.from({ length: 22 }).map((_, i) => {
        const c = colors[i % colors.length]
        const x = 10 + i * 13, y = 8 + (i % 4) * 16, r = 3 + (i % 3)
        return i % 3 === 0
          ? <rect key={i} x={x} y={y} width={r * 1.5} height={r * 1.5} fill={c} transform={`rotate(${i * 20} ${x + r * 0.75} ${y + r * 0.75})`}/>
          : <circle key={i} cx={x} cy={y} r={r} fill={c}/>
      })}
    </svg>
  )
}

function Countdown({ label, h, m, s }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow)' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
        {[[h, 'hs'], [m, 'min'], [s, 'seg']].map(([n, l], i, arr) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: 12, padding: '8px 12px', minWidth: 52, textAlign: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, opacity: 0.75, letterSpacing: '0.06em', marginTop: 3 }}>{l}</div>
            </div>
            {i < arr.length - 1 && <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, color: 'var(--primary)', fontWeight: 700 }}>:</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Ruleta() {
  const { user } = useAuth()
  const [prizes, setPrizes] = useState(DEMO_PRIZES)
  const [phase, setPhase] = useState('loading') // loading | no_spin | won | no_prize
  const [wonPrize, setWonPrize] = useState(null)
  const [prizeCode, setPrizeCode] = useState(null)
  const [cd, setCd] = useState({ h: '00', m: '00', s: '00' })

  useEffect(() => {
    if (!user) return
    loadData()
  }, [user?.id, user?.shopping_id])

  const loadData = async () => {
    let currentPrizes = DEMO_PRIZES

    if (!isDemoUser(user.id) && user.shopping_id) {
      try {
        const { data: dbPrizes } = await supabase
          .from('prizes')
          .select('*')
          .eq('shopping_id', user.shopping_id)
          .order('segment_index')
        if (dbPrizes?.length) {
          currentPrizes = mergePrizes(dbPrizes)
          setPrizes(currentPrizes)
        }
      } catch (_) {}
    }

    const TODAY = new Date().toDateString()

    if (isDemoUser(user.id)) {
      if (localStorage.getItem(`spin_date_${user.credential_number}`) !== TODAY) {
        setPhase('no_spin')
        return
      }
      const label = localStorage.getItem(`spin_prize_${user.credential_number}`)
      const code  = localStorage.getItem(`spin_code_${user.credential_number}`)
      const prize = currentPrizes.find(p => p.label === label) || null
      setWonPrize(prize)
      setPrizeCode(code)
      setPhase(prize?.isReal ? 'won' : 'no_prize')
      return
    }

    try {
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
      const { data: spinsHoy } = await supabase
        .from('spins')
        .select('prize_label, prize_code')
        .eq('user_id', user.id)
        .gte('spun_at', todayStart.toISOString())
        .order('spun_at', { ascending: false })
        .limit(1)

      if (!spinsHoy?.length) {
        setPhase('no_spin')
        return
      }

      const spin  = spinsHoy[0]
      const prize = currentPrizes.find(p => p.label === spin.prize_label) || null
      setWonPrize(prize)
      setPrizeCode(spin.prize_code)
      setPhase(prize?.isReal ? 'won' : 'no_prize')
    } catch (_) {
      setPhase('no_spin')
    }
  }

  // Countdown hasta medianoche
  useEffect(() => {
    if (phase !== 'won' && phase !== 'no_prize') return
    const tick = () => {
      const now = new Date()
      const tmrw = new Date(now); tmrw.setDate(tmrw.getDate() + 1); tmrw.setHours(0, 0, 0, 0)
      const diff = Math.max(0, tmrw - now)
      setCd({
        h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [phase])

  return (
    <div>
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Club de Beneficios</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1 }}>Ruleta diaria</div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {phase === 'loading' && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)', fontSize: 13 }}>Cargando…</div>
        )}

        {/* ── SIN GIRO HOY ── */}
        {phase === 'no_spin' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
              <WheelSVG prizes={prizes} size={210} />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)',
              borderRadius: 20, padding: 20, color: '#fff', textAlign: 'center',
            }}>
              <div style={{ fontSize: 38 }}>🎯</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>
                ¡Girá la ruleta hoy!
              </div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8, lineHeight: 1.6 }}>
                Visitá el tótem del shopping,<br/>ingresá tu credencial y descubrí tu premio
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 16px', marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>📍</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Planta Baja — frente al acceso principal</span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: 'var(--shadow)' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>¿Cómo funciona?</div>
              {[
                ['1', 'Buscá el tótem en el shopping'],
                ['2', 'Ingresá tu número de credencial'],
                ['3', '¡Girá y ganá premios exclusivos!'],
              ].map(([n, t]) => (
                <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{n}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)' }}>{t}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── GANÓ UN PREMIO ── */}
        {phase === 'won' && wonPrize && (
          <>
            <div style={{ background: '#fff', borderRadius: 24, padding: 24, textAlign: 'center', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
              <Confetti />
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.14em', marginTop: 8 }}>¡GANASTE HOY!</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 38, fontWeight: 600, lineHeight: 1, marginTop: 8, color: 'var(--primary-2)' }}>Ganaste</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 44, fontWeight: 700, color: 'var(--primary)', lineHeight: 1, marginTop: 4 }}>
                {wonPrize.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10 }}>en tu próxima compra</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4, color: 'var(--ink)' }}>Presentá tu credencial en el local</div>

              {prizeCode && (
                <div style={{ background: 'var(--gold-soft)', border: '1px dashed var(--gold)', borderRadius: 12, padding: '10px 12px', marginTop: 16 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em' }}>CÓDIGO DEL PREMIO</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>{prizeCode}</div>
                </div>
              )}
            </div>

            <Countdown label="Nuevo giro disponible en" h={cd.h} m={cd.m} s={cd.s} />
          </>
        )}

        {/* ── NO GANÓ PREMIO ── */}
        {phase === 'no_prize' && (
          <>
            <div style={{ background: '#fff', borderRadius: 24, padding: 24, textAlign: 'center', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontSize: 48 }}>🎰</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, marginTop: 8 }}>No ganaste esta vez</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>¡Volvé mañana al tótem para un nuevo giro!</div>
            </div>

            <Countdown label="Próximo giro disponible en" h={cd.h} m={cd.m} s={cd.s} />
          </>
        )}

      </div>
    </div>
  )
}
