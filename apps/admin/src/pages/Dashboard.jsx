import { Users, Tag, Trophy, TrendingUp, RotateCcw, Gift, ArrowUpRight } from 'lucide-react'

const STATS = [
  { label: 'Usuarios activos', value: '47', icon: Users, color: 'brand', change: '+3 esta semana' },
  { label: 'Beneficios activos', value: '12', icon: Tag, color: 'purple', change: '2 sin activar' },
  { label: 'Giros hoy', value: '38', icon: RotateCcw, color: 'yellow', change: '81% de usuarios' },
  { label: 'Premios canjeados', value: '6', icon: Gift, color: 'green', change: 'Hoy' },
]

const RECENT_ACTIVITY = [
  { user: 'María González', action: 'Ganó 20% OFF en ruleta', time: 'Hace 5 min', type: 'prize' },
  { user: 'Diego Torres', action: 'Canjeó beneficio Starbucks', time: 'Hace 12 min', type: 'benefit' },
  { user: 'Laura Sosa', action: 'Primer giro del día', time: 'Hace 24 min', type: 'spin' },
  { user: 'Juan Pérez', action: 'Usuario registrado', time: 'Hace 1h', type: 'user' },
  { user: 'Ana Rodríguez', action: 'Ganó Café gratis en ruleta', time: 'Hace 2h', type: 'prize' },
]

const COLORS = {
  brand: { bg: 'bg-brand-500/10', text: 'text-brand-400' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400' },
}

const ACTIVITY_COLORS = {
  prize: 'bg-yellow-500/10 text-yellow-400',
  benefit: 'bg-brand-500/10 text-brand-400',
  spin: 'bg-blue-500/10 text-blue-400',
  user: 'bg-green-500/10 text-green-400',
}

export default function Dashboard() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Resumen</h1>
        <p className="text-gray-400 text-sm mt-1">Shopping San Luis · Hoy, {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${COLORS[color].bg}`}>
              <Icon className={`w-4 h-4 ${COLORS[color].text}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            <p className={`text-xs mt-1 ${COLORS[color].text}`}>{change}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity feed */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Actividad reciente</h2>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-dark-600 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${ACTIVITY_COLORS[item.type]}`}>
                  {item.user.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.user}</p>
                  <p className="text-gray-400 text-xs">{item.action}</p>
                </div>
                <p className="text-gray-500 text-xs whitespace-nowrap">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          <h2 className="text-white font-semibold">Acciones rápidas</h2>
          {[
            { label: 'Agregar usuario', desc: 'Registrar nuevo empleado', to: '/usuarios', color: 'brand' },
            { label: 'Nuevo beneficio', desc: 'Publicar oferta de un local', to: '/beneficios', color: 'purple' },
            { label: 'Configurar premios', desc: 'Ruleta y probabilidades', to: '/premios', color: 'yellow' },
          ].map(({ label, desc, to, color }) => (
            <a
              key={to}
              href={to}
              className="flex items-center justify-between bg-dark-800 border border-dark-600 hover:border-dark-500 rounded-2xl p-4 transition-colors group"
            >
              <div>
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
              <ArrowUpRight className={`w-4 h-4 text-gray-500 group-hover:${COLORS[color].text} transition-colors`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
