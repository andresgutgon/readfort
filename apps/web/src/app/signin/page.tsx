import SigninForm from '$/app/signin/components/Form'
import SigninHeader from '$/app/signin/components/SigninHeader'
import { providerMap } from '$/auth'
import { CLAIN_DESCRIPTION } from '$/constants'
import { PageProps } from '$/lib/types'
import { Metadata } from 'next'

const MAGIC_LINK = 'nodemailer'
const providers = providerMap.filter((provider) => provider.id !== MAGIC_LINK)

export const metadata: Metadata = {
  title: 'Login - Readfort',
  description: CLAIN_DESCRIPTION,
}

export default async function SignInPage(props: PageProps<'', 'callbackUrl'>) {
  const callbackUrl = String(props.searchParams.callbackUrl ?? '/')
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
