import { KindleCountry } from '$/lib/types'
import { JWT } from 'next-auth/jwt'

export interface AppUser {
  id: string
  name?: string | null
  username?: string | null
  kindle?: KindleCountry | null
  hasCompletedOnboarding?: boolean
}

export function isCompleted(token: JWT | null | undefined) {
  return !!token?.name && !!token?.username && !!token?.kindle
}
