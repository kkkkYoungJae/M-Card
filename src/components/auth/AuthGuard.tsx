import { userAtom } from '@/atoms/user'
import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (!initialize) return <div>인증처리중...</div>

  return <>{children}</>
}

export default AuthGuard
