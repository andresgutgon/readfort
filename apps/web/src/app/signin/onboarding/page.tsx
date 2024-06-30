import SigninHeader from '$/app/signin/components/SigninHeader'
import OnboardingForm from '$/app/signin/onboarding/OnboardingFrom'
import { auth } from '$/auth'
import AvatarUploader from '$/components/AvatarUploader'
import { CLAIN_DESCRIPTION } from '$/constants'
import { ROUTES } from '$/lib/routes'
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
          currentRoute={ROUTES.signin.finish}
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
