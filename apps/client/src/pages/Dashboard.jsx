import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Bell, ChevronRight, Clock, ShoppingBag, Gauge, Newspaper } from 'lucide-react'

const CAT_GRADIENT = {
  gastro:    'linear-gradient(135deg, #c8102e 0%, #8e0a1f 100%)',
  moda:      'linear-gradient(135deg, #1a1423 0%, #3d3449 100%)',
  cine:      'linear-gradient(135deg, #0f4c81 0%, #1a6cb3 100%)',
  salud:     'linear-gradient(135deg, #1f7a4a 0%, #2ea868 100%)',
  hogar:     'linear-gradient(135deg, #b8863a 0%, #d4a855 100%)',
  servicios: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
}

const FEATURED = {
  cat: 'gastro', store: 'Café Martínez · Local 12',
  title: '30% OFF en cafetería', expires: '30 abr', days: 'lun a vie',
}

const BENEFITS = [
  { id: 1, cat: 'gastro', title: '2x1 en combos',   store: 'Mostaza · Local 203',  expires: 'hasta 28/04', badge: '2x1'  },
  { id: 2, cat: 'moda',   title: 'Hasta 40% OFF',   store: 'Grimoldi · Local 08',  expires: 'hasta 15/05', badge: '-40%' },
  { id: 3, cat: 'cine',   title: 'Entrada + combo', store: 'Showcase · 3er piso',  expires: 'miércoles',   badge: '-25%' },
]

const CHIPS = ['Todos', 'Gastro', 'Moda', 'Entretenim.', 'Servicios']

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeChip, setActiveChip] = useState('Todos')

  const firstName = user?.full_name?.split(' ')[0] || 'Usuario'

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(160deg, #c8102e 0%, #8e0a1f 60%, #4c0513 100%)',
        borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        padding: '14px 20px 40px', color: '#fff',
      }}>
        {/* Logo + campana */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: 4,
            }}>
              <img src="https://www.paseodelaribera.com.ar/img/logo.png" alt="Paseo de la Ribera" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, letterSpacing: '0.04em' }}>
              Paseo de la Ribera
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 12,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bell size={18} strokeWidth={2} />
            </div>
            <span style={{
              position: 'absolute', top: 7, right: 8,
              width: 8, height: 8, borderRadius: '50%',
              background: '#e8c97b', border: '2px solid #4c0513',
            }} />
          </div>
        </div>

        {/* Saludo */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, opacity: 0.75, fontWeight: 500 }}>Hola,</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, marginTop: 2, lineHeight: 1.1 }}>
            {firstName}
          </div>
        </div>

        {/* Mini credencial */}
        <div style={{
          marginTop: 14,
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 18, padding: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.65, fontWeight: 600 }}>
              Mi credencial
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: 0.5 }}>
              {user?.credential_number || 'SL-2024-00142'}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 3 }}>
              Socio desde Abril 2026
            </div>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#fff', color: '#8e0a1f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <path d="M14 14h3v3h-3zM18 14h3M14 18h3M18 21h3M21 18v3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── CARD DESTACADO — fuera del hero, sin fondo propio para que el rojo se vea detrás ── */}
      <div style={{ padding: '0 20px', marginTop: -14 }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 24px rgba(26,20,35,0.13)' }}>
          <div style={{
            height: 140, position: 'relative',
            background: 'linear-gradient(160deg, #d4a843 0%, #b8863a 55%, #7a5820 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 14,
          }}>
            <span style={{
              position: 'absolute', top: 12, left: 12,
              background: '#fff', color: 'var(--ink)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 999,
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}>
              Destacado
            </span>
            <div style={{ color: '#fff' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase' }}>
                {FEATURED.store}
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, lineHeight: 1, marginTop: 4 }}>
                {FEATURED.title}
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Vence <strong style={{ color: 'var(--ink)' }}>{FEATURED.expires}</strong> · {FEATURED.days}
            </div>
            <button
              onClick={() => navigate('/beneficios')}
              style={{
                background: 'var(--primary)', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(200,16,46,0.3)',
              }}
            >
              Ver beneficio
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ paddingBottom: 16 }}>

        {/* Accesos rápidos */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { icon: <ShoppingBag size={22} />, label: 'Beneficios', sub: '24 disponibles', to: '/beneficios' },
              { icon: <Gauge size={22} />,        label: 'Ruleta',     sub: '10 giros hoy',  to: '/ruleta'     },
              { icon: <Newspaper size={22} />,    label: 'Novedades',  sub: '3 nuevas',       to: '/novedades'  },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.to)}
                style={{
                  background: '#fff', borderRadius: 18, padding: 14, cursor: 'pointer',
                  boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: 8,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--primary-soft)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header sección */}
        <div style={{
          padding: '18px 20px 10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>Para vos hoy</span>
          <span
            onClick={() => navigate('/beneficios')}
            style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Ver todos →
          </span>
        </div>

        {/* Chips de filtro */}
        <div className="scrollbar-hide" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 8px' }}>
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

        {/* Cards de beneficios */}
        <div style={{ padding: '4px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BENEFITS.map((b) => (
            <div
              key={b.id}
              onClick={() => navigate('/beneficios')}
              style={{
                background: '#fff', borderRadius: 18, padding: 10,
                display: 'flex', gap: 12, alignItems: 'center',
                boxShadow: 'var(--shadow)', cursor: 'pointer',
              }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 12, flexShrink: 0,
                background: CAT_GRADIENT[b.cat],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 13,
              }}>
                {b.badge}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{b.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{b.store}</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 10, color: 'var(--primary)', marginTop: 4, fontWeight: 600,
                }}>
                  <Clock size={11} strokeWidth={2.5} />
                  {b.expires}
                </div>
              </div>
              <ChevronRight size={18} color="var(--muted)" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
