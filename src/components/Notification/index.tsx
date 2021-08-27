import { gql, useQuery } from '@apollo/client'
import { BellIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { EmptyState } from '../ui/EmptyState'
import { PageLoading } from '../ui/PageLoading'
import { NotificationsQuery } from './__generated__/index.generated'

export const NOTIFICATIONS_QUERY = gql`
  query NotificationsQuery {
    notifications {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
        }
      }
    }
  }
`

const Notifications: React.FC = () => {
  const { data, loading, error, fetchMore } =
    useQuery<NotificationsQuery>(NOTIFICATIONS_QUERY)
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
            after: pageInfo?.endCursor
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
          <Card>
            <CardBody>
              {notifications?.length === 0 ? (
                <EmptyState
                  message="Congratulations, you have read all your notifications."
                  icon={<BellIcon className="h-8 w-8" />}
                />
              ) : (
                notifications?.map((notification: any) => (
                  <div key={notification?.id}>{notification?.id}</div>
                ))
              )}
            </CardBody>
          </Card>
          <span ref={observe}></span>
        </div>
      </div>
    </div>
  )
}

export default Notifications
