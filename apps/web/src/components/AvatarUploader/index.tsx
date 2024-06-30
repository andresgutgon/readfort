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
import CircleAnimation from '$/components/AvatarUploader/CircleAnimation'
import EmptyAvatar from '$/components/AvatarUploader/EmptyAvatar'
import { useServerAction } from 'zsa-react'

type AvatarHandlerProps = AvatarProps & {
  onDelete?: () => void
  showCircleAnimation: boolean
}
function AvatarHandler({
  showCircleAnimation,
  onDelete,
  url,
  alt,
  fallback,
}: AvatarHandlerProps) {
  return (
    <>
      <Tooltip
        side='top'
        align='center'
        trigger={
          <div className='flex flex-col items-center space-y-2'>
            <div className='relative'>
              <CircleAnimation display={showCircleAnimation} />
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
            <div className='opacity-50 group-hover/dropzone:opacity-100 '>
              <Button asChild variant='outline' size='sm'>
                <span>Change</span>
              </Button>
            </div>
          </div>
        }
      >
        Remove your avatar
      </Tooltip>
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
  const { execute: deleteAvatar, isPending: isRemoving } = useServerAction(
    deleteAvatarAction,
    {
      onSuccess: () => {
        toast({
          title: 'Avatar deleted',
          description:
            'Your avatar has been removed. Why not upload a new one?',
          variant: 'default',
        })
      },
      onError: (error) => {
        toast({
          title: 'Avatar removal failed',
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
    deleteAvatar({ currentRoute })
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
            'cursor-pointer rounded-full flex flex-col items-center justify-center gap-y-2',
            'relative z-10 group/dropzone',
            {
              'ring ring-gray-100': noImage || isDragging,
            },
          )}
        >
          {noImage ? (
            <Tooltip
              side='top'
              align='center'
              asChild
              trigger={
                <EmptyAvatar showCircleAnimation={showCircleAnimation} />
              }
            >
              <div className='max-w-40'>Click or Drag an your photo</div>
            </Tooltip>
          ) : (
            <AvatarHandler
              onDelete={onDelete}
              showCircleAnimation={showCircleAnimation}
              url={tempImgUrl ?? `/uploads/${url}`}
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
