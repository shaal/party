import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import {
  GetIntegrationSettingsQuery,
  Integration
} from '@graphql/types.generated'
import React from 'react'

import IntegrationSettingsForm from './Form'

export const GET_INTEGRATION_SETTINGS_QUERY = gql`
  query GetIntegrationSettings {
    integration {
      id
      wakatimeAPIKey
      spotifyRefreshToken
      ethAddress
    }
  }
`

const IntegrationSettings: React.FC = () => {
  const { data, loading } = useQuery<GetIntegrationSettingsQuery>(
    GET_INTEGRATION_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return (
    <IntegrationSettingsForm integration={data?.integration as Integration} />
  )
}

export default IntegrationSettings
