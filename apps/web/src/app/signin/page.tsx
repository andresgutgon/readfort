import SigninForm from '$/app/signin/components/Form'
import SigninHeader from '$/app/signin/components/SigninHeader'
import { providerMap } from '$/auth'
import { CLAIN_DESCRIPTION } from '$/constants'
import { ROUTES } from '$/lib/routes'
import { PageProps } from '$/lib/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

const MAGIC_LINK = 'nodemailer'
const providers = providerMap.filter((provider) => provider.id !== MAGIC_LINK)

export const metadata: Metadata = {
  title: 'Login - Readfort',
  description: CLAIN_DESCRIPTION,
}

export default async function SignInPage(
  props: PageProps<'', 'callbackUrl' | 'error'>,
) {
  const error = props.searchParams.error
  const paramsCallback = props.searchParams.callbackUrl
  const callbackUrl = paramsCallback
    ? String(paramsCallback)
    : ROUTES.dashboard.root

  if (error) {
    redirect(`${ROUTES.signin.error}?error=${error}`)
  }

  return (
    <>
      <SigninHeader
        title='Access your books'
        description='Signing in with your Google account or email.'
      />
      <SigninForm callbackUrl={callbackUrl} providers={providers} />
    </>
  )
}
