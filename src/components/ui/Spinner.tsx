import clsx from 'clsx'

interface Props {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner: React.FC<Props> = ({ className = '', size = 'md' }) => {
  return (
    <div
      className={clsx(
        {
          'h-5 w-5 border-2': size === 'sm',
          'h-8 w-8 border-[3px]': size === 'md',
          'h-10 w-10 border-4': size === 'lg'
        },
        'rounded-full animate-spin border-purple-200 border-t-purple-500',
        className
      )}
    />
  )
}
