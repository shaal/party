import { gql, useQuery } from '@apollo/client'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowCircleRightIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { OnboardingUsersQuery } from './__generated__/Follow.generated'

export const ONBOARDING_USERS_QUERY = gql`
  query OnboardingUsersQuery($after: String) {
    whoToFollow(first: 30, after: $after) {
      edges {
        node {
          id
          username
          isVerified
          hasFollowed
          profile {
            id
            name
            avatar
            bio
          }
        }
      }
    }
  }
`

const Follow: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<OnboardingUsersQuery>(
    ONBOARDING_USERS_QUERY,
    { variables: { after: null } }
  )
  const users = data?.whoToFollow?.edges?.map((edge) => edge?.node)

  const handleContinue = () => {
    router.push('/onboarding/profile')
  }

  return (
    <div className="onboarding-bg page-center !h-[calc(100vh-92px)]">
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <CardBody className="linkify space-y-2">
          <div className="flex items-center mb-5 space-x-5">
            <Link href="/onboarding" passHref>
              <Button
                className="mx-auto rounded-full"
                size="lg"
                variant="secondary"
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                outline
              />
            </Link>
            <ProgressBar percentage={33} />
            <Button
              className="mx-auto"
              icon={<ArrowCircleRightIcon className="h-4 w-4" />}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Suggested people to follow</div>
            <div className="text-gray-500">
              Follow users to get their updates on your feed
            </div>
          </div>
          <div className="pt-5 max-h-[50vh] overflow-y-auto no-scrollbar space-y-8 pr-1">
            <ErrorMessage title="Failed to load topics" error={error} />
            {users?.map((user: any) => (
              <UserProfileLarge key={user?.id} user={user} showFollow />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Follow
