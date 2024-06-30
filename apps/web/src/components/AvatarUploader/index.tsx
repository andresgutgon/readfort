'use client'

import { MouseEvent, useRef, useState } from 'react'

import {
  Avatar,
  Button,
  cn,
  Dropzone,
  Icons,
  Tooltip,
  useToast,
  type Props as AvatarProps,
} from '@readfort/ui'
import { addAvatarAction } from '$/actions/user/addAvatar'
import { deleteAvatarAction } from '$/actions/user/deleteAvatar'
import { useServerAction } from 'zsa-react'

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
              className='group/remove z-10 absolute inset-0 rounded-full hover:bg-gray-900/70 flex items-center justify-center'
            >
              <Icons.trash className='w-6 h-6 text-white/80 opacity-0 group-hover/remove:opacity-100' />
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
        Remove your avatar
      </Tooltip>
      <div className='opacity-50 group-hover/dropzone:opacity-100 absolute -bottom-2 left-0 right-0 flex justify-center'>
        <Button asChild variant='outline' size='sm'>
          <span>Change</span>
        </Button>
      </div>
    </>
  )
}

type Props = AvatarProps & {
  currentRoute: string
  showCircleAnimation?: boolean
}
export default function AvatarUploader({
  url,
  alt,
  fallback,
  currentRoute,
  showCircleAnimation = true,
}: Props) {
  const { toast } = useToast()
  const { execute: addAvatar, isPending: isAdding } = useServerAction(
    addAvatarAction,
    {
      onSuccess: () => {
        toast({
          title: 'Avatar uploaded',
          description: 'Your avatar has been uploaded successfully',
          variant: 'default',
        })
      },
      onError: (error) => {
        toast({
          title: 'Avatar upload failed',
          description: error.err.message,
          variant: 'destructive',
        })
      },
    },
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const [tempImgUrl, setTempImgUrl] = useState<string>()

  const onClickZone = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const ignore = target.closest('[data-skip-zone-click="true"]')
    if (ignore) return

    inputRef.current?.click()
  }

  const onChange = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    setTempImgUrl(URL.createObjectURL(file))
    const form = new FormData()
    form.set('currentRoute', currentRoute)
    form.set('file', file)
    addAvatar(form)
  }
  const onDelete = async () => {
    // await deleteAvatarAction({ currentRoute })
    setTempImgUrl(undefined)
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
          className={cn(
            'cursor-pointer rounded-full p-4 flex flex-col items-center justify-center gap-y-2',
            'relative z-10 group/dropzone',
            {
              'ring ring-gray-100': noImage || isDragging,
            },
          )}
        >
          {showCircleAnimation && (
            <>
              <AnimatedCircle className='bg-gray-200 animation-delay-[4s]' />
              <AnimatedCircle className='bg-gray-10 animation-delay-[2s]' />
              <AnimatedCircle className='bg-white animation-delay-[0s]' />
            </>
          )}
          {noImage ? (
            <Tooltip
              side='top'
              align='center'
              asChild
              trigger={
                <div className='relative z-10 rounded-md min-h-12 min-w-12 flex items-center justify-center'>
                  <Icons.imageUp className='w-8 h-8 text-gray-500' />
                </div>
              }
            >
              <div className='max-w-40'>Click or Drag an your photo</div>
            </Tooltip>
          ) : (
            <AvatarHandler
              onDelete={onDelete}
              url={tempImgUrl ?? url}
              alt={alt}
              fallback={fallback}
              className='w-12 h-12'
            />
          )}
        </form>
      )}
    </Dropzone>
  )
}
