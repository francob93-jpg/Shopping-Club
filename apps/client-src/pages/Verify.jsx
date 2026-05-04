import { useParams } from 'react-router-dom'
import { Star, CheckCircle, XCircle, Trophy, Tag, User } from 'lucide-react'

// Mock data for verification
const MOCK_CREDENTIALS = {
  'SL-2024-00142': {
    full_name: 'María González',
    dni: '32145678',
    shopping_name: 'Shopping San Luis',
    role: 'Empleada de local',
    active: true,
    prize: '20% OFF',
    prize_date: new Date().toDateString(),
    benefits_count: 6,
  },
  'SL-2024-00001': {
    full_name: 'Carlos Méndez',
    dni: '28456123',
    shopping_name: 'Shopping San Luis',
    role: 'Administrador',
    active: true,
    prize: null,
    prize_date: null,
    benefits_count: 6,
  },
}

export default function Verify() {
  const { credencial } = useParams()
  const data = MOCK_CREDENTIALS[credencial?.toUpperCase()]

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Credencial no encontrada</h1>
          <p className="text-gray-400 text-sm">
            El número <span className="font-mono text-brand-400">{credencial}</span> no existe o no es válido.
          </p>
        </div>
      </div>
    )
  }

  const hasPrizeToday = data.prize && data.prize_date === new Date().toDateString()

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10 space-y-4">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-bold text-sm">{data.shopping_name}</span>
          </div>
          <p className="text-gray-500 text-xs">Verificación de credencial</p>
        </div>

        {/* Status card */}
        <div className={`rounded-2xl p-4 border flex items-center gap-3 ${
          data.active
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          {data.active ? (
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          )}
          <div>
            <p className={`font-bold ${data.active ? 'text-green-400' : 'text-red-400'}`}>
              {data.active ? 'Credencial válida' : 'Credencial inactiva'}
            </p>
            <p className="text-xs text-gray-400 font-mono">{credencial?.toUpperCase()}</p>
          </div>
        </div>

        {/* User info */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold">
              {data.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-white font-bold">{data.full_name}</h2>
              <p className="text-gray-400 text-sm">{data.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-700 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-0.5">DNI</p>
              <p className="text-white font-semibold text-sm">{data.dni}</p>
            </div>
            <div className="bg-dark-700 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-0.5">Beneficios</p>
              <p className="text-white font-semibold text-sm">{data.benefits_count} disponibles</p>
            </div>
          </div>
        </div>

        {/* Prize today */}
        {hasPrizeToday ? (
          <div className="bg-brand-600/10 border border-brand-600/40 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Premio de ruleta pendiente de canje</p>
                <p className="text-white font-bold text-lg">{data.prize}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Sin premio de ruleta hoy</p>
              <p className="text-gray-500 text-xs">Puede acceder a todos los beneficios del club</p>
            </div>
          </div>
        )}

        <p className="text-center text-gray-600 text-xs pt-2">
          Club de Beneficios · {data.shopping_name}
        </p>
      </div>
    </div>
  )
}
