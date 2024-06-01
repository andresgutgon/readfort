import { Avatar } from '@readfort/ui'
import SignoutButton from '$/app/signin/components/SignoutButton'
import { auth } from '$/auth'
import getUserInfo from '$/lib/user/getInfo'

export default async function Dashboard() {
  const session = await auth()
  const info = getUserInfo({
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  })
  return (
    <div className='h-screen flex flex-col gap-y-4 items-center justify-center'>
      <div className='flex items-center space-x-4'>
        <h1>Dashboard</h1>
        <Avatar url={info.image} alt={info.name} fallback={info.fallback} />
        <div>
          <span className='block font-medium text-gray-700'>
            {info.name} (@{session!.user?.username})
          </span>
          <span className='text-sm text-gray-500'>{info.email}</span>
          <br />
          <span className='text-sm text-gray-500'>
            Profile completed:{' '}
            {session!.user?.hasCompletedOnboarding ? 'yes' : 'no'}
          </span>
        </div>
        <SignoutButton />
      </div>
    </div>
  )
}
