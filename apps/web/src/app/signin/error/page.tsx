import SigninButton from '$/app/signin/components/SigninButton'
import ErrorCard from '$/app/signin/error/ErrorCard'

export default function AuthErrorPage() {
  return (
    <ErrorCard>
      <SigninButton fullWidth />
    </ErrorCard>
  )
}
