import { ComponentProps, forwardRef } from 'react'

interface CardProps extends ComponentProps<'div'> {
  children: React.ReactNode
  className?: string
  forceRounded?: boolean
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card({
  children,
  forceRounded = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`border dark:border-gray-800 bg-white dark:bg-gray-900 ${
        forceRounded
          ? 'rounded-lg'
          : 'lg:rounded-lg md:rounded-lg sm:rounded-lg'
      } shadow-sm dark:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export const CardBody = forwardRef<HTMLElement, CardBodyProps>(
  function CardBody({ children, className = '', ...props }) {
    return (
      <div className={`p-5 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)
