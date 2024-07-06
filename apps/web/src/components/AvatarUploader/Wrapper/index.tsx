import { ReactNode } from 'react'

import { Button, cn, Tooltip } from '@readfort/ui'
import CircleAnimation from '$/components/AvatarUploader/CircleAnimation'

export default function UploadAvatarWrapper({
  children,
  buttonLabel,
  tooltipText,
  isDragging,
  showCircleAnimation,
}: {
  children: ReactNode
  buttonLabel: string
  tooltipText: ReactNode | string
  isDragging: boolean
  showCircleAnimation: boolean
}) {
  return (
    <Tooltip
      side='top'
      align='center'
      trigger={
        <div
          className={cn(
            'flex flex-col items-center space-y-2',
            'rounded-lg border-2 border-dotted p-6',
            {
              'border-gray-200': !isDragging,
              'border-gray-900': isDragging,
            },
          )}
        >
          <div className='relative'>
            <CircleAnimation display={showCircleAnimation} />
            <div
              className={cn(
                'ring bg-white relative z-10 w-16 h-16 rounded-full flex items-center justify-center',
                {
                  'ring-gray-100': !isDragging,
                  'ring-gray-900': isDragging,
                },
              )}
            >
              {children}
            </div>
          </div>
          <Button asChild variant='outline' size='sm'>
            <span>{buttonLabel}</span>
          </Button>
        </div>
      }
    >
      <div className='max-w-40'>{tooltipText}</div>
    </Tooltip>
  )
}
