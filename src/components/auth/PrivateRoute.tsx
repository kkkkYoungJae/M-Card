import useUser from '@/hooks/auth/useUser'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useUser()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
