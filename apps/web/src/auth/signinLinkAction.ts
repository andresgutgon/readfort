import { SIGNIN_URL } from '$/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signinLink({ redirectTo }: { redirectTo?: string }) {
  const origin = headers().get('origin')
  const callbackUrl = redirectTo ? redirectTo : origin ?? '/'
  redirect(`${SIGNIN_URL}?callbackUrl=${callbackUrl}`)
}
