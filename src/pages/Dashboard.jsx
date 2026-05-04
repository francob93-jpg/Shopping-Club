import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Search, Tag, MapPin, ChevronRight, Sparkles } from 'lucide-react'

const MOCK_BENEFITS = [
  {
    id: 1,
    local_name: 'Starbucks',
    title: '20% de descuento en bebidas',
    description: 'Presentá tu credencial y obtené 20% off en toda la carta de bebidas calientes y frías.',
    category: 'Gastronomía',
    color: '#00704A',
    initials: 'SB',
    highlight: true,
  },
  {
    id: 2,
    local_name: 'Zara',
    title: '15% off en nueva temporada',
    description: 'Descuento exclusivo para empleados del shopping en toda la colección nueva.',
    category: 'Indumentaria',
    color: '#1a1a1a',
    initials: 'ZR',
    highlight: false,
  },
  {
    id: 3,
    local_name: 'McDonalds',
    title: 'Menú empleado $2.500',
    description: 'Combo especial con precio diferencial para empleados del shopping. Hamburguesa + papas + bebida.',
    category: 'Gastronomía',
    color: '#FFC72C',
    initials: 'MC',
    highlight: false,
  },
  {
    id: 4,
    local_name: 'Cinemark',
    title: '2x1 los martes',
    description: 'Comprá una entrada y llevate la segunda gratis todos los martes. Válido para todas las salas.',
    category: 'Entretenimiento',
    color: '#E31837',
    initials: 'CM',
    highlight: true,
  },
  {
    id: 5,
    local_name: 'Forever 21',
    title: '10% en accesorios',
    description: 'Descuento en toda la línea de accesorios y bijouterie.',
    category: 'Indumentaria',
    color: '#FF6B9D',
    initials: 'F21',
    highlight: false,
  },
  {
    id: 6,
    local_name: 'Farmacity',
    title: '5% extra sobre precios especiales',
    description: 'Aplicable sobre precios de tarjeta y descuentos vigentes del día.',
    category: 'Salud',
    color: '#E8001C',
    initials: 'FC',
    highlight: false,
  },
]

const CATEGORIES = ['Todos', 'Gastronomía', 'Indumentaria', 'Entretenimiento', 'Salud']

export default function Dashboard() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered = MOCK_BENEFITS.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.local_name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'Todos' || b.category === activeCategory
    return matchSearch && matchCategory
  })

  const highlighted = filtered.filter((b) => b.highlight)
  const regular = filtered.filter((b) => !b.highlight)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">Hola,</p>
        <h1 className="text-2xl font-bold text-white">{user?.full_name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-400 text-sm mt-1">
          Tenés <span className="text-brand-400 font-semibold">{MOCK_BENEFITS.length} beneficios</span> disponibles
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar beneficio o local..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-brand-600 text-white'
                : 'bg-dark-700 text-gray-400 hover:bg-dark-600 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Highlighted benefits */}
      {highlighted.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-gray-300">Destacados</h2>
          </div>
          <div className="grid gap-3">
            {highlighted.map((benefit) => (
              <BenefitCardHighlight key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      )}

      {/* All benefits */}
      {regular.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Todos los beneficios</h2>
          <div className="grid gap-3">
            {regular.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No se encontraron beneficios</p>
        </div>
      )}
    </div>
  )
}

function BenefitCardHighlight({ benefit }) {
  return (
    <div className="bg-dark-800 border border-brand-600/30 rounded-2xl p-4 card-glow cursor-pointer">
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: benefit.color }}
        >
          {benefit.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs text-brand-400 font-medium">{benefit.local_name}</span>
            <span className="text-xs bg-brand-600/20 text-brand-400 px-2 py-0.5 rounded-full">Destacado</span>
          </div>
          <h3 className="text-white font-semibold text-sm leading-tight">{benefit.title}</h3>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">{benefit.description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
      </div>
      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-dark-600">
        <MapPin className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-500">{benefit.category}</span>
      </div>
    </div>
  )
}

function BenefitCard({ benefit }) {
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 hover:border-dark-500 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ backgroundColor: benefit.color }}
        >
          {benefit.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">{benefit.local_name} · {benefit.category}</p>
          <h3 className="text-white font-medium text-sm truncate">{benefit.title}</h3>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </div>
    </div>
  )
}
