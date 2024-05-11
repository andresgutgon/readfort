'use client'

import { useFormStatus } from 'react-dom'

import { Button, Input, Label } from '@readfort/ui'

export default function MagicLink({ redirectTo }: { redirectTo: string }) {
  const status = useFormStatus()
  return (
    <>
      <input type='hidden' name='redirectTo' value={redirectTo} />
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <Label className='sr-only' htmlFor='email'>
            Email
          </Label>
          <Input
            required
            id='email'
            name='email'
            placeholder='Your email address'
            type='email'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
          />
        </div>
        <Button isLoading={status.pending}>Sign In with Email</Button>
      </div>
    </>
  )
}
