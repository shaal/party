import { gql, useQuery } from '@apollo/client'
import { Zap } from 'lucide-react'
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
  const { data } = useQuery<NotificationCountQuery>(NOTIFICATION_COUNT_QUERY)

  return (
    <Link href="/notifications">
      <a className="flex items-start">
        <Zap size={22} />
        {(data?.me?.notificationsCount as number) > 0 && (
          <div className="h-2 w-2 rounded-full bg-red-500" />
        )}
      </a>
    </Link>
  )
}

export default Notification
