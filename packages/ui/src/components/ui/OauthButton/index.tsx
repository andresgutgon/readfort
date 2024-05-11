import { Button } from '$ui/components/ui/Button'
import { Icons } from '$ui/components/ui/Icons'

export type OauthProviderType = 'google'
type OauthProvider = { id: OauthProviderType; name: string }

function OauthIcons({
  id,
  size = 'normal',
}: OauthProvider & { size?: 'normal' }) {
  if (id === 'google') return <Icons.google size={size} />
  return null
}

export function OauthButton({
  oauth,
  onClick,
  isLoading,
  fullWidth,
  disabled = false,
}: {
  onClick?: () => void
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  oauth: OauthProvider
}) {
  return (
    <Button
      variant='outline'
      isLoading={isLoading}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
    >
      <div className='flex items-center space-x-2'>
        {!isLoading && <OauthIcons id={oauth.id} name={oauth.name} />}
        <div>Login with {oauth.name}</div>
      </div>
    </Button>
  )
}
