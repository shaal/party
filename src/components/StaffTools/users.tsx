import { gql, useQuery } from '@apollo/client'
import React from 'react'
import useInView from 'react-cool-inview'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import UserProfileLarge from '../shared/UserProfileLarge'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { PageLoading } from '../ui/PageLoading'
import { StaffToolsUsersQuery } from './__generated__/users.generated'
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
      }
    }
  )
  const users = data?.users?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.users?.pageInfo

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
                <div className="border-b mt-4" />
                <div className="my-3">TBD</div>
                <div className="border-b" />
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
