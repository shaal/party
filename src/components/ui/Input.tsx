import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

import { FieldError } from './Form'

interface Props extends ComponentProps<'input'> {
  label?: string
  className?: string
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = 'text', error, className = '', ...props },
  ref
) {
  return (
    <label className="w-full">
      {label && (
        <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
          {label}
        </div>
      )}
      <input
        className={clsx(
          { '!border-red-500 placeholder-red-500': error },
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-400 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 outline-none rounded-lg shadow-sm w-full',
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
