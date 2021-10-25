import { gql, useQuery } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowCircleRightIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useInView from 'react-cool-inview'

import { OnboardingTopicsQuery } from './__generated__/Topics.generated'

export const ONBOARDING_TOPICS_QUERY = gql`
  query OnboardingTopicsQuery($after: String) {
    featuredTopics(first: 10, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
          starrers {
            totalCount
          }
          hasStarred
        }
      }
    }
  }
`

const Topics: React.FC = () => {
  const router = useRouter()
  const { data, loading, error, fetchMore } = useQuery<OnboardingTopicsQuery>(
    ONBOARDING_TOPICS_QUERY,
    { variables: { after: null } }
  )
  const topics = data?.featuredTopics?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.featuredTopics?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  const handleContinue = () => {
    router.push('/onboarding/profile')
  }

  return (
    <div className="onboarding-bg page-center">
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
            <div className="text-2xl font-bold">
              What are you interested in?
            </div>
            <div className="text-gray-500">
              Star tags to customize your feed
            </div>
          </div>
          <div className="pt-5 max-h-[50vh] overflow-y-auto">
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Topics
