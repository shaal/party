import { gql, useQuery } from '@apollo/client'
import { LightningBoltIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import { NotificationCountQuery } from './__generated__/Notification.generated'

const NOTIFICATION_COUNT_QUERY = gql`
  query NotificationCountQuery {
    me {
      notificationsCount
    }
  }
`

const Notification: React.FC = () => {
  const { data, loading, error } = useQuery<NotificationCountQuery>(
    NOTIFICATION_COUNT_QUERY
  )

  return (
    <Link href="/notifications">
      <a>
        <LightningBoltIcon className="h-6 w-6" />
      </a>
    </Link>
  )
}

export default Notification
