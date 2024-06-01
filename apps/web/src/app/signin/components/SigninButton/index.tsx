import { Button, cn } from '@readfort/ui'
import { signinLink } from '$/auth'
import { ROUTES } from '$/lib/routes'

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
        const inputRedirect = formData.get('redirectTo')?.toString()
        const redirectTo = inputRedirect ? inputRedirect : ROUTES.dashboard.root
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
