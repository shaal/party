import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import {
  Award,
  Bell,
  Box,
  Cpu,
  Database,
  ExternalLink,
  Hash,
  Heart,
  Layers,
  LogIn,
  User
} from 'lucide-react'
import React from 'react'

import { StaffToolsDashboardQuery } from './__generated__/index.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_DASHBOARD_QUERY = gql`
  query StaffToolsDashboardQuery {
    stats {
      users
      products
      posts
      likes
      topics
      badges
      notifications
      sessions
    }
  }
`

const StaffToolsDashboard: React.FC = () => {
  const { data, loading, error } = useQuery<StaffToolsDashboardQuery>(
    STAFF_TOOLS_DASHBOARD_QUERY
  )

  if (loading) return <PageLoading message="Loading dashboard" />

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
                <User size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.users}</span> Users
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Box size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.products}</span>{' '}
                  Products
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Layers size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.posts}</span> Posts
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Heart size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.likes}</span> Likes
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Hash size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.topics}</span>{' '}
                  Topics
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.badges}</span>{' '}
                  Badges
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Bell size={14} />
                <div>
                  <span className="font-bold">
                    {data?.stats?.notifications}
                  </span>{' '}
                  Notifications
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <LogIn size={14} />
                <div>
                  <span className="font-bold">{data?.stats?.sessions}</span>{' '}
                  Sessions
                </div>
              </div>
            </div>
            <div className="border-b dark:border-gray-800 my-3" />
            <div className="text-xl font-bold mb-1.5">Services</div>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div className="flex items-center space-x-1.5">
                <Database size={14} />
                <div className="flex items-center space-x-1">
                  <a
                    href="https://app.planetscale.com/yo/devparty"
                    className="font-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    PlanetScale
                  </a>
                  <ExternalLink size={12} />
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Cpu size={14} />
                <div className="flex items-center space-x-1">
                  <a
                    href="https://console.upstash.com/redis/21cb559e-de14-44b9-a67f-05c67f2c8376"
                    className="font-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Upstash
                  </a>
                  <ExternalLink size={12} />
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
