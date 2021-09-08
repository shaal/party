import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import useInView from 'react-cool-inview'
import toast from 'react-hot-toast'
import * as timeago from 'timeago.js'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import UserProfileLarge from '../shared/UserProfileLarge'
import { Button } from '../ui/Button'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { PageLoading } from '../ui/PageLoading'
import { Tooltip } from '../ui/Tooltip'
import {
  OnboardUserMutation,
  OnboardUserMutationVariables,
  StaffToolsUsersQuery
} from './__generated__/Users.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_USERS_QUERY = gql`
  query StaffToolsUsersQuery($after: String) {
    users(first: 30, after: $after) {
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
      pollInterval: 10_000
    }
  )
  const users = data?.users?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.users?.pageInfo

  const [onboardUser] = useMutation<
    OnboardUserMutation,
    OnboardUserMutationVariables
  >(
    gql`
      mutation OnboardUserMutation($userId: ID!) {
        onboardUser(userId: $userId) {
          id
          inWaitlist
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
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

  if (loading) return <PageLoading message="Loading users..." />

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
                  <div className="flex space-x-3 text-gray-600 dark:text-gray-300">
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
                    </div>
                    <div className="border-l border-gray-200 dark:border-gray-800" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        Following: <b>{user?.following?.totalCount}</b>
                      </div>
                      <div>
                        Followers: <b>{user?.followers?.totalCount}</b>
                      </div>
                      <div>
                        Email: <b>{user?.email}</b>
                      </div>
                    </div>
                  </div>
                  {user?.inWaitlist && (
                    <div>
                      <Button
                        size="sm"
                        className="text-sm"
                        onClick={() =>
                          onboardUser({ variables: { userId: user?.id } })
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
        {pageInfo?.hasNextPage && <span ref={observe}></span>}
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsUsers
