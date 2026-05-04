import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Star, Copy, Check, CreditCard, Trophy, Tag, QrCode } from 'lucide-react'

export default function Perfil() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const copyCredential = () => {
    navigator.clipboard.writeText(user?.credential_number || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lastPrize = localStorage.getItem('last_prize')
  const lastSpinDate = localStorage.getItem('last_spin_date')

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        <p className="text-gray-400 text-sm">Tu credencial digital</p>
      </div>

      {/* Credential Card */}
      <div className="credential-card rounded-3xl p-6 relative">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
          <Star className="w-full h-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
              <span className="text-xs text-brand-400 font-semibold tracking-wider uppercase">
                Club de Beneficios
              </span>
            </div>
            <p className="text-gray-500 text-xs">{user?.shopping_name}</p>
          </div>
          <div className="bg-brand-600/20 text-brand-400 text-xs font-medium px-3 py-1 rounded-full border border-brand-600/30">
            Activo
          </div>
        </div>

        {/* User info */}
        <div className="mb-6">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3">
            {user?.avatar_initials}
          </div>
          <h2 className="text-white text-xl font-bold">{user?.full_name}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>

        {/* Credential number */}
        <div className="bg-dark-900/60 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs mb-1">Número de credencial</p>
            <p className="text-white font-bold font-mono text-lg tracking-widest">
              {user?.credential_number}
            </p>
          </div>
          <button
            onClick={copyCredential}
            className="p-2 bg-dark-700 hover:bg-dark-600 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* QR placeholder */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 text-center">
        <QrCode className="w-12 h-12 text-gray-500 mx-auto mb-2" />
        <p className="text-gray-400 text-sm font-medium">Código QR</p>
        <p className="text-gray-500 text-xs mt-1">Disponible próximamente</p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
          <CreditCard className="w-6 h-6 text-brand-500 mb-2" />
          <p className="text-gray-400 text-xs">DNI</p>
          <p className="text-white font-semibold text-sm">{user?.dni}</p>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4">
          <Tag className="w-6 h-6 text-purple-500 mb-2" />
          <p className="text-gray-400 text-xs">Rol</p>
          <p className="text-white font-semibold text-sm capitalize">
            {user?.role === 'shopping_admin' ? 'Administrador' : 'Empleado'}
          </p>
        </div>
      </div>

      {/* Last prize */}
      {lastPrize && lastPrize !== '¡Mejor suerte!' && (
        <div className="bg-brand-600/10 border border-brand-600/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Premio ganado hoy</p>
            <p className="text-white font-bold">{lastPrize}</p>
            {lastSpinDate && (
              <p className="text-gray-500 text-xs">{lastSpinDate}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
