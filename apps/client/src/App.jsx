import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Beneficios from './pages/Beneficios'
import Novedades from './pages/Novedades'
import Ruleta from './pages/Ruleta'
import Perfil from './pages/Perfil'
import MisBeneficios from './pages/MisBeneficios'
import Verify from './pages/Verify'
import Verificar from './pages/Verificar'
import Totem from './pages/Totem'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <Layout>{children}</Layout>
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/verify/:credencial" element={<Verify />} />
      <Route path="/verificar" element={<Verificar />} />
      <Route path="/totem" element={<Totem />} />
      <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/beneficios"   element={<ProtectedRoute><Beneficios /></ProtectedRoute>} />
      <Route path="/novedades"    element={<ProtectedRoute><Novedades /></ProtectedRoute>} />
      <Route path="/ruleta"       element={<ProtectedRoute><Ruleta /></ProtectedRoute>} />
      <Route path="/perfil"       element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/mis-beneficios" element={<ProtectedRoute><MisBeneficios /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
