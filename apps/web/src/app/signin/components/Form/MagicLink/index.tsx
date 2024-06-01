'use client'

import { useFormStatus } from 'react-dom'

import { Button, Input } from '@readfort/ui'

export default function MagicLink({ redirectTo }: { redirectTo: string }) {
  const status = useFormStatus()
  return (
    <>
      <input type='hidden' name='redirectTo' value={redirectTo} />
      <div className='grid gap-4'>
        <Input
          required
          label='Email'
          name='email'
          placeholder='Your email address'
          type='email'
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect='off'
        />
        <Button isLoading={status.pending}>Sign In with Email</Button>
      </div>
    </>
  )
}
