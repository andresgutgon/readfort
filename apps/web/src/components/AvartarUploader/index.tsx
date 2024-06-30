'use client'

import { MouseEvent, useRef, useState } from 'react'

import {
  Avatar,
  Button,
  cn,
  Dropzone,
  Icons,
  Tooltip,
  type Props as AvatarProps,
} from '@readfort/ui'
import { deleteAvatarAction } from '$/actions/user/deleteAvatar'

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

type AvatarHandlerProps = AvatarProps & {
  onDelete?: () => void
}
function AvatarHandler({ onDelete, url, alt, fallback }: AvatarHandlerProps) {
  return (
    <>
      <Tooltip
        side='top'
        align='center'
        trigger={
          <div className='relative'>
            <div
              data-skip-zone-click
              role='button'
              onClick={onDelete}
              className='group z-10 absolute inset-0 rounded-full hover:bg-gray-900/70 flex items-center justify-center'
            >
              <Icons.trash className='w-6 h-6 text-white/80 opacity-0 group-hover:opacity-100' />
            </div>
            <Avatar
              url={url}
              alt={alt}
              fallback={fallback}
              className='w-12 h-12'
            />
          </div>
        }
      >
        Lost your avatar
      </Tooltip>
      <div className='absolute -bottom-6 left-0 right-0 flex justify-center'>
        <Button asChild variant='outline' size='sm'>
          <span>Change</span>
        </Button>
      </div>
    </>
  )
}

type ExistingAvatarProps = AvatarProps & {
  currentRoute: string
  tempImgUrl?: string
  setTempImgUrl: (url?: string) => void
}
function ExistingAvatar({
  url,
  alt,
  fallback,
  currentRoute,
  tempImgUrl,
  setTempImgUrl,
}: ExistingAvatarProps) {
  const onDelete = async () => {
    await deleteAvatarAction({ currentRoute })
    setTempImgUrl(undefined)
  }

  return (
    <div className='relative z-10 flex items-center justify-center'>
      <AnimatedCircle className='bg-gray-200 animation-delay-[4s]' />
      <AnimatedCircle className='bg-gray-10 animation-delay-[2s]' />
      <AnimatedCircle className='bg-white animation-delay-[0s]' />
      <AvatarHandler
        onDelete={onDelete}
        url={tempImgUrl ?? url}
        alt={alt}
        fallback={fallback}
        className='w-12 h-12'
      />
    </div>
  )
}

type Props = AvatarProps & {
  currentRoute: string
}
export default function AvatarUploader({
  url,
  alt,
  fallback,
  currentRoute,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tempImgUrl, setTempImgUrl] = useState<string>()

  const onClickZone = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const ignore = target.closest('[data-skip-zone-click="true"]')
    if (ignore) return

    inputRef.current?.click()
  }

  const onChange = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    console.log('Uploading', file)
    setTempImgUrl(URL.createObjectURL(file))
  }
  const noImage = !url && !tempImgUrl
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
            'cursor-pointer rounded-full p-4 flex flex-col items-center justify-center gap-y-2',
            {
              'ring ring-gray-100': noImage || isDragging,
            },
          )}
        >
          {noImage ? (
            <Tooltip
              open
              side='top'
              align='center'
              trigger={
                <div className='rounded-md min-h-12 min-w-12 flex items-center justify-center'>
                  <Icons.imageUp className='w-8 h-8 text-gray-500' />
                </div>
              }
            >
              Click or Drag an image
            </Tooltip>
          ) : (
            <ExistingAvatar
              url={url}
              alt={alt}
              fallback={fallback}
              currentRoute={currentRoute}
              tempImgUrl={tempImgUrl}
              setTempImgUrl={setTempImgUrl}
            />
          )}
        </form>
      )}
    </Dropzone>
  )
}
