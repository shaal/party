import { CheckCircleIcon, InboxIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import React from 'react'

interface Props {
  isRead: boolean
  setIsRead: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationType: React.FC<Props> = ({ isRead, setIsRead }) => {
  return (
    <div className="flex gap-3 px-2 sm:px-0">
      <button
        className={clsx(
          {
            'text-blue-500 bg-blue-100 dark:bg-opacity-20 bg-opacity-100':
              isRead
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-blue-500 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setIsRead(true)}
      >
        <InboxIcon className="h-4 w-4" />
        <div className={isRead ? '' : `hidden sm:block`}>Inbox</div>
      </button>
      <button
        className={clsx(
          {
            'text-green-500 bg-green-100 dark:bg-opacity-20 bg-opacity-100':
              !isRead
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setIsRead(false)}
      >
        <CheckCircleIcon className="h-4 w-4" />
        <div className={!isRead ? '' : `hidden sm:block`}>Done</div>
      </button>
    </div>
  )
}

export default NotificationType
