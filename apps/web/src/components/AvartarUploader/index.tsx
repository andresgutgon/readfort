'use client'

import { useRef, useState } from 'react'

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
        'pointer-events-none absolute w-full h-full rounded-full animate-circle',
        className,
      )}
    />
  )
}
export default function AvatarUploader({ url, alt, fallback }: AvatarProps) {
  const [tempImgUrl, setTempImgUrl] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickZone = () => {
    inputRef.current?.click()
  }

  const onChange = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    setTempImgUrl(URL.createObjectURL(file))
  }

  return (
    <Dropzone
      ref={inputRef}
      onChange={onChange}
      multiple={false}
      accept='image/*'
    >
      {({ isDragging }) => (
        <form
          onClick={onClickZone}
          onSubmit={(e) => {
            e.preventDefault()
            const file = inputRef.current?.files?.[0]
            if (!file) return

            console.log('Uploading', file)
          }}
          className={cn(
            'cursor-pointer rounded-full p-10 flex flex-col items-center justify-center gap-y-2',
            {
              'ring ring-gray-100': isDragging,
            },
          )}
        >
          <div className='relative z-10 flex items-center justify-center'>
            <AnimatedCircle className='bg-gray-200 animation-delay-[4s]' />
            <AnimatedCircle className='bg-gray-10 animation-delay-[2s]' />
            <AnimatedCircle className='bg-white animation-delay-[0s]' />
            <Avatar
              url={tempImgUrl ?? url}
              alt={alt}
              fallback={fallback}
              className='w-12 h-12'
            />
            <div className='absolute -bottom-8 left-0 right-0 flex justify-center'>
              <Button
                disabled={!tempImgUrl}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                variant='outline'
                size='sm'
              >
                Upload
              </Button>
            </div>
          </div>
        </form>
      )}
    </Dropzone>
  )
}
