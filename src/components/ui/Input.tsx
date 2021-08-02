import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import { FieldError } from './Form'

interface Props extends ComponentProps<'input'> {
  label: string
  className?: string
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = 'text', error, className = '', ...props },
  ref
) {
  return (
    <label>
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <input
        className={clsx(
          {
            'border-red-500 placeholder-red-500': error
          },
          'border border-gray-300 dark:border-gray-700 outline-none rounded-lg shadow-sm w-full',
          className
        )}
        type={type}
        ref={ref}
        {...props}
      />

      <FieldError name={props.name} />
    </label>
  )
})
