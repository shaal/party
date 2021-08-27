import { gql, useQuery } from '@apollo/client'
import React from 'react'

import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '~/components/shared/Shimmer/UserProfileShimmer'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { NotificationsQuery } from './__generated__/index.generated'

export const NOTIFICATIONS_QUERY = gql`
  query NotificationsQuery {
    notifications {
      edges {
        node {
          id
        }
      }
    }
  }
`

const Notifications: React.FC = () => {
  const { data, loading, error } =
    useQuery<NotificationsQuery>(NOTIFICATIONS_QUERY)

  if (loading)
    return (
      <GridLayout>
        <GridItemEight>
          <PostShimmer />
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>
              <UserProfileShimmer showFollow />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    )

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to notifications" error={error} />
          WIP
        </div>
      </GridItemEight>
    </GridLayout>
  )
}

export default Notifications
