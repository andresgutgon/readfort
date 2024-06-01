import { Button, cn } from '@readfort/ui'
import { signOut } from '$/auth'

export default function SignoutButton({
  fullWidth = false,
}: {
  fullWidth?: boolean
}) {
  return (
    <form
      className={cn({ 'w-full': fullWidth })}
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type='submit' fullWidth={fullWidth}>
        Log Out
      </Button>
    </form>
  )
}
