import { gql, useQuery } from '@apollo/client'
import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

import { User } from '~/__generated__/schema.generated'
import UserProfileShimmer from '~/components/shared/Shimmer/UserProfileShimmer'
import UserProfile from '~/components/shared/UserProfile'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

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

const WhoToFollowCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <SparklesIcon className="h-4 w-4" />
        <div>Who to follow</div>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const WhoToFollow: React.FC = () => {
  const { data, loading, error } =
    useQuery<WhoToFollowQuery>(WHO_TO_FOLLOW_QUERY)

  if (loading)
    return (
      <WhoToFollowCard>
        <div className="space-y-3">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </div>
      </WhoToFollowCard>
    )

  return (
    <WhoToFollowCard>
      <ErrorMessage title="Failed to load users" error={error} />
      <div className="space-y-3">
        {data?.whoToFollow?.edges?.map((user: any) => (
          <UserProfile
            key={user?.node?.id}
            user={user?.node as User}
            showFollow
          />
        ))}
      </div>
    </WhoToFollowCard>
  )
}

export default WhoToFollow
