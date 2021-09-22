import { Tooltip } from '@components/ui/Tooltip'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { Notification } from 'src/__generated__/schema.generated'

interface Props {
  notification: Notification
}

const MarkAsRead: React.FC<Props> = ({ notification }) => {
  const markAsRead = () => {
    toast.success('Marked as read!')
  }
  return (
    <button onClick={markAsRead}>
      <Tooltip content="Mark as read">
        <CheckCircleIcon className="h-5 w-5 text-brand-500" />
      </Tooltip>
    </button>
  )
}

export default MarkAsRead
