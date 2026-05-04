import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, Gauge, Newspaper, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard',   icon: Home,        label: 'Inicio'     },
  { to: '/beneficios',  icon: ShoppingBag, label: 'Beneficios' },
  { to: '/ruleta',      icon: Gauge,       label: 'Ruleta'     },
  { to: '/novedades',   icon: Newspaper,   label: 'Novedades'  },
  { to: '/perfil',      icon: User,        label: 'Perfil'     },
]

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#e9e3dc' }}>
      <div style={{ maxWidth: 430, width: '100%', margin: '0 auto', background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <main className="flex-1 pb-20">
        {children}
      </main>

      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        background: '#fff',
        borderTop: '1px solid var(--line)',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: 430, margin: '0 auto' }}>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 3, padding: '10px 0 8px', minWidth: 56,
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.03em',
                }}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.75} />
                  <span>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      </div>
    </div>
  )
}
