import { useState } from 'react'
import { Plus, Edit3, Trash2, Trophy, AlertTriangle, Package } from 'lucide-react'

const INITIAL_PRIZES = [
  { id: 1, label: '20% OFF', probability: 10, active: true, stock: null },
  { id: 2, label: 'Café gratis', probability: 8, active: true, stock: null },
  { id: 3, label: '2x1 Cine', probability: 5, active: true, stock: null },
  { id: 4, label: '10% OFF', probability: 15, active: true, stock: null },
  { id: 5, label: 'Combo gratis', probability: 7, active: true, stock: null },
  { id: 6, label: '15% OFF', probability: 5, active: true, stock: null },
  { id: 7, label: '¡Mejor suerte!', probability: 50, active: true, stock: null },
]

function loadPrizes() {
  const stored = localStorage.getItem('admin_prizes')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('admin_prizes', JSON.stringify(INITIAL_PRIZES))
  return INITIAL_PRIZES
}

function savePrizes(prizes) {
  localStorage.setItem('admin_prizes', JSON.stringify(prizes))
}

const COLORS = ['bg-brand-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-gray-500']

export default function Premios() {
  const [prizes, setPrizes] = useState(loadPrizes)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ label: '', probability: '', stock: '' })

  const total = prizes.filter(p => p.active).reduce((sum, p) => sum + Number(p.probability), 0)
  const isValid = total === 100

  const resetForm = () => { setForm({ label: '', probability: '', stock: '' }); setEditingId(null); setShowForm(false) }

  const handleEdit = (p) => {
    setForm({ label: p.label, probability: String(p.probability), stock: p.stock !== null ? String(p.stock) : '' })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const stockValue = form.stock === '' ? null : Number(form.stock)
    let updated
    if (editingId) {
      updated = prizes.map(p => p.id === editingId
        ? { ...p, label: form.label, probability: Number(form.probability), stock: stockValue }
        : p)
    } else {
      updated = [...prizes, { id: Date.now(), label: form.label, probability: Number(form.probability), active: true, stock: stockValue }]
    }
    setPrizes(updated)
    savePrizes(updated)
    resetForm()
  }

  const deletePrize = (id) => {
    const updated = prizes.filter(p => p.id !== id)
    setPrizes(updated)
    savePrizes(updated)
  }

  const toggleActive = (id) => {
    const updated = prizes.map(p => p.id === id ? { ...p, active: !p.active } : p)
    setPrizes(updated)
    savePrizes(updated)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Premios de Ruleta</h1>
          <p className="text-gray-400 text-sm mt-1">Configurá qué puede ganar cada usuario</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo premio
        </button>
      </div>

      {/* Total indicator */}
      <div className={`rounded-2xl p-4 mb-6 border flex items-center gap-3 ${
        isValid ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
      }`}>
        {isValid
          ? <Trophy className="w-5 h-5 text-green-400 flex-shrink-0" />
          : <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        }
        <div>
          <p className={`font-semibold text-sm ${isValid ? 'text-green-400' : 'text-yellow-400'}`}>
            Total: {total}% {isValid ? '✓ Correcto' : `— Faltan ${100 - total}%`}
          </p>
          <p className="text-gray-400 text-xs">La suma de probabilidades debe ser exactamente 100%</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800 border border-brand-600/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-semibold mb-4">{editingId ? 'Editar premio' : 'Nuevo premio'}</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              placeholder="Nombre del premio (ej: Hamburguesa gratis)"
              value={form.label}
              onChange={e => setForm({ ...form, label: e.target.value })}
              required
              className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number" min="1" max="100"
                  placeholder="Probabilidad %"
                  value={form.probability}
                  onChange={e => setForm({ ...form, probability: e.target.value })}
                  required
                  className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <input
                  type="number" min="1"
                  placeholder="Stock (vacío = ilimitado)"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <p className="text-gray-500 text-xs">Total actual con este premio: {total + (Number(form.probability) || 0)}%</p>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={resetForm} className="flex-1 py-2.5 border border-dark-500 text-gray-400 rounded-xl text-sm hover:bg-dark-700 transition-colors">
                Cancelar
              </button>
              <button type="submit" className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-500 transition-colors">
                {editingId ? 'Guardar' : 'Agregar premio'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Visual bar */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 mb-4">
        <p className="text-gray-400 text-xs mb-3">Distribución visual</p>
        <div className="flex rounded-xl overflow-hidden h-6 gap-px">
          {prizes.filter(p => p.active).map((p, i) => (
            <div
              key={p.id}
              className={`${COLORS[i % COLORS.length]} flex items-center justify-center`}
              style={{ width: `${p.probability}%` }}
              title={`${p.label}: ${p.probability}%`}
            >
              {p.probability >= 10 && <span className="text-white text-xs font-bold">{p.probability}%</span>}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {prizes.filter(p => p.active).map((p, i) => (
            <div key={p.id} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${COLORS[i % COLORS.length]}`} />
              <span className="text-gray-400 text-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prize list */}
      <div className="space-y-2">
        {prizes.map((p, i) => {
          const agotado = p.stock !== null && p.stock <= 0
          return (
            <div key={p.id} className={`bg-dark-800 border rounded-2xl p-4 flex items-center justify-between ${agotado ? 'border-red-500/30 opacity-60' : 'border-dark-600'} ${!p.active && !agotado ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-8 rounded-md ${COLORS[i % COLORS.length]}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{p.label}</p>
                    {agotado && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Agotado</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-gray-400 text-xs">{p.probability}% de probabilidad</p>
                    {p.stock !== null && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Package className="w-3 h-3" />
                        <span>{p.stock} disponibles</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleEdit(p)} className="p-1.5 text-gray-500 hover:text-brand-400 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toggleActive(p.id)} className={`p-1.5 transition-colors ${p.active ? 'text-green-400 hover:text-gray-400' : 'text-gray-500 hover:text-green-400'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full border-2 ${p.active ? 'bg-green-400 border-green-400' : 'border-gray-500'}`} />
                </button>
                <button onClick={() => deletePrize(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
