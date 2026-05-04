import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Mock user data for demo
const MOCK_USERS = {
  'empleado@sanluis.com': {
    id: 'u1',
    email: 'empleado@sanluis.com',
    full_name: 'María González',
    dni: '32145678',
    phone: '2664123456',
    credential_number: 'SL-2024-00142',
    role: 'employee',
    shopping_id: 'sh1',
    shopping_name: 'Shopping San Luis',
    avatar_initials: 'MG',
  },
  'admin@sanluis.com': {
    id: 'u2',
    email: 'admin@sanluis.com',
    full_name: 'Carlos Méndez',
    dni: '28456123',
    phone: '2664987654',
    credential_number: 'SL-2024-00001',
    role: 'shopping_admin',
    shopping_id: 'sh1',
    shopping_name: 'Shopping San Luis',
    avatar_initials: 'CM',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for persisted session
    const stored = localStorage.getItem('club_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock login — replace with Supabase auth
    const mockUser = MOCK_USERS[email.toLowerCase()]
    if (mockUser && password === '123456') {
      setUser(mockUser)
      localStorage.setItem('club_user', JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    }
    return { success: false, error: 'Credenciales incorrectas' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('club_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
