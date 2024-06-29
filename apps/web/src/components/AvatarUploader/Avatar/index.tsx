import {
  Avatar as AvatarAtom,
  Icons,
  type Props as AvatarProps,
} from '@readfort/ui'

type AvatarHandlerProps = AvatarProps & { onDelete?: () => void }
export default function Avatar({
  onDelete,
  url,
  alt,
  fallback,
}: AvatarHandlerProps) {
  return (
    <>
      <div
        data-skip-zone-click
        role='button'
        onClick={onDelete}
        className='group/remove z-10 absolute inset-0 rounded-full hover:bg-gray-900/70 flex items-center justify-center'
      >
        <Icons.trash className='w-6 h-6 text-white/80 opacity-0 group-hover/remove:opacity-100' />
      </div>
      <AvatarAtom
        url={url}
        alt={alt}
        fallback={fallback}
        className='w-full h-full'
      />
    </>
  )
}
