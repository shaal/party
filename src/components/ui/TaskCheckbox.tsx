import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'input'> {
  className?: string
  error?: boolean
}

export const TaskCheckbox = forwardRef<HTMLInputElement, Props>(function Input(
  { error, className = '', ...props },
  ref
) {
  return (
    <input
      className={clsx('text-blue-500 rounded-full p-2.5', className)}
      type="checkbox"
      ref={ref}
      {...props}
    />
  )
})
