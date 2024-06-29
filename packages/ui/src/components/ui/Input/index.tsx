import { forwardRef, InputHTMLAttributes } from 'react'

import { FormField, type FormFieldProps } from '$ui/components/ui/FormField'
import { cn } from '$ui/lib/utils'

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<FormFieldProps, 'children'>
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, errors, description, type, ...props },
  ref,
) {
  return (
    <FormField label={label} description={description} errors={errors}>
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200 ',
          className,
        )}
        {...props}
      />
    </FormField>
  )
})

export { Input }
