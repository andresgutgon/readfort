import { cn, Icons } from '@readfort/ui'
import CircleAnimation from '$/components/AvatarUploader/CircleAnimation'

export default function EmptyAvatar({
  isDragging,
  showCircleAnimation = false,
}: {
  isDragging: boolean
  showCircleAnimation?: boolean
}) {
  return (
    <div className='relative '>
      <CircleAnimation display={showCircleAnimation} />
      <div
        className={cn(
          'ring bg-white relative z-10 p-4 rounded-full w-full h-full flex items-center justify-center',
          {
            'ring-gray-100': !isDragging,
            'ring-gray-900': isDragging,
          },
        )}
      >
        <Icons.imageUp className='w-8 h-8 text-gray-500' />
      </div>
    </div>
  )
}
