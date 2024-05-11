import { Button, cn } from '@readfort/ui'
import { signinLink } from '$/auth'

export default function SigninButton({
  redirectTo,
  fullWidth = false,
}: {
  fullWidth?: boolean
  redirectTo?: string
}) {
  return (
    <form
      className={cn({ 'w-full': fullWidth })}
      action={async (formData) => {
        'use server'
        const redirectTo = formData.get('redirectTo')?.toString()
        await signinLink({ redirectTo })
      }}
    >
      <input type='hidden' name='redirectTo' value={redirectTo} />
      <Button type='submit' fullWidth={fullWidth}>
        Sign In
      </Button>
    </form>
  )
}
