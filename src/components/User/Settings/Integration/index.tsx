import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import React from 'react'
import { Integration } from 'src/__generated__/schema.generated'

import { IntegrationSettingsQuery } from './__generated__/index.generated'
import IntegrationSettingsForm from './Form'

export const INTEGRATION_SETTINGS_QUERY = gql`
  query IntegrationSettingsQuery {
    integration {
      id
      wakatimeAPIKey
      spotifyRefreshToken
      ethAddress
    }
  }
`

const IntegrationSettings: React.FC = () => {
  const { data, loading } = useQuery<IntegrationSettingsQuery>(
    INTEGRATION_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return (
    <IntegrationSettingsForm integration={data?.integration as Integration} />
  )
}

export default IntegrationSettings
