import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Clock, RotateCcw, Sparkles, Gift } from 'lucide-react'

const PRIZES = [
  { id: 1, label: '20% OFF', color: '#e8524a', textColor: '#fff' },
  { id: 2, label: '¡Mejor suerte!', color: '#2a2a2a', textColor: '#888' },
  { id: 3, label: 'Café gratis', color: '#7c3aed', textColor: '#fff' },
  { id: 4, label: '2x1 Cine', color: '#0891b2', textColor: '#fff' },
  { id: 5, label: '10% OFF', color: '#059669', textColor: '#fff' },
  { id: 6, label: '¡Mejor suerte!', color: '#2a2a2a', textColor: '#888' },
  { id: 7, label: 'Combo gratis', color: '#d97706', textColor: '#fff' },
  { id: 8, label: '15% OFF', color: '#db2777', textColor: '#fff' },
]

const SEGMENT_ANGLE = 360 / PRIZES.length

// Check if user already spun today
function alreadySpunToday() {
  const lastSpin = localStorage.getItem('last_spin_date')
  if (!lastSpin) return false
  const today = new Date().toDateString()
  return lastSpin === today
}

function getLastPrize() {
  return localStorage.getItem('last_prize')
}

export default function Ruleta() {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prize, setPrize] = useState(alreadySpunToday() ? getLastPrize() : null)
  const [hasSpun, setHasSpun] = useState(alreadySpunToday())
  const [showResult, setShowResult] = useState(false)
  const currentRotation = useRef(0)

  const spin = () => {
    if (spinning || hasSpun) return

    setSpinning(true)
    setShowResult(false)

    // Random winner index (weighted: 50% chance of "better luck")
    const winnerIndex = Math.floor(Math.random() * PRIZES.length)
    const winner = PRIZES[winnerIndex]

    // Calculate rotation: multiple full spins + land on winner
    const extraSpins = 5 + Math.floor(Math.random() * 5) // 5-10 full spins
    const targetAngle = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
    const totalRotation = currentRotation.current + (extraSpins * 360) + (360 - targetAngle)

    currentRotation.current = totalRotation
    setRotation(totalRotation)

    setTimeout(() => {
      setSpinning(false)
      setHasSpun(true)
      setPrize(winner.label)
      setShowResult(true)
      localStorage.setItem('last_spin_date', new Date().toDateString())
      localStorage.setItem('last_prize', winner.label)
    }, 4500)
  }

  const timeUntilNextSpin = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const diff = tomorrow - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Ruleta de Premios</h1>
        <p className="text-gray-400 text-sm">1 giro por día — ¡Probá tu suerte!</p>
      </div>

      {/* Wheel container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 -translate-y-2">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-brand-500 drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <motion.div
          className="relative w-72 h-72 rounded-full border-4 border-dark-600 shadow-2xl overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{
            duration: 4.5,
            ease: [0.17, 0.67, 0.12, 0.99],
          }}
          style={{ willChange: 'transform' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {PRIZES.map((prize, i) => {
              const startAngle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180)
              const endAngle = ((i + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180)
              const x1 = 100 + 100 * Math.cos(startAngle)
              const y1 = 100 + 100 * Math.sin(startAngle)
              const x2 = 100 + 100 * Math.cos(endAngle)
              const y2 = 100 + 100 * Math.sin(endAngle)
              const midAngle = ((i + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180)
              const textX = 100 + 62 * Math.cos(midAngle)
              const textY = 100 + 62 * Math.sin(midAngle)
              const textRotation = (i + 0.5) * SEGMENT_ANGLE

              return (
                <g key={prize.id}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={prize.color}
                    stroke="#0f0f0f"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={prize.textColor}
                    fontSize="8"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    style={{ userSelect: 'none' }}
                  >
                    {prize.label}
                  </text>
                </g>
              )
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="12" fill="#0f0f0f" stroke="#3a3a3a" strokeWidth="2" />
            <circle cx="100" cy="100" r="5" fill="#e8524a" />
          </svg>
        </motion.div>
      </div>

      {/* Spin button or result */}
      {!hasSpun ? (
        <button
          onClick={spin}
          disabled={spinning}
          className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-brand-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-600/30 text-lg flex items-center justify-center gap-2"
        >
          {spinning ? (
            <>
              <RotateCcw className="w-5 h-5 animate-spin" />
              Girando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              ¡Girar ahora!
            </>
          )}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Prize result */}
          {prize && prize !== '¡Mejor suerte!' ? (
            <div className="bg-brand-600/10 border border-brand-600/40 rounded-2xl p-5 text-center">
              <Trophy className="w-10 h-10 text-brand-500 mx-auto mb-2" />
              <p className="text-gray-300 text-sm mb-1">¡Felicitaciones! Ganaste:</p>
              <p className="text-2xl font-bold text-white">{prize}</p>
              <p className="text-gray-400 text-xs mt-2">Mostrá tu credencial para canjear</p>
            </div>
          ) : (
            <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 text-center">
              <Gift className="w-10 h-10 text-gray-500 mx-auto mb-2" />
              <p className="text-white font-semibold">¡Mejor suerte mañana!</p>
              <p className="text-gray-400 text-xs mt-1">Volvé mañana para otro intento</p>
            </div>
          )}

          {/* Next spin countdown */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Próximo giro en</p>
              <p className="text-brand-400 font-bold">{timeUntilNextSpin()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
