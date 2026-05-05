import { useLocation } from 'react-router-dom'
import { Search, Bell, HelpCircle, ChevronRight } from 'lucide-react'

const ROUTE_LABELS = {
  '/dashboard': 'Inicio',
  '/beneficios': 'Beneficios',
  '/ruleta': 'Premios de Ruleta',
  '/usuarios': 'Usuarios',
  '/canjes': 'Canjes',
}

export default function Topbar() {
  const location = useLocation()
  const currentLabel = ROUTE_LABELS[location.pathname] || 'Panel Admin'

  return (
    <div className="ad-topbar">
      <div className="ad-breadcrumb">
        <span>Admin</span>
        <ChevronRight size={14} style={{ opacity: 0.5 }} />
        <b>{currentLabel}</b>
      </div>

      <div className="ad-search">
        <Search size={16} />
        <input placeholder="Buscar usuarios, beneficios, locales…" />
        <span className="kbd">⌘K</span>
      </div>

      <button className="ad-icon-btn" title="Notificaciones">
        <Bell size={16} />
        <span className="dot" />
      </button>

      <button className="ad-icon-btn" title="Ayuda">
        <HelpCircle size={16} />
      </button>
    </div>
  )
}
