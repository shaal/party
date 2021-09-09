import { gql, useQuery } from '@apollo/client'
import {
  BellIcon,
  CollectionIcon,
  CubeIcon,
  HashtagIcon,
  HeartIcon,
  LoginIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/outline'
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
      communities
      posts
      likes
      topics
      notifications
      sessions
    }
  }
`

const StaffToolsDashboard: React.FC = () => {
  const { data, loading, error } = useQuery<StaffToolsDashboardQuery>(
    STAFF_TOOLS_DASHBOARD_QUERY
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
              <div className="flex items-center space-x-1.5">
                <UsersIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.users}</span> Users
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <CubeIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.products}</span>{' '}
                  Products
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <UserGroupIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.communities}</span>{' '}
                  Communities
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <CollectionIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.posts}</span> Posts
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <HeartIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.likes}</span> Likes
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <HashtagIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.topics}</span>{' '}
                  Topics
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <BellIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">
                    {data?.stats?.notifications}
                  </span>{' '}
                  Notifications
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <LoginIcon className="h-4 w-4" />
                <div>
                  <span className="font-bold">{data?.stats?.sessions}</span>{' '}
                  Sessions
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsDashboard
