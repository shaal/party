import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Card, CardBody } from '@components/ui/Card'
import { PageLoading } from '@components/ui/PageLoading'
import React from 'react'

import Sidebar from '../Sidebar'
import { LogsSettingsQuery } from './__generated__/index.generated'
import SingleLog from './SingleLog'

export const LOGS_SETTINGS_QUERY = gql`
  query LogsSettingsQuery {
    logs {
      edges {
        node {
          id
          entityId
          action
          createdAt
          user {
            id
            username
            profile {
              id
              avatar
            }
          }
        }
      }
    }
  }
`

const LogsSettings: React.FC = () => {
  const { data, loading } = useQuery<LogsSettingsQuery>(LOGS_SETTINGS_QUERY)

  const logs = data?.logs?.edges?.map((edge) => edge?.node)

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
            {logs?.map((log: any) => (
              <SingleLog key={log?.id} log={log} />
            ))}
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default LogsSettings
