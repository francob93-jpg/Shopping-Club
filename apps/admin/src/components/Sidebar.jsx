import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Tag,
  CircleDot,
  Users,
  Receipt,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Inicio', icon: Home },
  { to: '/beneficios', label: 'Beneficios', icon: Tag, badge: '24' },
  { to: '/ruleta', label: 'Premios de Ruleta', icon: CircleDot },
  { to: '/usuarios', label: 'Usuarios', icon: Users },
  { to: '/canjes', label: 'Canjes', icon: Receipt },
]

const SECONDARY_ITEMS = [
  { label: 'Configuración', icon: Settings },
  { label: 'Ayuda', icon: HelpCircle },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'AD'

  return (
    <aside className="ad-side">
      {/* Brand */}
      <div className="ad-side-brand">
        <div className="mark">Pr</div>
        <div>
          <div className="brand-name">
            {user?.shopping_name || 'Paseo de la Ribera'}
          </div>
          <div className="brand-sub">Admin · Club</div>
        </div>
      </div>

      {/* Main nav */}
      <div className="ad-side-section">General</div>
      {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `ad-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={18} />
          <span>{label}</span>
          {badge && <span className="ad-nav-badge">{badge}</span>}
        </NavLink>
      ))}

      {/* Secondary nav */}
      <div className="ad-side-section">Cuenta</div>
      {SECONDARY_ITEMS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="ad-nav-item"
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}

      {/* Footer */}
      <div className="ad-side-footer">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ad-gold), var(--ad-primary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2, color: 'var(--ad-ink)' }}>
            {user?.full_name || 'Admin'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ad-muted)', marginTop: 1 }}>
            Admin · Marketing
          </div>
        </div>
        <button
          className="ad-icon-btn"
          style={{ width: 28, height: 28, border: 0, flexShrink: 0 }}
          title="Cerrar sesión"
          onClick={handleLogout}
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  )
}
