import { gql, useQuery } from '@apollo/client'
import React from 'react'

import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import { Card, CardBody } from '~/components/ui/Card'
import { PageLoading } from '~/components/ui/PageLoading'

import Sidebar from '../Sidebar'
import { SessionsSettingsQuery } from './__generated__/index.generated'
import SingleSession from './SingleSession'

export const SESSION_SETTINGS_QUERY = gql`
  query SessionsSettingsQuery {
    sessions {
      edges {
        node {
          id
          isStaff
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
  const { data, loading } = useQuery<SessionsSettingsQuery>(
    SESSION_SETTINGS_QUERY
  )

  const sessions = data?.sessions?.edges?.map((edge) => edge?.node)

  if (loading) {
    return <PageLoading message="Loading sessions..." />
  }

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="mb-4">
          <CardBody className="space-y-3">
            {sessions?.map((session: any) => (
              <SingleSession key={session?.id} session={session} />
            ))}
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default SessionsSettings
