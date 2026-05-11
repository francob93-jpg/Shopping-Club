import { useState, useRef, useEffect } from 'react'
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

function WheelSVG({ prizes, size = 380, rotation = 0, spinning = false }) {
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
      {prizes.map((p, i) => {
        const a0 = (i / N) * Math.PI * 2 - Math.PI / 2
        const a1 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2
        const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0)
        const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1)
        const large = (a1 - a0) > Math.PI ? 1 : 0
        const tx = r + r * 0.65 * Math.cos((a0 + a1) / 2)
        const ty = r + r * 0.65 * Math.sin((a0 + a1) / 2)
        const angle = ((i + 0.5) / N) * 360
        const fs = 16
        return (
          <g key={i}>
            <path d={`M${r},${r} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`} fill={p.color} stroke="#fff" strokeWidth="2"/>
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
              fontFamily="Plus Jakarta Sans, sans-serif" fontSize={fs} fontWeight="700"
              fill={p.textDark ? '#1a1423' : '#fff'}
              transform={`rotate(${angle} ${tx} ${ty})`}>
              {p.label}
            </text>
          </g>
        )
      })}
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="#b8863a" strokeWidth="4"/>
      <circle cx={r} cy={r} r="34" fill="#fff" stroke="#b8863a" strokeWidth="3"/>
      <circle cx={r} cy={r} r="24" fill="#c8102e"/>
      <text x={r} y={r + 5} textAnchor="middle" dominantBaseline="middle"
        fontFamily="Fraunces, serif" fontWeight="700" fontSize="18" fill="#fff">Pr</text>
    </svg>
  )
}

function useWheelSize() {
  const [size, setSize] = useState(() => Math.min(window.innerWidth * 0.48, window.innerHeight * 0.48, 600))
  useEffect(() => {
    const update = () => setSize(Math.min(window.innerWidth * 0.48, window.innerHeight * 0.48, 600))
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return Math.max(size, 260)
}

export default function Totem() {
  const wheelSize = useWheelSize()
  const [prizes, setPrizes] = useState(DEMO_PRIZES)
  const [phase, setPhase] = useState('idle')
  const [credential, setCredential] = useState('')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState(null)
  const [prizeCode, setPrizeCode] = useState(null)
  const [alreadyWon, setAlreadyWon] = useState(null)
  const [resetCd, setResetCd] = useState(30)
  const rotRef = useRef(0)

  // Carga premios desde Supabase al arrancar (DEMO_PRIZES como fallback)
  useEffect(() => {
    const loadPrizes = async () => {
      try {
        const { data } = await supabase
          .from('prizes')
          .select('*')
          .order('segment_index')
        if (data?.length) {
          setPrizes(data.map(p => ({
            id: p.segment_index,
            label: p.label,
            prob: p.probability ?? (SEGMENT_STYLES[p.segment_index]?.prob ?? 10),
            ...(SEGMENT_STYLES[p.segment_index] || { color: '#c8102e', textDark: false, isReal: true }),
          })))
        }
      } catch (_) {}
    }
    loadPrizes()
  }, [])

  // Auto-reset countdown after result
  useEffect(() => {
    if (!['won', 'no_prize', 'already_spun'].includes(phase)) return
    setResetCd(30)
    const id = setInterval(() => {
      setResetCd(prev => {
        if (prev <= 1) { reset(); return 30 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase])

  const reset = () => {
    setPhase('idle')
    setCredential('')
    setWonPrize(null)
    setPrizeCode(null)
    setAlreadyWon(null)
    setSpinning(false)
  }

  const handleCheck = async () => {
    const cred = credential.trim().toUpperCase()
    if (!cred) return
    setPhase('checking')
    const TODAY = new Date().toDateString()

    try {
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, shopping_id')
        .eq('credential_number', cred)
        .single()

      if (profile) {
        const { data: spinHoy } = await supabase
          .from('spins')
          .select('prize_label')
          .eq('user_id', profile.id)
          .gte('spun_at', todayStart.toISOString())
          .limit(1)

        if (spinHoy?.length) {
          setAlreadyWon(prizes.find(p => p.label === spinHoy[0].prize_label) || null)
          setPhase('already_spun')
          return
        }
        setPhase('ready')
        return
      }
    } catch (_) {
      // fall through to localStorage demo
    }

    // Demo fallback: localStorage
    if (localStorage.getItem(`spin_date_${cred}`) === TODAY) {
      setAlreadyWon(prizes.find(p => p.label === localStorage.getItem(`spin_prize_${cred}`)) || null)
      setPhase('already_spun')
    } else {
      setPhase('ready')
    }
  }

  const handleSpin = () => {
    if (phase !== 'ready' || spinning) return
    const cred = credential.trim().toUpperCase()

    const winner = pickWinner(prizes)
    const segAngle = ((winner.id + 0.5) / prizes.length) * 360
    const curAngle = rotRef.current % 360
    const extra = (segAngle - curAngle + 360) % 360
    const newRot = rotRef.current + extra + 5 * 360
    rotRef.current = newRot

    setSpinning(true)
    setPhase('spinning')
    setRotation(newRot)

    setTimeout(async () => {
      const code = winner.isReal ? generateCode() : null
      const TODAY = new Date().toDateString()

      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, shopping_id')
          .eq('credential_number', cred)
          .single()

        if (profileError) console.error('[Totem] Error buscando perfil:', profileError)
        if (!profile) throw new Error('no profile')

        const { error: insertError } = await supabase.from('spins').insert({
          user_id: profile.id,
          shopping_id: profile.shopping_id,
          prize_label: winner.label,
          prize_code: code,
        })

        if (insertError) {
          console.error('[Totem] Error insertando spin:', insertError)
          throw insertError
        }
        console.log('[Totem] Spin guardado OK en Supabase')
      } catch (err) {
        console.error('[Totem] Fallback a localStorage. Causa:', err)
        localStorage.setItem(`spin_date_${cred}`, TODAY)
        localStorage.setItem(`spin_prize_${cred}`, winner.label)
        if (code) localStorage.setItem(`spin_code_${cred}`, code)
        else localStorage.removeItem(`spin_code_${cred}`)
      }

      setWonPrize(winner)
      setPrizeCode(code)
      setSpinning(false)
      setPhase(winner.isReal ? 'won' : 'no_prize')
    }, 3700)
  }

  const S = {
    container: {
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(160deg, #0d0508 0%, #1e0b10 50%, #0d0508 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      position: 'relative', overflow: 'hidden', padding: '32px 24px',
      boxSizing: 'border-box',
    },
    ring1: { position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(200,16,46,0.15)', pointerEvents: 'none' },
    ring2: { position: 'absolute', bottom: -180, left: -180, width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(184,134,58,0.1)', pointerEvents: 'none' },
    shopLabel: { position: 'absolute', top: 28, left: 28, textAlign: 'left' },
    btn: (active) => ({
      background: active ? '#c8102e' : 'rgba(200,16,46,0.2)',
      color: '#fff', border: 'none', borderRadius: 18, padding: '20px 48px',
      fontSize: 20, fontWeight: 800, letterSpacing: '0.06em',
      cursor: active ? 'pointer' : 'not-allowed',
      boxShadow: active ? '0 0 40px rgba(200,16,46,0.5)' : 'none',
      transition: 'all 0.2s',
    }),
    ghost: {
      background: 'rgba(255,255,255,0.08)', color: '#fff',
      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14,
      padding: '16px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
    },
  }

  return (
    <div style={S.container}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{transform:scale(1);box-shadow:0 0 40px rgba(200,16,46,0.5)} 50%{transform:scale(1.04);box-shadow:0 0 70px rgba(200,16,46,0.8)} }
      `}</style>

      <div style={S.ring1}/>
      <div style={S.ring2}/>

      {/* Shopping label */}
      <div style={S.shopLabel}>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Club de Beneficios</div>
        <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, marginTop: 2 }}>Paseo de la Ribera</div>
      </div>

      {/* ── IDLE ── */}
      {phase === 'idle' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, textAlign: 'center' }}>
          <WheelSVG prizes={prizes} size={wheelSize} />
          <div>
            <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1 }}>Ruleta de premios</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(14px, 1.8vw, 22px)', marginTop: 8 }}>Ingresá tu credencial y girá para ganar</div>
          </div>
          <button onClick={() => setPhase('input')} style={{ ...S.btn(true), animation: 'pulse 2.5s ease-in-out infinite', fontSize: 'clamp(16px, 1.8vw, 24px)', padding: 'clamp(14px, 1.5vw, 22px) clamp(32px, 4vw, 56px)' }}>
            COMENZAR
          </button>
        </div>
      )}

      {/* ── INPUT ── */}
      {phase === 'input' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center', width: '100%', maxWidth: 520 }}>
          <div>
            <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 700 }}>Ingresá tu credencial</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginTop: 8 }}>Encontrás el número en la app del club</div>
          </div>
          <input
            autoFocus
            value={credential}
            onChange={e => setCredential(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && credential.trim() && handleCheck()}
            placeholder="PR-2026-00142"
            style={{
              width: '100%', padding: '22px 28px', fontSize: 30, textAlign: 'center',
              background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 18, color: '#fff', outline: 'none',
              letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: 14, width: '100%' }}>
            <button onClick={reset} style={S.ghost}>Cancelar</button>
            <button
              onClick={handleCheck}
              disabled={!credential.trim()}
              style={{ ...S.btn(!!credential.trim()), flex: 1 }}
            >
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {/* ── CHECKING ── */}
      {phase === 'checking' && (
        <div style={{ textAlign: 'center', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, border: '4px solid rgba(255,255,255,0.15)', borderTopColor: '#c8102e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30 }}>Verificando credencial…</div>
        </div>
      )}

      {/* ── WHEEL (visible during ready + spinning) ── */}
      {(phase === 'ready' || phase === 'spinning') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {/* Arrow pointer */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <svg width="40" height="50" viewBox="0 0 40 50"
              style={{ position: 'absolute', top: -16, left: 'calc(50% - 20px)', zIndex: 3, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
              <path d="M20 48L4 6h32L20 48z" fill="#b8863a" stroke="#0d0508" strokeWidth="2"/>
            </svg>
            <WheelSVG prizes={prizes} size={wheelSize} rotation={rotation} spinning={spinning} />
          </div>

          {phase === 'ready' && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(12px, 1.2vw, 16px)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Credencial: {credential.trim().toUpperCase()}
              </div>
              <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 700, lineHeight: 1 }}>¡Es tu turno!</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(13px, 1.4vw, 20px)' }}>Tocá el botón para descubrir tu premio</div>
              <button onClick={handleSpin} style={{ ...S.btn(true), animation: 'pulse 2s ease-in-out infinite', fontSize: 'clamp(18px, 2vw, 28px)', padding: 'clamp(16px, 1.8vw, 24px) clamp(40px, 5vw, 72px)' }}>
                ¡GIRAR!
              </button>
            </div>
          )}

          {phase === 'spinning' && (
            <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 700, textAlign: 'center' }}>
              Girando…
            </div>
          )}
        </div>
      )}

      {/* ── WON ── */}
      {phase === 'won' && wonPrize && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 700 }}>
          <div style={{ color: '#b8863a', fontFamily: 'Fraunces, serif', fontSize: 'clamp(16px, 2vw, 26px)', fontWeight: 700, letterSpacing: '0.2em' }}>¡FELICITACIONES!</div>
          <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, lineHeight: 1 }}>GANASTE</div>
          <div style={{
            background: wonPrize.color,
            borderRadius: 24, padding: 'clamp(16px, 2vw, 28px) clamp(32px, 5vw, 72px)',
            boxShadow: `0 0 80px ${wonPrize.color}88`,
          }}>
            <div style={{ color: wonPrize.textDark ? '#1a1423' : '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(32px, 5vw, 70px)', fontWeight: 700, lineHeight: 1 }}>
              {wonPrize.label}
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(14px, 1.6vw, 22px)', lineHeight: 1.5 }}>
            Presentá tu credencial en el local para canjear tu premio
          </div>
          {prizeCode && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(184,134,58,0.5)', borderRadius: 16, padding: 'clamp(12px, 1.5vw, 20px) clamp(24px, 3vw, 40px)', textAlign: 'center' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(10px, 1vw, 14px)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Código del premio</div>
              <div style={{ color: '#b8863a', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 700, marginTop: 6 }}>{prizeCode}</div>
            </div>
          )}
          <ResetBar cd={resetCd} onReset={reset} />
        </div>
      )}

      {/* ── NO PRIZE ── */}
      {phase === 'no_prize' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>🎰</div>
          <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(30px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1 }}>No es tu vez</div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(14px, 1.6vw, 22px)' }}>¡Volvé mañana al shopping para un nuevo giro!</div>
          <ResetBar cd={resetCd} onReset={reset} />
        </div>
      )}

      {/* ── ALREADY SPUN ── */}
      {phase === 'already_spun' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 700 }}>
          <div style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>⏰</div>
          <div style={{ color: '#fff', fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 4.5vw, 60px)', fontWeight: 700, lineHeight: 1.1 }}>Ya giraste hoy</div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(14px, 1.6vw, 22px)', lineHeight: 1.6 }}>
            {alreadyWon?.isReal
              ? `Ganaste "${alreadyWon.label}" hoy. ¡Canjealo en el local antes de que venza!`
              : '¡Volvé mañana para tu próximo giro!'
            }
          </div>
          <ResetBar cd={resetCd} onReset={reset} />
        </div>
      )}
    </div>
  )
}

function ResetBar({ cd, onReset }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Volviendo al inicio en {cd}s</div>
      <button onClick={onReset} style={{
        background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10,
        padding: '8px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      }}>
        Volver ahora
      </button>
    </div>
  )
}
