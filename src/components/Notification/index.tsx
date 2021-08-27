import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { GridItemEight, GridLayout } from '../GridLayout'
import { PageLoading } from '../ui/PageLoading'
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

  if (loading) return <PageLoading message="Loading notifications..." />

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to notifications" error={error} />
          <Card>
            <CardBody>WIP</CardBody>
          </Card>
        </div>
      </GridItemEight>
    </GridLayout>
  )
}

export default Notifications
