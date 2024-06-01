import { Avatar } from '@readfort/ui'
import SigninButton from '$/app/signin/components/SigninButton'
import SignoutButton from '$/app/signin/components/SignoutButton'
import { auth } from '$/auth'
import getUserInfoFromSession from '$/lib/getUserInfoFromSession'

export default async function Home() {
  const session = await auth()
  const info = getUserInfoFromSession(session)
  return (
    <div className='h-screen flex flex-col gap-y-4 items-center justify-center'>
      {session ? (
        <div className='flex items-center space-x-4'>
          <Avatar url={undefined} alt={info.name} fallback={info.fallback} />
          <div>
            <span className='block font-medium text-gray-700'>{info.name}</span>
            <span className='text-sm text-gray-500'>{info.email}</span>
          </div>
          <SignoutButton />
        </div>
      ) : (
        <SigninButton />
      )}
    </div>
  )
}
