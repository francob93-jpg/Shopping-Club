import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const DAILY_SPIN_LIMIT = 10

// Propiedades visuales por posición (no se guardan en BD)
const SEGMENT_STYLES = [
  { color: '#c8102e', textDark: false, prob: 15, isReal: true  },
  { color: '#b8863a', textDark: false, prob: 8,  isReal: true  },
  { color: '#8e0a1f', textDark: false, prob: 10, isReal: true  },
  { color: '#fbe6ea', textDark: true,  prob: 7,  isReal: true  },
  { color: '#4c0513', textDark: false, prob: 5,  isReal: true  },
  { color: '#f3e6cc', textDark: true,  prob: 40, isReal: false },
  { color: '#e15566', textDark: false, prob: 8,  isReal: true  },
  { color: '#b8863a', textDark: false, prob: 7,  isReal: true  },
]

function mergePrizes(dbPrizes) {
  return dbPrizes.map(p => ({
    id: p.segment_index,
    label: p.label,
    ...(SEGMENT_STYLES[p.segment_index] || { color: '#c8102e', textDark: false, prob: 5, isReal: true }),
  }))
}

function pickWinner(prizes) {
  const total = prizes.reduce((s, p) => s + p.prob, 0)
  let rand = Math.random() * total
  for (const p of prizes) { rand -= p.prob; if (rand <= 0) return p }
  return prizes[prizes.length - 1]
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `RB-${seg(4)}-${seg(4)}`
}

const isDemo = (id) => typeof id === 'string' && id.startsWith('demo-')

// ── SVG WHEEL ──
function WheelSVG({ prizes, size = 280, rotation = 0, spinning = false }) {
  const N = prizes.length
  const r = size / 2
  if (N === 0) return null
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
        {prizes.map((p, i) => {
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

  const [prizes, setPrizes]       = useState([])
  const [spinCount, setSpinCount] = useState(0)
  const [wonPrize, setWonPrize]   = useState(null)
  const [prizeCode, setPrizeCode] = useState(null)
  const [phase, setPhase]         = useState('loading')
  const [spinning, setSpinning]   = useState(false)
  const [rotation, setRotation]   = useState(0)
  const rotRef = useRef(0)

  const remainingSpins = Math.max(0, DAILY_SPIN_LIMIT - spinCount)

  // Carga inicial: premios + giros de hoy
  useEffect(() => {
    if (!user?.shopping_id) return

    const loadData = async () => {
      // Premios de la ruleta
      const { data: dbPrizes } = await supabase
        .from('prizes')
        .select('*')
        .eq('shopping_id', user.shopping_id)
        .eq('active', true)
        .order('segment_index')

      if (dbPrizes?.length) setPrizes(mergePrizes(dbPrizes))

      if (isDemo(user.id)) {
        // Usuario demo: usa localStorage
        const TODAY = new Date().toDateString()
        const count = localStorage.getItem(`spin_date_${user.credential_number}`) === TODAY
          ? Number(localStorage.getItem(`spin_count_${user.credential_number}`) || 0)
          : 0
        const savedLabel = localStorage.getItem(`spin_prize_${user.credential_number}`)
        const savedCode  = localStorage.getItem(`spin_code_${user.credential_number}`)
        setSpinCount(count)
        if (savedLabel && dbPrizes) {
          const merged = mergePrizes(dbPrizes)
          setWonPrize(merged.find(p => p.label === savedLabel) || null)
          setPrizeCode(savedCode)
        }
        setPhase(count >= DAILY_SPIN_LIMIT ? 'used' : 'ready')
        return
      }

      // Usuario real: consulta tabla spins
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
      const { count } = await supabase
        .from('spins')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('spun_at', todayStart.toISOString())

      const { data: lastSpin } = await supabase
        .from('spins')
        .select('prize_label, prize_code')
        .eq('user_id', user.id)
        .gte('spun_at', todayStart.toISOString())
        .order('spun_at', { ascending: false })
        .limit(1)
        .single()

      const todayCount = count || 0
      setSpinCount(todayCount)

      if (lastSpin && dbPrizes) {
        const merged = mergePrizes(dbPrizes)
        setWonPrize(merged.find(p => p.label === lastSpin.prize_label) || null)
        setPrizeCode(lastSpin.prize_code)
      }

      setPhase(todayCount >= DAILY_SPIN_LIMIT ? 'used' : 'ready')
    }

    loadData()
  }, [user?.shopping_id, user?.id])

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

  const handleSpin = async () => {
    if (phase !== 'ready' || spinning || prizes.length === 0) return
    setSpinning(true)

    const winner   = pickWinner(prizes)
    const segAngle = ((winner.id + 0.5) / prizes.length) * 360
    const curAngle = rotRef.current % 360
    const extra    = (segAngle - curAngle + 360) % 360
    const newRot   = rotRef.current + extra + 5 * 360
    rotRef.current = newRot
    setRotation(newRot)

    setTimeout(async () => {
      const code = generateCode()

      if (isDemo(user.id)) {
        const TODAY = new Date().toDateString()
        const nextCount = spinCount + 1
        localStorage.setItem(`spin_date_${user.credential_number}`, TODAY)
        localStorage.setItem(`spin_count_${user.credential_number}`, String(nextCount))
        localStorage.setItem(`spin_prize_${user.credential_number}`, winner.label)
        localStorage.setItem(`spin_code_${user.credential_number}`, code)
        setSpinCount(nextCount)
      } else {
        await supabase.from('spins').insert({
          user_id: user.id,
          shopping_id: user.shopping_id,
          prize_label: winner.label,
          prize_code: code,
        })
        setSpinCount(prev => prev + 1)
      }

      setWonPrize(winner)
      setPrizeCode(code)
      setSpinning(false)
      setPhase('won')
    }, 3700)
  }

  if (phase === 'loading') return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)', fontSize: 13 }}>Cargando ruleta…</div>
    </div>
  )

  // ── YA USADA ──
  if (phase === 'used') return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', gap: 14 }}>

        <div style={{ opacity: 0.45, filter: 'saturate(0.5)' }}>
          <WheelSVG prizes={prizes} size={220} rotation={rotRef.current} spinning={false} />
        </div>

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, width: '100%' }}>
          {[{ val: spinCount, lbl: 'Giros hoy' }, { val: DAILY_SPIN_LIMIT, lbl: 'Límite diario' }, { val: DAILY_SPIN_LIMIT - spinCount, lbl: 'Usados' }].map(s => (
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

        {phase !== 'won' && (
          <div style={{ background: 'var(--primary-soft)', color: 'var(--primary-2)', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}/>
            {remainingSpins} {remainingSpins === 1 ? 'GIRO DISPONIBLE' : 'GIROS DISPONIBLES'} HOY
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <svg width="28" height="36" viewBox="0 0 28 36"
            style={{ position: 'absolute', top: -10, left: 'calc(50% - 14px)', zIndex: 3, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.2))' }}>
            <path d="M14 34L2 4h24L14 34z" fill="#b8863a" stroke="#1a1423" strokeWidth="1.5"/>
          </svg>
          <div style={{ opacity: phase === 'won' ? 0.4 : 1, filter: phase === 'won' ? 'blur(2px)' : 'none', transition: 'all 0.4s' }}>
            <WheelSVG prizes={prizes} size={290} rotation={rotation} spinning={spinning} />
          </div>
        </div>

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
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10 }}>en tu próxima compra</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2, color: 'var(--ink)' }}>Presentá tu credencial en el local</div>
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
