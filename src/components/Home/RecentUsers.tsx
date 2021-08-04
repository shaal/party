import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { User } from '~/__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import UserProfileLarge from '../ui/UserProfileLarge'
import { RecentUsersQuery } from './__generated__/RecentUsers.generated'
import UserProfileLargeShimmer from '~/components/ui/Shimmer/UserProfileLargeShimmer'

export const query = gql`
  query RecentUsersQuery {
    users(take: 5) {
      id
      username
      profile {
        name
      }
    }
  }
`

const RecentUsersCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2">Recent users</div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

export const RecentUsers: React.FC = () => {
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
          <UserProfileLarge key={user?.id} user={user as User} />
        ))}
      </div>
    </RecentUsersCard>
  )
}
