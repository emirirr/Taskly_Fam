import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../core/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

interface Props {
  children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) {
    return <div>Yükleniyor…</div>
  }
  if (!user) {
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute
