import { gql, useQuery } from '@apollo/client'
import { BellIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { PostFragment } from '../Post/SinglePost'
import { EmptyState } from '../ui/EmptyState'
import { PageLoading } from '../ui/PageLoading'
import { NotificationsQuery } from './__generated__/index.generated'
import FollowNotification from './Follow'
import LikeNotification from './Like'

export const NOTIFICATIONS_QUERY = gql`
  query NotificationsQuery($after: String) {
    notifications(first: 5, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          type
          dispatcher {
            id
            username
            hasFollowed
            profile {
              id
              name
              avatar
            }
          }
          like {
            id
            post {
              ...PostFragment
            }
          }
          createdAt
        }
      }
    }
  }
  ${PostFragment}
`

const Notifications: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<NotificationsQuery>(
    NOTIFICATIONS_QUERY,
    { variables: { after: null }, pollInterval: 10_000 }
  )
  const notifications = data?.notifications?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.notifications?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (loading) return <PageLoading message="Loading notifications..." />

  return (
    <div className="flex flex-grow justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="space-y-5">
          <ErrorMessage title="Failed to notifications" error={error} />
          {notifications?.length === 0 ? (
            <EmptyState
              message="Congratulations, you have read all your notifications."
              icon={<BellIcon className="h-8 w-8" />}
            />
          ) : (
            <div className="space-y-4">
              {notifications?.map((notification: any) => (
                <div key={notification?.id}>
                  {notification?.type === 'POSTLIKE' && (
                    <LikeNotification notification={notification} />
                  )}
                  {notification?.type === 'FOLLOW' && (
                    <FollowNotification notification={notification} />
                  )}
                </div>
              ))}
            </div>
          )}
          {pageInfo?.hasNextPage && <span ref={observe}></span>}
        </div>
      </div>
    </div>
  )
}

export default Notifications
