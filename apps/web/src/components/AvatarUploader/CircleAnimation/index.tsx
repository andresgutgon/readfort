import { cn } from '@readfort/ui'

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

export default function CircleAnimation({
  display = true,
}: {
  display: boolean
}) {
  if (!display) return null

  return (
    <>
      <AnimatedCircle className='bg-gray-200 animation-delay-[4s]' />
      <AnimatedCircle className='bg-gray-10 animation-delay-[2s]' />
      <AnimatedCircle className='bg-white animation-delay-[0s]' />
    </>
  )
}
