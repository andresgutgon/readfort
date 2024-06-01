import { ReactNode } from 'react'

import { Logo } from '@readfort/ui'
import { CLAIN_DESCRIPTION } from '$/constants'
import Link from 'next/link'

export default async function SignInPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='container relative h-[800px] flex-col items-center justify-center pt-20 md:pt-0 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-950' />
        <div className='h-full flex justify-center items-center relative z-20'>
          <div className='flex flex-col gap-y-4'>
            <Link href='/'>
              <Logo />
            </Link>
            <blockquote className='space-y-2'>
              <p className='text-lg'>{CLAIN_DESCRIPTION}</p>
              <footer className='text-muted-foreground max-w-96'>
                Elevate your reading experience with note-taking to boost
                understanding, memory, and interaction with texts.
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          {children}
        </div>
      </div>
    </div>
  )
}
