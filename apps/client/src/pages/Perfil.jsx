import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CAT_GRADIENT = {
  gastro:    'linear-gradient(135deg, #c8102e 0%, #8e0a1f 100%)',
  cine:      'linear-gradient(135deg, #0f4c81 0%, #1a6cb3 100%)',
  servicios: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
}

const STATS = [
  { num: '12',   lbl: 'Canjes'    },
  { num: '$8.4k', lbl: 'Ahorrado' },
  { num: '7',    lbl: 'Giros mes' },
]

const HISTORIAL = [
  { cat: 'gastro',    t: '30% OFF Café Martínez',   d: '21 abr · 10:42', v: '$890'   },
  { cat: 'cine',      t: '2x1 Showcase Cinemas',     d: '18 abr · 20:15', v: '$2.400' },
  { cat: 'servicios', t: 'Estacionamiento 2hs',       d: '15 abr · 14:08', v: '$600'   },
]

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const nombre = user?.full_name || 'María Fernández'
  const credencial = user?.credential_number || 'SL-2024-00142'
  const email = user?.email || 'maria.f@mail.com'
  const dni = user?.dni ? String(user.dni).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3') : '34.567.890'
  const telefono = user?.phone ? `+54 ${user.phone}` : '+54 358 555-1234'

  const personalRows = [
    {
      label: 'DNI', value: dni,
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
        </>
      ),
    },
    {
      label: 'Email', value: email,
      icon: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 7l9 6 9-6"/>
        </>
      ),
    },
    {
      label: 'Teléfono', value: telefono,
      icon: (
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.7.6 2.5a2 2 0 01-.5 2.1L8 9.5a16 16 0 006 6l1.3-1.3a2 2 0 012-.4 12 12 0 002.6.6A2 2 0 0122 17z"/>
      ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Mi cuenta
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1 }}>
            Credencial
          </div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/>
          </svg>
        </div>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Wallet Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4c0513 0%, #8e0a1f 45%, #c8102e 100%)',
          color: '#fff', borderRadius: 22, padding: 18,
          boxShadow: '0 20px 40px rgba(76, 5, 19, 0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', right: -50, top: -50, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(184,134,58,0.35)', pointerEvents: 'none' }}/>

          {/* Logo + badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 3 }}>
                <img src="https://www.paseodelaribera.com.ar/img/logo.png" alt="Paseo de la Ribera" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, letterSpacing: '0.04em' }}>
                Paseo de la Ribera
              </span>
            </div>
          </div>

          {/* Name */}
          <div style={{ marginTop: 26, position: 'relative' }}>
            <div style={{ fontSize: 10, opacity: 0.65, fontWeight: 600, letterSpacing: '0.14em' }}>TITULAR</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, marginTop: 2 }}>{nombre}</div>
          </div>

          {/* Credential + QR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, position: 'relative' }}>
            <div>
              <div style={{ fontSize: 10, opacity: 0.65, fontWeight: 600, letterSpacing: '0.14em' }}>Nº CREDENCIAL</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, marginTop: 3, letterSpacing: 1.2 }}>{credencial}</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3 }}>Socio desde Abril 2026</div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8e0a1f' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <path d="M14 14h3v3h-3zM18 14h3M14 18h3M18 21h3M21 18v3"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Hint */}
        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>
          </svg>
          Mostrá tu credencial en el ingreso y locales
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {STATS.map((s) => (
            <div key={s.lbl} style={{ background: '#fff', borderRadius: 14, padding: '14px 10px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Datos personales */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Datos personales
          </div>
          <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            {personalRows.map((r, i) => (
              <div key={r.label} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
                borderBottom: i < personalRows.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {r.icon}
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1, color: 'var(--ink)' }}>{r.value}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 6l6 6-6 6"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de canjes */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Historial de canjes
            </div>
            <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Ver todo</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            {HISTORIAL.map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderBottom: i < HISTORIAL.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: CAT_GRADIENT[h.cat] }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{h.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{h.d}</div>
                </div>
                <div style={{ color: '#1f7a4a', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>−{h.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 20, width: '100%', padding: '14px', borderRadius: 14,
            background: 'transparent', border: '1.5px solid var(--line)',
            color: 'var(--ink)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>

      </div>
    </div>
  )
}
