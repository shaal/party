import { gql, useQuery } from '@apollo/client'
import { Popover, Transition } from '@headlessui/react'
import { LightningBoltIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import * as timeago from 'timeago.js'

import { NotificationsQuery } from './__generated__/index.generated'
import PostLike from './PostLike'

export const NOTIFICATIONS_QUERY = gql`
  query NotificationsQuery {
    notifications(first: 5) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          type
          entityId
          createdAt
          dispatcher {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`

const Notifications: React.FC = () => {
  const { data } = useQuery<NotificationsQuery>(NOTIFICATIONS_QUERY)

  const notifications = data?.notifications?.edges?.map((edge) => edge?.node)

  return (
    <Popover className="relative">
      <Popover.Button className="flex">
        <LightningBoltIcon className="h-6 w-6" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="text-black dark:text-gray-200 absolute right-0 w-full min-w-max py-1 mt-2">
          <div className="bg-white dark:bg-gray-900 py-3 px-5 shadow-md rounded-lg transition border border-gray-200 dark:border-gray-800 max-h-[80vh] space-y-6 overflow-y-scroll">
            {notifications?.map((notification: any) => (
              <div
                key={notification?.id}
                className="flex items-center space-x-2"
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={notification?.dispatcher?.profile?.avatar as string}
                  alt={`@${notification?.dispatcher?.username}'s avatar'`}
                />
                <div>
                  {notification?.type === 'POSTLIKE' && (
                    <PostLike notification={notification} />
                  )}
                  <div className="text-xs text-gray-400">
                    {timeago.format(notification?.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Notifications
