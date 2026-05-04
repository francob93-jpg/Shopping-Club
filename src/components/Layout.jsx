import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutGrid, Ticket, User, Settings, LogOut, Star } from 'lucide-react'

export default function Layout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', icon: LayoutGrid, label: 'Beneficios' },
    { to: '/ruleta', icon: Ticket, label: 'Ruleta' },
    { to: '/perfil', icon: User, label: 'Mi Credencial' },
    ...(user?.role === 'shopping_admin'
      ? [{ to: '/admin', icon: Settings, label: 'Admin' }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Top bar */}
      <header className="bg-dark-800 border-b border-dark-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">
            {user?.shopping_name || 'Club de Beneficios'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">{user?.full_name}</p>
            <p className="text-xs text-brand-500 font-mono">{user?.credential_number}</p>
          </div>
          <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar_initials}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-600 z-50">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 px-4 text-xs transition-colors ${
                  isActive ? 'text-brand-500' : 'text-gray-500 hover:text-gray-300'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
