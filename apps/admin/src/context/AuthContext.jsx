import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// Demo admin for dev/testing
const DEMO_ADMINS = {
  'admin@ribera.com': {
    id: 'demo-admin',
    email: 'admin@ribera.com',
    full_name: 'Marina Acosta',
    role: 'shopping_admin',
    shopping_id: 'demo-shopping',
    shopping_name: 'Paseo de la Ribera',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const buildUser = async (authUser) => {
    if (!authUser) return null
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*, shoppings(name)')
        .eq('id', authUser.id)
        .single()

      if (!profile) return null
      // Only allow shopping admins
      if (profile.role !== 'shopping_admin') return null

      return {
        id: authUser.id,
        email: authUser.email,
        full_name: profile.full_name,
        role: profile.role,
        shopping_id: profile.shopping_id,
        shopping_name: profile.shoppings?.name,
      }
    } catch {
      return null
    }
  }

  useEffect(() => {
    const storedDemo = localStorage.getItem('admin_demo_user')
    if (storedDemo) {
      setUser(JSON.parse(storedDemo))
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        setUser(await buildUser(session?.user ?? null))
      } catch {
        setUser(null)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        setUser(await buildUser(session?.user ?? null))
      } catch {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    const normalized = email.toLowerCase().trim()
    const demoAdmin = DEMO_ADMINS[normalized]

    if (demoAdmin && password === '123456') {
      setUser(demoAdmin)
      localStorage.setItem('admin_demo_user', JSON.stringify(demoAdmin))
      return { success: true }
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
      if (!u) return { success: false, error: 'No tenés permisos de administrador' }
      setUser(u)
      return { success: true }
    } catch (e) {
      if (e.message === 'timeout') return { success: false, error: 'Tiempo agotado. Verificá tu conexión.' }
      return { success: false, error: 'Error de conexión. Intentá de nuevo.' }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('admin_demo_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
