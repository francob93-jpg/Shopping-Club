import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const DEMO_USERS = {
  'empleado@sanluis.com': {
    id: 'demo-employee',
    email: 'empleado@sanluis.com',
    full_name: 'Maria Gonzalez',
    dni: '32145678',
    phone: '2664123456',
    credential_number: 'PR-2024-00142',
    role: 'employee',
    shopping_id: '35e06fd6-6b8b-4f2e-aae6-648ffa48ff74',
    shopping_name: 'Paseo de la Ribera',
    avatar_initials: 'MG',
  },
  'admin@sanluis.com': {
    id: 'demo-admin',
    email: 'admin@sanluis.com',
    full_name: 'Carlos Mendez',
    dni: '28456123',
    phone: '2664987654',
    credential_number: 'PR-2024-00001',
    role: 'shopping_admin',
    shopping_id: '35e06fd6-6b8b-4f2e-aae6-648ffa48ff74',
    shopping_name: 'Paseo de la Ribera',
    avatar_initials: 'CM',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const buildUser = async (authUser) => {
    if (!authUser) return null
    const { data: profile } = await supabase
      .from('profiles')
      .select('*, shoppings(name)')
      .eq('id', authUser.id)
      .single()
    if (!profile) return null
    return {
      id: authUser.id,
      email: authUser.email,
      full_name: profile.full_name,
      dni: profile.dni,
      phone: profile.phone,
      credential_number: profile.credential_number,
      role: profile.role,
      shopping_id: profile.shopping_id,
      shopping_name: profile.shoppings?.name,
      avatar_initials: profile.full_name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        localStorage.removeItem('club_demo_user')
        try {
          setUser(await buildUser(session.user))
        } catch (e) {
          setUser(null)
        }
      } else {
        const storedDemoUser = localStorage.getItem('club_demo_user')
        setUser(storedDemoUser ? JSON.parse(storedDemoUser) : null)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        localStorage.removeItem('club_demo_user')
        try {
          setUser(await buildUser(session.user))
        } catch (e) {
          setUser(null)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim()
    const demoUser = DEMO_USERS[normalizedEmail]

    if (demoUser && password === '123456') {
      setUser(demoUser)
      localStorage.setItem('club_demo_user', JSON.stringify(demoUser))
      return { success: true, user: demoUser }
    }

    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 10000)
      )
      const { data, error } = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        timeout,
      ])
      if (error) return { success: false, error: 'Credenciales incorrectas' }
      const u = await buildUser(data.user)
      if (!u) return { success: false, error: 'Perfil no encontrado' }
      setUser(u)
      return { success: true, user: u }
    } catch (e) {
      if (e.message === 'timeout') return { success: false, error: 'Tiempo agotado, verificá tu conexión' }
      return { success: false, error: 'Error de conexión, intentá de nuevo' }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('club_demo_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
