import { gql, useMutation } from '@apollo/client'
import { Spinner } from '@components/UI/Spinner'
import { Tooltip } from '@components/UI/Tooltip'
import { CheckCircleIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import React from 'react'
import toast from 'react-hot-toast'
import { Notification } from 'src/__generated__/schema.generated'

import { NOTIFICATIONS_QUERY } from '.'
import {
  ReadNotificationMutation,
  ReadNotificationMutationVariables
} from './__generated__/Read.generated'

interface Props {
  notification: Notification
}

const MarkAsRead: React.FC<Props> = ({ notification }) => {
  const [readNotification, { loading: markingAsRead }] = useMutation<
    ReadNotificationMutation,
    ReadNotificationMutationVariables
  >(
    gql`
      mutation ReadNotificationMutation($input: ReadNotificationInput!) {
        readNotification(input: $input)
      }
    `,
    {
      refetchQueries: [{ query: NOTIFICATIONS_QUERY }],
      onCompleted() {
        toast.success('Notification marked as read!')
      }
    }
  )

  return (
    <button
      disabled={markingAsRead}
      onClick={() => {
        mixpanel.track('notification.read')
        readNotification({ variables: { input: { id: notification?.id } } })
      }}
    >
      <Tooltip content="Mark as read">
        {markingAsRead ? (
          <Spinner size="xs" className="ml-1" />
        ) : (
          <CheckCircleIcon className="h-5 w-5 text-brand-500" />
        )}
      </Tooltip>
    </button>
  )
}

export default MarkAsRead
