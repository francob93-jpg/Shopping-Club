import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TODAY = new Date().toDateString()
const DAILY_SPIN_LIMIT = 10

const PRIZES = [
  { id: 0, label: '10% OFF',    color: '#c8102e', textDark: false, prob: 15, isReal: true  },
  { id: 1, label: '2x1',        color: '#b8863a', textDark: false, prob: 8,  isReal: true  },
  { id: 2, label: '20% OFF',    color: '#8e0a1f', textDark: false, prob: 10, isReal: true  },
  { id: 3, label: '☕',          color: '#fbe6ea', textDark: true,  prob: 7,  isReal: true  },
  { id: 4, label: '50% OFF',    color: '#4c0513', textDark: false, prob: 5,  isReal: true  },
  { id: 5, label: 'Otra\ngira', color: '#f3e6cc', textDark: true,  prob: 40, isReal: false },
  { id: 6, label: '🎬',          color: '#e15566', textDark: false, prob: 8,  isReal: true  },
  { id: 7, label: '5% OFF',     color: '#b8863a', textDark: false, prob: 7,  isReal: true  },
]

function pickWinner() {
  const total = PRIZES.reduce((s, p) => s + p.prob, 0)
  let rand = Math.random() * total
  for (const p of PRIZES) { rand -= p.prob; if (rand <= 0) return p }
  return PRIZES[PRIZES.length - 1]
}

function spinKey(c)  { return `spin_date_${c}` }
function countKey(c) { return `spin_count_${c}` }
function prizeKey(c) { return `spin_prize_${c}` }
function codeKey(c)  { return `spin_code_${c}` }
function getSpinCount(c) {
  return localStorage.getItem(spinKey(c)) === TODAY
    ? Number(localStorage.getItem(countKey(c)) || 0)
    : 0
}
function spinsLeft(c) { return Math.max(0, DAILY_SPIN_LIMIT - getSpinCount(c)) }
function reachedSpinLimit(c) { return spinsLeft(c) === 0 }
function getSavedPrize(c) { return localStorage.getItem(prizeKey(c)) }
function getSavedCode(c)  { return localStorage.getItem(codeKey(c)) }
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n) => Array.from({length: n}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `RB-${seg(4)}-${seg(4)}`
}

// ── SVG WHEEL ──
function WheelSVG({ size = 280, rotation = 0, spinning = false }) {
  const N = PRIZES.length
  const r = size / 2
  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? 'transform 3.5s cubic-bezier(0.17, 0.67, 0.3, 0.99)' : 'none',
        display: 'block',
      }}
    >
      <defs>
        <filter id="ws" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.2"/>
        </filter>
      </defs>
      <g filter="url(#ws)">
        {PRIZES.map((p, i) => {
          const a0 = (i / N) * Math.PI * 2 - Math.PI / 2
          const a1 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2
          const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0)
          const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1)
          const large = (a1 - a0) > Math.PI ? 1 : 0
          const tx = r + r * 0.65 * Math.cos((a0 + a1) / 2)
          const ty = r + r * 0.65 * Math.sin((a0 + a1) / 2)
          const angle = ((i + 0.5) / N) * 360
          const fs = size < 250 ? 10 : 12
          return (
            <g key={i}>
              <path d={`M${r},${r} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`} fill={p.color} stroke="#fff" strokeWidth="2"/>
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontFamily="Plus Jakarta Sans" fontSize={fs} fontWeight="700"
                fill={p.textDark ? '#1a1423' : '#fff'}
                transform={`rotate(${angle} ${tx} ${ty})`}>
                {p.label.split('\n').map((l, k) => <tspan key={k} x={tx} dy={k === 0 ? 0 : fs + 2}>{l}</tspan>)}
              </text>
            </g>
          )
        })}
        <circle cx={r} cy={r} r={r - 1} fill="none" stroke="#b8863a" strokeWidth="3"/>
        <circle cx={r} cy={r} r="26" fill="#fff" stroke="#b8863a" strokeWidth="2"/>
        <circle cx={r} cy={r} r="18" fill="#c8102e"/>
        <text x={r} y={r + 4} textAnchor="middle" dominantBaseline="middle"
          fontFamily="Fraunces" fontWeight="700" fontSize="14" fill="#fff">Pr</text>
      </g>
    </svg>
  )
}

// ── CONFETTI ──
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

// ── HEADER ──
function Header() {
  return (
    <div style={{ padding: '4px 20px 12px' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Club de Beneficios</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1 }}>Ruleta diaria</div>
    </div>
  )
}

export default function Ruleta() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const credential = user?.credential_number

  const savedPrizeLabel = getSavedPrize(credential)
  const savedPrize = PRIZES.find(p => p.label === savedPrizeLabel) || null

  const [spinCount, setSpinCount] = useState(() => getSpinCount(credential))
  const [phase, setPhase]         = useState(() => reachedSpinLimit(credential) ? 'used' : 'ready')
  const [spinning, setSpinning]   = useState(false)
  const [wonPrize, setWonPrize]   = useState(savedPrize)
  const [prizeCode, setPrizeCode] = useState(() => getSavedCode(credential))
  const [rotation, setRotation]   = useState(0)
  const rotRef = useRef(0)
  const remainingSpins = Math.max(0, DAILY_SPIN_LIMIT - spinCount)

  // Countdown
  const [cd, setCd] = useState({ h: '00', m: '00', s: '00' })
  useEffect(() => {
    if (phase !== 'used') return
    const tick = () => {
      const now  = new Date()
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

  const handleSpin = () => {
    if (phase !== 'ready' || spinning) return
    setSpinning(true)

    const winner   = pickWinner()
    const segAngle = ((winner.id + 0.5) / PRIZES.length) * 360
    const curAngle = rotRef.current % 360
    const extra    = (segAngle - curAngle + 360) % 360
    const newRot   = rotRef.current + extra + 5 * 360
    rotRef.current = newRot
    setRotation(newRot)

    setTimeout(() => {
      const code = generateCode()
      const nextSpinCount = getSpinCount(credential) + 1
      localStorage.setItem(spinKey(credential), TODAY)
      localStorage.setItem(countKey(credential), String(nextSpinCount))
      localStorage.setItem(prizeKey(credential), winner.label)
      localStorage.setItem(codeKey(credential), code)
      setSpinCount(nextSpinCount)
      setWonPrize(winner)
      setPrizeCode(code)
      setSpinning(false)
      setPhase('won')
    }, 3700)
  }

  // ── YA USADA ──
  if (phase === 'used') return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', gap: 14 }}>

        <div style={{ opacity: 0.45, filter: 'saturate(0.5)' }}>
          <WheelSVG size={220} rotation={rotRef.current} spinning={false} />
        </div>

        {/* Countdown */}
        <div style={{ background: '#fff', borderRadius: 18, padding: 16, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--primary-soft)' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ya usaste tus {DAILY_SPIN_LIMIT} giros de hoy</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, marginTop: 6 }}>Nuevos giros en</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
            {[[cd.h, 'hs'], [cd.m, 'min'], [cd.s, 'seg']].map(([n, l], i, arr) => (
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

        {/* Último premio */}
        {wonPrize && (
          <div style={{ background: '#fff', borderRadius: 18, padding: 14, width: '100%', display: 'flex', gap: 12, alignItems: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: wonPrize.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: wonPrize.textDark ? 'var(--ink)' : '#fff',
              fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2,
            }}>
              {wonPrize.label.replace('\n', ' ')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Último premio</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2, color: 'var(--ink)' }}>{wonPrize.label.replace('\n', ' ')} ganado hoy</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>Mostrá tu credencial para canjear</div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, width: '100%' }}>
          {[{ val: '12', lbl: 'Giros mes' }, { val: '7', lbl: 'Premios' }, { val: '$8.4k', lbl: 'Ahorrado' }].map(s => (
            <div key={s.lbl} style={{ background: '#fff', borderRadius: 14, padding: '10px 8px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 18, color: 'var(--ink)' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ── READY / SPINNING / WON ──
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', gap: 16 }}>

        {/* Badge */}
        {phase !== 'won' && (
          <div style={{ background: 'var(--primary-soft)', color: 'var(--primary-2)', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}/>
            {remainingSpins} {remainingSpins === 1 ? 'GIRO DISPONIBLE' : 'GIROS DISPONIBLES'} HOY
          </div>
        )}

        {/* Wheel */}
        <div style={{ position: 'relative' }}>
          <svg width="28" height="36" viewBox="0 0 28 36"
            style={{ position: 'absolute', top: -10, left: 'calc(50% - 14px)', zIndex: 3, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.2))' }}>
            <path d="M14 34L2 4h24L14 34z" fill="#b8863a" stroke="#1a1423" strokeWidth="1.5"/>
          </svg>
          <div style={{ opacity: phase === 'won' ? 0.4 : 1, filter: phase === 'won' ? 'blur(2px)' : 'none', transition: 'all 0.4s' }}>
            <WheelSVG size={290} rotation={rotation} spinning={spinning} />
          </div>
        </div>

        {/* Botón girar */}
        {phase !== 'won' && (
          <>
            <button
              onClick={handleSpin}
              disabled={spinning}
              style={{
                width: '100%', background: spinning ? 'var(--primary-2)' : 'var(--primary)', color: '#fff',
                border: 'none', borderRadius: 16, padding: '16px',
                fontSize: 16, fontWeight: 700, letterSpacing: '0.04em',
                cursor: spinning ? 'not-allowed' : 'pointer',
                boxShadow: spinning ? 'none' : '0 10px 25px rgba(200,16,46,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {spinning ? 'GIRANDO...' : 'GIRAR RULETA'}
            </button>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['5% a 50% OFF', '2x1', 'Productos gratis'].map(chip => (
                <span key={chip} style={{ background: 'var(--primary-soft)', color: 'var(--primary-2)', padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                  {chip}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Modal GANASTE */}
        {phase === 'won' && wonPrize && (
          <div style={{ background: '#fff', borderRadius: 24, padding: 24, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
            {wonPrize.isReal && <Confetti />}
            <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.14em', marginTop: 8 }}>
              {wonPrize.isReal ? '¡FELICITACIONES!' : 'RESULTADO'}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 600, lineHeight: 1, marginTop: 8, color: 'var(--primary-2)' }}>
              {wonPrize.isReal ? 'Ganaste' : 'Te tocó'}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 700, color: 'var(--primary)', lineHeight: 1, marginTop: 4 }}>
              {wonPrize.label.replace('\n', ' ')}
            </div>
            {wonPrize.isReal ? (
              <>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10 }}>en tu próxima compra en</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2, color: 'var(--ink)' }}>Grimoldi · Local 08</div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10 }}>No se generó un cupón esta vez</div>
            )}

            {wonPrize.isReal && (
              <div style={{ background: 'var(--gold-soft)', border: '1px dashed var(--gold)', borderRadius: 12, padding: '10px 12px', marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em' }}>CÓDIGO</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{prizeCode}</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <rect x="9" y="9" width="11" height="11" rx="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <button onClick={() => setPhase(remainingSpins > 0 ? 'ready' : 'used')}
                style={{ flex: 1, background: 'transparent', color: 'var(--primary)', border: '1.5px solid var(--primary)', borderRadius: 12, padding: 11, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {remainingSpins > 0 ? 'Girar otra vez' : 'Después'}
              </button>
              <button onClick={() => navigate('/beneficios')}
                style={{ flex: 1.3, background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 12, padding: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(200,16,46,0.3)' }}>
                Ver en beneficios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
