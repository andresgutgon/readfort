'use client'

import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@readfort/ui'
import { useSearchParams } from 'next/navigation'

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  CredentialsSignin = 'CredentialsSignin',
  OAuthAccountNotLinked = 'OAuthAccountNotLinked',
  EmailSignInError = 'EmailSignInError',
  Default = 'Default',
}

function ErrorTag({
  description,
  code,
}: {
  description: string
  code?: Error
}) {
  return (
    <>
      <p className='text-sm'>{description}</p>
      {code ? (
        <div className='mt-4'>
          <p className='text-sm'>
            Unique error code:{' '}
            <code className='text-xs bg-red-50 text-red-600 p-1 rounded-sm'>
              {code}
            </code>
          </p>
        </div>
      ) : null}
    </>
  )
}

const errorMap = {
  [Error.Configuration]: (
    <ErrorTag
      description='There was a problem when trying to authenticate. Please contact us if this error persists'
      code={Error.Configuration}
    />
  ),
  [Error.AccessDenied]: (
    <ErrorTag
      description='You have denied access to the application. Please try again or contact us if this error persists.'
      code={Error.AccessDenied}
    />
  ),
  [Error.CredentialsSignin]: (
    <ErrorTag
      description='There was a problem with your credentials. Please try again or contact us if this error persists.'
      code={Error.CredentialsSignin}
    />
  ),
  [Error.OAuthAccountNotLinked]: (
    <ErrorTag
      description="It looks like this email address is already registered, but it's not connected to the chosen social media account. To use this email, please try signing in with the original method you used to sign up."
      code={Error.OAuthAccountNotLinked}
    />
  ),
  [Error.EmailSignInError]: (
    <ErrorTag
      description="We couldn't start the login process with your email. This could be because the email address might be incorrect, the login link has expired, or there's a problem on our end. Please try again or check for any typing errors in your email address."
      code={Error.EmailSignInError}
    />
  ),
  [Error.Verification]: (
    <ErrorTag
      description='There was a problem verifying your account. Please contact us if this error persists. '
      code={Error.Verification}
    />
  ),
  [Error.Default]: (
    <ErrorTag description='There was a problem when trying to authenticate. Please contact us if this error persists' />
  ),
}

export default function ErrorCard({ children }: { children: ReactNode }) {
  const search = useSearchParams()
  const error = search.get('error') as Error
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signin Error</CardTitle>
        <CardDescription>Something went wrong</CardDescription>
      </CardHeader>
      <CardContent>{errorMap[error] ?? errorMap['Default']}</CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  )
}
