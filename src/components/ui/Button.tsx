import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'danger'
  outline?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className = '',
      size = 'md',
      variant = 'primary',
      outline,
      loading,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          {
            'bg-blue-600 hover:bg-blue-500 border border-blue-700 text-white':
              !outline && variant === 'primary',
            'bg-green-600 hover:bg-green-500 border border-green-700 text-white':
              !outline && variant === 'success',
            'bg-red-600 hover:bg-red-500 border border-red-700 text-white':
              !outline && variant === 'danger',
            'border border-blue-600 text-blue-600 hover:bg-blue-100':
              outline && variant === 'primary',
            'border border-green-600 text-green-600 hover:bg-green-100':
              outline && variant === 'success',
            'border border-red-600 text-red-600 hover:bg-red-100':
              outline && variant === 'danger',
            'px-2 py-0.5': size === 'sm',
            'px-3 py-1': size === 'md',
            'px-4 py-1.5': size === 'lg'
          },
          'rounded-lg font-bold disabled:opacity-50',
          className
        )}
        disabled={loading}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
