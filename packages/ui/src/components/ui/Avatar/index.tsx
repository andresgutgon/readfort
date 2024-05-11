'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '$ui/lib/utils'

const AvatarRoot = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
})

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
})

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatartFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    />
  )
})

function Avatar({
  url,
  alt,
  fallback,
}: {
  url?: string | undefined | null
  alt: string
  fallback: string
}) {
  return (
    <AvatarRoot>
      {url ? <AvatarImage src={url} alt={alt} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarRoot>
  )
}
export { Avatar, AvatarRoot, AvatarImage, AvatarFallback }
