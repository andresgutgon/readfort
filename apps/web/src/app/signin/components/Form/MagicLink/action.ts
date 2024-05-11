'use server'

import { signIn, SIGNIN_ERROR_URL } from '$/auth'
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
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }

    throw error
  }
}
