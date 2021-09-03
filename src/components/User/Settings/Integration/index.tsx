import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

import { IntegrationSettingsQuery } from './__generated__/index.generated'
import IntegrationSettingsForm from './Form'

export const INTEGRATION_SETTINGS_QUERY = gql`
  query IntegrationSettingsQuery {
    me {
      id
      profile {
        id
        website
        twitter
        github
        discord
      }
    }
  }
`

const IntegrationSettings: React.FC = () => {
  const { data, loading } = useQuery<IntegrationSettingsQuery>(
    INTEGRATION_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings..." />
  }

  return (
    <Fragment>
      <IntegrationSettingsForm currentUser={data?.me as User} />
    </Fragment>
  )
}

export default IntegrationSettings
