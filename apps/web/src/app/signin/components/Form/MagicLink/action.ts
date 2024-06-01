'use server'

import { signIn } from '$/auth'
import { ROUTES } from '$/lib/routes'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function magicLinkAction(formData: FormData) {
  const redirectTo = formData?.get('redirectTo')?.toString() ?? '/'
  try {
    await signIn('nodemailer', {
      redirectTo,
      email: formData?.get('email')?.toString(),
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${ROUTES.signin.error}?error=${error.type}`)
    }

    throw error
  }
}
