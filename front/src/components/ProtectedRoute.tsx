import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { request, ApiError } from '@/lib/ApiFetch'
import type { User } from './schema/User'
import { removeTokenCookie } from '@/lib/cookie'

type AuthState = 'pending' | 'ok' | 'unauthorized'

export default function ProtectedRoute() {
  const [auth, setAuth] = useState<AuthState>('pending')
  const location = useLocation()

  useEffect(() => {
    request<User>('user/me', { method: 'GET' })
      .then(() => setAuth('ok'))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) {
          removeTokenCookie()
        }
        setAuth('unauthorized')
      })
  }, [])

  if (auth === 'pending') return null
  if (auth === 'unauthorized') {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />
  }
  return <Outlet />
}
