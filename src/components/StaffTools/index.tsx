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
      users
      products
      groups
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
            <div className="text-xl font-bold mb-1.5">Platform Stats</div>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div>
                <span className="font-bold">{data?.stats?.users}</span> Users
              </div>
              <div>
                <span className="font-bold">{data?.stats?.products}</span>{' '}
                Products
              </div>
              <div>
                <span className="font-bold">{data?.stats?.groups}</span> Groups
              </div>
              <div>
                <span className="font-bold">{data?.stats?.posts}</span> Posts
              </div>
              <div>
                <span className="font-bold">{data?.stats?.likes}</span> Likes
              </div>
              <div>
                <span className="font-bold">{data?.stats?.topics}</span> Topics
              </div>
              <div>
                <span className="font-bold">{data?.stats?.notifications}</span>{' '}
                Notifications
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsDashboard
