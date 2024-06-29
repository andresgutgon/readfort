'use client'

import { useState } from 'react'

import { Badge, Button, Input, useToast } from '@readfort/ui'
import { onboarding } from '$/actions/user/onboarding'
import KindleSelect from '$/app/signin/onboarding/OnboardingFrom/KindleSelect'
import { KindleCountry } from '$/lib/types'
import { useServerAction } from 'zsa-react'

function UsernameDescription({ username }: { username: string }) {
  return (
    <div className='flex items-center gap-x-0.5'>
      <span className='py-0.5 text-xs text-muted-foreground'>
        https://example.com/u/
      </span>
      <Badge variant='secondary' className='px-1'>
        {username ? username : 'your-username'}
      </Badge>
    </div>
  )
}

export default function OnboardingForm({
  name,
  email,
  username,
  kindle,
}: {
  email: string
  name: string
  username: string
  kindle?: KindleCountry | null | undefined
}) {
  const [currentUsername, setUserName] = useState(username)
  const { toast } = useToast()
  const { data, executeFormAction, isPending, error } = useServerAction(
    onboarding,
    {
      initialData: { name, username, kindle: kindle! },
      persistedData: true,
      persistedError: true,
      onError: ({ err }) => {
        if (err.code === 'ERROR') {
          toast({
            title: 'Saving failed',
            description: err.message,
            variant: 'destructive',
          })
        }
      },
    },
  )
  const fieldErrors = error?.fieldErrors
  return (
    <form action={executeFormAction} className='space-y-4'>
      <Input disabled type='email' name='email' defaultValue={email} />
      <Input
        type='text'
        name='name'
        errors={fieldErrors?.name}
        defaultValue={data?.name}
        placeholder='Write here your name'
        description='This is the name that will be displayed in your profile.'
      />
      <Input
        type='text'
        name='username'
        errors={fieldErrors?.username}
        defaultValue={data?.username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Pick a username'
        description={<UsernameDescription username={currentUsername} />}
      />
      <KindleSelect selected={data?.kindle} errors={fieldErrors?.kindle} />
      <Button
        fullWidth
        type='submit'
        disabled={isPending}
        isLoading={isPending}
      >
        Complete
      </Button>
    </form>
  )
}
