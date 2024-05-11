import {
  OauthButton as OauthButtonPrimitive,
  type OauthProviderType,
} from '@readfort/ui'
import { signIn, type ProviderItem } from '$/auth'

export default async function OuathButton({
  id: untypedId,
  name,
  callbackUrl,
  fullWidth,
}: ProviderItem & { callbackUrl: string; fullWidth?: boolean }) {
  const id = untypedId as OauthProviderType
  return (
    <form
      action={async () => {
        'use server'
        await signIn(id, { redirectTo: callbackUrl })
      }}
    >
      <OauthButtonPrimitive fullWidth={fullWidth} oauth={{ id, name }} />
    </form>
  )
}
