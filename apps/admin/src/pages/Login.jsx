import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) navigate('/dashboard')
    else setError(result.error)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ad-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'var(--ad-primary-soft)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div style={{ width: '100%', maxWidth: 360, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'var(--ad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              position: 'relative',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 24px var(--ad-primary-glow)',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>
              Pr
            </span>
            <div
              style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--ad-surface)',
                border: '1px solid var(--ad-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={13} color="var(--ad-ok)" />
            </div>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ad-ink)' }}>
            Panel de Administración
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--ad-muted)', marginTop: 6 }}>
            Club de Beneficios · Paseo de la Ribera
          </p>
        </div>

        {/* Demo hint */}
        <div
          style={{
            background: 'var(--ad-surface)',
            border: '1px solid var(--ad-line)',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 20,
            fontSize: 12,
            color: 'var(--ad-muted)',
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--ad-ink-2)' }}>Demo: </span>
          <span className="mono">admin@ribera.com</span>
          {' / '}
          <span className="mono">123456</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="ad-label">Email</label>
            <input
              className="ad-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shopping.com"
              required
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="ad-label">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                className="ad-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--ad-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                background: 'var(--ad-danger-soft)',
                border: '1px solid var(--ad-danger)',
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: 13,
                color: 'var(--ad-danger)',
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="ad-btn primary"
            style={{ width: '100%', padding: '11px 14px', fontSize: 14, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
                Ingresando…
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </>
            ) : (
              'Ingresar al panel'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
