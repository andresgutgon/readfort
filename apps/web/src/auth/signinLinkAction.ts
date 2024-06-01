import { ROUTES } from '$/lib/routes'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signinLink({ redirectTo }: { redirectTo?: string }) {
  const origin = headers().get('origin')
  const callbackUrl = redirectTo ? redirectTo : origin ?? '/'
  redirect(`${ROUTES.signin.root}?callbackUrl=${callbackUrl}`)
}
