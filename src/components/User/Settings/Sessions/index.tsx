import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { Spinner } from '@components/ui/Spinner'
import React from 'react'
import useInView from 'react-cool-inview'

import Sidebar from '../Sidebar'
import { SessionsSettingsQuery } from './__generated__/index.generated'
import SingleSession from './SingleSession'

export const SESSION_SETTINGS_QUERY = gql`
  query SessionsSettingsQuery($after: String) {
    sessions(first: 10, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          current
          isStaff
          ipAddress
          userAgent
          createdAt
          expiresAt
          user {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`

const SessionsSettings: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<SessionsSettingsQuery>(
    SESSION_SETTINGS_QUERY,
    { variables: { after: null } }
  )
  const sessions = data?.sessions?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.sessions?.pageInfo

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

  if (loading) {
    return <PageLoading message="Loading sessions" />
  }

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="mb-4">
          <CardBody className="space-y-4">
            <ErrorMessage title="Failed to load sessions" error={error} />
            {sessions?.map((session: any) => (
              <SingleSession key={session?.id} session={session} />
            ))}
            {pageInfo?.hasNextPage && (
              <span ref={observe} className="flex justify-center p-5">
                <Spinner size="md" />
              </span>
            )}
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default SessionsSettings
