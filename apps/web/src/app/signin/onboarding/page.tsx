import { Avatar } from '@readfort/ui'
import SigninHeader from '$/app/signin/components/SigninHeader'
import OnboardingForm from '$/app/signin/onboarding/OnboardingFrom'
import { auth } from '$/auth'
import AvatarUploader from '$/components/AvartarUploader'
import { CLAIN_DESCRIPTION } from '$/constants'
import getUserInfo from '$/lib/user/getInfo'
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
      <div className='relative flex flex-col items-center gap-y-4'>
        <AvatarUploader
          url={info.image}
          alt={info.name}
          fallback={info.fallback}
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
