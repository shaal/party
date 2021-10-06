import { gql, useQuery } from '@apollo/client'
import { LightningBoltIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { POLLING_INTERVAL } from 'src/constants'

import { NotificationCountQuery } from './__generated__/Notification.generated'

const NOTIFICATION_COUNT_QUERY = gql`
  query NotificationCountQuery {
    me {
      notificationsCount
    }
  }
`

const Notification: React.FC = () => {
  const { data } = useQuery<NotificationCountQuery>(NOTIFICATION_COUNT_QUERY, {
    pollInterval: POLLING_INTERVAL
  })

  return (
    <Link href="/notifications">
      <a className="flex items-start">
        <LightningBoltIcon className="h-6 w-6" />
        {(data?.me?.notificationsCount as number) > 0 && (
          <div className="h-2 w-2 rounded-full bg-red-500" />
        )}
      </a>
    </Link>
  )
}

export default Notification
