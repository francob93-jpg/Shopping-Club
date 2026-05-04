import { useState } from 'react'
import { Plus, Trash2, Search, CheckCircle, XCircle, UserPlus } from 'lucide-react'

const INITIAL_USERS = [
  { id: 1, full_name: 'María González', email: 'maria@zara.com', dni: '32145678', phone: '2664123456', role: 'employee', active: true, credential: 'SL-2024-00142', local: 'Zara' },
  { id: 2, full_name: 'Laura Sosa', email: 'laura@starbucks.com', dni: '35789456', phone: '2664456789', role: 'employee', active: true, credential: 'SL-2024-00143', local: 'Starbucks' },
  { id: 3, full_name: 'Diego Torres', email: 'diego@mcdonalds.com', dni: '29654123', phone: '2664987123', role: 'employee', active: false, credential: 'SL-2024-00144', local: "McDonald's" },
  { id: 4, full_name: 'Ana Rodríguez', email: 'ana@cinemark.com', dni: '37456123', phone: '2664321456', role: 'employee', active: true, credential: 'SL-2024-00145', local: 'Cinemark' },
]

const ROLES = { employee: 'Empleado de local', shopping_admin: 'Admin del shopping' }

function loadUsers() {
  const stored = localStorage.getItem('admin_users')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('admin_users', JSON.stringify(INITIAL_USERS))
  return INITIAL_USERS
}

function saveUsers(users) {
  localStorage.setItem('admin_users', JSON.stringify(users))
}

export default function Usuarios() {
  const [users, setUsers] = useState(loadUsers)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', dni: '', phone: '', role: 'employee', local: '', password: '' })

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.dni.includes(search)
  )

  const handleAdd = (e) => {
    e.preventDefault()
    const newUser = {
      ...form,
      id: Date.now(),
      active: true,
      credential: `SL-2024-00${String(users.length + 46).padStart(3, '0')}`,
    }
    const updated = [newUser, ...users]
    setUsers(updated)
    saveUsers(updated)
    setForm({ full_name: '', email: '', dni: '', phone: '', role: 'employee', local: '', password: '' })
    setShowForm(false)
  }

  const toggleActive = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, active: !u.active } : u)
    setUsers(updated)
    saveUsers(updated)
  }

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id)
    setUsers(updated)
    saveUsers(updated)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuarios</h1>
          <p className="text-gray-400 text-sm mt-1">{users.filter(u => u.active).length} activos · {users.length} total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar usuario</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800 border border-brand-600/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-500" />
            Nuevo usuario
          </h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Nombre completo *" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} required
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <input placeholder="Email *" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <input placeholder="DNI *" value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} required
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <input placeholder="Celular" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <input placeholder="Local (ej: Zara, Starbucks)" value={form.local} onChange={e => setForm({...form, local: e.target.value})}
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <input placeholder="Contraseña *" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required
              className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
              className="bg-dark-700 border border-dark-500 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500">
              <option value="employee">Empleado de local</option>
              <option value="shopping_admin">Admin del shopping</option>
            </select>
            <div className="sm:col-span-2 flex gap-2 pt-1">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-dark-500 text-gray-400 rounded-xl text-sm hover:bg-dark-700 transition-colors">
                Cancelar
              </button>
              <button type="submit" className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-500 transition-colors">
                Crear y generar credencial
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          placeholder="Buscar por nombre, email o DNI..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-dark-800 border border-dark-600 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Users list */}
      <div className="space-y-2">
        {filtered.map(u => (
          <div key={u.id} className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${u.active ? 'bg-brand-600' : 'bg-dark-600'}`}>
                  {u.full_name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{u.full_name}</p>
                  <p className="text-gray-400 text-xs">{u.email}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-brand-400 text-xs font-mono">{u.credential}</span>
                    {u.local && <span className="text-gray-500 text-xs">· {u.local}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`hidden sm:block text-xs px-2 py-0.5 rounded-full ${u.active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                  {u.active ? 'Activo' : 'Inactivo'}
                </span>
                <button onClick={() => toggleActive(u.id)} className="p-1.5 text-gray-500 hover:text-yellow-400 transition-colors" title={u.active ? 'Desactivar' : 'Activar'}>
                  {u.active ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                </button>
                <button onClick={() => deleteUser(u.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>No se encontraron usuarios</p>
          </div>
        )}
      </div>
    </div>
  )
}
