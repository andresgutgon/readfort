'use client'

import {
  ChangeEvent,
  DragEvent,
  forwardRef,
  InputHTMLAttributes,
  JSX,
  useState,
} from 'react'

import { Input } from '$ui/components/ui/Input'

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'children'
> & {
  onChange: (files: FileList | null) => void
  children: ({ isDragging }: { isDragging: boolean }) => JSX.Element
}

export const Dropzone = forwardRef<HTMLInputElement, Props>(
  ({ onChange, children, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      onChange(e.dataTransfer.files)
    }

    const handleDragLeave = () => {
      setIsDragging(false)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files)
    }

    return (
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {children({ isDragging })}
        <Input
          ref={ref}
          type='file'
          className='hidden'
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  },
)

Dropzone.displayName = 'Dropzone'
