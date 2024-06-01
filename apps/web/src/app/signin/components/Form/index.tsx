import { HTMLAttributes } from 'react'

import magicLinkAction from '$/app/signin/components/Form/MagicLink/action'
import { type ProviderItem } from '$/auth'

import MagicLink from './MagicLink'
import OauthButton from './OauthButton'

function OrClause() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center'>
        <span className='w-full border-t' />
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>
          Or email
        </span>
      </div>
    </div>
  )
}

type Props = HTMLAttributes<HTMLDivElement> & {
  callbackUrl: string
  providers: ProviderItem[]
}
export default function SigninForm({ providers, callbackUrl }: Props) {
  return (
    <div className='grid gap-6'>
      {providers.length > 0 ? (
        <>
          {providers.map((provider) => (
            <OauthButton
              fullWidth
              key={provider.id}
              {...provider}
              callbackUrl={callbackUrl}
            />
          ))}
        </>
      ) : null}
      <OrClause />
      <form action={magicLinkAction}>
        <MagicLink redirectTo={callbackUrl} />
      </form>
    </div>
  )
}
