import { Icons } from '@readfort/ui'
import SigninHeader from '$/app/signin/components/SigninHeader'
import { CLAIN_DESCRIPTION } from '$/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Readfort',
  description: CLAIN_DESCRIPTION,
}

export default function VerifyRequestPage() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <Icons.mail className='w-8 h-8 text-green-500' />
      </div>
      <SigninHeader
        title='Email sent!'
        description='Chcek your inbox for a magic link to sign in.'
      />
    </>
  )
}
