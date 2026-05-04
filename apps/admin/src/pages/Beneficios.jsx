import { useState } from 'react'
import { Plus, Trash2, Edit3, Search, Tag, Image } from 'lucide-react'

const CATEGORIES = ['Gastronomía', 'Indumentaria', 'Entretenimiento', 'Salud', 'Servicios', 'Otro']

const INITIAL_BENEFITS = [
  { id: 1, local_name: 'Starbucks', title: '20% de descuento en bebidas', description: 'Presentá tu credencial y obtené 20% off en toda la carta.', category: 'Gastronomía', active: true, highlight: true },
  { id: 2, local_name: 'Zara', title: '15% off en nueva temporada', description: 'Descuento exclusivo para empleados del shopping.', category: 'Indumentaria', active: true, highlight: false },
  { id: 3, local_name: "McDonald's", title: 'Menú empleado $2.500', description: 'Combo especial con precio diferencial.', category: 'Gastronomía', active: true, highlight: false },
  { id: 4, local_name: 'Cinemark', title: '2x1 los martes', description: 'Comprá una entrada y llevate la segunda gratis.', category: 'Entretenimiento', active: false, highlight: true },
]

export default function Beneficios() {
  const [benefits, setBenefits] = useState(INITIAL_BENEFITS)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ local_name: '', title: '', description: '', category: 'Gastronomía', highlight: false })

  const filtered = benefits.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.local_name.toLowerCase().includes(search.toLowerCase())
  )

  const resetForm = () => {
    setForm({ local_name: '', title: '', description: '', category: 'Gastronomía', highlight: false })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (b) => {
    setForm({ local_name: b.local_name, title: b.title, description: b.description, category: b.category, highlight: b.highlight })
    setEditingId(b.id)
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setBenefits(benefits.map(b => b.id === editingId ? { ...b, ...form } : b))
    } else {
      setBenefits([{ ...form, id: Date.now(), active: true }, ...benefits])
    }
    resetForm()
  }

  const toggleActive = (id) => setBenefits(benefits.map(b => b.id === id ? { ...b, active: !b.active } : b))
  const deleteBenefit = (id) => setBenefits(benefits.filter(b => b.id !== id))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Beneficios</h1>
          <p className="text-gray-400 text-sm mt-1">{benefits.filter(b => b.active).length} activos · {benefits.length} total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nuevo beneficio</span>
          <span className="sm:hidden">Nuevo</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-dark-800 border border-brand-600/30 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-semibold mb-4">
            {editingId ? 'Editar beneficio' : 'Nuevo beneficio'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Nombre del local *" value={form.local_name} onChange={e => setForm({...form, local_name: e.target.value})} required
                className="bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="bg-dark-700 border border-dark-500 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <input placeholder="Título del beneficio *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
              className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
            <textarea placeholder="Descripción del beneficio..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
              className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 resize-none" />

            {/* Image upload placeholder */}
            <div className="border-2 border-dashed border-dark-500 rounded-xl p-4 text-center text-gray-500 hover:border-dark-400 transition-colors cursor-pointer">
              <Image className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">Subir foto del local (próximamente)</p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.highlight} onChange={e => setForm({...form, highlight: e.target.checked})}
                className="w-4 h-4 accent-brand-600" />
              <span className="text-gray-300 text-sm">Marcar como destacado</span>
            </label>

            <div className="flex gap-2 pt-1">
              <button type="button" onClick={resetForm} className="flex-1 py-2.5 border border-dark-500 text-gray-400 rounded-xl text-sm hover:bg-dark-700 transition-colors">
                Cancelar
              </button>
              <button type="submit" className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-500 transition-colors">
                {editingId ? 'Guardar cambios' : 'Publicar beneficio'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-dark-800 border border-dark-600 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-500" />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map(b => (
          <div key={b.id} className={`bg-dark-800 border rounded-2xl p-4 transition-colors ${b.active ? 'border-dark-600' : 'border-dark-700 opacity-60'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-white text-sm font-semibold">{b.title}</p>
                  {b.highlight && <span className="text-xs bg-brand-600/20 text-brand-400 px-2 py-0.5 rounded-full">Destacado</span>}
                  {!b.active && <span className="text-xs bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded-full">Inactivo</span>}
                </div>
                <p className="text-gray-400 text-xs">{b.local_name} · {b.category}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{b.description}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => handleEdit(b)} className="p-1.5 text-gray-500 hover:text-brand-400 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toggleActive(b.id)} className={`p-1.5 transition-colors ${b.active ? 'text-green-400 hover:text-gray-400' : 'text-gray-500 hover:text-green-400'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full border-2 ${b.active ? 'bg-green-400 border-green-400' : 'border-gray-500'}`} />
                </button>
                <button onClick={() => deleteBenefit(b.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>No hay beneficios cargados</p>
          </div>
        )}
      </div>
    </div>
  )
}
