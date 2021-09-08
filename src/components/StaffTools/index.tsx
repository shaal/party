import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { PageLoading } from '../ui/PageLoading'
import { StaffToolsDashboardQuery } from './__generated__/index.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_DASHBOARD_QUERY = gql`
  query StaffToolsDashboardQuery {
    stats {
      products
      users
      posts
      likes
      notifications
      topics
    }
  }
`

const StaffToolsDashboard: React.FC = () => {
  const { data, loading, error } = useQuery<StaffToolsDashboardQuery>(
    STAFF_TOOLS_DASHBOARD_QUERY,
    { pollInterval: 2000 }
  )

  if (loading) return <PageLoading message="Loading dashboard..." />

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <ErrorMessage title="Failed to stats" error={error} />
            <div>{data?.stats?.users} Users</div>
            <div>{data?.stats?.products} Products</div>
            <div>{data?.stats?.posts} Posts</div>
            <div>{data?.stats?.likes} Likes</div>
            <div>{data?.stats?.topics} Topics</div>
            <div>{data?.stats?.notifications} Notifications</div>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsDashboard
