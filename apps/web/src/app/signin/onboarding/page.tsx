import SigninHeader from '$/app/signin/components/SigninHeader'
import OnboardingForm from '$/app/signin/onboarding/OnboardingFrom'
import { auth } from '$/auth'
import { CLAIN_DESCRIPTION } from '$/constants'
import getUserInfo from '$/lib/user/getInfo'
import { Avatar } from '$ui/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finish Account setup - Readfort',
  description: CLAIN_DESCRIPTION,
}

export default async function OnboardingPage() {
  const session = await auth()
  const info = getUserInfo({
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  })
  return (
    <>
      <div className='flex flex-col items-center gap-y-4'>
        <Avatar
          url={info.image}
          alt={info.name}
          fallback={info.fallback}
          className='w-12 h-12'
        />
        <SigninHeader
          title='Almost there! 💪'
          description='Review your details and complete your registration.'
        />
      </div>
      <OnboardingForm
        name={session?.user?.name ?? ''}
        email={session?.user?.email ?? ''}
        username={session?.user?.username ?? ''}
        kindle={session?.user?.kindle}
      />
    </>
  )
}
