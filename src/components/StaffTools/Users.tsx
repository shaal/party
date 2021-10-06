import { gql, useMutation, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { Spinner } from '@components/ui/Spinner'
import { Tooltip } from '@components/ui/Tooltip'
import React from 'react'
import useInView from 'react-cool-inview'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE, STATIC_ASSETS } from 'src/constants'
import * as timeago from 'timeago.js'

import {
  OnboardUserMutation,
  OnboardUserMutationVariables,
  StaffToolsUsersQuery
} from './__generated__/Users.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_USERS_QUERY = gql`
  query StaffToolsUsersQuery($after: String) {
    users(first: 5, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          username
          email
          inWaitlist
          isVerified
          hasFollowed
          hasSpotifyIntegration
          hasWakatimeIntegration
          followers {
            totalCount
          }
          following {
            totalCount
          }
          createdAt
          updatedAt
          invite {
            code
            usedTimes
          }
          profile {
            id
            name
            bio
            avatar
          }
        }
      }
    }
  }
`

const StaffToolsUsers: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<StaffToolsUsersQuery>(
    STAFF_TOOLS_USERS_QUERY,
    {
      variables: {
        after: null
      },
      pollInterval: 10000
    }
  )
  const users = data?.users?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.users?.pageInfo

  const [onboardUser] = useMutation<
    OnboardUserMutation,
    OnboardUserMutationVariables
  >(
    gql`
      mutation OnboardUserMutation($input: OnboardUserInput!) {
        onboardUser(input: $input) {
          id
          inWaitlist
        }
      }
    `,
    {
      onError() {
        toast.error(ERROR_MESSAGE)
      },
      onCompleted() {
        toast.success('Successfully onboarded the user')
      }
    }
  )

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

  if (loading) return <PageLoading message="Loading users" />

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody className="space-y-4">
            <ErrorMessage title="Failed to load users" error={error} />
            {users?.map((user: any) => (
              <div key={user?.id}>
                <UserProfileLarge user={user} showFollow />
                <div className="border-b border-gray-200 dark:border-gray-800 mt-4" />
                <div className="my-3 flex items-center justify-between">
                  <div className="flex space-x-3 text-gray-600 dark:text-gray-300 divide-x dark:divide-gray-800">
                    <div className="text-sm">
                      <div>
                        Created: <b>{timeago.format(user?.createdAt)}</b>
                      </div>
                      <div>
                        Updated: <b>{timeago.format(user?.updatedAt)}</b>
                      </div>
                      <div className="flex space-x-1">
                        <span>Invited:</span>
                        <Tooltip content={user?.invite?.code}>
                          <b>{user?.invite?.usedTimes} people</b>
                        </Tooltip>
                      </div>
                      <div>
                        Following: <b>{user?.following?.totalCount}</b>
                      </div>
                      <div>
                        Followers: <b>{user?.followers?.totalCount}</b>
                      </div>
                    </div>
                    <div className="text-sm pl-3">
                      <div>
                        Email: <b>{user?.email}</b>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div>Integrations:</div>
                        <div className="flex items-center space-x-1.5">
                          {!user?.hasSpotifyIntegration &&
                            !user?.hasWakatimeIntegration && <div>None</div>}
                          {user?.hasSpotifyIntegration && (
                            <img
                              className="h-4 w-4"
                              src={`${STATIC_ASSETS}/brands/spotify.svg`}
                              alt="Spotify Logo"
                            />
                          )}
                          {user?.hasWakatimeIntegration && (
                            <img
                              className="h-4 w-4"
                              src={`${STATIC_ASSETS}/brands/wakatime-dark.svg`}
                              alt="Wakatime Logo"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {user?.inWaitlist && (
                    <div>
                      <Button
                        size="sm"
                        className="text-sm"
                        onClick={() =>
                          onboardUser({
                            variables: { input: { userId: user?.id } }
                          })
                        }
                      >
                        Onboard user
                      </Button>
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-200 dark:border-gray-800" />
              </div>
            ))}
          </CardBody>
        </Card>
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsUsers
