import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import React from 'react'

import { User } from '~/__generated__/schema.generated'
import UserProfileLargeShimmer from '~/components/shared/Shimmer/UserProfileLargeShimmer'

import UserProfileLarge from '../shared/UserProfileLarge'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { RecentUsersQuery } from './__generated__/RecentUsers.generated'

export const query = gql`
  query RecentUsersQuery {
    users {
      id
      username
      hasFollowed
      profile {
        avatar
        name
      }
    }
  }
`

const RecentUsersCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <UsersIcon className="h-4 w-4" />
        <div>Recent users</div>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const RecentUsers: React.FC = () => {
  const { data, loading, error } = useQuery<RecentUsersQuery>(query)

  if (loading)
    return (
      <RecentUsersCard>
        <div className="space-y-3">
          <UserProfileLargeShimmer showFollow />
          <UserProfileLargeShimmer showFollow />
          <UserProfileLargeShimmer showFollow />
          <UserProfileLargeShimmer showFollow />
          <UserProfileLargeShimmer showFollow />
        </div>
      </RecentUsersCard>
    )

  return (
    <RecentUsersCard>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data?.users.map((user: any) => (
          <UserProfileLarge key={user?.id} user={user as User} showFollow />
        ))}
      </div>
    </RecentUsersCard>
  )
}

export default RecentUsers
