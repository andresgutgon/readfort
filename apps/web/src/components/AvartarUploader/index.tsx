'use client'

import { useRef } from 'react'

import {
  Avatar,
  Button,
  cn,
  Dropzone,
  type Props as AvatarProps,
} from '@readfort/ui'

function AnimatedCircle({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute w-1/2 h-1/2 rounded-full animate-circle',
        className,
      )}
    />
  )
}
export default function AvatarUploader({ url, alt, fallback }: AvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef.current?.click()
  }

  const onChange = (files: FileList | null) => {
    const file = files?.[0]
    console.log('FILE', file)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-y-2'>
      <Dropzone
        ref={inputRef}
        onChange={onChange}
        multiple={false}
        accept='image/*'
      >
        {({ isDragging }) => (
          <div
            className={cn(
              'overflow-hidden relative rounded-full p-20 flex flex-col items-center justify-center',
              {
                'ring ring-gray-100': isDragging,
              },
            )}
          >
            <AnimatedCircle className='bg-gray-100 animation-delay-[4s]' />
            <AnimatedCircle className='bg-gray-50 animation-delay-[2s]' />
            <AnimatedCircle className='bg-white animation-delay-[0s]' />
            <Avatar
              url={url}
              alt={alt}
              fallback={fallback}
              className='w-12 h-12'
            />
          </div>
        )}
      </Dropzone>
      <Button onClick={onClick} variant='outline' size='sm'>
        Upload
      </Button>
    </div>
  )
}
