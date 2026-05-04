import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Gift, Trophy, Clock, CheckCircle, Archive } from 'lucide-react'

const MS_24H = 24 * 60 * 60 * 1000
const TODAY = new Date().toDateString()

function getRemainingTime(claimedAt) {
  const elapsed = Date.now() - new Date(claimedAt).getTime()
  const remaining = MS_24H - elapsed
  if (remaining <= 0) return null
  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

export default function MisBeneficios() {
  const { user } = useAuth()
  const [tab, setTab] = useState('activos')
  const [activeBenefits, setActiveBenefits] = useState([])
  const [history, setHistory] = useState([])
  const [prize, setPrize] = useState(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    const credential = user?.credential_number
    if (!credential) return

    // Beneficios activos (limpiar expirados)
    const raw = JSON.parse(localStorage.getItem(`claimed_benefits_${credential}`) || '[]')
    const now = Date.now()
    const active = raw.filter((b) => now - new Date(b.claimedAt).getTime() < MS_24H)
    localStorage.setItem(`claimed_benefits_${credential}`, JSON.stringify(active))
    setActiveBenefits(active)

    // Historial mensual
    const hist = JSON.parse(localStorage.getItem(`benefit_history_${credential}`) || '[]')
    setHistory(hist)

    // Premio ruleta
    const spinDate = localStorage.getItem(`spin_date_${credential}`)
    const spinPrize = localStorage.getItem(`spin_prize_${credential}`)
    if (spinDate === TODAY && spinPrize && spinPrize !== '¡Mejor suerte!') {
      setPrize(spinPrize)
    }
  }, [user])

  // Actualizar countdown cada minuto
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000)
    return () => clearInterval(interval)
  }, [])

  const totalActivos = activeBenefits.length + (prize ? 1 : 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Mis Beneficios</h1>
        <p className="text-gray-400 text-sm mt-1">Todo lo que tenés pendiente de canjear</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('activos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === 'activos' ? 'bg-brand-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          Activos
          {totalActivos > 0 && (
            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{totalActivos}</span>
          )}
        </button>
        <button
          onClick={() => setTab('historial')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            tab === 'historial' ? 'bg-brand-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Archive className="w-4 h-4" />
          Historial
        </button>
      </div>

      {/* Tab: Activos */}
      {tab === 'activos' && (
        <div className="space-y-3">
          {/* Premio ruleta */}
          {prize && (
            <div className="bg-brand-600/10 border border-brand-600/40 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-brand-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brand-400 font-medium">Premio de ruleta</p>
                  <p className="text-white font-bold">{prize}</p>
                </div>
                <span className="text-xs bg-brand-600/30 text-brand-300 px-2 py-1 rounded-full">Hoy</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">Acercate al local para canjearlo</p>
            </div>
          )}

          {/* Beneficios activos */}
          {activeBenefits.map((b) => {
            const remaining = getRemainingTime(b.claimedAt)
            return (
              <div key={b.id} className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{b.local_name}</p>
                    <p className="text-white font-medium text-sm leading-tight">{b.title}</p>
                  </div>
                </div>
                {remaining && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-dark-600">
                    <Clock className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-yellow-500 font-medium">Vence en {remaining}</span>
                  </div>
                )}
              </div>
            )
          })}

          {totalActivos === 0 && (
            <div className="text-center py-16 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No tenés beneficios activos</p>
              <p className="text-xs mt-1">Explorá los beneficios disponibles y reclamalos</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Historial */}
      {tab === 'historial' && (
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Archive className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Sin historial todavía</p>
              <p className="text-xs mt-1">Acá vas a ver los beneficios que fuiste usando</p>
            </div>
          ) : (
            [...history].reverse().map((h) => (
              <div key={h.id + h.lastClaimedAt} className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3 opacity-70">
                <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">Beneficio #{h.id}</p>
                  <p className="text-xs text-gray-500">Usado el {formatDate(h.lastClaimedAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
