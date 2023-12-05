import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [initialize, setInitialize] = useState(false)

  onAuthStateChanged(auth, (user) => {
    console.log(user)
    setInitialize(true)
  })

  if (!initialize) return <div>인증처리중...</div>

  return <>{children}</>
}

export default AuthGuard
