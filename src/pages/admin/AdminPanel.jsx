import { useState } from 'react'
import { Users, Tag, Trophy, BarChart3, Plus, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react'

const TABS = [
  { id: 'stats', label: 'Resumen', icon: BarChart3 },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'benefits', label: 'Beneficios', icon: Tag },
  { id: 'prizes', label: 'Premios', icon: Trophy },
]

const MOCK_USERS = [
  { id: 1, full_name: 'María González', email: 'empleado@sanluis.com', dni: '32145678', role: 'employee', active: true, credential: 'SL-2024-00142' },
  { id: 2, full_name: 'Carlos Méndez', email: 'admin@sanluis.com', dni: '28456123', role: 'shopping_admin', active: true, credential: 'SL-2024-00001' },
  { id: 3, full_name: 'Laura Sosa', email: 'laura@zara.com', dni: '35789456', role: 'employee', active: true, credential: 'SL-2024-00143' },
  { id: 4, full_name: 'Diego Torres', email: 'diego@mcdonalds.com', dni: '29654123', role: 'employee', active: false, credential: 'SL-2024-00144' },
]

const MOCK_BENEFITS = [
  { id: 1, local_name: 'Starbucks', title: '20% de descuento en bebidas', category: 'Gastronomía', active: true },
  { id: 2, local_name: 'Zara', title: '15% off en nueva temporada', category: 'Indumentaria', active: true },
  { id: 3, local_name: 'McDonalds', title: 'Menú empleado $2.500', category: 'Gastronomía', active: true },
  { id: 4, local_name: 'Cinemark', title: '2x1 los martes', category: 'Entretenimiento', active: false },
]

const MOCK_PRIZES = [
  { id: 1, label: '20% OFF', probability: 15, active: true },
  { id: 2, label: 'Café gratis', probability: 10, active: true },
  { id: 3, label: '2x1 Cine', probability: 5, active: true },
  { id: 4, label: '10% OFF', probability: 20, active: true },
  { id: 5, label: '¡Mejor suerte!', probability: 50, active: true },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('stats')
  const [showNewUser, setShowNewUser] = useState(false)
  const [users, setUsers] = useState(MOCK_USERS)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Panel de Admin</h1>
        <p className="text-gray-400 text-sm">Shopping San Luis</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-800 border border-dark-600 rounded-xl p-1 mb-6">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === id
                ? 'bg-brand-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Stats tab */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Usuarios activos" value={users.filter(u => u.active).length} icon={Users} color="brand" />
            <StatCard label="Beneficios activos" value={MOCK_BENEFITS.filter(b => b.active).length} icon={Tag} color="purple" />
            <StatCard label="Giros hoy" value="28" icon={Trophy} color="yellow" />
            <StatCard label="Premios canjeados" value="4" icon={CheckCircle} color="green" />
          </div>

          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
            <h3 className="text-white font-semibold mb-3 text-sm">Usuarios recientes</h3>
            <div className="space-y-2">
              {users.slice(0, 3).map(u => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-dark-600 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{u.full_name}</p>
                    <p className="text-gray-500 text-xs">{u.credential}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {u.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <button
            onClick={() => setShowNewUser(!showNewUser)}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar usuario
          </button>

          {showNewUser && <NewUserForm onClose={() => setShowNewUser(false)} onAdd={(u) => { setUsers([...users, { ...u, id: Date.now(), active: true, credential: `SL-2024-00${users.length + 45}` }]); setShowNewUser(false) }} />}

          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                    {u.full_name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{u.full_name}</p>
                    <p className="text-gray-500 text-xs">{u.email} · DNI {u.dni}</p>
                    <p className="text-brand-400 text-xs font-mono">{u.credential}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {u.active ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <button className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits tab */}
      {activeTab === 'benefits' && (
        <div className="space-y-4">
          <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo beneficio
          </button>
          <div className="space-y-2">
            {MOCK_BENEFITS.map(b => (
              <div key={b.id} className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{b.title}</p>
                  <p className="text-gray-500 text-xs">{b.local_name} · {b.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {b.active ? 'Activo' : 'Inactivo'}
                  </span>
                  <button className="p-1.5 text-gray-500 hover:text-brand-400 transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prizes tab */}
      {activeTab === 'prizes' && (
        <div className="space-y-4">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
            <p className="text-gray-400 text-xs mb-3">La probabilidad total debe sumar 100%</p>
            <div className="space-y-2">
              {MOCK_PRIZES.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-dark-600 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                    <span className="text-white text-sm">{p.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-brand-400 text-sm font-bold">{p.probability}%</span>
                    <button className="p-1.5 text-gray-500 hover:text-brand-400 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    brand: 'text-brand-500 bg-brand-500/10',
    purple: 'text-purple-400 bg-purple-400/10',
    yellow: 'text-yellow-400 bg-yellow-400/10',
    green: 'text-green-400 bg-green-400/10',
  }
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
    </div>
  )
}

function NewUserForm({ onClose, onAdd }) {
  const [form, setForm] = useState({ full_name: '', email: '', dni: '', phone: '', role: 'employee' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(form)
  }

  return (
    <div className="bg-dark-800 border border-brand-600/30 rounded-2xl p-4">
      <h3 className="text-white font-semibold mb-4">Nuevo usuario</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={e => setForm({...form, full_name: e.target.value})}
          required
          className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
          className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="DNI"
            value={form.dni}
            onChange={e => setForm({...form, dni: e.target.value})}
            required
            className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
          />
          <input
            placeholder="Celular"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        <select
          value={form.role}
          onChange={e => setForm({...form, role: e.target.value})}
          className="w-full bg-dark-700 border border-dark-500 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
        >
          <option value="employee">Empleado de local</option>
          <option value="shopping_admin">Admin del shopping</option>
        </select>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-dark-500 text-gray-400 rounded-xl text-sm hover:bg-dark-700 transition-colors">
            Cancelar
          </button>
          <button type="submit" className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-500 transition-colors">
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  )
}
