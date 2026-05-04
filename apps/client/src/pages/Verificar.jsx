import { useState } from 'react'
import { Star, CheckCircle, XCircle, Trophy, Tag, Search, Loader2, Gift } from 'lucide-react'

// Datos base de usuarios (en producción esto viene de Supabase)
const MOCK_USERS = {
  'SL-2024-00142': { full_name: 'María González', dni: '32145678', shopping_name: 'Shopping San Luis', role: 'Empleada de local', active: true },
  'SL-2024-00001': { full_name: 'Carlos Méndez', dni: '28456123', shopping_name: 'Shopping San Luis', role: 'Administrador', active: true },
  'SL-2024-00143': { full_name: 'Laura Sosa', dni: '35789456', shopping_name: 'Shopping San Luis', role: 'Empleada de local', active: true },
  'SL-2024-00144': { full_name: 'Diego Torres', dni: '29654123', shopping_name: 'Shopping San Luis', role: 'Empleado de local', active: false },
}

const TODAY = new Date().toDateString()

function getUserData(credential) {
  const user = MOCK_USERS[credential]
  if (!user) return null

  const spinDate = localStorage.getItem(`spin_date_${credential}`)
  const prize = localStorage.getItem(`spin_prize_${credential}`)
  const wonToday = spinDate === TODAY && prize && prize !== '¡Mejor suerte!'

  const claimedBenefits = JSON.parse(localStorage.getItem(`claimed_benefits_${credential}`) || '[]')

  return {
    ...user,
    prize: wonToday ? prize : null,
    claimedBenefits,
  }
}

export default function Verificar() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [redeemedIds, setRedeemedIds] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setRedeemedIds([])

    setTimeout(() => {
      const data = getUserData(input.trim().toUpperCase())
      setResult(data || null)
      setSearched(true)
      setLoading(false)
    }, 600)
  }

  function handleRedeem(benefit) {
    const credential = input.trim().toUpperCase()
    const key = `claimed_benefits_${credential}`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = existing.filter((b) => b.id !== benefit.id)
    localStorage.setItem(key, JSON.stringify(updated))
    setRedeemedIds((prev) => [...prev, benefit.id])
    setResult((prev) => ({ ...prev, claimedBenefits: updated }))
  }

  const hasPrizeToday = !!result?.prize

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/8 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10 space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-bold">Club de Beneficios</span>
          </div>
          <h1 className="text-xl font-bold text-white">Verificar credencial</h1>
          <p className="text-gray-400 text-sm mt-1">Ingresá el número de credencial del cliente</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setSearched(false); setResult(null) }}
              placeholder="Ej: SL-2024-00142"
              className="w-full bg-dark-700 border border-dark-500 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-12 text-sm font-mono tracking-wider focus:outline-none focus:border-brand-500 transition-colors uppercase"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-dark-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Buscando...</>
            ) : (
              'Verificar'
            )}
          </button>
        </form>

        {/* Result */}
        {searched && !loading && (
          <>
            {!result ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
                <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Credencial no encontrada</p>
                <p className="text-gray-400 text-xs mt-1">
                  El número <span className="font-mono text-red-400">{input.toUpperCase()}</span> no existe o no es válido
                </p>
              </div>
            ) : !result.active ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
                <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Credencial inactiva</p>
                <p className="text-gray-400 text-xs mt-1">Este usuario no tiene acceso al club</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Valid status */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-bold">Credencial válida</p>
                    <p className="text-xs text-gray-400 font-mono">{input.toUpperCase()}</p>
                  </div>
                </div>

                {/* User info */}
                <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {result.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{result.full_name}</p>
                    <p className="text-gray-400 text-sm">{result.role}</p>
                    <p className="text-gray-500 text-xs">DNI {result.dni}</p>
                  </div>
                </div>

                {/* Premio de ruleta */}
                {hasPrizeToday && (
                  <div className="bg-brand-600/10 border border-brand-600/40 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-xs">Premio de ruleta pendiente</p>
                      <p className="text-white font-bold text-lg">{result.prize}</p>
                    </div>
                  </div>
                )}

                {/* Beneficios reclamados */}
                {result.claimedBenefits?.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      Beneficios a canjear ({result.claimedBenefits.length})
                    </p>
                    {result.claimedBenefits.map((b) => (
                      <div key={b.id} className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                          style={{ backgroundColor: b.color }}
                        >
                          {b.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400">{b.local_name}</p>
                          <p className="text-white text-sm font-medium leading-tight">{b.title}</p>
                        </div>
                        <button
                          onClick={() => handleRedeem(b)}
                          className="flex-shrink-0 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Canjear
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  !hasPrizeToday && (
                    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Tag className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Sin beneficios pendientes</p>
                        <p className="text-gray-500 text-xs">El cliente no tiene nada para canjear</p>
                      </div>
                    </div>
                  )
                )}

                {/* New search */}
                <button
                  onClick={() => { setInput(''); setResult(null); setSearched(false) }}
                  className="w-full py-2.5 border border-dark-500 text-gray-400 hover:text-white hover:border-dark-400 rounded-xl text-sm transition-colors"
                >
                  Verificar otro cliente
                </button>
              </div>
            )}
          </>
        )}

        <p className="text-center text-gray-600 text-xs">
          Solo para uso interno de locales adheridos
        </p>
      </div>
    </div>
  )
}
