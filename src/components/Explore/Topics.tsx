import { gql, useQuery } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { imagekitURL } from '@components/utils/imagekitURL'
import { LoginIcon, UserAddIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { GetExploreUserQuery } from './__generated__/Topics.generated'

export const GET_EXPLORE_USER_QUERY = gql`
  query GetExploreUserQuery {
    me {
      id
      username
      profile {
        id
        name
        avatar
      }
      topics(first: 5) {
        totalCount
        edges {
          node {
            id
            name
            image
          }
        }
      }
    }
  }
`

const Topics: React.FC = () => {
  const { data, loading, error } = useQuery<GetExploreUserQuery>(
    GET_EXPLORE_USER_QUERY
  )

  if (loading)
    return (
      <Card>
        <CardBody>
          <div className="shimmer h-5 rounded-lg"></div>
        </CardBody>
      </Card>
    )

  return (
    <>
      {data?.me ? (
        <Card>
          <ErrorMessage
            title="Failed to load topics"
            error={error}
            className="p-5"
          />
          <div className="space-y-3 text-center p-5">
            <img
              className="h-16 w-16 rounded-full mx-auto"
              src={imagekitURL(data?.me?.profile?.avatar as string, 100, 100)}
              alt={`@${data?.me?.username}'s avatar`}
            />
            <div>
              <div className="font-bold text-lg">{data?.me?.profile?.name}</div>
              <Slug slug={data?.me?.username} prefix="@" />
            </div>
          </div>
          <div className="border-b dark:border-gray-800" />
          <div className="p-5 space-y-3">
            <div className="font-bold">
              {data?.me?.topics?.totalCount} starred topics
            </div>
            {data?.me?.topics?.totalCount > 0 && (
              <div className="space-y-3">
                {data?.me?.topics?.edges?.map((topic: any) => (
                  <div
                    key={topic?.node?.id}
                    className="flex items-center space-x-2"
                  >
                    {topic?.node?.image ? (
                      <img
                        className="h-7 w-7 rounded-md"
                        src={topic?.node?.image}
                        alt={`#${topic?.node?.name}'s image'`}
                      />
                    ) : (
                      <div className="flex items-center justify-around h-7 w-7 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                        <div>#</div>
                      </div>
                    )}
                    <Link href={`/topics/${topic?.node?.name}`}>
                      <a>{topic?.node?.name}</a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card>
          <CardBody className="space-y-3">
            <div>Join Devparty today!</div>
            <div className="flex space-x-1.5">
              <Link href="/login" passHref>
                <Button icon={<LoginIcon className="h-4 w-4" />}>Login</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button
                  variant="success"
                  icon={<UserAddIcon className="h-4 w-4" />}
                >
                  Signup
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default Topics
