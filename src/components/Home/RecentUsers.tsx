import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { User } from '~/__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import UserProfileLarge from '../ui/UserProfileLarge'
import { RecentUsersQuery } from './__generated__/RecentUsers.generated'

export const query = gql`
  query RecentUsersQuery {
    users(take: 5) {
      id
      username
    }
  }
`

export const RecentUsers: React.FC = () => {
  const { data, loading, error } = useQuery<RecentUsersQuery>(query)

  return (
    <Fragment>
      <div className="font-bold mb-1 flex items-center gap-1.5">
        <UsersIcon className="h-4 w-4" />
        <div>Recent users</div>
      </div>
      <Card>
        <CardBody>
          <ErrorMessage title="Failed to load posts" error={error} />
          <div className="space-y-3">
            {data?.users.map((user: any) => (
              <UserProfileLarge key={user?.id} user={user as User} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}
