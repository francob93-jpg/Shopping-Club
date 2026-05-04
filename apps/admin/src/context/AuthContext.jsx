import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const MOCK_ADMINS = {
  'admin@sanluis.com': {
    id: 'u2',
    email: 'admin@sanluis.com',
    full_name: 'Carlos Méndez',
    shopping_id: 'sh1',
    shopping_name: 'Shopping San Luis',
    avatar_initials: 'CM',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const admin = MOCK_ADMINS[email.toLowerCase()]
    if (admin && password === '123456') {
      setUser(admin)
      localStorage.setItem('admin_user', JSON.stringify(admin))
      return { success: true }
    }
    return { success: false, error: 'Credenciales incorrectas' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
