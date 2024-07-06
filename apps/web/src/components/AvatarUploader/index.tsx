'use client'

import { MouseEvent, useRef, useState } from 'react'

import {
  cn,
  Dropzone,
  Icons,
  useToast,
  type Props as AvatarProps,
} from '@readfort/ui'
import { addAvatarAction } from '$/actions/user/addAvatar'
import { deleteAvatarAction } from '$/actions/user/deleteAvatar'
import UploadAvatarWrapper from '$/components/AvatarUploader/Wrapper'
import { getAssetPath } from '$/lib/disk/assetPath'
import { useServerAction } from 'zsa-react'

import Avatar from './Avatar'

type Props = AvatarProps & {
  currentRoute: string
  hideCircleAnimation?: boolean
}
export default function AvatarUploader({
  url,
  alt,
  fallback,
  currentRoute,
  hideCircleAnimation,
}: Props) {
  const { toast } = useToast()
  const [tempImgUrl, setTempImgUrl] = useState<string>()
  const [imageUrl, setImageUrl] = useState(url)
  const { execute: addAvatar } = useServerAction(addAvatarAction, {
    onSuccess: () => {
      toast({
        title: 'Avatar uploaded',
        description: 'Your avatar has been uploaded successfully',
        variant: 'default',
      })
    },
    onError: (error) => {
      const formattedFileError = error.err.fieldErrors?.file?.[0]
      setTempImgUrl(undefined)
      toast({
        title: 'Avatar upload failed',
        description: formattedFileError
          ? formattedFileError
          : error.err.message,
        variant: 'destructive',
      })
    },
  })
  const { execute: deleteAvatar } = useServerAction(deleteAvatarAction, {
    onSuccess: () => {
      toast({
        title: 'Avatar deleted',
        description: 'Your avatar has been removed. Why not upload a new one?',
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
  })
  const inputRef = useRef<HTMLInputElement>(null)

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
    await addAvatar(form)
  }
  const onDelete = async () => {
    await deleteAvatar({ currentRoute })
    setTempImgUrl(undefined)
    setImageUrl(undefined)
  }
  const noImage = !imageUrl && !tempImgUrl
  const showAnimation = hideCircleAnimation !== false && noImage
  const imageFullPath = tempImgUrl ?? imageUrl
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
            'cursor-pointer rounded-full',
            'relative z-10 group/dropzone min-h-20',
          )}
        >
          <UploadAvatarWrapper
            isDragging={isDragging}
            showCircleAnimation={showAnimation}
            buttonLabel={noImage ? 'Add Image' : 'Change Image'}
            tooltipText={
              noImage ? 'Click or Drag an your photo' : 'Remove your avatar'
            }
          >
            {noImage ? (
              <Icons.imageUp className='w-8 h-8 text-gray-500' />
            ) : (
              <Avatar
                onDelete={onDelete}
                url={imageFullPath}
                alt={alt}
                fallback={fallback}
              />
            )}
          </UploadAvatarWrapper>
        </form>
      )}
    </Dropzone>
  )
}
