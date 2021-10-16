import { gql, useQuery } from '@apollo/client'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { UsersIcon } from '@heroicons/react/outline'
import { RefreshIcon, SparklesIcon } from '@heroicons/react/solid'
import mixpanel from 'mixpanel-browser'
import React from 'react'

import { WhoToFollowQuery } from './__generated__/WhoToFollow.generated'

const WHO_TO_FOLLOW_QUERY = gql`
  query WhoToFollowQuery {
    whoToFollow {
      edges {
        node {
          id
          username
          hasFollowed
          isVerified
          profile {
            id
            avatar
            name
          }
        }
      }
    }
  }
`

const WhoToFollowCard = ({ children, refetch }: any) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3 lg:mb-2 px-3 lg:px-0">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-yellow-500" />
          <div>Who to follow</div>
        </div>
        <button
          onClick={() => {
            mixpanel.track('refreshed.whotofollow')
            refetch()
          }}
        >
          <RefreshIcon className="h-5 w-5" />
        </button>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const WhoToFollow: React.FC = () => {
  const { data, loading, error, refetch } = useQuery<WhoToFollowQuery>(
    WHO_TO_FOLLOW_QUERY,
    {
      notifyOnNetworkStatusChange: true
    }
  )
  const users = data?.whoToFollow?.edges?.map((edge) => edge?.node)

  if (loading)
    return (
      <WhoToFollowCard>
        <div className="space-y-4">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </div>
      </WhoToFollowCard>
    )

  return (
    <WhoToFollowCard refetch={refetch}>
      <ErrorMessage title="Failed to load users" error={error} />
      <div className="space-y-3">
        {users?.length === 0 && (
          <div className="grid justify-items-center space-y-2">
            <div>
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>Nothing to suggest</div>
          </div>
        )}
        {users?.map((user: any) => (
          <UserProfile key={user?.id} user={user} showFollow />
        ))}
      </div>
    </WhoToFollowCard>
  )
}

export default WhoToFollow
