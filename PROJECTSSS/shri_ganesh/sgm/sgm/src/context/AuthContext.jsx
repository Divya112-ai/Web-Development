import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Hardcoded admin credentials (in production, use backend JWT)
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'sgm@2025'

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('sgm_admin')
    if (saved === 'true') setIsLoggedIn(true)
    setLoading(false)
  }, [])

  const login = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsLoggedIn(true)
      localStorage.setItem('sgm_admin', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('sgm_admin')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
